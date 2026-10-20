import Image from 'next/image';
import { BadgeDollarSign, Banknote, Eye, Headset, Lightbulb, ShieldCheck, Users, type LucideIcon } from 'lucide-react';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';
import { ButtonLink } from '@/components/ui/Button';
import { Container, PageHero, Section, SectionHeading } from '@/components/ui/Layout';
import { IconTile } from '@/components/ui/Visuals';

// Same figures and wording as the home page stat row.
const stats = [
  { value: '90%', label: 'Average savings' },
  { value: '$100K+', label: 'Monthly processing' },
  { value: '10,000+', label: 'Happy customers' },
  { value: '99.9%', label: 'System uptime' },
];

const reasons: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Competitive rates', description: 'No hidden fees, whether your business is low or high risk.', icon: BadgeDollarSign },
  { title: 'Next-day funding', description: 'Fast access to your money.', icon: Banknote },
  { title: '24/7 support', description: 'Always here when you need us.', icon: Headset },
];

const values: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Transparency',
    description: 'No hidden fees, no surprises. Clear, upfront pricing helps you make informed decisions.',
    icon: Eye,
  },
  {
    title: 'Innovation',
    description: 'We keep investing in technology so you get modern payment solutions.',
    icon: Lightbulb,
  },
  {
    title: 'Security',
    description: 'Bank-level security and PCI DSS compliance keep your transactions protected.',
    icon: ShieldCheck,
  },
  {
    title: 'Customer focus',
    description: '24/7 support from payment experts committed to your business’s success.',
    icon: Users,
  },
];

export default function Company() {
  return (
    <>
      <FloatingLeadCapture pageName="company" />

      <PageHero
        title="About Zummit Payments"
        lead="From zero processing fees for qualifying merchants to low, transparent rates, backed by modern technology and 24/7 customer service."
        actions={
          <>
            <CalendlyButton text="Schedule a free call" size="lg" />
            <ButtonLink href="/get-quote" variant="outline-light" size="lg">
              Get a free quote
            </ButtonLink>
          </>
        }
        aside={
          // The brand mark, large and quiet: the company page's one illustration up top.
          <div className="mx-auto w-48 sm:w-64 lg:mr-0 lg:w-[22rem]">
            <Image
              src="/zummit.png"
              alt="Zummit Payments mountain logo"
              width={1024}
              height={1024}
              priority
              className="h-auto w-full opacity-95"
              sizes="(min-width: 1024px) 352px, 256px"
            />
          </div>
        }
      />

      {/* Same stat row as the home page, so the numbers read the same everywhere */}
      <div className="border-t border-white/10 bg-navy-900 text-white">
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

      {/* Mission beside a real installation, then the three reasons merchants pick us */}
      <Section tone="white" aria-labelledby="mission-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
          <div>
            <SectionHeading id="mission-title" title="Our mission" />
            <p className="mt-8 max-w-[36ch] border-l-4 border-gold-400 pl-6 text-2xl font-semibold leading-snug text-navy-900 sm:text-[1.85rem]">
              Every business deserves premium payment processing without the premium price tag.
            </p>
            <p className="mt-8 max-w-prose text-lg leading-relaxed text-muted">
              We put modern payment technology within reach of businesses of all sizes. Our payment experts work around
              the clock so you have the tools to grow.
            </p>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-line bg-paper">
            {/* Zoomed to the devices on the counter (the photo is a tall phone shot) */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/merchant.JPG"
                alt="Clover Station and printers installed at the Turos Tacos counter"
                fill
                className="origin-top-left scale-[1.3] object-cover object-[0%_24%]"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
            <figcaption className="border-t border-line bg-white px-6 py-4 text-sm text-muted">
              <span className="font-semibold text-navy-900">Turos Tacos</span>, a food truck we set up with Clover Station
              and kitchen printers.
            </figcaption>
          </figure>
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <h3 id="why-title" className="font-wide text-2xl font-bold text-navy-900">
            Why choose us?
          </h3>
          <ul aria-labelledby="why-title" className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {reasons.map((reason) => (
              <li key={reason.title} className="flex items-start gap-4">
                <IconTile icon={reason.icon} />
                <div>
                  <p className="text-lg font-bold text-navy-900">{reason.title}</p>
                  <p className="mt-1 text-muted">{reason.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Values: an index with one icon per principle, not four identical cards */}
      <Section tone="paper" aria-labelledby="values-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeading id="values-title" title="Our core values" intro="The principles behind how we serve you." />
          <ul className="divide-y divide-line border-y border-line">
            {values.map((value) => (
              <li key={value.title} className="flex items-start gap-5 py-7">
                <IconTile icon={value.icon} size="lg" />
                <div>
                  <h3 className="font-wide text-xl font-bold text-navy-900 sm:text-2xl">{value.title}</h3>
                  <p className="mt-1.5 max-w-prose text-lg text-muted">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
