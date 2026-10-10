import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Merchant Account Management',
  description: 'Dedicated account managers who help you optimize payment processing, add locations, review statements and grow your business.',
  path: '/support/account',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Support', path: '/support' }, { name: 'Account Management', path: '/support/account' }])} />
      {children}
    </>
  );
}
