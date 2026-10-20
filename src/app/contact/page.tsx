'use client';

import { useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react';
import Link from 'next/link';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import { buttonClasses, CheckIcon } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import { supabase, type ContactMessage } from '@/lib/supabase';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';
import { cn } from '@/lib/utils';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  monthlyVolume: string;
  currentProcessor: string;
  message: string;
  contactReason: string;
};

type Field = keyof FormData;
type Errors = Partial<Record<Field, string>>;

const emptyForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  monthlyVolume: '',
  currentProcessor: '',
  message: '',
  contactReason: '',
};

// `value` is what gets stored in Supabase, so it stays exactly as it was. Only the visible label is plain.
const contactReasons = [
  { value: 'Get a Custom Quote 💰', label: 'Get a custom quote' },
  { value: 'I need Help Setting Up 🛠️', label: 'Help setting up' },
  { value: 'Technical Support 🆘', label: 'Technical support' },
  { value: 'I want to Partner with You 🤝', label: 'Partner with us' },
  { value: 'Just Curious About Services 🤔', label: 'Learn about your services' },
  { value: 'My Current Processor Stinks 😤', label: "I'm unhappy with my current processor" },
];

const volumeRanges = [
  { value: 'Just getting started (Under $5K)', label: 'Under $5K' },
  { value: 'Small but mighty ($5K - $25K)', label: '$5K to $25K' },
  { value: 'Growing business ($25K - $50K)', label: '$25K to $50K' },
  { value: 'Solid performer ($50K - $100K)', label: '$50K to $100K' },
  { value: 'High volume player ($100K - $500K)', label: '$100K to $500K' },
  { value: 'Big league (Over $500K) 🏆', label: 'Over $500K' },
];

const responsePromises = [
  'Reply within 2 hours during business hours',
  'Custom quote delivered within 24 hours',
  'No pushy sales tactics, just honest advice',
];

// Built with the constructor so the `u` flag compiles under the ES2017 target.
const NAME_PATTERN = new RegExp("^[\\p{L}\\s'.-]+$", 'u');
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d\s().-]+$/;
const WEBSITE_PATTERN = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i;

// Fields that can show an error, in the order they appear in the form.
const checkedFields: Field[] = ['firstName', 'lastName', 'email', 'phone', 'website', 'contactReason'];

function validateField(field: Field, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case 'firstName':
      if (!value) return 'Enter your first name';
      if (!NAME_PATTERN.test(value)) return 'Use letters only in your first name. Accents, apostrophes and hyphens are fine.';
      return undefined;
    case 'lastName':
      if (!value) return 'Enter your last name';
      if (!NAME_PATTERN.test(value)) return 'Use letters only in your last name. Accents, apostrophes and hyphens are fine.';
      return undefined;
    case 'email':
      if (!value) return 'Enter your email address';
      if (!EMAIL_PATTERN.test(value)) return 'Enter an email address like name@example.com';
      return undefined;
    case 'phone': {
      if (!value) return 'Enter your phone number';
      const digits = value.replace(/\D/g, '').length;
      if (!PHONE_PATTERN.test(value) || digits < 10 || digits > 15) {
        return 'Enter your phone number with area code, like (555) 123-4567';
      }
      return undefined;
    }
    case 'website':
      if (value && !WEBSITE_PATTERN.test(value)) return 'Enter a website address like yourbusiness.com, or leave it blank';
      return undefined;
    case 'contactReason':
      if (!value) return 'Choose what we can help you with';
      return undefined;
    default:
      return undefined;
  }
}

type TawkWindow = Window & { Tawk_API?: { maximize?: () => void } };

/** Opens the Tawk.to chat. If the chat script hasn't loaded (blocked or slow), sends people to the form instead. */
function openLiveChat() {
  const tawk = (window as TawkWindow).Tawk_API;
  if (typeof tawk?.maximize === 'function') {
    tawk.maximize();
    return;
  }
  focusField('contact-firstName');
}

function focusField(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ block: 'center' });
  element.focus({ preventScroll: true });
}

const controlBase =
  'block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 transition-colors scroll-mt-32 hover:border-navy-300 focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700 focus:transform-none';
const controlValid = 'border-line';
const controlInvalid = 'border-red-700 hover:border-red-700 focus:border-red-700 focus:ring-red-700';

/** Label, optional hint, the control and its error message. */
function FormField({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-semibold text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-red-700">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-sm font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
          <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            <span className="sr-only">Error: </span>
            {error}
          </span>
        </p>
      )}
    </div>
  );
}

function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 8 4 4 4-4" />
    </svg>
  );
}

// Borders for the contact options: one column on phones, 2x2 on tablets, one row on wide screens.
const optionCells = [
  'sm:pr-6',
  'border-t border-white/10 sm:border-l sm:border-t-0 sm:pl-6 xl:pr-6',
  'border-t border-white/10 sm:pr-6 xl:border-l xl:border-t-0 xl:pl-6',
  'border-t border-white/10 sm:border-l sm:pl-6 xl:border-t-0',
];

function ContactOptions() {
  const cell = (i: number) => cn('flex flex-col gap-2 py-7 sm:py-8', optionCells[i]);
  const linkClass = 'inline-flex min-h-[3rem] items-center text-lg font-semibold text-gold-400 [overflow-wrap:anywhere] hover:text-white';

  return (
    <div className="mt-14 border-t border-white/10">
      <h2 className="sr-only">Ways to reach us</h2>
      <ul className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1.2fr_1fr]">
        <li className={cell(0)}>
          <h3 className="text-lg font-bold text-white">Schedule a call</h3>
          <p className="text-navy-300">Free 30-minute call, Monday to Sunday, 9 AM to 9 PM EST.</p>
          <div className="mt-auto pt-3">
            <CalendlyButton text="Schedule a free call" />
          </div>
        </li>
        <li className={cell(1)}>
          <h3 className="text-lg font-bold text-white">Call us</h3>
          <p className="text-navy-300">Rather talk now? Speak with our team.</p>
          <div className="mt-auto pt-3">
            <a href={PHONE_HREF} className={linkClass}>
              {PHONE_DISPLAY}
            </a>
          </div>
        </li>
        <li className={cell(2)}>
          <h3 className="text-lg font-bold text-white">Email us</h3>
          <p className="text-navy-300">We reply within 2 hours during business hours.</p>
          <div className="mt-auto pt-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </li>
        <li className={cell(3)}>
          <h3 className="text-lg font-bold text-white">Live chat</h3>
          <p className="text-navy-300">Chat with our support team, available 24/7.</p>
          <div className="mt-auto pt-3">
            <button type="button" onClick={openLiveChat} className={buttonClasses('outline-light')}>
              Start a chat
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const sendErrorRef = useRef<HTMLDivElement>(null);
  // Set when the pointer goes down on "Send message". The submit checks every field anyway, and an error
  // appearing on blur would push the button down mid-click so the click never lands.
  const submitPressRef = useRef(false);

  const errorList = checkedFields.filter((field) => errors[field]).map((field) => [field, errors[field] as string] as const);
  const showSummary = failedAttempts > 0 && errorList.length > 0;

  // Move focus to the error summary after a submit with problems, so keyboard and screen reader users hear it.
  useEffect(() => {
    if (failedAttempts > 0) summaryRef.current?.focus();
  }, [failedAttempts]);

  // If the insert fails, take focus to the explanation (the disabled button would otherwise drop it).
  useEffect(() => {
    if (submitError) sendErrorRef.current?.focus();
  }, [submitError]);

  // Bring the confirmation into view: the submit button sits at the bottom of a long form.
  useEffect(() => {
    if (!isSubmitted) return;
    successRef.current?.scrollIntoView({ block: 'start' });
    successRef.current?.focus({ preventScroll: true });
  }, [isSubmitted]);

  const handleInputChange = (field: Field, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Once a field shows an error, re-check it as they type so the message clears as soon as it's fixed.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleBlur = (field: Field) => {
    if (submitPressRef.current) {
      submitPressRef.current = false;
      return;
    }
    // Don't flag empty required fields just because someone tabbed past them; that waits for submit.
    if (!formData[field].trim() && !errors[field]) return;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const fieldProps = (field: Field, hint?: boolean) => {
    const id = `contact-${field}`;
    const describedBy = [hint && `${id}-hint`, errors[field] && `${id}-error`].filter(Boolean).join(' ');
    return {
      id,
      name: field,
      value: formData[field],
      onBlur: () => handleBlur(field),
      'aria-invalid': errors[field] ? true : undefined,
      'aria-describedby': describedBy || undefined,
      className: cn(controlBase, errors[field] ? controlInvalid : controlValid),
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitPressRef.current = false;
    if (isSubmitting) return;

    const nextErrors: Errors = {};
    for (const field of checkedFields) {
      const message = validateField(field, formData[field]);
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitError(null);
      setFailedAttempts((n) => n + 1);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const contactMessage: Omit<ContactMessage, 'id' | 'created_at'> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || undefined,
        website: formData.website || undefined,
        contact_reason: formData.contactReason,
        monthly_volume: formData.monthlyVolume || undefined,
        current_processor: formData.currentProcessor || undefined,
        message: formData.message || undefined,
      };

      const { data, error } = await supabase.from('contact_messages').insert([contactMessage]).select();

      if (error) {
        throw error;
      }

      console.log('Contact form submitted successfully:', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setErrors({});
    setFailedAttempts(0);
    setSubmitError(null);
    setIsSubmitted(false);
  };

  const jumpToField = (e: MouseEvent<HTMLAnchorElement>, field: Field) => {
    e.preventDefault();
    focusField(`contact-${field}`);
  };

  const firstName = formData.firstName.trim();

  return (
    <>
      {!isSubmitted && <FloatingLeadCapture pageName="contact" />}

      <PageHero
        title="Talk to our team"
        lead="Ask us about fees, equipment or getting set up. We'll review your current setup and show you where you can save, from zero processing fees to low, transparent rates."
      >
        <ContactOptions />
      </PageHero>

      <Section tone="paper" id="message" aria-labelledby="message-title">
        {isSubmitted ? (
          <div
            ref={successRef}
            tabIndex={-1}
            aria-labelledby="message-title"
            className="max-w-3xl scroll-mt-28 rounded-2xl border border-line bg-white p-7 focus:outline-none sm:p-12"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-navy-950">
              <CheckIcon className="h-6 w-6" />
            </span>
            <h2 id="message-title" className="mt-6 font-wide text-3xl font-extrabold text-navy-900 sm:text-4xl">
              {firstName ? `Thank you, ${firstName}.` : 'Thank you.'} We got your message.
            </h2>
            <p className="mt-4 max-w-prose text-lg text-muted">Here is what happens next.</p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 text-navy-700" />
                <span>We get back to you within 2 hours during business hours.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 text-navy-700" />
                <span>If you asked for a quote, you&apos;ll have your custom quote within 24 hours.</span>
              </li>
            </ul>

            <div className="mt-10 border-t border-line pt-8">
              <h3 className="text-xl font-bold text-navy-900">Want to talk sooner?</h3>
              <p className="mt-2 max-w-prose text-muted">
                Book a free 30-minute call. Calls available Monday to Sunday, 9 AM to 9 PM EST.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <CalendlyButton text="Schedule a free call" size="lg" />
                <button type="button" onClick={resetForm} className={buttonClasses('outline-dark', 'lg')}>
                  Send another message
                </button>
              </div>
              <Link
                href="/"
                className="mt-6 inline-block font-semibold text-navy-700 underline-offset-4 hover:text-navy-900 hover:underline"
              >
                Back to home
              </Link>
            </div>
          </div>
        ) : (
          <>
            <SectionHeading
              id="message-title"
              title="Send us a message"
              intro="Tell us about your business and what you need help with."
            />

            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:gap-20">
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-labelledby="message-title"
                className="rounded-2xl border border-line bg-white p-6 sm:p-10"
              >
                <p className="text-sm text-muted">
                  Fields marked with <span className="text-red-700">*</span> are required.
                </p>

                {showSummary && (
                  <div
                    ref={summaryRef}
                    tabIndex={-1}
                    aria-labelledby="error-summary-title"
                    className="mt-6 scroll-mt-28 rounded-xl border-2 border-red-700 bg-red-50 p-5"
                  >
                    <h3 id="error-summary-title" className="font-bold text-red-800">
                      {errorList.length === 1
                        ? 'Check 1 field before sending'
                        : `Check ${errorList.length} fields before sending`}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {errorList.map(([field, message]) => (
                        <li key={field}>
                          <a
                            href={`#contact-${field}`}
                            onClick={(e) => jumpToField(e, field)}
                            className="font-medium text-red-800 underline underline-offset-4 hover:text-red-900"
                          >
                            {message}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <fieldset className="mt-8 min-w-0">
                  <legend className="font-wide text-xl font-bold text-navy-900">About you</legend>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <FormField id="contact-firstName" label="First name" required error={errors.firstName}>
                      <input
                        type="text"
                        autoComplete="given-name"
                        required
                        {...fieldProps('firstName')}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    </FormField>
                    <FormField id="contact-lastName" label="Last name" required error={errors.lastName}>
                      <input
                        type="text"
                        autoComplete="family-name"
                        required
                        {...fieldProps('lastName')}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </FormField>
                    <FormField id="contact-email" label="Email address" required error={errors.email}>
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        spellCheck={false}
                        required
                        placeholder="name@yourbusiness.com"
                        {...fieldProps('email')}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </FormField>
                    <FormField id="contact-phone" label="Phone number" required error={errors.phone}>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder="(555) 123-4567"
                        {...fieldProps('phone')}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </FormField>
                  </div>
                </fieldset>

                <fieldset className="mt-10 min-w-0 border-t border-line pt-8">
                  <legend className="float-left w-full font-wide text-xl font-bold text-navy-900">About your business</legend>
                  <div className="clear-both grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <FormField id="contact-company" label="Business name" error={errors.company}>
                      <input
                        type="text"
                        autoComplete="organization"
                        {...fieldProps('company')}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </FormField>
                    <FormField id="contact-website" label="Website" error={errors.website}>
                      <input
                        type="url"
                        inputMode="url"
                        autoComplete="url"
                        spellCheck={false}
                        placeholder="yourbusiness.com"
                        {...fieldProps('website')}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    </FormField>
                    <FormField
                      id="contact-monthlyVolume"
                      label="Monthly processing volume"
                      hint="Helps us prepare a more accurate quote."
                    >
                      <div className="relative">
                        <select
                          {...fieldProps('monthlyVolume', true)}
                          className={cn(fieldProps('monthlyVolume').className, 'appearance-none pr-11')}
                          onChange={(e) => handleInputChange('monthlyVolume', e.target.value)}
                        >
                          <option value="">Choose a range</option>
                          {volumeRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                              {range.label}
                            </option>
                          ))}
                        </select>
                        <SelectChevron />
                      </div>
                    </FormField>
                    <FormField
                      id="contact-currentProcessor"
                      label="Current payment processor"
                      hint="Who processes your card payments today."
                    >
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="For example, Square or Stripe"
                        {...fieldProps('currentProcessor', true)}
                        onChange={(e) => handleInputChange('currentProcessor', e.target.value)}
                      />
                    </FormField>
                  </div>
                </fieldset>

                <fieldset className="mt-10 min-w-0 border-t border-line pt-8">
                  <legend className="float-left w-full font-wide text-xl font-bold text-navy-900">Your message</legend>
                  <div className="clear-both grid gap-6 pt-6">
                    <FormField id="contact-contactReason" label="What can we help you with?" required error={errors.contactReason}>
                      <div className="relative">
                        <select
                          required
                          {...fieldProps('contactReason')}
                          className={cn(fieldProps('contactReason').className, 'appearance-none pr-11')}
                          onChange={(e) => handleInputChange('contactReason', e.target.value)}
                        >
                          <option value="">Choose one</option>
                          {contactReasons.map((reason) => (
                            <option key={reason.value} value={reason.value}>
                              {reason.label}
                            </option>
                          ))}
                        </select>
                        <SelectChevron />
                      </div>
                    </FormField>
                    <FormField id="contact-message" label="Message">
                      <textarea
                        rows={5}
                        placeholder="For example, what you sell, how your customers pay, or questions about your fees."
                        {...fieldProps('message')}
                        className={cn(fieldProps('message').className, 'min-h-[8rem] resize-y')}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                      />
                    </FormField>
                  </div>
                </fieldset>

                {submitError && (
                  <div
                    ref={sendErrorRef}
                    tabIndex={-1}
                    role="alert"
                    aria-labelledby="send-error-title"
                    className="mt-8 scroll-mt-28 rounded-xl border border-red-700/40 bg-red-50 p-5 text-red-800"
                  >
                    <p id="send-error-title" className="font-bold">
                      Your message wasn&apos;t sent.
                    </p>
                    <p className="mt-1">{submitError}</p>
                    <p className="mt-1">
                      You can also email us at{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline underline-offset-4">
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                )}

                <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onPointerDown={() => {
                      submitPressRef.current = true;
                    }}
                    className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}
                  >
                    {isSubmitting && (
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-navy-950/25 border-t-navy-950"
                        aria-hidden="true"
                      />
                    )}
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </button>
                  <p className="text-sm text-muted">We reply within 2 hours during business hours.</p>
                </div>
                <p role="status" className="sr-only">
                  {isSubmitting ? 'Sending your message…' : ''}
                </p>
              </form>

              <aside aria-labelledby="guarantee-title" className="lg:sticky lg:top-28 lg:self-start">
                <h3 id="guarantee-title" className="font-wide text-xl font-bold text-navy-900">
                  Quick response guarantee
                </h3>
                <ul className="mt-5 space-y-4">
                  {responsePromises.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon className="mt-0.5 text-navy-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-line pt-6">
                  <p className="font-semibold text-ink">Rather talk it through?</p>
                  <p className="mt-1 text-muted">
                    Call{' '}
                    <a href={PHONE_HREF} className="font-semibold text-navy-700 underline-offset-4 hover:underline">
                      {PHONE_DISPLAY}
                    </a>{' '}
                    or book a <span className="whitespace-nowrap">free 30-minute call</span>.
                  </p>
                  <CalendlyButton text="Schedule a free call" variant="outline-dark" size="sm" className="mt-4" />
                </div>
              </aside>
            </div>
          </>
        )}
      </Section>
    </>
  );
}
