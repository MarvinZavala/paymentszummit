import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMetadata, breadcrumbJsonLd, SITE_URL } from '@/lib/site';

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Credit card processing',
  name: 'Credit Card Processing for Small Business',
  url: `${SITE_URL}/credit-card-processing`,
  provider: { '@id': `${SITE_URL}/#organization` },
  description:
    'Secure, PCI-compliant credit card processing for Visa, Mastercard, American Express, Discover, Apple Pay and Google Pay with next-day funding.',
};

export const metadata: Metadata = pageMetadata({
  title: 'Credit Card Processing for Small Business',
  description: 'Accept Visa, Mastercard, American Express, Discover, Apple Pay and Google Pay with secure, PCI-compliant credit card processing and next-day funding. Lower your fees today.',
  path: '/credit-card-processing',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Credit Card Processing', path: '/credit-card-processing' }])} />
      <JsonLd data={serviceJsonLd} />
      {children}
    </>
  );
}
