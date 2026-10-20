import Link from 'next/link';
import { CalendlyButton, CalendlyEmbed } from '@/components/CalendlyWidget';
import { ArrowIcon, ButtonLink } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';

// Only the stats the claims register allows outside the home and company pages.
const stats = [
  { value: '$100K+', label: 'Monthly processing' },
  { value: '99.9%', label: 'System uptime' },
];

const services = [
  {
    title: 'Credit card processing',
    description: 'Accept all major credit cards with a secure, fast processing system.',
    href: '/credit-card-processing',
  },
  {
    title: 'Point of sale systems',
    description: 'Modern POS solutions for retail, restaurants and service businesses.',
    href: '/portfolio',
  },
  {
    title: 'Secure transactions',
    description: 'Bank-level security with PCI DSS compliance and fraud protection.',
    href: '/credit-card-processing',
  },
  {
    title: 'E-commerce integration',
    description: 'Online payment processing for your website or app.',
    href: '/products',
  },
  {
    title: '24/7 support',
    description: 'Round-the-clock customer support from payment processing experts.',
    href: '/support',
  },
  {
    title: 'Account management',
    description: 'A dedicated account manager who helps you optimize your payment processing.',
    href: '/support/account',
  },
];

export default function Dashboard() {
  return (
    <>
      <PageHero
        title="Welcome to Zummit Payments"
        lead="Merchant and payment processing services that help you start saving, from zero processing fees for qualifying merchants to competitive rates tailored to your volume and industry."
        actions={
          <>
            <CalendlyButton text="Schedule a free call" size="lg" />
            <ButtonLink href="/get-quote" variant="outline-light" size="lg">
              Get a free quote
            </ButtonLink>
          </>
        }
      >
        <dl className="mt-14 grid max-w-xl grid-cols-2 border-t border-white/10">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`flex flex-col-reverse gap-1 pt-7 ${i > 0 ? 'border-l border-white/10 pl-6 sm:pl-8' : ''}`}>
              <dt className="text-sm text-navy-300">{stat.label}</dt>
              <dd className="font-wide text-3xl font-extrabold sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* What we offer: an index of the service pages */}
      <Section tone="white" aria-labelledby="services-title">
        <SectionHeading
          id="services-title"
          title="Everything you need to process payments"
          intro="The tools and services your business needs to take payments, from one team."
        >
          <Link
            href="/portfolio"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
          >
            View equipment
            <ArrowIcon />
          </Link>
        </SectionHeading>

        <ul className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
          {services.map((service) => (
            <li key={service.title} className="border-b border-line">
              <Link
                href={service.href}
                className="group flex h-full items-start justify-between gap-6 py-6 transition-colors hover:bg-paper sm:px-4"
              >
                <span>
                  <span className="block text-xl font-bold text-navy-900">{service.title}</span>
                  <span className="mt-1 block text-muted">{service.description}</span>
                </span>
                <ArrowIcon className="mt-2 h-5 w-5 text-navy-700 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* The next step: book the call */}
      <Section tone="paper" aria-labelledby="consultation-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeading
            id="consultation-title"
            title="See exactly how much you can save"
            intro="Get a personalized savings analysis for your business. Book a free call, or send us your details for a free quote."
          >
            <Link
              href="/get-quote"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
            >
              Get a free quote
              <ArrowIcon />
            </Link>
          </SectionHeading>
          <CalendlyEmbed />
        </div>
      </Section>
    </>
  );
}
