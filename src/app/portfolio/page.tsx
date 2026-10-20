'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useState } from 'react';
import {
  BadgeDollarSign,
  Globe,
  LayoutGrid,
  MonitorSmartphone,
  Printer,
  ShieldCheck,
  Smartphone,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import { ArrowIcon, ButtonLink, CheckIcon } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import CustomerStories from '@/components/sections/CustomerStories';
import OnboardingTimeline from '@/components/sections/OnboardingTimeline';
import { IconTile } from '@/components/ui/Visuals';
import { CONTACT_EMAIL } from '@/lib/site';
import { cn } from '@/lib/utils';

type CategoryId = 'pos' | 'mobile' | 'gateway' | 'printers';

const categories: { id: 'all' | CategoryId; name: string; icon: LucideIcon }[] = [
  { id: 'all', name: 'All equipment', icon: LayoutGrid },
  { id: 'pos', name: 'POS systems', icon: MonitorSmartphone },
  { id: 'mobile', name: 'Mobile solutions', icon: Smartphone },
  { id: 'gateway', name: 'Payment gateway', icon: Globe },
  { id: 'printers', name: 'Printers and accessories', icon: Printer },
];

type Product = {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  bestFor: string;
  /** The first three are shown; the rest sit behind "Show all features". */
  features: string[];
  popular?: boolean;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /**
     * cutout: product shot on a white or transparent background, shown whole with room around it.
     * framed: photo or graphic with its own background (and sometimes baked-in text), shown whole, never cropped.
     * cover: scene photo with no text, may fill the panel.
     */
    fit: 'cutout' | 'framed' | 'cover';
    /** Less padding for cutouts with a lot of empty space of their own. */
    tight?: boolean;
  };
};

const products: Product[] = [
  {
    id: 'clover-go',
    category: 'mobile',
    name: 'Clover Go',
    description: 'A compact card reader that turns your phone or tablet into a complete POS.',
    bestFor: 'Small businesses, mobile vendors and service providers',
    features: [
      'Works with your smartphone or tablet',
      'Chip and contactless payments',
      'Quick setup',
      'Bluetooth connection',
      'Long battery life',
      'Compact design',
      'Mobile app integration',
    ],
    popular: true,
    image: {
      src: '/merchantclover2.PNG',
      alt: 'Clover Go card reader shown with other Clover devices',
      width: 1024,
      height: 490,
      fit: 'cutout',
      tight: true,
    },
  },
  {
    id: 'clover-flex',
    category: 'mobile',
    name: 'Clover Flex',
    description: 'A handheld POS that takes payments anywhere over WiFi or cellular.',
    bestFor: 'Food trucks, pop-up shops and delivery services',
    features: [
      'WiFi and 4G connectivity',
      'Contactless payments',
      'Prints receipts',
      'Portable handheld design',
      'Payment processing built in',
      'Long-lasting battery',
      'Inventory tracking',
    ],
    popular: true,
    image: {
      src: '/merchant2.PNG',
      alt: 'Clover Flex handheld payment device',
      width: 887,
      height: 661,
      fit: 'cutout',
    },
  },
  {
    id: 'complete-pos',
    category: 'pos',
    name: 'Complete POS setup',
    description: 'Hardware, payment processing and business management tools in one setup.',
    bestFor: 'New businesses, upgrades and multiple locations',
    features: [
      'Complete hardware bundle',
      'Training and support included',
      'Integrated payment processing',
      'Business management suite',
      'Custom configuration',
      'Multiple payment options',
      '24/7 technical support',
    ],
    image: {
      src: '/posmeerchant.JPG',
      alt: 'Clover Mini on a cash drawer with a barcode scanner, a Clover Flex and a PIN pad',
      width: 1320,
      height: 800,
      fit: 'cutout',
    },
  },
  {
    id: 'enterprise-pos',
    category: 'pos',
    name: 'Enterprise POS system',
    description: 'For high-volume merchants that run several locations.',
    bestFor: 'Large retailers, chain stores and enterprises',
    features: [
      'Multi-location management',
      'Advanced analytics dashboard',
      'Priority support',
      'Enterprise-grade hardware',
      'Custom reporting tools',
      'Scalable architecture',
      'Advanced inventory management',
    ],
    image: {
      src: '/merchantbig.JPG',
      alt: 'Three self-order kiosks with card readers in a restaurant',
      width: 729,
      height: 654,
      fit: 'framed',
    },
  },
  {
    id: 'premium-setup',
    category: 'pos',
    name: 'Premium merchant setup',
    description: 'A high-performance POS system for growing businesses.',
    bestFor: 'Growing businesses, retail chains and franchises',
    features: [
      'Premium hardware package',
      'Customer loyalty programs',
      'Integrated accounting',
      'Advanced payment processing',
      'Staff management tools',
      'Real-time reporting',
      'Cloud-based system',
    ],
    image: {
      src: '/merchantbig.PNG',
      alt: 'Self-order kiosk with a touchscreen menu and a card payment device',
      width: 1200,
      height: 859,
      fit: 'cutout',
      tight: true,
    },
  },
  {
    id: 'kitchen-printers',
    category: 'printers',
    name: 'Kitchen printers',
    description: 'Receipt and kitchen printers built for busy restaurants.',
    bestFor: 'Restaurants, food service and quick service',
    features: [
      'Impact and thermal options',
      'High-speed printing',
      'Rated for kitchen environments',
      'Easy paper loading',
      'Reliable connectivity',
      'Compact footprint',
    ],
    image: {
      src: '/CLOVERPOSSUSTEMS.PNG',
      alt: 'Impact kitchen printer and thermal kitchen printer, the two printer options for Clover POS systems',
      width: 2240,
      height: 1260,
      fit: 'framed',
    },
  },
  {
    id: 'payment-gateway',
    category: 'gateway',
    name: 'Payment gateway',
    description: 'Send invoices and take secure online payments from anywhere, now including cryptocurrency.',
    bestFor: 'E-commerce, service providers and consultants',
    features: [
      'Online invoices',
      'Payment links by email',
      'Mobile-friendly payment pages',
      'Real-time payment notifications',
      'Recurring billing',
      'Multi-currency support',
      'Advanced reporting dashboard',
    ],
    popular: true,
    image: {
      src: '/gateway.JPG',
      alt: 'Illustration of a laptop with online payment tools next to card terminals and cash',
      width: 1024,
      height: 1024,
      fit: 'cover',
    },
  },
];

const included: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Professional installation', description: 'Expert setup and training.', icon: Wrench },
  { title: 'Warranty and support', description: 'Full warranty coverage.', icon: ShieldCheck },
  {
    title: 'Competitive pricing',
    description: 'Zero processing fees for qualifying merchants, or rates tailored to your volume and industry.',
    icon: BadgeDollarSign,
  },
];

const VISIBLE_FEATURES = 3;
const tileSizes = '(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw';

function ProductImage({ image, sizes }: { image: Product['image']; sizes: string }) {
  if (image.fit === 'cover') {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-white">
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-line bg-white',
        image.fit === 'cutout' && !image.tight ? 'p-6 sm:p-8' : 'p-4'
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={cn('h-auto max-h-full w-auto max-w-full', image.fit === 'framed' && 'rounded-lg')}
      />
    </div>
  );
}

function FeatureList({ features, collapsible, className }: { features: string[]; collapsible: boolean; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const canCollapse = collapsible && features.length > VISIBLE_FEATURES;

  return (
    <div className={className}>
      <h4 className="sr-only">Key features</h4>
      <ul id={listId} className={cn('gap-x-8 gap-y-2', collapsible ? 'grid' : 'grid sm:grid-cols-2')}>
        {features.map((feature, i) => (
          <li
            key={feature}
            className={cn('gap-2.5 text-[0.95rem]', canCollapse && !expanded && i >= VISIBLE_FEATURES ? 'hidden' : 'flex')}
          >
            <CheckIcon className="mt-0.5 h-4 w-4 text-navy-700" />
            {feature}
          </li>
        ))}
      </ul>
      {canCollapse && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((open) => !open)}
          className="mt-3 inline-flex items-center gap-2 py-1 text-sm font-semibold text-navy-700 hover:text-navy-900"
        >
          <svg
            className={cn('h-4 w-4 transition-transform duration-150', expanded && 'rotate-45')}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" d="M10 4v12M4 10h12" />
          </svg>
          {expanded ? 'Show fewer features' : `Show all ${features.length} features`}
        </button>
      )}
    </div>
  );
}

/** Name, description, who it's for and features. Returned as separate blocks so tiles can align them on a subgrid. */
function ProductText({ product, collapsible }: { product: Product; collapsible: boolean }) {
  return (
    <>
      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-xl font-bold text-navy-900 sm:text-2xl">{product.name}</h3>
          {product.popular && (
            <span className="rounded-full bg-navy-900 px-2.5 py-0.5 text-xs font-semibold text-white">Most popular</span>
          )}
        </div>
        <p className="mt-2 max-w-prose text-muted">{product.description}</p>
      </div>
      <p className="mt-4 text-[0.95rem]">
        <span className="font-semibold text-navy-900">Best for:</span> {product.bestFor}
      </p>
      <FeatureList features={product.features} collapsible={collapsible} className="mt-5 border-t border-line pt-5" />
    </>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<'all' | CategoryId>('all');

  const visible = activeCategory === 'all' ? products : products.filter((item) => item.category === activeCategory);

  return (
    <>
      <FloatingLeadCapture pageName="portfolio" />

      <PageHero
        title="POS systems and card readers, set up for you"
        lead="Clover POS systems, card readers, kitchen printers and an online payment gateway. We handle installation, setup and training."
        actions={
          <>
            <CalendlyButton text="Schedule a free call" size="lg" />
            <ButtonLink href="/get-quote" variant="outline-light" size="lg">
              Get a free quote
            </ButtonLink>
            <p className="mt-2 basis-full text-sm text-navy-300">Free 30-minute consultation. No commitment required.</p>
          </>
        }
        aside={
          <div className="max-w-md overflow-hidden rounded-2xl bg-white lg:ml-auto">
            <Image
              src="/multiplemerchant.PNG"
              alt="Clover Station, Clover Mini and Clover Flex point of sale devices"
              width={1000}
              height={1000}
              sizes="(min-width: 1024px) 448px, 100vw"
              className="h-auto w-full"
              priority
            />
          </div>
        }
      />

      {/* The catalog: the heart of the page */}
      <Section tone="paper" aria-labelledby="catalog-title">
        <SectionHeading
          id="catalog-title"
          title="Find the right setup"
          intro="From a card reader for your phone to a POS for several locations."
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filter equipment by category" className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count =
                category.id === 'all' ? products.length : products.filter((p) => p.category === category.id).length;
              const active = activeCategory === category.id;
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  aria-controls="equipment-list"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border py-2 pl-3.5 pr-4 text-[0.95rem] font-semibold transition-colors duration-150',
                    active
                      ? 'border-navy-900 bg-navy-900 text-white'
                      : 'border-line bg-white text-navy-900 hover:border-navy-900'
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className={cn('h-[1.15rem] w-[1.15rem]', active ? 'text-gold-400' : 'text-navy-700')}
                  />
                  {category.name}
                  <span className={cn('text-sm font-normal', active ? 'text-navy-200' : 'text-muted')}>{count}</span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="text-sm text-muted">
            {activeCategory === 'all'
              ? `Showing all ${products.length} products`
              : `Showing ${visible.length} of ${products.length} products`}
          </p>
        </div>

        <ul id="equipment-list" className="-mb-16 mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) =>
            product.image.fit === 'cover' ? (
              // The gateway is software, not a device: give it a full-width row with its features spread out.
              <li key={product.id} className="grid gap-x-8 pb-16 sm:col-span-2 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
                <ProductImage image={product.image} sizes={tileSizes} />
                <div className="lg:col-span-2 sm:[&>:first-child]:mt-0">
                  <ProductText product={product} collapsible={false} />
                </div>
              </li>
            ) : (
              // Each tile spans four rows of a subgrid, so image, name, "best for" and features line up across a row.
              <li key={product.id} className="row-span-4 grid grid-rows-subgrid pb-16">
                <ProductImage image={product.image} sizes={tileSizes} />
                <ProductText product={product} collapsible />
              </li>
            )
          )}
        </ul>
      </Section>

      {/* What comes with the equipment */}
      <Section tone="white" aria-labelledby="included-title">
        {/* Phones: heading, list, links. Desktop: heading and links on the left, list on the right. */}
        <div className="grid gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-8">
          <SectionHeading
            id="included-title"
            title="Included with your equipment"
            intro="We install and set up your new POS system for you."
          />
          <ul className="divide-y divide-line border-y border-line lg:col-start-2 lg:row-span-2 lg:row-start-1">
            {included.map((item) => (
              <li key={item.title} className="flex items-start gap-5 py-6">
                <IconTile icon={item.icon} />
                <div>
                  <h3 className="text-xl font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-1 max-w-prose text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start gap-3 lg:col-start-1 lg:row-start-2">
            <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900">
              Ask about installation
              <ArrowIcon />
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
            >
              Email us for an equipment quote
              <ArrowIcon />
            </a>
          </div>
        </div>
      </Section>

      {/* Proof: two of the installations, with the equipment they run */}
      <Section tone="navy" aria-labelledby="stories-title">
        <SectionHeading id="stories-title" tone="dark" title="See it at work in local businesses" />
        <CustomerStories className="mt-14" />
      </Section>

      {/* When the equipment arrives */}
      <Section tone="paper" aria-labelledby="delivery-title">
        <SectionHeading id="delivery-title" title="Delivered and ready in 5 days" />
        <OnboardingTimeline className="mt-14" />
      </Section>
    </>
  );
}
