import Link from 'next/link';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import { ArrowIcon, ButtonLink, CheckIcon } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import OnboardingTimeline from '@/components/sections/OnboardingTimeline';

const cards = ['Visa', 'Mastercard', 'American Express', 'Discover', 'JCB', 'Diners Club'];
const wallets = ['Apple Pay', 'Google Pay', 'Samsung Pay'];

// How the rates work. This used to be the "Competitive Rates" tab; it belongs with the pricing.
const pricing = [
  {
    name: 'Interchange plus pricing',
    description: 'Transparent pricing built on wholesale interchange rates.',
  },
  {
    name: 'Volume discounts',
    description: 'Your rates go down as your processing volume goes up, so your costs shrink as you grow.',
  },
  {
    name: 'No hidden fees',
    description: 'No surprise charges, so your monthly processing costs are predictable.',
  },
  {
    name: 'Rate optimization',
    description: 'We review your rates regularly so you keep getting the best rates.',
  },
];

const included = [
  'Free terminal and equipment',
  'Next-day funding',
  '24/7 customer support',
  'Real-time reporting',
  'PCI compliance assistance',
  'Mobile processing',
  'Fraud protection',
  'Chargeback protection',
];

// The three remaining feature tabs, shown all at once so the page can be scanned (and read by search engines).
const featureGroups = [
  {
    title: 'Security',
    lead: 'Bank-level security with end-to-end encryption.',
    items: [
      {
        name: 'PCI DSS compliance',
        description: 'Fully compliant with the Payment Card Industry Data Security Standard, to help protect you from data breaches.',
      },
      {
        name: 'End-to-end encryption',
        description: 'Every transaction is encrypted from card swipe to settlement, so sensitive data stays secure.',
      },
      {
        name: 'Tokenization',
        description: 'Card data is replaced with secure tokens, which reduces your PCI compliance scope.',
      },
      {
        name: 'Fraud detection',
        description: 'AI-powered fraud prevention and risk management to keep chargebacks and losses down.',
      },
    ],
  },
  {
    title: 'Fast processing',
    lead: 'Quick approvals at checkout and quick access to your money.',
    items: [
      {
        name: 'Real-time authorization',
        description: 'Transactions are approved in under 2 seconds, for a faster checkout.',
      },
      {
        name: 'Next-day funding',
        description: 'Your funds arrive the next business day, which makes cash flow easier to manage.',
      },
      {
        name: 'Same-day settlement',
        description: 'Available for qualifying merchants who need their funds sooner.',
      },
      {
        name: 'Batch processing',
        description: 'Handles high-volume transactions efficiently, so busy periods run smoothly.',
      },
    ],
  },
  {
    title: '24/7 support',
    lead: 'Round-the-clock help from payment processing experts.',
    items: [
      {
        name: 'Dedicated account manager',
        description: 'A personal point of contact who knows your business.',
      },
      {
        name: 'Technical support',
        description: 'Help with any issue, 24/7, to keep downtime and disruptions to a minimum.',
      },
      {
        name: 'Training and onboarding',
        description: 'Training for you and your staff, so you are up and running quickly.',
      },
      {
        name: 'Dispute resolution',
        description: 'Expert help with chargebacks and disputes, to protect your revenue and reputation.',
      },
    ],
  },
];

const businessTypes = [
  {
    title: 'Retail stores',
    description: 'For brick-and-mortar businesses.',
    features: ['In-person payments', 'POS integration', 'Inventory management'],
  },
  {
    title: 'Restaurants',
    description: 'Built for food service.',
    features: ['Table-side payments', 'Tip management', 'Kitchen integration'],
  },
  {
    title: 'E-commerce',
    description: 'Online payment processing.',
    features: ['Shopping cart integration', 'Recurring billing', 'Mobile optimization'],
  },
  {
    title: 'Service businesses',
    description: 'Flexible ways to get paid for your services.',
    features: ['Mobile payments', 'Invoicing', 'Appointment booking'],
  },
];

function AcceptedList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <p className="shrink-0 text-sm text-navy-300 sm:w-28">{label}</p>
      <ul aria-label={label} className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-white/15 px-3 py-1.5 text-[0.95rem] font-medium text-white"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CreditCardProcessing() {
  return (
    <>
      <FloatingLeadCapture pageName="credit-card-processing" />

      <PageHero
        title="Credit card processing for small business"
        lead="Accept all major credit cards with secure, fast and reliable processing, and keep more of every sale. Fees start at 0% for qualifying merchants."
        actions={
          <>
            <CalendlyButton text="Schedule a free call" size="lg" />
            <ButtonLink href="/get-quote" variant="outline-light" size="lg">
              Get a free quote
            </ButtonLink>
            <p className="mt-2 basis-full text-sm text-navy-300">Free 30-minute consultation. No commitment required.</p>
          </>
        }
      >
        <div className="mt-14 space-y-4 border-t border-white/10 pt-8 sm:mt-16">
          <AcceptedList label="Credit cards" items={cards} />
          <AcceptedList label="Digital wallets" items={wallets} />
        </div>
      </PageHero>

      {/* The bold moment of the page: what it costs */}
      <Section tone="white" aria-labelledby="pricing-title">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHeading
              id="pricing-title"
              title="Transparent pricing"
              intro="No hidden fees and no surprises. Just honest, competitive rates."
            />
            <p className="mt-10">
              <span className="relative inline-block font-extra-wide text-[8.5rem] font-extrabold leading-[0.9] text-navy-900 sm:text-[12.5rem]">
                <span aria-hidden="true" className="absolute inset-x-0 bottom-[0.06em] h-[0.3em] rounded-[3px] bg-gold-400" />
                <span className="relative">0%</span>
              </span>
              <span className="mt-6 block text-xl font-bold text-navy-900">
                Starting rate for qualifying merchants with high volume
              </span>
              <span className="mt-2 block max-w-prose text-lg text-muted">
                If you don&apos;t qualify for 0%, you still get competitive rates tailored to your business volume and industry.
              </span>
            </p>
          </div>

          <dl className="divide-y divide-line self-end border-y border-line">
            {pricing.map((item) => (
              <div key={item.name} className="py-6">
                <dt className="text-lg font-bold text-navy-900">{item.name}</dt>
                <dd className="mt-1 text-muted">{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 rounded-2xl border border-line bg-paper p-7 sm:p-10">
          <h3 className="font-wide text-2xl font-extrabold text-navy-900">What&apos;s included</h3>
          <p className="mt-2 text-muted">No setup fees. No long-term contracts for most merchants.</p>
          <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckIcon className="mt-0.5 text-navy-700" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/portfolio"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
          >
            See the equipment
            <ArrowIcon />
          </Link>
        </div>
      </Section>

      {/* Former tabs, laid out as a spec sheet: one row per topic */}
      <Section tone="paper" aria-labelledby="features-title">
        <SectionHeading
          id="features-title"
          title="Why business owners choose our processing"
          intro="Security, speed and support that help your business run smoothly."
        />
        <div className="mt-14 divide-y divide-line border-y border-line">
          {featureGroups.map((group) => (
            <div
              key={group.title}
              className="grid gap-6 py-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)] lg:gap-16"
            >
              <div>
                <h3 className="font-wide text-2xl font-extrabold text-navy-900">{group.title}</h3>
                <p className="mt-2 text-muted">{group.lead}</p>
              </div>
              <dl className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <dt className="font-bold text-navy-900">{item.name}</dt>
                    <dd className="mt-1 text-[0.95rem] text-muted">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      {/* Who it's for, kept short: the home page covers this in more depth */}
      <Section tone="white" aria-labelledby="business-title">
        <SectionHeading
          id="business-title"
          title="Right for every kind of business"
          intro="Solutions tailored to your business type and industry."
        />
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {businessTypes.map((business) => (
            <li key={business.title} className="grid gap-3 py-6 md:grid-cols-[16rem_minmax(0,1fr)] md:items-baseline md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-navy-900">{business.title}</h3>
                <p className="text-[0.95rem] text-muted">{business.description}</p>
              </div>
              <ul className="flex flex-wrap gap-x-7 gap-y-2">
                {business.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-[0.95rem]">
                    <CheckIcon className="mt-0.5 h-4 w-4 text-navy-700" />
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      {/* Replaces the old "24hrs setup" and "approved in minutes" claims with the real sequence */}
      <Section tone="paper" aria-labelledby="onboarding-title">
        <SectionHeading
          id="onboarding-title"
          title="Start taking payments in 5 days"
          intro="Here is what happens between saying yes and taking your first card payment."
        />
        <OnboardingTimeline className="mt-14" />
      </Section>
    </>
  );
}
