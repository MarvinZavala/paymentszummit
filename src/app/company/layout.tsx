import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description: 'Learn about Zummit Payments, a merchant services company helping businesses cut credit card processing costs with transparent pricing and dedicated support.',
  path: '/company',
});

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Company', path: '/company' }])} />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
