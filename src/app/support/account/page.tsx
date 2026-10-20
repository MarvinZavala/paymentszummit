'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import CustomerStories from '@/components/sections/CustomerStories';
import { ButtonLink, CheckIcon } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';
import { cn } from '@/lib/utils';

const benefits: { title: string; description: ReactNode }[] = [
  {
    title: 'Dedicated account manager',
    description: 'Your personal point of contact, who knows your business inside and out.',
  },
  {
    title: 'Priority support',
    description: 'Skip the queue with priority access to our technical support team.',
  },
  {
    title: 'Proactive monitoring',
    description: 'We monitor your account 24/7 and proactively address any issues.',
  },
  {
    title: 'Direct phone line',
    description: (
      <>
        Direct access to your account manager by phone:{' '}
        <a href={PHONE_HREF} className="font-semibold text-navy-700 underline underline-offset-4 hover:text-navy-900">
          {PHONE_DISPLAY}
        </a>
      </>
    ),
  },
  {
    title: 'Business consulting',
    description: 'Strategic advice to help you grow your business and run it more efficiently.',
  },
  {
    title: 'Regular check-ins',
    description: 'Scheduled reviews to make sure your payment processing still meets your needs.',
  },
];

// `short` labels fit a 2x2 grid of tabs on phones.
const services = [
  {
    id: 'optimization',
    short: 'Rates',
    name: 'Rate optimization',
    title: 'Rate optimization services',
    description: 'Continuous monitoring and optimization of your processing rates.',
    features: [
      {
        name: 'Quarterly rate reviews',
        description: 'Regular analysis of your processing rates to make sure you’re getting the best deal.',
        benefit: 'Competitive rates, reviewed every quarter',
      },
      {
        name: 'Volume-based adjustments',
        description: 'Automatic rate adjustments as your processing volume grows.',
        benefit: 'Lower rates as you grow',
      },
      {
        name: 'Industry benchmarking',
        description: 'Compare your rates against industry standards and competitors.',
        benefit: 'Stay competitive in your market',
      },
      {
        name: 'Custom pricing models',
        description: 'Pricing structures tailored to your business model.',
        benefit: 'Pricing that fits your business',
      },
    ],
  },
  {
    id: 'reporting',
    short: 'Reporting',
    name: 'Advanced reporting',
    title: 'Advanced reporting & analytics',
    description: 'Detailed analytics and insights into your payment processing.',
    features: [
      {
        name: 'Real-time dashboard',
        description: 'A live view of all your transactions and key metrics.',
        benefit: 'Make informed decisions quickly',
      },
      {
        name: 'Custom report builder',
        description: 'Create reports for your specific needs.',
        benefit: 'Get the data that matters to you',
      },
      {
        name: 'Automated insights',
        description: 'AI-powered analysis of your payment patterns and trends.',
        benefit: 'Discover opportunities for growth',
      },
      {
        name: 'Multi-location reporting',
        description: 'Consolidated reporting across all your business locations.',
        benefit: 'Manage multiple locations efficiently',
      },
    ],
  },
  {
    id: 'integration',
    short: 'Integration',
    name: 'System integration',
    title: 'System integration services',
    description: 'Integration with the business systems you already use.',
    features: [
      {
        name: 'POS integration',
        description: 'A direct connection with your existing point-of-sale systems.',
        benefit: 'No disruption to your operations',
      },
      {
        name: 'E-commerce platforms',
        description: 'Integration with popular online shopping platforms.',
        benefit: 'Unified payment processing',
      },
      {
        name: 'Accounting software',
        description: 'Direct integration with QuickBooks, Xero and other accounting tools.',
        benefit: 'Streamlined financial management',
      },
      {
        name: 'API development',
        description: 'Custom API solutions for unique business requirements.',
        benefit: 'Tailored to your specific needs',
      },
    ],
  },
  {
    id: 'compliance',
    short: 'Compliance',
    name: 'Compliance management',
    title: 'Compliance management',
    description: 'Helping your business stay compliant with industry standards.',
    features: [
      {
        name: 'PCI DSS compliance',
        description: 'Ongoing monitoring and maintenance of PCI compliance standards.',
        benefit: 'Avoid costly penalties and breaches',
      },
      {
        name: 'Security audits',
        description: 'Regular security assessments and vulnerability testing.',
        benefit: 'Stay ahead of security threats',
      },
      {
        name: 'Regulatory updates',
        description: 'Stay informed about changing regulations and requirements.',
        benefit: 'Keep up with current standards',
      },
      {
        name: 'Documentation support',
        description: 'Help with compliance documentation and reporting.',
        benefit: 'Simpler compliance management',
      },
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
        lead="Dedicated account management to help you optimize your payment processing and grow your business."
        actions={
          <>
            <CalendlyButton text="Schedule an account review" size="lg" />
            <ButtonLink href="/contact" variant="outline-light" size="lg">
              Contact an account manager
            </ButtonLink>
          </>
        }
      >
        <p className="mt-5 text-sm text-navy-300">
          Prefer the phone? Call{' '}
          <a href={PHONE_HREF} className="font-semibold text-gold-400 hover:text-white">
            {PHONE_DISPLAY}
          </a>
        </p>
      </PageHero>

      {/* What every merchant gets: a plain list, grouped two by two */}
      <Section tone="white" aria-labelledby="benefits-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeading
            id="benefits-title"
            title="What you get"
            intro="Account management services designed to help your business succeed."
          />
          <ul className="grid gap-x-10 border-b border-line sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="border-t border-line py-6">
                <h3 className="text-lg font-bold text-navy-900">{benefit.title}</h3>
                <p className="mt-1 text-muted">{benefit.description}</p>
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
                  'rounded-full border px-3 py-2.5 text-sm font-semibold transition-colors duration-150 sm:px-4 sm:py-2 sm:text-[0.95rem]',
                  selected
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : 'border-line bg-white text-navy-900 hover:border-navy-900'
                )}
              >
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
            <div className="border-b border-line p-7 sm:p-9">
              <h3 className="font-wide text-2xl font-bold text-navy-900">{service.title}</h3>
              <p className="mt-2 max-w-prose text-muted">{service.description}</p>
            </div>
            <ul className="grid gap-px bg-line sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature.name} className="bg-white p-7 sm:p-9">
                  <h4 className="text-lg font-bold text-navy-900">{feature.name}</h4>
                  <p className="mt-1 max-w-prose text-muted">{feature.description}</p>
                  <p className="mt-4 flex items-start gap-2.5 font-semibold text-navy-900">
                    <CheckIcon className="mt-0.5 h-4 w-4 text-navy-700" />
                    {feature.benefit}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </>
  );
}
