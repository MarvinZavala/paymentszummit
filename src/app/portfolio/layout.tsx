import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Clover POS Systems & Merchant Equipment',
  description: 'Explore Clover POS systems, countertop and mobile card terminals and payment gateways for retail, restaurants and service businesses, with setup and training included.',
  path: '/portfolio',
});

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Equipment', path: '/portfolio' }])} />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
