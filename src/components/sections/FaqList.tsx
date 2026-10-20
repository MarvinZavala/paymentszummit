import type { FAQ } from '@/lib/faq';
import { cn } from '@/lib/utils';

/** Accessible accordion of questions using native <details>. */
export default function FaqList({ faqs, className }: { faqs: FAQ[]; className?: string }) {
  return (
    <div className={cn('divide-y divide-line border-y border-line', className)}>
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-xl leading-none text-navy-700 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-prose text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
