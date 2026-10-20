import { ClipboardCheck, FileSignature, MailCheck, PackageCheck, Search, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// The real onboarding sequence (originally on /products). Numbered because it is a sequence.
export const onboarding: { day: string; title: string; description: string; icon: LucideIcon }[] = [
  {
    day: 'Day 1',
    title: 'Mutual agreement',
    description: 'Choose your processing and equipment, then fill out a short e-doc application.',
    icon: FileSignature,
  },
  {
    day: 'Day 2',
    title: 'Underwriting',
    description: 'We review your application. It takes about 2 business days.',
    icon: Search,
  },
  {
    day: 'Day 3',
    title: 'Underwriting continues',
    description: 'Your application finishes its review.',
    icon: ClipboardCheck,
  },
  {
    day: 'Day 4',
    title: 'Approval email',
    description: 'You’re approved and your equipment ships, 2-day express.',
    icon: MailCheck,
  },
  {
    day: 'Day 5',
    title: 'Equipment delivered',
    description: 'Your equipment arrives and you start taking payments.',
    icon: PackageCheck,
  },
];

/**
 * Five-day onboarding as a timeline: vertical with a rail on phones, horizontal on desktop.
 * The last step is gold because it's the outcome the merchant cares about.
 */
export default function OnboardingTimeline({ className }: { className?: string }) {
  return (
    <ol className={cn('relative grid gap-8 md:grid-cols-5 md:gap-6', className)}>
      {/* rail: vertical on mobile, horizontal on desktop */}
      <span aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-px bg-line md:hidden" />
      <span aria-hidden="true" className="absolute left-7 right-[calc(20%-47px)] top-7 hidden h-px bg-line md:block" />
      {onboarding.map((step, i) => {
        const last = i === onboarding.length - 1;
        const Icon = step.icon;
        return (
          <li key={step.day} className="relative flex gap-5 md:block">
            <span
              aria-hidden="true"
              className={cn(
                'relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2',
                last ? 'border-gold-500 bg-gold-400 text-navy-950' : 'border-navy-900 bg-white text-navy-900'
              )}
            >
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div className="md:mt-5">
              <p className="text-sm font-semibold text-navy-700">{step.day}</p>
              <h3 className="mt-0.5 text-lg font-bold text-navy-900">{step.title}</h3>
              <p className="mt-1.5 text-[0.95rem] text-muted">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
