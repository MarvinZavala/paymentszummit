'use client';

import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import JsonLd from '@/components/JsonLd';
import FaqList from '@/components/sections/FaqList';
import { ArrowIcon, buttonClasses } from '@/components/ui/Button';
import { PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import { allFaqs, faqData } from '@/lib/faq';
import { breadcrumbJsonLd, CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';
import { cn } from '@/lib/utils';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

type Category = keyof typeof faqData;

// `short` labels fit a 2x2 grid of tabs on phones.
const categories: { id: Category; name: string; short: string }[] = [
  { id: 'general', name: 'General support', short: 'General' },
  { id: 'technical', name: 'Technical issues', short: 'Technical' },
  { id: 'billing', name: 'Billing & payments', short: 'Billing' },
  { id: 'account', name: 'Account management', short: 'Account' },
];

type TawkWindow = Window & { Tawk_API?: { maximize?: () => void } };

// Dividers for the 4 contact methods: stacked on phones, 2x2 on tablets, one row on desktop.
const methodBorders = [
  '',
  'border-t sm:border-l sm:border-t-0 sm:pl-6 lg:pl-8',
  'border-t lg:border-l lg:border-t-0 lg:pl-8',
  'border-t sm:border-l sm:pl-6 lg:border-t-0 lg:pl-8',
];

export default function Support() {
  const [activeCategory, setActiveCategory] = useState<Category>('general');
  const [chatUnavailable, setChatUnavailable] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const openChat = () => {
    const tawk = (window as TawkWindow).Tawk_API;
    if (tawk?.maximize) {
      setChatUnavailable(false);
      tawk.maximize();
    } else {
      setChatUnavailable(true);
    }
  };

  // Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = categories.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % categories.length
        : event.key === 'ArrowLeft'
          ? (index - 1 + categories.length) % categories.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActiveCategory(categories[next].id);
    tabRefs.current[next]?.focus();
  };

  const methods = [
    {
      title: 'Live chat',
      description: 'Chat with our support team. Available 24/7.',
      action: (
        <button type="button" onClick={openChat} className={buttonClasses('outline-light')}>
          Start a chat
        </button>
      ),
      // The live region is always in the DOM so screen readers announce the message when it appears.
      note: (
        <p role="status" className={cn('text-sm text-navy-200', chatUnavailable && 'mt-3')}>
          {chatUnavailable ? 'The chat hasn’t loaded yet. Try again in a few seconds, or call us.' : null}
        </p>
      ),
    },
    {
      title: 'Call us',
      description: 'Talk to our support team by phone.',
      action: (
        <a href={PHONE_HREF} className={buttonClasses('outline-light')}>
          Call {PHONE_DISPLAY}
        </a>
      ),
    },
    {
      title: 'Email support',
      description: 'Send us a detailed message. We reply within 2 hours.',
      detail: CONTACT_EMAIL,
      action: (
        <a href={`mailto:${CONTACT_EMAIL}`} className={buttonClasses('outline-light')}>
          Send an email
        </a>
      ),
    },
    {
      title: 'Schedule a call',
      description: 'Book a support call, Monday to Sunday, 9 AM to 9 PM EST.',
      action: <CalendlyButton text="Book a call" />,
    },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Support', path: '/support' }])} />

      <FloatingLeadCapture pageName="support" />

      {/* Contact options sit in the hero so a merchant with a problem can reach us without scrolling */}
      <PageHero
        title="24/7 customer support"
        lead="Get the help you need, when you need it. Our support team is available around the clock for any question or issue."
      >
        <section aria-labelledby="contact-title" className="mt-14 border-t border-white/10">
          <h2 id="contact-title" className="sr-only">
            Ways to reach support
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {methods.map((method, i) => (
              <li key={method.title} className={cn('flex flex-col border-white/10 py-8 lg:pb-0', methodBorders[i])}>
                <h3 className="text-xl font-bold text-white">{method.title}</h3>
                <p className="mt-2 max-w-[30ch] text-navy-200">{method.description}</p>
                {method.detail && (
                  <p className="mt-2 text-[0.9rem] font-semibold text-white [overflow-wrap:anywhere]">{method.detail}</p>
                )}
                <div className="mt-auto pt-6">{method.action}</div>
                {method.note}
              </li>
            ))}
          </ul>
        </section>
      </PageHero>

      {/* FAQ by topic */}
      <Section tone="paper" aria-labelledby="faq-title">
        {/* Phones: heading, questions, then the extra help links. Desktop: heading and links on the left. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0">
          <SectionHeading
            id="faq-title"
            title="Frequently asked questions"
            intro="Find quick answers by topic."
            className="lg:col-start-1 lg:row-start-1"
          />

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div role="tablist" aria-label="Question topics" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {categories.map((category, i) => {
                const selected = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`faq-tab-${category.id}`}
                    aria-selected={selected}
                    aria-controls={`faq-panel-${category.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveCategory(category.id)}
                    onKeyDown={(event) => onTabKeyDown(event, i)}
                    className={cn(
                      'rounded-full border px-3 py-2.5 text-sm font-semibold transition-colors duration-150 sm:px-4 sm:py-2 sm:text-[0.95rem]',
                      selected
                        ? 'border-navy-900 bg-navy-900 text-white'
                        : 'border-line bg-white text-navy-900 hover:border-navy-900'
                    )}
                  >
                    <span className="sm:hidden">{category.short}</span>
                    <span className="hidden sm:inline">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {categories.map((category) => (
              <div
                key={category.id}
                role="tabpanel"
                id={`faq-panel-${category.id}`}
                aria-labelledby={`faq-tab-${category.id}`}
                hidden={category.id !== activeCategory}
                tabIndex={0}
                className="mt-8"
              >
                <FaqList faqs={faqData[category.id]} />
              </div>
            ))}
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:mt-8">
            <div className="space-y-6 lg:border-t lg:border-line lg:pt-8">
              <div>
                <p className="font-semibold text-navy-900">Already a Zummit merchant?</p>
                <p className="mt-1 text-muted">See what your dedicated account manager can help with.</p>
                <Link
                  href="/support/account"
                  className="mt-3 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
                >
                  Account management
                  <ArrowIcon />
                </Link>
              </div>
              <div>
                <p className="font-semibold text-navy-900">Still need help?</p>
                <p className="mt-1 text-muted">Send us a message and we&apos;ll get back to you within 2 hours.</p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
                >
                  Contact us
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
