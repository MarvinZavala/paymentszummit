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

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Equipment', path: '/portfolio' }])} />
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}