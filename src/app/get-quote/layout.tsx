import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Get a Free Credit Card Processing Quote',
  description: 'Answer a few quick questions about your business and get a free, no-obligation quote showing how much you can save on credit card processing.',
  path: '/get-quote',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Get a Quote', path: '/get-quote' }])} />
      {children}
    </>
  );
}
