import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Customer Support & FAQ',
  description: '24/7 merchant support from Zummit Payments. Answers to common questions about processing fees, funding times, equipment, chargebacks and account management.',
  path: '/support',
});

// Structured data lives in page.tsx so it isn't repeated on /support/account.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
