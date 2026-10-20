import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Payment Solutions: Card Processing, POS & E-commerce',
  description: 'Merchant services built for your business: credit card processing, POS systems, e-commerce payment gateways and mobile payments with transparent, low rates.',
  path: '/products',
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Payment Solutions', path: '/products' }])} />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
