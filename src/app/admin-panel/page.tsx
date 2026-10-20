import Link from 'next/link';
import { CreditCard, Headset, MonitorSmartphone, ShieldCheck, ShoppingCart, UserRound, type LucideIcon } from 'lucide-react';
import CalendlyWidget, { CalendlyButton } from '@/components/CalendlyWidget';
import { ArrowIcon, ButtonLink, CheckIcon } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import { IconTile, PaymentCards } from '@/components/ui/Visuals';
import OnboardingTimeline from '@/components/sections/OnboardingTimeline';
import CustomerStories from '@/components/sections/CustomerStories';

// Only the stats the claims register allows outside the home and company pages.
const stats = [
  { value: '$100K+', label: 'Monthly processing' },
  { value: '99.9%', label: 'System uptime' },
];

const services: { title: string; description: string; href: string; icon: LucideIcon }[] = [
  {
    title: 'Credit card processing',
    description: 'Accept all major credit cards with a secure, fast processing system.',
    href: '/credit-card-processing',
    icon: CreditCard,
  },
  {
    title: 'Point of sale systems',
    description: 'Modern POS solutions for retail, restaurants and service businesses.',
    href: '/portfolio',
    icon: MonitorSmartphone,
  },
  {
    title: 'Secure transactions',
    description: 'Bank-level security with PCI DSS compliance and fraud protection.',
    href: '/credit-card-processing',
    icon: ShieldCheck,
  },
  {
    title: 'E-commerce integration',
    description: 'Online payment processing for your website or app.',
    href: '/products',
    icon: ShoppingCart,
  },
  {
    title: '24/7 support',
    description: 'Round-the-clock support from payment processing experts.',
    href: '/support',
    icon: Headset,
  },
  {
    title: 'Account management',
    description: 'A dedicated account manager who helps you optimize your processing.',
    href: '/support/account',
    icon: UserRound,
  },
];

export default function Dashboard() {
  return (
    <>
      <PageHero
        title="Welcome to Zummit Payments"
        lead="Save on card processing, from zero fees for qualifying merchants to low rates tailored to your volume and industry."
        actions={
          <>
            <CalendlyButton text="Schedule a free call" size="lg" />
            <ButtonLink href="/get-quote" variant="outline-light" size="lg">
              Get a free quote
            </ButtonLink>
          </>
        }
        aside={<PaymentCards className="lg:mb-6" />}
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
          title="Everything you need to take payments"
          intro="Processing, equipment and support from one team."
        />

        <ul className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
          {services.map((service) => (
            <li key={service.title} className="border-b border-line">
              <Link
                href={service.href}
                className="group flex h-full items-start gap-5 py-6 transition-colors hover:bg-paper sm:px-4"
              >
                <IconTile icon={service.icon} />
                <span className="flex-1">
                  <span className="block text-xl font-bold text-navy-900">{service.title}</span>
                  <span className="mt-1 block text-muted">{service.description}</span>
                </span>
                <ArrowIcon className="mt-2 h-5 w-5 text-navy-700 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* How switching works */}
      <Section tone="paper" aria-labelledby="switching-title">
        <SectionHeading id="switching-title" title="From first call to taking payments in 5 days" />
        <OnboardingTimeline className="mt-14" />
      </Section>

      {/* Proof from real customers */}
      <Section tone="navy" aria-labelledby="stories-title">
        <SectionHeading id="stories-title" tone="dark" title="Local businesses that made the switch" />
        <CustomerStories className="mt-14" />
        <Link href="/portfolio" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-400 hover:text-white">
          See the equipment they use
          <ArrowIcon />
        </Link>
      </Section>

      {/* The next step: book the call */}
      <Section tone="paper" aria-labelledby="consultation-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading
            id="consultation-title"
            title="See exactly how much you can save"
            intro="Book a free 30-minute call for a personalized savings analysis."
          >
            <ul className="mt-8 space-y-3">
              {['Free consultation and cost analysis', 'Custom pricing proposal', 'No commitment required'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 text-navy-700" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">Calls available Monday to Sunday, 9 AM to 9 PM EST.</p>
            <Link
              href="/get-quote"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
            >
              Get a free quote instead
              <ArrowIcon />
            </Link>
          </SectionHeading>
          <CalendlyWidget height={680} />
        </div>
      </Section>
    </>
  );
}
