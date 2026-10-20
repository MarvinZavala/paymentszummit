'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CalendlyButton } from './CalendlyWidget';
import GoogleTranslate from './GoogleTranslate';
import { ButtonLink } from './ui/Button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Payment Solutions', href: '/products' },
  { name: 'Equipment', href: '/portfolio' },
  { name: 'Company', href: '/company' },
  { name: 'Support', href: '/support' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 text-white transition-colors duration-200',
        scrolled || isMenuOpen ? 'border-b border-white/10 bg-navy-900/95 backdrop-blur' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Zummit Payments home">
          <Image src="/zummit.png" alt="" width={48} height={48} className="h-12 w-12 object-contain" priority />
          <span className="leading-tight">
            <span className="block font-wide text-lg font-bold">Zummit Payments</span>
            <span className="hidden text-xs text-navy-300 sm:block">Merchant & Payment Processing Services</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'border-b-2 py-1 text-[0.95rem] font-medium transition-colors',
                    isActive(item.href)
                      ? 'border-gold-400 text-white'
                      : 'border-transparent text-navy-200 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <GoogleTranslate />
          <CalendlyButton text="Schedule a call" size="sm" />
        </div>

        <button
          type="button"
          className="-mr-2 rounded-lg p-2 text-white xl:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-white/10 bg-navy-900 xl:hidden">
          <nav aria-label="Main" className="mx-auto max-w-7xl px-5 pb-8 pt-2 sm:px-8">
            <ul className="divide-y divide-white/10">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'flex py-4 text-lg font-medium',
                      isActive(item.href) ? 'text-gold-400' : 'text-white'
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <CalendlyButton text="Schedule a free call" size="lg" />
              <ButtonLink href="/get-quote" variant="outline-light" size="lg">
                Get a free quote
              </ButtonLink>
              <div className="pt-2">
                <GoogleTranslate />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
