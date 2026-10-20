'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { supabase, type Lead } from '@/lib/supabase';
import { buttonClasses, CheckIcon } from '@/components/ui/Button';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';
import { cn } from '@/lib/utils';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const volumeOptions = [
  { value: '< $5k', label: 'Less than $5k/month' },
  { value: '$5k - $25k', label: '$5k - $25k/month' },
  { value: '$25k - $50k', label: '$25k - $50k/month' },
  { value: '$50k - $100k', label: '$50k - $100k/month' },
  { value: '$100k - $200k', label: '$100k - $200k/month' },
  { value: '$200k+', label: '$200k+/month' },
];

const NAME_PATTERN = /^[\p{L}\s'.-]+$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type FieldName = 'businessName' | 'firstName' | 'email';

function validateField(field: FieldName, raw: string): string {
  const value = raw.trim();
  switch (field) {
    case 'businessName':
      return value ? '' : 'Enter your business name';
    case 'firstName':
      if (!value) return 'Enter your name';
      if (!NAME_PATTERN.test(value)) return 'Use only letters, spaces, apostrophes and hyphens in your name';
      return '';
    case 'email':
      if (!value) return 'Enter your email address';
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address, like name@business.com';
      return '';
  }
}

const inputClasses = (hasError: boolean) =>
  cn(
    'mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-[1rem] text-ink transition-colors',
    'focus:outline-none focus:ring-1',
    hasError
      ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
      : 'border-line hover:border-navy-300 focus:border-navy-700 focus:ring-navy-700'
  );

/** Short "before you go" form for a free savings analysis. The parent decides when to open it. */
export default function ExitIntentPopup({ isOpen, onClose }: ExitIntentPopupProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    firstName: '',
    email: '',
    processingVolume: '$5k - $25k',
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | null>>>({});
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const uid = useId();
  const titleId = `${uid}-title`;
  const fieldId = (name: string) => `${uid}-${name}`;

  // Focus moves into the dialog, Escape closes it, and focus goes back where it was afterwards.
  useEffect(() => {
    if (!isOpen) return;
    const returnFocusTo = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusTo?.focus?.();
    };
  }, [isOpen]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(false);

    const fields: FieldName[] = ['businessName', 'firstName', 'email'];
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
        business_location: 'Yes', // Default assumption for exit-intent
        processing_volume: formData.processingVolume,
        business_name: formData.businessName,
        first_name: formData.firstName,
        last_name: '', // Optional in mini form
        phone: '', // Optional in mini form
        email: formData.email,
      };

      const { error } = await supabase.from('leads').insert([leadData]).select();

      if (error) throw error;

      setIsSuccess(true);

      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting exit-intent form:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field !== 'processingVolume' && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  const field = (name: FieldName, label: string, type: string, autoComplete: string) => {
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
          type={type}
          autoComplete={autoComplete}
          value={formData[name]}
          onChange={(event) => handleInputChange(name, event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClasses(Boolean(error))}
          required
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
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-navy-950/60" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={trapFocus}
        className="relative max-h-[calc(100dvh-2rem)] w-full overflow-y-auto rounded-t-2xl bg-white text-ink shadow-2xl outline-none sm:max-w-md sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper hover:text-navy-900"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        {!isSuccess ? (
          <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 sm:px-8 sm:pb-8 sm:pt-8">
            <h2 id={titleId} className="pr-10 font-wide text-2xl font-extrabold text-navy-900">
              Get your free savings analysis before you go
            </h2>
            <p className="mt-2 text-muted">See how much you can save in processing fees.</p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {field('businessName', 'Business name', 'text', 'organization')}
              {field('firstName', 'Your name', 'text', 'name')}
              {field('email', 'Email', 'email', 'email')}

              <div>
                <label htmlFor={fieldId('processingVolume')} className="block text-sm font-semibold text-ink">
                  Monthly processing volume
                </label>
                <select
                  id={fieldId('processingVolume')}
                  name="processingVolume"
                  value={formData.processingVolume}
                  onChange={(e) => handleInputChange('processingVolume', e.target.value)}
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

              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className={buttonClasses('primary', 'md')}>
                  {isSubmitting ? 'Sending…' : 'Get my free analysis'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div role="status" className="px-6 pb-8 pt-8 sm:px-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-gold-400">
              <CheckIcon />
            </span>
            <h2 id={titleId} className="mt-5 font-wide text-2xl font-extrabold text-navy-900">
              Thank you
            </h2>
            <p className="mt-2 text-muted">We&apos;ll contact you within 24 hours with your savings analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
}
