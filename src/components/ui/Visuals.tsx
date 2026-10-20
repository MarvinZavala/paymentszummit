import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Square icon badge. Navy tile with a gold line icon on light sections;
 * translucent white tile on navy sections. Use it to make lists scannable,
 * not as decoration on every block.
 */
export function IconTile({
  icon: Icon,
  tone = 'light',
  size = 'md',
  className,
}: {
  icon: LucideIcon;
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const box = { sm: 'h-10 w-10 rounded-xl', md: 'h-12 w-12 rounded-2xl', lg: 'h-16 w-16 rounded-2xl' }[size];
  const glyph = { sm: 'h-5 w-5', md: 'h-6 w-6', lg: 'h-8 w-8' }[size];
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-grid shrink-0 place-items-center',
        box,
        tone === 'dark' ? 'bg-white/10 text-gold-400 ring-1 ring-white/15' : 'bg-navy-900 text-gold-400',
        className
      )}
    >
      <Icon className={glyph} strokeWidth={1.75} />
    </span>
  );
}

const cards = [
  { name: 'Visa', className: 'bg-navy-700 text-white', tilt: '-rotate-[5deg]' },
  { name: 'Mastercard', className: 'bg-ink text-white', tilt: '-rotate-[1.5deg]' },
  { name: 'American Express', className: 'bg-white text-navy-900 ring-1 ring-line', tilt: 'rotate-[1.5deg]' },
  { name: 'Discover', className: 'bg-gold-400 text-navy-950', tilt: 'rotate-[4deg]' },
];

/**
 * Illustration of payment cards stacked like a wallet, each labelled with a network the
 * site already says it accepts. Generic card shapes with the names as text, no brand logos.
 */
export function PaymentCards({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Payment cards: Visa, Mastercard, American Express and Discover"
      className={cn(
        'relative mx-auto h-[17.5rem] w-full max-w-[16rem] [--step:2.6rem] sm:h-[19.5rem] sm:max-w-[18rem] sm:[--step:2.9rem]',
        className
      )}
    >
      {cards.map((card, i) => (
        <div
          key={card.name}
          className={cn(
            'absolute inset-x-0 flex aspect-[1.586] flex-col justify-between rounded-2xl p-4 shadow-[0_-6px_24px_-10px_rgba(8,19,47,0.6)]',
            card.className,
            card.tilt
          )}
          style={{ top: `calc(${i} * var(--step))`, zIndex: i }}
        >
          <div className="flex items-center justify-between">
            <span className="font-wide text-sm font-bold">{card.name}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path d="M8.5 7.5a6 6 0 0 1 0 9M12 5a9.5 9.5 0 0 1 0 14M5 10a2.5 2.5 0 0 1 0 4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex items-end justify-between">
            <span className="h-7 w-9 rounded-md bg-gradient-to-br from-gold-200 to-gold-500 opacity-90" />
            <span className="font-mono text-[0.75rem] tracking-[0.18em] opacity-70">•••• ••••</span>
          </div>
        </div>
      ))}
    </div>
  );
}
