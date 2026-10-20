'use client';

import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { supabase, type Lead } from '@/lib/supabase';
import { CalendlyButton } from '@/components/CalendlyWidget';
import { Container } from '@/components/ui/Layout';
import { buttonClasses, CheckIcon } from '@/components/ui/Button';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';
import { cn } from '@/lib/utils';

type FormData = {
  businessLocation: string;
  processingVolume: string;
  businessName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};
type Field = keyof FormData;
type ChoiceField = 'businessLocation' | 'processingVolume';

// `value` is what the leads table receives. Keep these strings exactly as they are;
// only the labels people see may change.
const locationOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

const volumeOptions = [
  { value: '< $5k', label: 'Under $5k' },
  { value: '$5k - $25k', label: '$5k to $25k' },
  { value: '$25k - $50k', label: '$25k to $50k' },
  { value: '$50k - $100k', label: '$50k to $100k' },
  { value: '$100k - $200k', label: '$100k to $200k' },
  { value: '$200k+', label: '$200k or more' },
];

const questions = ['Where your business is based', 'Your monthly processing volume', 'Your business name', 'How to reach you'];

// Step 0 is the intro, 1–4 are the questions, 5 is the confirmation.
const QUESTION_COUNT = 4;
const SUCCESS_STEP = 5;

const stepFields: Record<number, Field[]> = {
  1: ['businessLocation'],
  2: ['processingVolume'],
  3: ['businessName'],
  4: ['firstName', 'lastName', 'phone', 'email'],
};

const NAME_PATTERN = /^[\p{L}\s'.-]+$/u;

function validateField(field: Field, value: string): string {
  const trimmed = value.trim();
  switch (field) {
    case 'businessLocation':
      return value ? '' : 'Choose Yes or No.';
    case 'processingVolume':
      return value ? '' : 'Choose the range closest to your monthly card sales.';
    case 'businessName':
      if (!trimmed) return 'Enter your business name.';
      if (trimmed.length < 2) return 'Enter at least 2 characters.';
      return '';
    case 'firstName':
    case 'lastName': {
      const label = field === 'firstName' ? 'first' : 'last';
      if (!trimmed) return `Enter your ${label} name.`;
      if (trimmed.length < 2) return 'Enter at least 2 characters.';
      if (!NAME_PATTERN.test(trimmed)) return 'Use letters only. Spaces, apostrophes and hyphens are fine.';
      return '';
    }
    case 'phone':
      if (!trimmed) return 'Enter your phone number.';
      if (!/^[\+]?[(]?[\d\s\-\(\)]{10,}$/.test(trimmed)) return 'Enter a phone number with the area code, for example 555 123 4567.';
      return '';
    case 'email':
      if (!trimmed) return 'Enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Enter an email address like name@example.com.';
      return '';
  }
}

const fieldId = (field: Field) => `quote-${field}`;
const errorId = (field: Field) => `quote-${field}-error`;

function FieldError({ field, message }: { field: Field; message?: string }) {
  if (!message) return null;
  return (
    <p id={errorId(field)} className="mt-2 text-[0.95rem] font-medium text-red-700">
      {message}
    </p>
  );
}

function TextField({
  field,
  label,
  error,
  className,
  ...inputProps
}: {
  field: Field;
  label: ReactNode;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'className'>) {
  return (
    <div className={className}>
      <label htmlFor={fieldId(field)} className="block font-semibold text-navy-900">
        {label}
      </label>
      <input
        id={fieldId(field)}
        name={field}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(field) : undefined}
        className={cn(
          'mt-2 h-14 w-full rounded-xl border bg-white px-4 text-lg text-ink transition-colors focus:border-navy-700',
          error ? 'border-red-600' : 'border-navy-900/50 hover:border-navy-900'
        )}
        {...inputProps}
      />
      <FieldError field={field} message={error} />
    </div>
  );
}

export default function GetQuote() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessLocation: '',
    processingVolume: '',
    businessName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const shownStep = useRef(currentStep);
  // Choice cards advance on their own when tapped or clicked, but not while someone
  // moves through them with the arrow keys; keyboard users press Enter or Continue.
  const pointerChoice = useRef(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Move focus to the new step's heading so keyboard and screen reader users land on the question.
  useEffect(() => {
    if (shownStep.current === currentStep) return;
    shownStep.current = currentStep;
    headingRef.current?.focus();
  }, [currentStep]);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  const goTo = (step: number) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setErrors({});
    setSubmitError(false);
    setCurrentStep(step);
  };

  const handleInputChange = (field: Field, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleChoiceClick = (field: ChoiceField, value: string) => {
    if (!pointerChoice.current) return;
    pointerChoice.current = false;
    handleInputChange(field, value);
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    // A short pause so the selected card registers before the next question appears.
    advanceTimer.current = setTimeout(() => goTo(currentStep + 1), 180);
  };

  const submitLead = async () => {
    // Submit form to Supabase
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      const leadData: Omit<Lead, 'id' | 'created_at'> = {
        business_location: formData.businessLocation,
        processing_volume: formData.processingVolume,
        business_name: formData.businessName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
      };

      const { data, error } = await supabase.from('leads').insert([leadData]).select();

      if (error) {
        throw error;
      }

      console.log('Lead submitted successfully:', data);
      setCurrentStep(SUCCESS_STEP);

      // Auto-redirect after 3 seconds
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const fields = stepFields[currentStep] ?? [];
    const newErrors: Partial<Record<Field, string>> = {};
    for (const field of fields) {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);

    const firstInvalid = fields.find((field) => newErrors[field]);
    if (firstInvalid) {
      const target =
        firstInvalid === 'businessLocation' || firstInvalid === 'processingVolume'
          ? document.querySelector<HTMLInputElement>(`input[name="${firstInvalid}"]`)
          : document.getElementById(fieldId(firstInvalid));
      target?.focus();
      return;
    }

    if (currentStep < QUESTION_COUNT) {
      goTo(currentStep + 1);
    } else {
      void submitLead();
    }
  };

  const isQuestion = currentStep >= 1 && currentStep <= QUESTION_COUNT;
  const headingClass = 'font-wide text-2xl font-extrabold text-navy-900 focus:outline-none sm:text-[1.9rem]';

  const choiceStep = (field: ChoiceField, title: string, options: { value: string; label: string }[], hint?: string) => (
    <fieldset
      className="min-w-0"
      onPointerDown={() => {
        pointerChoice.current = true;
      }}
      onKeyDown={() => {
        pointerChoice.current = false;
      }}
    >
      <legend className="w-full">
        <h2 ref={headingRef} tabIndex={-1} aria-describedby="quote-progress" className={headingClass}>
          {title}
        </h2>
      </legend>
      {hint && <p className="mt-2 text-muted">{hint}</p>}
      <div className={cn('mt-6 grid gap-3', options.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2')}>
        {options.map((option) => {
          const checked = formData[field] === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                'relative flex min-h-[3.5rem] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-lg font-semibold transition-colors',
                'has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-400',
                checked
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-navy-900/25 bg-white text-navy-900 hover:border-navy-900 hover:bg-paper',
                errors[field] && !checked && 'border-red-600'
              )}
            >
              <input
                type="radio"
                name={field}
                value={option.value}
                checked={checked}
                onChange={() => handleInputChange(field, option.value)}
                onClick={() => handleChoiceClick(field, option.value)}
                aria-describedby={errors[field] ? errorId(field) : undefined}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  'grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
                  checked ? 'border-gold-400' : 'border-navy-900/50'
                )}
              >
                {checked && <span className="h-2.5 w-2.5 rounded-full bg-gold-400" />}
              </span>
              {option.label}
            </label>
          );
        })}
      </div>
      <FieldError field={field} message={errors[field]} />
    </fieldset>
  );

  return (
    <Container
      className={cn(
        'grid gap-x-16 pb-20 sm:gap-y-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,35rem)] lg:grid-rows-[auto_1fr] lg:pb-24 lg:pt-20 xl:gap-x-24',
        // On phones the title steps back once the questions start, so the question sits higher.
        currentStep > 0 ? 'gap-y-6 pt-7' : 'gap-y-10 pt-10'
      )}
    >
      {/* The promise: stays put while the questions change on the right */}
      <div className="lg:col-start-1 lg:row-start-1">
        <h1
          className={cn(
            'font-wide font-extrabold leading-[1.02] sm:text-5xl lg:text-[3.4rem]',
            currentStep > 0 ? 'text-[1.75rem]' : 'text-[2.25rem]'
          )}
        >
          Get a free quote
        </h1>
        <p
          className={cn(
            'mt-5 max-w-prose text-lg text-navy-200 sm:text-xl',
            currentStep > 0 && 'hidden lg:block'
          )}
        >
          Find out what you could save. Processing fees start from 0% for qualifying merchants, with competitive rates
          tailored to your volume and industry.
        </p>
      </div>

      {/* The wizard */}
      <div className="rounded-2xl bg-white p-6 text-ink sm:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
        {isQuestion && (
          <div className="mb-7">
            <p id="quote-progress" className="text-sm font-semibold text-muted">
              Step {currentStep} of {QUESTION_COUNT}
            </p>
            <div aria-hidden="true" className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper">
              <div
                className="h-full rounded-full bg-navy-700 transition-[width] duration-300"
                style={{ width: `${(currentStep / QUESTION_COUNT) * 100}%` }}
              />
            </div>
          </div>
        )}

        {currentStep === 0 && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className={headingClass}>
              Four quick questions
            </h2>
            <p className="mt-2 text-muted">That&apos;s all we need to prepare your quote.</p>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {questions.map((question, i) => (
                <li key={question} className="flex items-center gap-4 py-3.5 text-[1.05rem]">
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper text-sm font-bold text-navy-900"
                  >
                    {i + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => goTo(1)} className={buttonClasses('primary', 'lg', 'mt-8 w-full')}>
              Get started
            </button>
          </div>
        )}

        {isQuestion && (
          <form noValidate onSubmit={handleSubmit}>
            {currentStep === 1 && choiceStep('businessLocation', 'Is your business based in the United States?', locationOptions)}

            {currentStep === 2 &&
              choiceStep(
                'processingVolume',
                'What is your monthly processing volume?',
                volumeOptions,
                'Your total card sales in a typical month.'
              )}

            {currentStep === 3 && (
              <div>
                <h2 ref={headingRef} tabIndex={-1} aria-describedby="quote-progress" className={headingClass}>
                  <label htmlFor={fieldId('businessName')}>What is the name of your business?</label>
                </h2>
                <input
                  id={fieldId('businessName')}
                  name="businessName"
                  type="text"
                  autoComplete="organization"
                  autoCapitalize="words"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  aria-invalid={errors.businessName ? true : undefined}
                  aria-describedby={errors.businessName ? errorId('businessName') : undefined}
                  className={cn(
                    'mt-6 h-14 w-full rounded-xl border bg-white px-4 text-lg text-ink transition-colors focus:border-navy-700',
                    errors.businessName ? 'border-red-600' : 'border-navy-900/50 hover:border-navy-900'
                  )}
                />
                <FieldError field="businessName" message={errors.businessName} />
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 ref={headingRef} tabIndex={-1} aria-describedby="quote-progress" className={headingClass}>
                  How can we reach you?
                </h2>
                <p className="mt-2 text-muted">We&apos;ll send you a detailed proposal within 24 hours.</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <TextField
                    field="firstName"
                    label="First name"
                    type="text"
                    autoComplete="given-name"
                    autoCapitalize="words"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={errors.firstName}
                  />
                  <TextField
                    field="lastName"
                    label="Last name"
                    type="text"
                    autoComplete="family-name"
                    autoCapitalize="words"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={errors.lastName}
                  />
                  <TextField
                    field="phone"
                    label="Phone number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    error={errors.phone}
                    className="sm:col-span-2"
                  />
                  <TextField
                    field="email"
                    label="Email address"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    className="sm:col-span-2"
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center gap-3">
              <button type="button" onClick={() => goTo(currentStep - 1)} className={buttonClasses('outline-dark', 'lg', 'px-5 sm:px-7')}>
                Back
              </button>
              <button
                type="submit"
                aria-disabled={isSubmitting || undefined}
                className={buttonClasses('primary', 'lg', 'flex-1 px-5 aria-disabled:cursor-wait aria-disabled:opacity-60 sm:ml-auto sm:flex-none sm:px-7')}
              >
                {currentStep === QUESTION_COUNT ? (isSubmitting ? 'Sending…' : 'Get my free quote') : 'Continue'}
              </button>
            </div>

            {submitError && (
              <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-[0.95rem] text-red-800">
                We couldn&apos;t send your details. Please try again, or call us at{' '}
                <a href={PHONE_HREF} className="font-semibold underline underline-offset-2">
                  {PHONE_DISPLAY}
                </a>
                .
              </p>
            )}
          </form>
        )}

        {currentStep === SUCCESS_STEP && (
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-400 text-navy-950">
              <CheckIcon className="h-6 w-6" />
            </span>
            <h2 ref={headingRef} tabIndex={-1} className={cn(headingClass, 'mt-6')}>
              Thank you{formData.firstName.trim() ? `, ${formData.firstName.trim()}` : ''}.
            </h2>
            <p className="mt-3 text-lg text-muted">
              We have your details. We&apos;ll send you a detailed proposal within 24 hours, and a payment specialist will call
              you to discuss your savings.
            </p>
            <div className="mt-8 rounded-xl bg-paper p-6">
              <p className="font-semibold text-navy-900">Want to talk sooner?</p>
              <p className="mt-1 text-muted">Book a free 30-minute call at a time that suits you.</p>
              <CalendlyButton text="Schedule a free call" className="mt-4" />
            </div>
            <p role="status" className="mt-6 text-sm text-muted">
              Taking you to your confirmation page…
            </p>
          </div>
        )}
      </div>

      {/* Reassurance: below the form on phones, under the promise on desktop */}
      {currentStep !== SUCCESS_STEP && (
        <div className="lg:col-start-1 lg:row-start-2">
          <ul className="space-y-3 text-navy-200">
            {['Free, no-obligation quote', 'A detailed proposal within 24 hours', 'A payment specialist calls to discuss your savings'].map(
              (item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 text-gold-400" />
                  {item}
                </li>
              )
            )}
          </ul>
          <div className="mt-10 max-w-md border-t border-white/10 pt-8">
            <p className="font-semibold text-white">Prefer to talk it through first?</p>
            <p className="mt-1 text-navy-200">Book a free 30-minute call with a payment processing expert.</p>
            <CalendlyButton text="Schedule a free call" variant="outline-light" className="mt-5" />
            <p className="mt-4 text-sm text-navy-300">Calls available Monday to Sunday, 9 AM to 9 PM EST.</p>
          </div>
        </div>
      )}
    </Container>
  );
}
