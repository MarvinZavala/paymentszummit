import { CalendlyButton } from '@/components/CalendlyWidget';
import { Container } from '@/components/ui/Layout';
import { ButtonLink, CheckIcon } from '@/components/ui/Button';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

const nextSteps = [
  'We send you a detailed proposal within 24 hours.',
  'A payment specialist calls you to discuss your savings.',
];

export default function ThankYou() {
  return (
    <Container className="grid gap-x-16 gap-y-10 pb-20 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,35rem)] lg:items-start lg:pb-24 lg:pt-20 xl:gap-x-24">
      <div>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-400 text-navy-950">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h1 className="mt-7 font-wide text-[2.25rem] font-extrabold leading-[1.02] sm:text-5xl lg:text-[3.4rem]">
          Thank you.
        </h1>
        <p className="mt-5 max-w-prose text-lg text-navy-200 sm:text-xl">
          We have your details and will contact you soon with the best savings options for your business. Want to talk
          sooner? Book a free 30-minute call at a time that suits you.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <CalendlyButton text="Schedule a free call" size="lg" />
          <ButtonLink href="/" variant="outline-light" size="lg">
            Back to homepage
          </ButtonLink>
        </div>
        <p className="mt-5 text-sm text-navy-300">Calls available Monday to Sunday, 9 AM to 9 PM EST.</p>
      </div>

      <div className="rounded-2xl bg-white p-6 text-ink sm:p-10">
        <h2 className="font-wide text-2xl font-extrabold text-navy-900 sm:text-[1.9rem]">What happens next</h2>
        <ol className="mt-6 space-y-5">
          {nextSteps.map((step, i) => (
            <li key={step} className="flex items-start gap-4 text-[1.05rem]">
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper text-sm font-bold text-navy-900"
              >
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 border-t border-line pt-8">
          <h2 className="text-lg font-bold text-navy-900">Questions in the meantime?</h2>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm text-muted">Call us</dt>
              <dd>
                <a href={PHONE_HREF} className="text-lg font-semibold text-navy-700 underline-offset-4 hover:underline">
                  {PHONE_DISPLAY}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Email us. We reply within 2 hours.</dt>
              <dd>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-base font-semibold text-navy-700 underline-offset-4 [overflow-wrap:anywhere] hover:underline sm:text-lg"
                >
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Container>
  );
}
