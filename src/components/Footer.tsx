import Link from 'next/link';
import Image from 'next/image';
import { CalendlyButton } from './CalendlyWidget';
import { ButtonLink } from './ui/Button';
import { Container } from './ui/Layout';
import { CONTACT_EMAIL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

const footerSections = [
  {
    title: 'Solutions',
    links: [
      { name: 'Credit Card Processing', href: '/credit-card-processing' },
      { name: 'Payment Solutions', href: '/products' },
      { name: 'POS Systems & Equipment', href: '/portfolio' },
      { name: 'Get a Free Quote', href: '/get-quote' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/company' },
      { name: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center & FAQ', href: '/support' },
      { name: 'Account Management', href: '/support/account' },
    ],
  },
];

/**
 * Site footer. It opens with the closing call to action so every page ends on the same next step;
 * pages should not add their own "Ready to…?" band above it.
 */
export default function Footer({ showCta = true }: { showCta?: boolean }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200">
      {showCta && (
        <div className="border-b border-white/10">
          <Container className="flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-wide text-3xl font-extrabold text-white sm:text-4xl">Find out what you could save.</p>
              <p className="mt-3 text-lg">
                Book a free 30-minute call and get a personalized savings analysis. No commitment required.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CalendlyButton text="Schedule a free call" size="lg" />
              <ButtonLink href="/get-quote" variant="outline-light" size="lg">
                Get a free quote
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}

      <Container className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Zummit Payments home">
            <Image src="/zummit.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
            <span className="font-wide text-lg font-bold text-white">Zummit Payments</span>
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed">
            We help business owners save on payment processing, so more of every sale goes back into the business and the
            customers who matter most.
          </p>
          <ul className="mt-6 space-y-3">
            <li>
              <a href={PHONE_HREF} className="font-semibold text-white hover:text-gold-400">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-400 hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram @zummit.payments
              </a>
            </li>
          </ul>
        </div>

        {footerSections.map((section) => (
          <nav key={section.title} aria-label={section.title}>
            <h2 className="font-semibold text-white">{section.title}</h2>
            <ul className="mt-4 space-y-3">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Zummit Payments. All rights reserved.</p>
          <p>PCI DSS compliant payment processing</p>
        </Container>
      </div>
    </footer>
  );
}
