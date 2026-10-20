import Image from 'next/image';
import Link from 'next/link';
import {
  BadgeDollarSign,
  Eye,
  Headset,
  RefreshCw,
  ShieldCheck,
  TrendingDown,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import { ArrowIcon, ButtonLink, CheckIcon } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import { IconTile, PaymentCards } from '@/components/ui/Visuals';
import OnboardingTimeline from '@/components/sections/OnboardingTimeline';
import IndustryGrid from '@/components/sections/IndustryGrid';

const cards = ['Visa', 'Mastercard', 'American Express', 'Discover', 'JCB', 'Diners Club'];
const wallets = ['Apple Pay', 'Google Pay', 'Samsung Pay'];

// How the rates work. This used to be the "Competitive Rates" tab; it belongs with the pricing.
const pricing: { name: string; description: string; icon: LucideIcon }[] = [
  {
    name: 'Interchange plus pricing',
    description: 'Transparent pricing built on wholesale interchange rates.',
    icon: BadgeDollarSign,
  },
  {
    name: 'Volume discounts',
    description: 'Your rates go down as your processing volume goes up.',
    icon: TrendingDown,
  },
  {
    name: 'No hidden fees',
    description: 'No surprise charges. Predictable monthly costs.',
    icon: Eye,
  },
  {
    name: 'Rate optimization',
    description: 'Regular reviews so you keep getting the best rates.',
    icon: RefreshCw,
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

// The three remaining feature tabs, shown side by side so the page can be scanned (and read by search engines).
const featureGroups: { title: string; lead: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: 'Security',
    lead: 'Bank-level security with end-to-end encryption.',
    icon: ShieldCheck,
    items: [
      'PCI DSS compliance',
      'Encryption from card swipe to settlement',
      'Tokenization of card data',
      'Fraud detection and risk management',
    ],
  },
  {
    title: 'Fast processing',
    lead: 'Quick approvals and quick access to your money.',
    icon: Zap,
    items: [
      'Authorization in under 2 seconds',
      'Next-day funding',
      'Same-day settlement for qualifying merchants',
      'Batch processing for busy periods',
    ],
  },
  {
    title: '24/7 support',
    lead: 'Round-the-clock help from payment processing experts.',
    icon: Headset,
    items: [
      'A dedicated account manager',
      '24/7 technical support',
      'Training for you and your staff',
      'Help with chargebacks and disputes',
    ],
  },
];

function AcceptedList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm text-navy-300">{label}</p>
      <ul aria-label={label} className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-white/15 px-2.5 py-1 text-sm font-medium text-white">
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
        lead="Accept all major credit cards and keep more of every sale. Fees start at 0% for qualifying merchants."
        actions={
          <>
            <CalendlyButton text="Schedule a free call" size="lg" />
            <ButtonLink href="/get-quote" variant="outline-light" size="lg">
              Get a free quote
            </ButtonLink>
            <p className="mt-2 basis-full text-sm text-navy-300">Free 30-minute consultation. No commitment required.</p>
          </>
        }
        aside={<PaymentCards className="lg:mb-6" />}
      >
        <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:mt-16 lg:grid-flow-col lg:justify-start lg:gap-16">
          <AcceptedList label="Credit cards" items={cards} />
          <AcceptedList label="Digital wallets" items={wallets} />
        </div>
      </PageHero>

      {/* The bold moment of the page: what it costs */}
      <Section tone="white" aria-labelledby="pricing-title">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHeading id="pricing-title" title="Transparent pricing" />
            <p className="mt-10">
              <span className="relative inline-block font-extra-wide text-[8.5rem] font-extrabold leading-[0.9] text-navy-900 sm:text-[12.5rem]">
                <span aria-hidden="true" className="absolute inset-x-0 bottom-[0.06em] h-[0.3em] rounded-[3px] bg-gold-400" />
                <span className="relative">0%</span>
              </span>
              <span className="mt-6 block text-xl font-bold text-navy-900">
                Starting rate for qualifying merchants with high volume
              </span>
              <span className="mt-2 block max-w-prose text-lg text-muted">
                Otherwise, competitive rates tailored to your volume and industry.
              </span>
            </p>
            <Link
              href="/get-quote"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
            >
              Get a free quote
              <ArrowIcon />
            </Link>
          </div>

          <ul className="divide-y divide-line self-end border-y border-line">
            {pricing.map((item) => (
              <li key={item.name} className="flex items-start gap-5 py-6">
                <IconTile icon={item.icon} />
                <div>
                  <h3 className="text-lg font-bold text-navy-900">{item.name}</h3>
                  <p className="mt-1 text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* What a merchant gets, next to the equipment it comes on */}
      <Section tone="paper" aria-labelledby="included-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="included-title"
              title="What’s included"
              intro="No setup fees. No long-term contracts for most merchants."
            />
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="mt-0.5 text-navy-700" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/portfolio"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
            >
              See the equipment
              <ArrowIcon />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-white p-3 sm:p-6">
            <Image
              src="/merchantclover2.PNG"
              alt="Five Clover payment devices, from a card reader and a handheld terminal to countertop stations"
              width={1024}
              height={490}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </Section>

      {/* Former tabs, now three icon-led columns */}
      <Section tone="navy" aria-labelledby="features-title">
        <SectionHeading id="features-title" tone="dark" title="Why business owners choose our processing" />
        <div className="mt-14 grid divide-y divide-white/10 border-t border-white/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {featureGroups.map((group) => (
            <div key={group.title} className="py-10 lg:px-10 lg:pb-0 lg:first:pl-0 lg:last:pr-0">
              <div className="flex items-center gap-5 lg:block">
                <IconTile icon={group.icon} tone="dark" size="lg" />
                <h3 className="font-wide text-2xl font-extrabold lg:mt-6">{group.title}</h3>
              </div>
              {/* two lines tall on desktop so the three checklists start on the same line */}
              <p className="mt-4 text-navy-200 lg:mt-2 lg:min-h-[2lh]">{group.lead}</p>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon className="mt-0.5 text-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" aria-labelledby="industries-title">
        <SectionHeading id="industries-title" title="Right for every kind of business" />
        <IndustryGrid className="mt-12" />
      </Section>

      {/* Replaces the old "24hrs setup" and "approved in minutes" claims with the real sequence */}
      <Section tone="paper" aria-labelledby="onboarding-title">
        <SectionHeading id="onboarding-title" title="Start taking payments in 5 days" />
        <OnboardingTimeline className="mt-14" />
      </Section>
    </>
  );
}
