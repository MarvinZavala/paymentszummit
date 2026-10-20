import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Receipt from '@/components/home/Receipt';
import CalendlyWidget, { CalendlyButton } from '@/components/CalendlyWidget';
import { FlipWords } from '@/components/ui/flip-words';
import { ArrowIcon, ButtonLink, CheckIcon } from '@/components/ui/Button';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import OnboardingTimeline from '@/components/sections/OnboardingTimeline';
import CustomerStories from '@/components/sections/CustomerStories';
import FaqList from '@/components/sections/FaqList';
import { faqData } from '@/lib/faq';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

const valueWords = ['Simple', 'Secure', 'Faster', 'Smarter', 'Cheaper', 'Better'];

const stats = [
  { value: '90%', label: 'Average savings' },
  { value: '$100K+', label: 'Monthly processing' },
  { value: '10,000+', label: 'Happy customers' },
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
    title: 'E-commerce integration',
    description: 'Online payment processing for your website or app.',
    href: '/products#ecommerce',
  },
  {
    title: 'Secure transactions',
    description: 'Bank-level security with PCI DSS compliance and fraud protection.',
    href: '/credit-card-processing',
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

const industries = [
  {
    title: 'Retail stores',
    description: 'Brick-and-mortar shops.',
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
    description: 'Get paid for your services.',
    features: ['Mobile payments', 'Invoicing', 'Appointment booking'],
  },
];

// The questions a business owner asks before booking a call.
const homeFaqs = [
  faqData.general[2], // processing fees
  faqData.billing[1], // hidden fees
  faqData.general[1], // how quickly can I start
  faqData.billing[0], // when do I receive my funds
  faqData.general[3], // equipment
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero: the promise on the left, the receipt that proves it on the right */}
        <section className="relative overflow-hidden bg-navy-900 text-white">
          <Container className="grid gap-12 pb-14 pt-32 sm:pt-36 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8 lg:pb-16 lg:pt-36">
            <div className="lg:pt-6">
              <h1 className="font-extra-wide text-[2.9rem] font-extrabold leading-[0.98] sm:text-7xl xl:text-[5.25rem]">
                <span className="block">Payments made</span>
                <span className="sr-only">simple</span>
                <FlipWords words={valueWords} duration={3000} align="start" className="text-gold-400" />
              </h1>
              <p className="mt-8 max-w-[34rem] text-xl leading-relaxed text-navy-200">
                From zero processing fees to low, transparent rates tailored to your volume and industry. Zummit Payments
                helps business owners keep more of every sale.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <CalendlyButton text="Schedule a free call" size="lg" />
                <ButtonLink href="/get-quote" variant="outline-light" size="lg">
                  Get a free quote
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-navy-300">Free 30-minute consultation. No commitment required.</p>
            </div>

            <Receipt />
          </Container>

          <div className="border-t border-white/10">
            <Container>
              <dl className="grid grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col-reverse gap-1 py-7 ${i % 2 === 1 ? 'border-l border-white/10 pl-6' : ''} ${
                      i > 1 ? 'border-t border-white/10 lg:border-t-0' : ''
                    } lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0`}
                  >
                    <dt className="text-sm text-navy-300">{stat.label}</dt>
                    <dd className="font-wide text-3xl font-extrabold sm:text-4xl">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </div>
        </section>

        {/* How switching works: a real sequence, so it earns its numbering */}
        <Section tone="white" aria-labelledby="switching-title">
          <SectionHeading
            id="switching-title"
            title="From first call to taking payments in 5 days"
            intro="Switching processors sounds like a hassle. Here is exactly what happens after you say yes."
          />
          <OnboardingTimeline className="mt-14" />
        </Section>

        {/* What we offer: an index, not a wall of cards */}
        <Section tone="paper" aria-labelledby="services-title">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div>
              <SectionHeading
                id="services-title"
                title="Everything you need to take payments"
                intro="Processing, equipment and support from one team, so you have one number to call."
              />
              <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white">
                <Image
                  src="/multiplemerchant.PNG"
                  alt="Clover Station, Clover Mini and Clover Flex point of sale devices"
                  width={1000}
                  height={1000}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {services.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="group flex items-start justify-between gap-6 py-6 transition-colors hover:bg-white sm:px-4"
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
          </div>
        </Section>

        {/* Proof from real customers */}
        <Section tone="navy" aria-labelledby="stories-title">
          <SectionHeading
            id="stories-title"
            tone="dark"
            title="Local businesses that made the switch"
            intro="Two of the businesses we set up, in their own words."
          />
          <CustomerStories className="mt-14" />
          <Link href="/portfolio" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold-400 hover:text-white">
            See the equipment they use
            <ArrowIcon />
          </Link>
        </Section>

        {/* Who it's for */}
        <Section tone="white" aria-labelledby="industries-title">
          <SectionHeading
            id="industries-title"
            title="Set up for the way your business gets paid"
            intro="Whether customers pay at the counter, at the table, online or on the job."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <li key={industry.title} className="bg-white p-7">
                <h3 className="text-xl font-bold text-navy-900">{industry.title}</h3>
                <p className="mt-1 text-muted">{industry.description}</p>
                <ul className="mt-5 space-y-2">
                  {industry.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[0.95rem]">
                      <CheckIcon className="mt-0.5 h-4 w-4 text-navy-700" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        {/* Questions before booking */}
        <Section tone="paper" aria-labelledby="faq-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <SectionHeading id="faq-title" title="Questions business owners ask us first">
              <Link
                href="/support"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
              >
                See all questions
                <ArrowIcon />
              </Link>
            </SectionHeading>
            <FaqList faqs={homeFaqs} />
          </div>
        </Section>

        {/* The goal of the page: book the call, right here */}
        <section id="book" aria-labelledby="book-title" className="bg-navy-900 py-20 text-white sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <h2 id="book-title" className="font-wide text-4xl font-extrabold sm:text-5xl">
                Schedule your free consultation
              </h2>
              <p className="mt-5 max-w-prose text-lg text-navy-200">
                Get a personalized savings analysis and see exactly how much you can save on payment processing.
              </p>
              <ul className="mt-8 space-y-3">
                {['Free consultation & cost analysis', 'Custom pricing proposal', 'No commitment required'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 text-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-navy-300">Calls available Monday to Sunday, 9 AM to 9 PM EST.</p>
              <p className="mt-2 text-sm text-navy-300">
                Rather talk now? Call{' '}
                <a href={PHONE_HREF} className="font-semibold text-gold-400 hover:text-white">
                  {PHONE_DISPLAY}
                </a>{' '}
                or email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-400 hover:text-white">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <CalendlyWidget height={680} />
          </Container>
        </section>
      </main>

      <Footer showCta={false} />
    </>
  );
}
