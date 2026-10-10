import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description: 'Contact Zummit Payments for a free payment processing savings analysis. Email us, chat live or book a call. We reply within 2 hours.',
  path: '/contact',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Contact', path: '/contact' }])} />
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}