import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import { ButtonLink, CheckIcon } from '@/components/ui/Button';
import { Container, PageHero, Section, SectionHeading } from '@/components/ui/Layout';

// Same figures and wording as the home page stat row.
const stats = [
  { value: '90%', label: 'Average savings' },
  { value: '$100K+', label: 'Monthly processing' },
  { value: '10,000+', label: 'Happy customers' },
  { value: '99.9%', label: 'System uptime' },
];

const reasons = [
  { title: 'Competitive rates', description: 'No hidden fees, whether your business is low or high risk.' },
  { title: 'Next-day funding', description: 'Fast access to your money.' },
  { title: '24/7 support', description: 'Always here when you need us.' },
];

const values = [
  {
    title: 'Transparency',
    description: 'No hidden fees, no surprises. Clear, upfront pricing helps you make informed decisions.',
  },
  {
    title: 'Innovation',
    description: 'We keep investing in new technology so your business has modern payment solutions.',
  },
  {
    title: 'Security',
    description: 'Bank-level security and PCI DSS compliance keep your transactions protected.',
  },
  {
    title: 'Customer focus',
    description: '24/7 support from payment experts who are committed to your business’s success.',
  },
];

export default function Company() {
  return (
    <>
      <FloatingLeadCapture pageName="company" />

      <PageHero
        title="About Zummit Payments"
        lead="We help business owners save on processing fees, from zero fees for qualifying merchants to low, transparent rates. We pair that with modern technology and 24/7 customer service."
        actions={
          <>
            <CalendlyButton text="Schedule a free call" size="lg" />
            <ButtonLink href="/get-quote" variant="outline-light" size="lg">
              Get a free quote
            </ButtonLink>
          </>
        }
      />

      {/* Same stat row as the home page, so the numbers read the same everywhere */}
      <div className="border-t border-white/10 bg-navy-900 text-white">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col-reverse gap-1 py-7 ${i % 2 === 1 ? 'border-l border-white/10 pl-6' : ''} ${
                  i > 1 ? 'border-t border-white/10 lg:border-t-0' : ''
                } lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0`}
              >
                <dt className="text-sm text-navy-300">{stat.label}</dt>
                <dd className="font-wide text-3xl font-extrabold sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* Mission: editorial text at a readable measure, with the reasons to choose us beside it */}
      <Section tone="white" aria-labelledby="mission-title">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <SectionHeading id="mission-title" title="Our mission" />
            <p className="mt-8 max-w-[36ch] border-l-4 border-gold-400 pl-6 text-2xl font-semibold leading-snug text-navy-900 sm:text-[1.85rem]">
              Every business deserves premium payment processing without the premium price tag.
            </p>
            <div className="mt-8 max-w-prose space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Our mission is to put modern financial technology within reach of businesses of all sizes, and to help
                them thrive in the digital economy.
              </p>
              <p>
                We built our platform around transparency, security and customer success. Our team of payment experts
                works around the clock so your business has the tools it needs to grow.
              </p>
            </div>
          </div>

          <aside aria-labelledby="why-title" className="self-start rounded-2xl border border-line bg-paper p-8 sm:p-10">
            <h3 id="why-title" className="font-wide text-2xl font-bold text-navy-900">
              Why choose us?
            </h3>
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {reasons.map((reason) => (
                <li key={reason.title} className="flex gap-4 py-5">
                  <CheckIcon className="mt-0.5 text-navy-700" />
                  <div>
                    <p className="text-lg font-bold text-navy-900">{reason.title}</p>
                    <p className="mt-0.5 text-muted">{reason.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      {/* Values: a structured list, not four identical icon cards */}
      <Section tone="paper" aria-labelledby="values-title">
        <SectionHeading
          id="values-title"
          title="Our core values"
          intro="These principles guide everything we do and shape how we serve our customers."
        />
        <ul className="mt-14 divide-y divide-line border-y border-line">
          {values.map((value) => (
            <li
              key={value.title}
              className="grid gap-2 py-8 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] md:items-baseline md:gap-10"
            >
              <h3 className="font-wide text-2xl font-bold text-navy-900">{value.title}</h3>
              <p className="max-w-prose text-lg text-muted">{value.description}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
