'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { supabase, type Lead } from '@/lib/supabase';
import { buttonClasses, CheckIcon } from '@/components/ui/Button';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';
import { cn } from '@/lib/utils';

interface FloatingLeadCaptureProps {
  /** The page that mounts the prompt. Exposed as `data-page` so analytics can tell the pages apart. */
  pageName?: string;
}

// Storage keys. The three localStorage keys are the ones the site has always used.
const SUBMITTED_KEY = 'zummit_lead_submitted';
const DISMISSED_KEY = 'zummit_lead_dismissed';
const LAST_SHOWN_KEY = 'zummit_lead_last_shown';
// Once the prompt has appeared, it doesn't appear again on other pages in the same visit.
const SESSION_KEY = 'zummit_lead_prompted';

const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const SCROLL_TRIGGER = 0.5; // half of the page read
const TIME_TRIGGER_SECONDS = 30; // seconds with the tab visible

const volumeOptions = [
  { value: '< $5k', label: 'Less than $5k/month' },
  { value: '$5k - $25k', label: '$5k - $25k/month' },
  { value: '$25k - $50k', label: '$25k - $50k/month' },
  { value: '$50k - $100k', label: '$50k - $100k/month' },
  { value: '$100k - $200k', label: '$100k - $200k/month' },
  { value: '$200k+', label: '$200k+/month' },
];

const NAME_PATTERN = /^[\p{L}\s'.-]+$/u;
const PHONE_PATTERN = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Stage = 'hidden' | 'prompt' | 'form';
type FieldName = 'businessName' | 'firstName' | 'phone' | 'email';
type FormState = Record<FieldName | 'processingVolume', string>;

// Storage can throw (private mode, blocked site data), so every access is guarded.
function storageGet(kind: 'local' | 'session', key: string): string | null {
  try {
    return (kind === 'local' ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function storageSet(kind: 'local' | 'session', key: string, value: string) {
  try {
    (kind === 'local' ? window.localStorage : window.sessionStorage).setItem(key, value);
  } catch {
    // Not critical: the prompt may show again next time.
  }
}

function storageRemove(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/** Never after a submission, not within 24 hours of a dismissal, and at most once per visit. */
function canPrompt(): boolean {
  if (storageGet('local', SUBMITTED_KEY) === 'true') return false;

  const dismissed = storageGet('local', DISMISSED_KEY);
  const lastShown = storageGet('local', LAST_SHOWN_KEY);
  if (dismissed && lastShown) {
    if (Date.now() - parseInt(lastShown, 10) < DISMISS_COOLDOWN_MS) return false;
    storageRemove(DISMISSED_KEY);
  }

  return !storageGet('session', SESSION_KEY);
}

function validateField(field: FieldName, raw: string): string {
  const value = raw.trim();
  switch (field) {
    case 'businessName':
      if (!value) return 'Enter your business name';
      if (value.length < 2) return 'Business name must be at least 2 characters';
      return '';
    case 'firstName':
      if (!value) return 'Enter your name';
      if (value.length < 2) return 'Name must be at least 2 characters';
      if (!NAME_PATTERN.test(value)) return 'Use only letters, spaces, apostrophes and hyphens in your name';
      return '';
    case 'phone':
      if (!value) return 'Enter your phone number';
      if (!PHONE_PATTERN.test(value)) return 'Enter a valid phone number, including the area code';
      return '';
    case 'email':
      if (!value) return 'Enter your email address';
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address, like name@business.com';
      return '';
  }
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('h-5 w-5', className)} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('h-4 w-4', className)} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5 10 7.5l5 5" />
    </svg>
  );
}

const inputClasses = (hasError: boolean) =>
  cn(
    'mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-[1rem] text-ink transition-colors',
    'focus:outline-none focus:ring-1',
    hasError
      ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
      : 'border-line hover:border-navy-300 focus:border-navy-700 focus:ring-navy-700'
  );

/**
 * A small, dismissible offer for a free savings analysis.
 *
 * It stays out of the way until the visitor has read about half the page (or spent 30 seconds on it),
 * then appears as a compact card at the bottom left (a slim bar on phones, clear of the chat bubble on
 * the right). The form only opens when the visitor asks for it.
 */
export default function FloatingLeadCapture({ pageName }: FloatingLeadCaptureProps) {
  const [stage, setStage] = useState<Stage>('hidden');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    businessName: '',
    firstName: '',
    phone: '',
    email: '',
    processingVolume: '$5k - $25k',
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const panelRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | null>>>({});
  const previousStage = useRef<Stage>('hidden');

  const uid = useId();
  const titleId = `${uid}-title`;
  const leadId = `${uid}-lead`;
  const fieldId = (name: string) => `${uid}-${name}`;

  // Appear after real engagement: half the page scrolled, or 30 seconds with the tab visible.
  useEffect(() => {
    if (!canPrompt()) return;

    let seconds = 0;
    let timer = 0;

    const stop = () => {
      window.clearInterval(timer);
      window.removeEventListener('scroll', onScroll);
    };

    const show = () => {
      stop();
      storageSet('local', LAST_SHOWN_KEY, Date.now().toString());
      storageSet('session', SESSION_KEY, 'true');
      setStage('prompt');
    };

    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SCROLL_TRIGGER) show();
    }

    timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      seconds += 1;
      if (seconds >= TIME_TRIGGER_SECONDS) show();
    }, 1000);
    window.addEventListener('scroll', onScroll, { passive: true });

    return stop;
  }, []);

  // Move focus into the form when it opens, and back to the prompt's button when it closes.
  useEffect(() => {
    const previous = previousStage.current;
    previousStage.current = stage;

    if (stage === 'form' && previous !== 'form') {
      panelRef.current?.focus();
    } else if (stage === 'prompt' && previous === 'form') {
      const openButtons = promptRef.current?.querySelectorAll<HTMLButtonElement>('[data-open-form]') ?? [];
      Array.from(openButtons).find((button) => button.offsetParent !== null)?.focus();
    }
  }, [stage]);

  const collapse = useCallback(() => {
    setStage((current) => (current === 'form' ? 'prompt' : current));
  }, []);

  // Escape closes the form. On phones the sheet covers the page, so the page behind stops scrolling.
  useEffect(() => {
    if (stage !== 'form') return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        collapse();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    const isPhone = window.matchMedia('(max-width: 639px)').matches;
    const previousOverflow = document.body.style.overflow;
    if (isPhone) document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (isPhone) document.body.style.overflow = previousOverflow;
    };
  }, [stage, collapse]);

  useEffect(() => {
    if (isSuccess) successHeadingRef.current?.focus();
  }, [isSuccess]);

  // Keep Tab inside the open form.
  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === panelRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const dismiss = () => {
    setStage('hidden');
    storageSet('local', DISMISSED_KEY, 'true');
    storageSet('local', LAST_SHOWN_KEY, Date.now().toString());
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field !== 'processingVolume' && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: FieldName) => {
    // Only re-check fields that already showed an error, so we don't scold people mid-form.
    if (errors[field] !== undefined) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(false);

    const fields: FieldName[] = ['businessName', 'firstName', 'phone', 'email'];
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of fields) nextErrors[field] = validateField(field, formData[field]);
    setErrors(nextErrors);

    const firstInvalid = fields.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData: Omit<Lead, 'id' | 'created_at'> = {
        business_location: 'Yes',
        processing_volume: formData.processingVolume,
        business_name: formData.businessName,
        first_name: formData.firstName,
        last_name: '',
        phone: formData.phone,
        email: formData.email,
      };

      const { error } = await supabase.from('leads').insert([leadData]).select();

      if (error) throw error;
      setIsSuccess(true);
      storageSet('local', SUBMITTED_KEY, 'true');

      // Close on its own after the confirmation has been read.
      setTimeout(() => {
        setStage('hidden');
      }, 4000);
    } catch (error) {
      console.error('Error submitting floating form:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (stage === 'hidden') return null;

  const field = (name: FieldName, label: string, props: InputHTMLAttributes<HTMLInputElement>) => {
    const error = errors[name];
    const errorId = `${fieldId(name)}-error`;
    return (
      <div>
        <label htmlFor={fieldId(name)} className="block text-sm font-semibold text-ink">
          {label}
        </label>
        <input
          ref={(element) => {
            fieldRefs.current[name] = element;
          }}
          id={fieldId(name)}
          name={name}
          value={formData[name]}
          onChange={(event) => handleInputChange(name, event.target.value)}
          onBlur={() => handleBlur(name)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClasses(Boolean(error))}
          required
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      {/* The prompt: a slim bar on phones, a compact card from 640px up */}
      {stage === 'prompt' && (
        <aside
          ref={promptRef}
          aria-label="Free savings analysis"
          data-page={pageName}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-24 z-40 sm:bottom-6 sm:left-6 sm:right-auto sm:w-[20rem]"
        >
          <div className="flex items-center rounded-full bg-navy-900 text-white shadow-lg shadow-navy-950/25 ring-1 ring-white/15 sm:hidden">
            <button
              type="button"
              data-open-form
              aria-haspopup="dialog"
              onClick={() => setStage('form')}
              className="flex min-h-12 flex-1 items-center gap-2 rounded-full py-2 pl-5 pr-2 text-left text-[0.95rem] font-semibold"
            >
              Free savings analysis
              <ChevronUpIcon className="text-gold-400" />
            </button>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss the savings analysis offer"
              className="mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden rounded-2xl bg-navy-900 p-5 text-white shadow-2xl shadow-navy-950/30 ring-1 ring-white/15 sm:block">
            <div className="flex items-start justify-between gap-4">
              <p className="font-wide text-lg font-bold leading-snug">Free savings analysis</p>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss the savings analysis offer"
                className="-mr-2 -mt-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-navy-200">See how much you can save in processing fees.</p>
            <button
              type="button"
              data-open-form
              aria-haspopup="dialog"
              onClick={() => setStage('form')}
              className={buttonClasses('primary', 'sm', 'mt-4')}
            >
              Get my free analysis
            </button>
          </div>
        </aside>
      )}

      {/* The form, opened on request */}
      {stage === 'form' && (
        <>
          <div className="fixed inset-0 z-[60] bg-navy-950/40" aria-hidden="true" onClick={collapse} />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={isSuccess ? undefined : leadId}
            tabIndex={-1}
            onKeyDown={trapFocus}
            data-page={pageName}
            className={cn(
              'fixed inset-x-0 bottom-0 z-[60] max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-t-2xl bg-white text-ink shadow-2xl outline-none',
              'sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-h-[calc(100dvh-8rem)] sm:w-[26rem] sm:rounded-2xl'
            )}
          >
            {!isSuccess ? (
              <>
                <div className="flex items-start justify-between gap-4 border-b border-line px-6 pb-5 pt-6">
                  <div>
                    <h2 id={titleId} className="font-wide text-xl font-extrabold text-navy-900 sm:text-2xl">
                      Get your free savings analysis
                    </h2>
                    <p id={leadId} className="mt-2 text-[0.95rem] text-muted">
                      Tell us about your business. We&apos;ll call you and show you exactly how much you can save.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={collapse}
                    aria-label="Close"
                    className="-mr-2 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper hover:text-navy-900"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5"
                >
                  {field('businessName', 'Business name', { type: 'text', autoComplete: 'organization' })}
                  {field('firstName', 'Your name', { type: 'text', autoComplete: 'name' })}
                  {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
                  {field('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}

                  <div>
                    <label htmlFor={fieldId('processingVolume')} className="block text-sm font-semibold text-ink">
                      Monthly processing volume
                    </label>
                    <select
                      id={fieldId('processingVolume')}
                      name="processingVolume"
                      value={formData.processingVolume}
                      onChange={(event) => handleInputChange('processingVolume', event.target.value)}
                      className={inputClasses(false)}
                    >
                      {volumeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {submitError && (
                    <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                      We couldn&apos;t send your details. Please try again, or call us at{' '}
                      <a href={PHONE_HREF} className="font-semibold underline underline-offset-2">
                        {PHONE_DISPLAY}
                      </a>
                      .
                    </p>
                  )}

                  {/* Buttons stay auto-width so the chat bubble in the corner never sits on top of them. */}
                  <div className="pt-2">
                    <button type="submit" disabled={isSubmitting} className={buttonClasses('primary', 'md')}>
                      {isSubmitting && (
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-navy-950/25 border-t-navy-950"
                          aria-hidden="true"
                        />
                      )}
                      {isSubmitting ? 'Sending…' : 'Get my free analysis'}
                    </button>
                    <p className="mt-3 text-sm text-muted">No commitment required.</p>
                  </div>
                </form>
              </>
            ) : (
              <div role="status" className="px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                  <CheckIcon />
                </span>
                <h2
                  id={titleId}
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="mt-5 font-wide text-xl font-extrabold text-navy-900 outline-none sm:text-2xl"
                >
                  Your savings analysis is being prepared
                </h2>
                <p className="mt-2 text-muted">
                  Expect our call within 2 hours. We&apos;ll show you exactly how much you can save.
                </p>
                <button
                  type="button"
                  onClick={() => setStage('hidden')}
                  className={buttonClasses('outline-dark', 'sm', 'mt-6')}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
