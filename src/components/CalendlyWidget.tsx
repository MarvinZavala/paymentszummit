'use client';

import { useEffect, useRef, useState } from 'react';
import { CALENDLY_URL, CONTACT_EMAIL } from '@/lib/site';
import { buttonClasses, CalendarIcon, CheckIcon, type ButtonSize, type ButtonVariant } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

function loadCalendlyScript(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    const script = existing ?? document.createElement('script');
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('Calendly failed to load')), { once: true });
    if (!existing) {
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

/**
 * Inline Calendly scheduler. Loads Calendly's script only when the widget scrolls near
 * the viewport, then mounts the calendar into this element.
 */
export default function CalendlyWidget({
  url = CALENDLY_URL,
  height = 700,
  className,
}: {
  url?: string;
  height?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'ready' | 'error'>('idle');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadCalendlyScript()
          .then(() => {
            if (cancelled || !window.Calendly) return;
            const embedUrl = `${url}${url.includes('?') ? '&' : '?'}hide_gdpr_banner=1&primary_color=0e2152`;
            window.Calendly.initInlineWidget({ url: embedUrl, parentElement: element });
            setStatus('ready');
          })
          .catch(() => !cancelled && setStatus('error'));
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [url]);

  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-white', className)} style={{ height }}>
      <div ref={ref} className="h-full w-full" />
      {status !== 'ready' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-muted">
          {status === 'error' ? (
            <>
              <p className="font-semibold text-ink">The calendar didn&apos;t load.</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-700 underline underline-offset-4">
                Open the scheduling page in a new tab
              </a>
            </>
          ) : (
            <>
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-navy-900/15 border-t-navy-900" aria-hidden="true" />
              <p>Loading available times…</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/** Button that opens the Calendly scheduling page in a new tab. */
export function CalendlyButton({
  text = 'Schedule a free call',
  className,
  url = CALENDLY_URL,
  variant = 'primary',
  size = 'md',
  showIcon = true,
}: {
  text?: string;
  className?: string;
  url?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showIcon?: boolean;
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClasses(variant, size, className)}>
      {showIcon && <CalendarIcon />}
      <span>{text}</span>
    </a>
  );
}

/** Compact booking card for pages that don't embed the full calendar. */
export function CalendlyEmbed({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-line bg-white p-8 sm:p-10', className)}>
      <h3 className="font-wide text-2xl font-bold text-ink">Schedule a free consultation</h3>
      <p className="mt-3 max-w-prose text-muted">
        Book a free 30-minute call with one of our payment processing experts. We&apos;ll review your current setup and show you
        where you can save on fees.
      </p>
      <ul className="mt-6 space-y-3">
        {['Free consultation & cost analysis', 'Custom pricing proposal', 'No commitment required'].map((item) => (
          <li key={item} className="flex items-start gap-3 text-ink">
            <CheckIcon className="mt-0.5 text-navy-700" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <CalendlyButton text="Schedule a free call" size="lg" />
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-navy-700 underline-offset-4 hover:underline">
          Or email us
        </a>
      </div>
      <p className="mt-4 text-sm text-muted">Calls available Monday to Sunday, 9 AM to 9 PM EST.</p>
    </div>
  );
}
