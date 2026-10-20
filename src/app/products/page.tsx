'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import { ArrowIcon, ButtonLink, CheckIcon } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import OnboardingTimeline from '@/components/sections/OnboardingTimeline';
import { cn } from '@/lib/utils';

type Product = {
  /** Also the tab's element id, so /products#pos-systems opens on that product. */
  id: string;
  tab: string;
  title: string;
  summary: string;
  audience: string;
  features: { name: string; description: string }[];
  benefits: string[];
  link?: { href: string; label: string };
};

const products: Product[] = [
  {
    id: 'credit-card',
    tab: 'Credit card processing',
    title: 'Credit card processing',
    summary:
      'Accept all major credit and debit cards at competitive rates tailored to your business volume and industry.',
    audience: 'Any business that takes card payments in person, online or over the phone.',
    features: [
      { name: 'All major cards', description: 'Visa, Mastercard, American Express, Discover and more.' },
      { name: 'Fees from 0%', description: 'Processing fees start at 0% for qualifying merchants.' },
      {
        name: 'Fast funding',
        description: 'Funds arrive the next business day. Same-day funding is available for qualifying merchants.',
      },
      { name: 'Advanced security', description: 'End-to-end encryption and tokenization protect every payment.' },
    ],
    benefits: [
      'Accept payments in person, online and over the phone',
      'Real-time transaction reporting and analytics',
      'Fraud protection and chargeback management',
      'Help with PCI DSS compliance',
      'Works with popular business tools',
    ],
    link: { href: '/credit-card-processing', label: 'More about credit card processing' },
  },
  {
    id: 'pos-systems',
    tab: 'POS systems',
    title: 'Point of sale systems',
    summary: 'Modern point of sale systems that handle payments, inventory, customers and sales reports.',
    audience: 'Retail stores, restaurants and service businesses.',
    features: [
      { name: 'All-in-one terminal', description: 'Process payments, manage inventory and track sales.' },
      { name: 'Inventory management', description: 'Track stock levels, set alerts and manage suppliers.' },
      { name: 'Customer management', description: 'Build customer profiles and loyalty programs.' },
      { name: 'Multiple locations', description: 'Manage every location from a single dashboard.' },
    ],
    benefits: [
      'Cloud-based, so you can reach it from anywhere',
      'Real-time sales reporting and analytics',
      'Employee management and time tracking',
      'Works with accounting software',
      '24/7 support and training',
    ],
    link: { href: '/portfolio', label: 'See the POS equipment' },
  },
  {
    id: 'ecommerce',
    tab: 'E-commerce',
    title: 'E-commerce payments',
    summary: 'Online payment processing for your website or app.',
    audience: 'Businesses that sell online, through a website or an app.',
    features: [
      { name: 'Payment gateway', description: 'A secure API for processing online payments.' },
      { name: 'Shopping cart integration', description: 'Connects easily with popular platforms.' },
      { name: 'Mobile-friendly checkout', description: 'A responsive checkout that works on every device.' },
      { name: 'Subscription billing', description: 'Recurring payments processed automatically.' },
    ],
    benefits: [
      'More than 40 payment methods supported worldwide',
      'Advanced fraud detection and prevention',
      'One-click checkout and saved payment methods',
      'Detailed transaction analytics and reporting',
      'Developer-friendly APIs and documentation',
    ],
  },
  {
    id: 'mobile',
    tab: 'Mobile payments',
    title: 'Mobile payments',
    summary: 'Accept payments anywhere with our mobile card readers and apps.',
    audience: 'Service businesses and anyone who gets paid on the go.',
    features: [
      { name: 'Mobile card reader', description: 'Accepts chip, swipe and contactless payments.' },
      { name: 'Digital wallets', description: 'Apple Pay, Google Pay and Samsung Pay.' },
      { name: 'Invoices and estimates', description: 'Send professional invoices and get paid.' },
      { name: 'Real-time reporting', description: 'Track sales and run your business on the go.' },
    ],
    benefits: [
      'No monthly fees for basic mobile processing',
      'Same-day funding for qualifying merchants',
      'Works with iOS and Android devices',
      'Take payments even when you are offline',
      'Receipts by email or text message',
    ],
    link: { href: '/portfolio', label: 'See the mobile equipment' },
  },
  {
    id: 'gateway',
    tab: 'Payment gateway',
    title: 'Payment gateway',
    summary: 'Secure online payments and invoicing, powered by Centz.',
    audience: 'Businesses that bill customers remotely, by invoice, email or the web.',
    features: [
      { name: 'Online invoicing', description: 'Create and send professional invoices with payment links.' },
      { name: 'Remote payment collection', description: 'Get paid from anywhere, by email or on the web.' },
      { name: 'Secure processing', description: 'Enterprise-grade security with end-to-end encryption.' },
      { name: 'Real-time notifications', description: 'Instant alerts for payments and transaction updates.' },
    ],
    benefits: [
      'Professional invoice templates with your branding',
      'Multi-currency support for global businesses',
      'Automatic payment reminders and follow-ups',
      'Detailed reporting and analytics dashboard',
      'Works with popular accounting software',
    ],
    link: { href: '/portfolio', label: 'See the payment gateway' },
  },
];

const reasons = [
  {
    title: 'Low or high risk',
    description: 'Competitive rates and transparent pricing that help you save on processing fees.',
  },
  {
    title: 'Bank-level security',
    description: 'PCI DSS compliant, with end-to-end encryption and advanced fraud protection.',
  },
  {
    title: '24/7 support',
    description: 'Round-the-clock help from payment processing experts who care about your success.',
  },
];

export default function Products() {
  const [activeId, setActiveId] = useState(products[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = products.find((product) => product.id === activeId) ?? products[0];

  // Open on the product named in the URL hash (for example /products#mobile).
  useEffect(() => {
    const selectFromHash = () => {
      const id = window.location.hash.slice(1);
      if (products.some((product) => product.id === id)) setActiveId(id);
    };
    selectFromHash();
    window.addEventListener('hashchange', selectFromHash);
    return () => window.removeEventListener('hashchange', selectFromHash);
  }, []);

  // Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern, automatic activation).
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targets: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: products.length - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    const next = products[(targets[event.key] + products.length) % products.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <>
      <FloatingLeadCapture pageName="products" />

      <PageHero
        title="Payment solutions built for your business"
        lead="Take payments in your store, online, on the go or by invoice. Processing fees start at 0% for qualifying merchants, with competitive rates tailored to your volume and industry for everyone else."
        actions={
          <>
            <CalendlyButton text="Schedule a free call" size="lg" />
            <ButtonLink href="/get-quote" variant="outline-light" size="lg">
              Get a free quote
            </ButtonLink>
          </>
        }
      >
        {/* Folder tabs sit on the bottom edge of the hero; the selected one opens into the white panel below. */}
        <div className="-mx-5 -mb-16 mt-14 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:-mb-20 sm:mt-16 sm:px-8 [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label="Payment solutions" className="flex w-max gap-1.5">
            {products.map((product, index) => {
              const selected = product.id === activeId;
              return (
                <button
                  key={product.id}
                  ref={(element) => {
                    tabRefs.current[product.id] = element;
                  }}
                  type="button"
                  role="tab"
                  id={product.id}
                  aria-selected={selected}
                  aria-controls="product-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={(event) => {
                    setActiveId(product.id);
                    event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                  }}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    'scroll-mt-28 whitespace-nowrap rounded-t-xl px-4 py-3.5 text-[0.95rem] font-semibold transition-colors focus-visible:[outline-offset:-5px] sm:px-6 sm:py-4 sm:text-base',
                    selected
                      ? 'bg-white text-navy-900'
                      : 'bg-white/[0.07] text-navy-200 hover:bg-white/[0.14] hover:text-white'
                  )}
                >
                  {product.tab}
                </button>
              );
            })}
          </div>
        </div>
      </PageHero>

      {/* The selected product: what it is, who it's for, what you get, and what to do next */}
      <Section tone="white" className="pt-14 sm:pt-20" aria-labelledby="product-title">
        <div
          role="tabpanel"
          id="product-panel"
          aria-labelledby={active.id}
          tabIndex={0}
          className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-24"
        >
          <div>
            <h2 id="product-title" className="font-wide text-3xl font-extrabold text-navy-900 sm:text-[2.6rem]">
              {active.title}
            </h2>
            <p className="mt-4 max-w-prose text-lg text-muted">{active.summary}</p>
            <dl className="mt-8 max-w-prose border-l-2 border-navy-900 pl-5">
              <dt className="text-sm font-semibold text-navy-700">Who it’s for</dt>
              <dd className="mt-1 text-ink">{active.audience}</dd>
            </dl>

            <h3 className="mt-12 text-lg font-bold text-navy-900">Features</h3>
            <dl className="mt-4 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
              {active.features.map((feature) => (
                <div key={feature.name} className="border-b border-line py-5">
                  <dt className="font-bold text-navy-900">{feature.name}</dt>
                  <dd className="mt-1 text-muted">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="self-start rounded-2xl border border-line bg-paper p-7 sm:p-9">
            <h3 className="text-lg font-bold text-navy-900">Key benefits</h3>
            <ul className="mt-5 space-y-3">
              {active.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 text-navy-700" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-line pt-8">
              <h3 className="text-lg font-bold text-navy-900">Next step</h3>
              <p className="mt-2 text-muted">
                Book a free 30-minute call. We’ll review your current setup and show you where you can save on fees.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CalendlyButton text="Schedule a free call" />
                <ButtonLink href="/get-quote" variant="outline-dark">
                  Get a free quote
                </ButtonLink>
              </div>
              {active.link && (
                <Link
                  href={active.link.href}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
                >
                  {active.link.label}
                  <ArrowIcon />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Why Zummit: a short spec list rather than a row of icon cards */}
      <Section tone="paper" aria-labelledby="why-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeading id="why-title" title="Why business owners choose Zummit Payments">
            <Link
              href="/company"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
            >
              About our company
              <ArrowIcon />
            </Link>
          </SectionHeading>
          <dl className="divide-y divide-line border-y border-line">
            {reasons.map((reason) => (
              <div key={reason.title} className="grid gap-2 py-7 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-8">
                <dt className="font-wide text-xl font-bold text-navy-900">{reason.title}</dt>
                <dd className="text-lg text-muted">{reason.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Onboarding: a real sequence */}
      <Section tone="white" aria-labelledby="onboarding-title">
        <SectionHeading
          id="onboarding-title"
          title="From agreement to taking payments in 5 days"
          intro="Underwriting takes about 2 business days, then your equipment ships with 2-day express shipping."
        />
        <OnboardingTimeline className="mt-14" />
      </Section>
    </>
  );
}
