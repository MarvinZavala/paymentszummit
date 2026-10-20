import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Dashboard',
  description: 'Zummit Payments dashboard.',
  path: '/admin-panel',
  noIndex: true,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      {/* The page ends with its own booking section, so the footer's call to action would repeat it. */}
      <Footer showCta={false} />
    </>
  );
}
