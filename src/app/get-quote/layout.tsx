import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { Container } from '@/components/ui/Layout';
import { pageMetadata, breadcrumbJsonLd, PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Get a Free Credit Card Processing Quote',
  description: 'Answer a few quick questions about your business and get a free, no-obligation quote showing how much you can save on credit card processing.',
  path: '/get-quote',
});

// Focused funnel: no site navigation and no footer, only a way home and a number to call.
function FunnelBar() {
  return (
    <header className="border-b border-white/10 bg-navy-900 text-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Zummit Payments home">
          <Image src="/zummit.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" priority />
          <span className="hidden font-wide text-lg font-bold sm:block">Zummit Payments</span>
        </Link>
        <p className="text-sm text-navy-300">
          Questions?{' '}
          <a href={PHONE_HREF} className="font-semibold text-white hover:text-gold-400">
            Call {PHONE_DISPLAY}
          </a>
        </p>
      </Container>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Get a Quote', path: '/get-quote' }])} />
      <div className="flex min-h-screen flex-col bg-navy-900 text-white">
        <FunnelBar />
        <main id="main" className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
}
