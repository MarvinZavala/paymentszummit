'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  BadgeDollarSign,
  Banknote,
  BarChart3,
  Bell,
  Boxes,
  CreditCard,
  FileText,
  Globe,
  Headset,
  Lock,
  Mail,
  MapPin,
  MonitorSmartphone,
  Nfc,
  Repeat,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import { ArrowIcon, ButtonLink, CheckIcon } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import { IconTile, PaymentCards } from '@/components/ui/Visuals';
import OnboardingTimeline from '@/components/sections/OnboardingTimeline';
import { cn } from '@/lib/utils';

type Photo = { src: string; alt: string; width: number; height: number; fit: 'contain' | 'cover' };

type Product = {
  /** Also the tab's element id, so /products#pos-systems opens on that product. */
  id: string;
  tab: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  audience: string;
  /** Product photo for the panel. Without one, the panel draws the invoicing flow instead. */
  photo?: Photo;
  features: { name: string; description: string; icon: LucideIcon }[];
  benefits: string[];
  link?: { href: string; label: string };
};

const products: Product[] = [
  {
    id: 'credit-card',
    tab: 'Credit card processing',
    icon: CreditCard,
    title: 'Credit card processing',
    summary: 'Accept all major credit and debit cards at rates tailored to your volume and industry.',
    audience: 'Any business that takes card payments in person, online or over the phone.',
    photo: {
      src: '/merchant2.PNG',
      alt: 'Clover Flex handheld card terminal',
      width: 887,
      height: 661,
      fit: 'contain',
    },
    features: [
      { name: 'All major cards', description: 'Visa, Mastercard, American Express, Discover and more.', icon: CreditCard },
      { name: 'Fees from 0%', description: 'For qualifying merchants.', icon: BadgeDollarSign },
      {
        name: 'Fast funding',
        description: 'Next business day. Same-day for qualifying merchants.',
        icon: Banknote,
      },
      { name: 'Advanced security', description: 'End-to-end encryption and tokenization on every payment.', icon: Lock },
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
    icon: MonitorSmartphone,
    title: 'Point of sale systems',
    summary: 'Modern POS systems that handle payments, inventory, customers and sales reports.',
    audience: 'Retail stores, restaurants and service businesses.',
    photo: {
      src: '/posmeerchant.JPG',
      alt: 'Clover POS station with cash drawer, barcode scanner and card terminals',
      width: 1320,
      height: 800,
      fit: 'contain',
    },
    features: [
      { name: 'All-in-one terminal', description: 'Process payments, manage inventory and track sales.', icon: MonitorSmartphone },
      { name: 'Inventory management', description: 'Track stock levels, set alerts and manage suppliers.', icon: Boxes },
      { name: 'Customer management', description: 'Build customer profiles and loyalty programs.', icon: Users },
      { name: 'Multiple locations', description: 'Manage every location from a single dashboard.', icon: MapPin },
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
    icon: ShoppingCart,
    title: 'E-commerce payments',
    summary: 'Online payment processing for your website or app.',
    audience: 'Businesses that sell online, through a website or an app.',
    photo: {
      src: '/gateway.JPG',
      alt: 'Illustration of online payments on a laptop next to card terminals',
      width: 1024,
      height: 1024,
      fit: 'cover',
    },
    features: [
      { name: 'Payment gateway', description: 'A secure API for processing online payments.', icon: Globe },
      { name: 'Shopping cart integration', description: 'Connects easily with popular platforms.', icon: ShoppingCart },
      { name: 'Mobile-friendly checkout', description: 'A responsive checkout that works on every device.', icon: Smartphone },
      { name: 'Subscription billing', description: 'Recurring payments processed automatically.', icon: Repeat },
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
    icon: Smartphone,
    title: 'Mobile payments',
    summary: 'Accept payments anywhere with our mobile card readers and apps.',
    audience: 'Service businesses and anyone who gets paid on the go.',
    photo: {
      src: '/merchantclover2.PNG',
      alt: 'Clover card reader, Clover Flex, Clover Mini and Clover Station devices',
      width: 1024,
      height: 490,
      fit: 'contain',
    },
    features: [
      { name: 'Mobile card reader', description: 'Accepts chip, swipe and contactless payments.', icon: Nfc },
      { name: 'Digital wallets', description: 'Apple Pay, Google Pay and Samsung Pay.', icon: Wallet },
      { name: 'Invoices and estimates', description: 'Send professional invoices and get paid.', icon: FileText },
      { name: 'Real-time reporting', description: 'Track sales and run your business on the go.', icon: BarChart3 },
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
    icon: Globe,
    title: 'Payment gateway',
    summary: 'Secure online payments and invoicing, powered by Centz.',
    audience: 'Businesses that bill customers remotely, by invoice, email or the web.',
    features: [
      { name: 'Online invoicing', description: 'Professional invoices with payment links.', icon: FileText },
      { name: 'Remote payment collection', description: 'Get paid from anywhere, by email or on the web.', icon: Mail },
      { name: 'Secure processing', description: 'Enterprise-grade security with end-to-end encryption.', icon: Lock },
      { name: 'Real-time notifications', description: 'Instant alerts for payments and transaction updates.', icon: Bell },
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

const reasons: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Low or high risk',
    description: 'Competitive, transparent rates that help you save on processing fees.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Bank-level security',
    description: 'PCI DSS compliant, with end-to-end encryption and advanced fraud protection.',
    icon: ShieldCheck,
  },
  {
    title: '24/7 support',
    description: 'Round-the-clock help from payment processing experts.',
    icon: Headset,
  },
];

// The gateway has no product photo, so its panel shows how invoicing works, using only its own features.
const invoiceSteps: { label: string; icon: LucideIcon }[] = [
  { label: 'Create an invoice', icon: FileText },
  { label: 'Send it by email', icon: Mail },
  { label: 'Get paid online', icon: Globe },
];

function InvoiceFlow() {
  return (
    <div
      role="img"
      aria-label="Online invoicing: create an invoice, send it by email, get paid online"
      className="grid h-full place-items-center px-6"
    >
      <ol className="relative grid w-full max-w-md grid-cols-3">
        <span aria-hidden="true" className="absolute left-[16.7%] right-[16.7%] top-8 border-t-2 border-dashed border-line" />
        {invoiceSteps.map((step, i) => {
          const last = i === invoiceSteps.length - 1;
          const Icon = step.icon;
          return (
            <li key={step.label} className="relative flex flex-col items-center text-center">
              <span
                className={cn(
                  'grid h-16 w-16 place-items-center rounded-2xl',
                  last ? 'bg-gold-400 text-navy-950' : 'bg-navy-900 text-gold-400'
                )}
              >
                <Icon className="h-8 w-8" strokeWidth={1.75} />
              </span>
              <span className="mt-3 text-sm font-semibold text-navy-900">{step.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

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
        lead="Take payments in your store, online, on the go or by invoice. Fees from 0% for qualifying merchants, competitive rates for everyone else."
        actions={
          <>
            <CalendlyButton text="Schedule a free call" size="lg" />
            <ButtonLink href="/get-quote" variant="outline-light" size="lg">
              Get a free quote
            </ButtonLink>
          </>
        }
        aside={<PaymentCards className="lg:mr-0 lg:mb-2" />}
      >
        {/* Folder tabs sit on the bottom edge of the hero; the selected one opens into the white panel below. */}
        <div className="-mx-5 -mb-16 mt-14 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:-mb-20 sm:mt-16 sm:px-8 [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label="Payment solutions" className="flex w-max gap-1.5">
            {products.map((product, index) => {
              const selected = product.id === activeId;
              const Icon = product.icon;
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
                    'inline-flex scroll-mt-28 items-center gap-2.5 whitespace-nowrap rounded-t-xl px-4 py-3.5 text-[0.95rem] font-semibold transition-colors focus-visible:[outline-offset:-5px] sm:px-6 sm:py-4 sm:text-base',
                    selected
                      ? 'bg-white text-navy-900'
                      : 'bg-white/[0.07] text-navy-200 hover:bg-white/[0.14] hover:text-white'
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className={cn('h-5 w-5 shrink-0', selected ? 'text-navy-700' : 'text-gold-400')}
                  />
                  {product.tab}
                </button>
              );
            })}
          </div>
        </div>
      </PageHero>

      {/* The selected product. Desktop: words left, picture and benefits right. Phones: the picture comes second. */}
      <Section tone="white" className="pt-14 sm:pt-20" aria-labelledby="product-title">
        <div
          role="tabpanel"
          id="product-panel"
          aria-labelledby={active.id}
          tabIndex={0}
          className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-x-16 lg:gap-y-14 xl:gap-x-24"
        >
          <div className="lg:col-start-1 lg:row-start-1">
            <h2 id="product-title" className="font-wide text-3xl font-extrabold text-navy-900 sm:text-[2.6rem]">
              {active.title}
            </h2>
            <p className="mt-4 max-w-prose text-lg text-muted">{active.summary}</p>
            <dl className="mt-8 max-w-prose border-l-2 border-navy-900 pl-5">
              <dt className="text-sm font-semibold text-navy-700">Who it’s for</dt>
              <dd className="mt-1 text-ink">{active.audience}</dd>
            </dl>
          </div>

          {/* Phones: the box takes the photo's own shape, so wide photos don't float in empty space. */}
          <div
            style={
              active.photo
                ? ({ '--photo-ratio': `${active.photo.width} / ${active.photo.height}` } as CSSProperties)
                : undefined
            }
            className={cn(
              'relative w-full max-h-72 overflow-hidden rounded-2xl border border-line bg-white lg:col-start-2 lg:row-start-1 lg:aspect-auto lg:h-auto lg:max-h-none lg:min-h-[17rem]',
              active.photo ? 'aspect-[var(--photo-ratio)]' : 'h-60 sm:h-72'
            )}
          >
            {active.photo ? (
              <Image
                key={active.photo.src}
                src={active.photo.src}
                alt={active.photo.alt}
                fill
                priority={active.id === products[0].id}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={active.photo.fit === 'cover' ? 'object-cover' : 'object-contain p-4 sm:p-8'}
              />
            ) : (
              <InvoiceFlow />
            )}
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <h3 className="text-lg font-bold text-navy-900">Features</h3>
            <ul className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {active.features.map((feature) => (
                <li key={feature.name} className="flex items-start gap-4">
                  <IconTile icon={feature.icon} size="sm" />
                  <div>
                    <p className="font-bold text-navy-900">{feature.name}</p>
                    <p className="mt-1 text-muted">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-7 sm:p-9 lg:col-start-2 lg:row-start-2">
            <h3 className="text-lg font-bold text-navy-900">Key benefits</h3>
            <ul className="mt-5 space-y-3">
              {active.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 text-navy-700" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-6 border-t border-line pt-10 lg:col-span-2 lg:row-start-3">
            <div className="flex flex-wrap gap-3">
              <CalendlyButton text="Schedule a free call" />
              <ButtonLink href="/get-quote" variant="outline-dark">
                Get a free quote
              </ButtonLink>
            </div>
            {active.link && (
              <Link
                href={active.link.href}
                className="inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
              >
                {active.link.label}
                <ArrowIcon />
              </Link>
            )}
          </div>
        </div>
      </Section>

      {/* Why Zummit: three short rows, each with its icon */}
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
          <ul className="divide-y divide-line border-y border-line">
            {reasons.map((reason) => (
              <li key={reason.title} className="flex items-start gap-5 py-7">
                <IconTile icon={reason.icon} />
                <div>
                  <h3 className="font-wide text-xl font-bold text-navy-900">{reason.title}</h3>
                  <p className="mt-1 text-lg text-muted">{reason.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Onboarding: a real sequence */}
      <Section tone="white" aria-labelledby="onboarding-title">
        <SectionHeading id="onboarding-title" title="From agreement to taking payments in 5 days" />
        <OnboardingTimeline className="mt-14" />
      </Section>
    </>
  );
}
