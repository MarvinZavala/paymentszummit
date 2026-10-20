import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8', className)}>{children}</div>;
}

type Tone = 'paper' | 'white' | 'navy';

const tones: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  white: 'bg-white text-ink',
  navy: 'bg-navy-900 text-white',
};

/** A full-width band of the page. Vertical rhythm lives here so sections don't fight each other. */
export function Section({
  tone = 'paper',
  className,
  containerClassName,
  id,
  children,
  'aria-labelledby': labelledBy,
}: {
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  children: ReactNode;
  'aria-labelledby'?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-20 sm:py-28', tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Left-aligned section heading: an h2 and an optional short intro. */
export function SectionHeading({
  id,
  title,
  intro,
  tone = 'light',
  className,
  children,
}: {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <h2
        id={id}
        className={cn(
          'font-wide text-3xl font-extrabold sm:text-[2.6rem]',
          tone === 'dark' ? 'text-white' : 'text-navy-900'
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn('mt-4 max-w-prose text-lg', tone === 'dark' ? 'text-navy-200' : 'text-muted')}>{intro}</p>
      )}
      {children}
    </div>
  );
}

/**
 * Navy band at the top of inner pages. Title and lead are left-aligned;
 * `actions` sit under the lead and `aside` (optional) fills the right column on desktop.
 */
export function PageHero({
  title,
  lead,
  actions,
  aside,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
      <Container>
        <div className={cn('grid gap-12', aside && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end')}>
          <div className="max-w-3xl">
            <h1 className="font-wide text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl">{title}</h1>
            {lead && <p className="mt-6 max-w-prose text-lg text-navy-200 sm:text-xl">{lead}</p>}
            {actions && <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
        {children}
      </Container>
    </section>
  );
}
