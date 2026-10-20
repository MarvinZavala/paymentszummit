import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Customer Support & FAQ',
  description: '24/7 merchant support from Zummit Payments. Answers to common questions about processing fees, funding times, equipment, chargebacks and account management.',
  path: '/support',
});

// Wraps both /support and /support/account, so the Header and Footer live here once.
// Structured data lives in page.tsx so it isn't repeated on /support/account.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
