'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  Briefcase,
  CalendarCheck,
  ClipboardCheck,
  Headset,
  Phone,
  Plug,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import CustomerStories from '@/components/sections/CustomerStories';
import { ButtonLink, CheckIcon } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import { IconTile } from '@/components/ui/Visuals';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';
import { cn } from '@/lib/utils';

const benefits: { title: string; description: ReactNode; icon: LucideIcon }[] = [
  {
    title: 'Dedicated account manager',
    description: 'Your personal point of contact, who knows your business inside and out.',
    icon: UserRound,
  },
  {
    title: 'Priority support',
    description: 'Skip the queue with priority access to our technical support team.',
    icon: Headset,
  },
  {
    title: 'Proactive monitoring',
    description: 'We monitor your account 24/7 and proactively address any issues.',
    icon: Activity,
  },
  {
    title: 'Direct phone line',
    description: (
      <>
        Reach your account manager directly at{' '}
        <a href={PHONE_HREF} className="font-semibold text-navy-700 underline underline-offset-4 hover:text-navy-900">
          {PHONE_DISPLAY}
        </a>
        .
      </>
    ),
    icon: Phone,
  },
  {
    title: 'Business consulting',
    description: 'Strategic advice to help you grow and run your business more efficiently.',
    icon: Briefcase,
  },
  {
    title: 'Regular check-ins',
    description: 'Scheduled reviews to make sure your processing still meets your needs.',
    icon: CalendarCheck,
  },
];

// `short` labels fit a 2x2 grid of tabs on phones.
const services: {
  id: string;
  short: string;
  name: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: { name: string; description: string }[];
}[] = [
  {
    id: 'optimization',
    short: 'Rates',
    name: 'Rate optimization',
    title: 'Rate optimization services',
    description: 'Continuous monitoring and optimization of your processing rates.',
    icon: BadgeDollarSign,
    features: [
      { name: 'Quarterly rate reviews', description: 'We review your rates every quarter so you get the best deal.' },
      { name: 'Volume-based adjustments', description: 'Lower rates as your processing volume grows.' },
      { name: 'Industry benchmarking', description: 'Compare your rates against industry standards and competitors.' },
      { name: 'Custom pricing models', description: 'Pricing structures tailored to your business model.' },
    ],
  },
  {
    id: 'reporting',
    short: 'Reporting',
    name: 'Advanced reporting',
    title: 'Advanced reporting & analytics',
    description: 'Detailed analytics and insights into your payment processing.',
    icon: BarChart3,
    features: [
      { name: 'Real-time dashboard', description: 'A live view of your transactions and key metrics.' },
      { name: 'Custom report builder', description: 'Reports built around the data that matters to you.' },
      { name: 'Automated insights', description: 'AI-powered analysis of your payment patterns and trends.' },
      { name: 'Multi-location reporting', description: 'Consolidated reporting across all your business locations.' },
    ],
  },
  {
    id: 'integration',
    short: 'Integration',
    name: 'System integration',
    title: 'System integration services',
    description: 'Integration with the business systems you already use.',
    icon: Plug,
    features: [
      { name: 'POS integration', description: 'Connects to your existing point-of-sale system without disrupting operations.' },
      { name: 'E-commerce platforms', description: 'Integration with popular online shopping platforms.' },
      { name: 'Accounting software', description: 'Direct integration with QuickBooks, Xero and other accounting tools.' },
      { name: 'API development', description: 'Custom API solutions for unique business requirements.' },
    ],
  },
  {
    id: 'compliance',
    short: 'Compliance',
    name: 'Compliance management',
    title: 'Compliance management',
    description: 'Helping your business stay compliant with industry standards.',
    icon: ClipboardCheck,
    features: [
      { name: 'PCI DSS compliance', description: 'Ongoing PCI monitoring to help you avoid costly penalties and breaches.' },
      { name: 'Security audits', description: 'Regular security assessments and vulnerability testing.' },
      { name: 'Regulatory updates', description: 'Stay informed about changing regulations and requirements.' },
      { name: 'Documentation support', description: 'Help with compliance documentation and reporting.' },
    ],
  },
];

export default function AccountManagement() {
  const [activeService, setActiveService] = useState(services[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = services.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % services.length
        : event.key === 'ArrowLeft'
          ? (index - 1 + services.length) % services.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActiveService(services[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <FloatingLeadCapture pageName="account-management" />

      <PageHero
        title="Account management"
        lead="A dedicated account manager who helps you optimize your payment processing and grow your business."
        actions={
          <>
            <CalendlyButton text="Schedule an account review" size="lg" />
            <ButtonLink href="/contact" variant="outline-light" size="lg">
              Contact an account manager
            </ButtonLink>
            <p className="mt-2 basis-full text-sm text-navy-300">
              Prefer the phone? Call{' '}
              <a href={PHONE_HREF} className="font-semibold text-gold-400 hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </p>
          </>
        }
        aside={
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/10 lg:aspect-[5/4]">
            <Image
              src="/gateway.JPG"
              alt="Illustration of payment reports, a laptop and card terminals on a desk"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        }
      />

      {/* What every merchant gets: a scannable list, one icon per benefit */}
      <Section tone="white" aria-labelledby="benefits-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <SectionHeading id="benefits-title" title="What you get" />
          <ul className="grid gap-x-10 border-b border-line sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-4 border-t border-line py-6">
                <IconTile icon={benefit.icon} size="sm" />
                <div>
                  <h3 className="text-lg font-bold text-navy-900">{benefit.title}</h3>
                  <p className="mt-1 text-muted">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Real customers instead of unsourced satisfaction stats */}
      <Section tone="navy" aria-labelledby="stories-title">
        <SectionHeading
          id="stories-title"
          tone="dark"
          title="Businesses we work with"
          intro="Two of the businesses we set up, in their own words."
        />
        <CustomerStories className="mt-14" />
      </Section>

      {/* Services by area, in tabs */}
      <Section tone="paper" aria-labelledby="services-title">
        <SectionHeading
          id="services-title"
          title="Our services"
          intro="Services to optimize every part of your payment processing."
        />

        <div role="tablist" aria-label="Account services" className="mt-10 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {services.map((service, i) => {
            const selected = service.id === activeService;
            return (
              <button
                key={service.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`service-tab-${service.id}`}
                aria-selected={selected}
                aria-controls={`service-panel-${service.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveService(service.id)}
                onKeyDown={(event) => onTabKeyDown(event, i)}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-sm font-semibold transition-colors duration-150 sm:px-4 sm:py-2 sm:text-[0.95rem]',
                  selected
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : 'border-line bg-white text-navy-900 hover:border-navy-900'
                )}
              >
                <service.icon
                  aria-hidden="true"
                  className={cn('h-4 w-4 shrink-0', selected ? 'text-gold-400' : 'text-navy-700')}
                  strokeWidth={2}
                />
                <span className="sm:hidden">{service.short}</span>
                <span className="hidden sm:inline">{service.name}</span>
              </button>
            );
          })}
        </div>

        {services.map((service) => (
          <div
            key={service.id}
            role="tabpanel"
            id={`service-panel-${service.id}`}
            aria-labelledby={`service-tab-${service.id}`}
            hidden={service.id !== activeService}
            tabIndex={0}
            className="mt-8 overflow-hidden rounded-2xl border border-line bg-white"
          >
            {/* The grid lives on an inner element so it can't override the panel's `hidden` attribute */}
            <div className="grid lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
              <div className="border-b border-line p-7 sm:p-9 lg:border-b-0 lg:border-r">
                <IconTile icon={service.icon} size="lg" />
                <h3 className="mt-6 font-wide text-2xl font-bold text-navy-900">{service.title}</h3>
                <p className="mt-2 max-w-prose text-muted">{service.description}</p>
              </div>
              <ul className="grid gap-x-10 gap-y-7 p-7 sm:grid-cols-2 sm:p-9">
                {service.features.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 text-navy-700" />
                    <div>
                      <h4 className="font-bold text-navy-900">{feature.name}</h4>
                      <p className="mt-1 text-[0.95rem] text-muted">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
