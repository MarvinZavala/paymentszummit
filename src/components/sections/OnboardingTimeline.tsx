import { cn } from '@/lib/utils';

// The real onboarding sequence (originally on /products). Numbered because it is a sequence.
export const onboarding = [
  {
    day: 'Day 1',
    title: 'Mutual agreement',
    description: 'Agree on your payment processing and equipment, then complete a short e-doc application.',
  },
  {
    day: 'Day 2',
    title: 'Underwriting',
    description: 'We start reviewing your application. Underwriting takes about 2 business days.',
  },
  {
    day: 'Day 3',
    title: 'Underwriting continues',
    description: 'Your application finishes its review.',
  },
  {
    day: 'Day 4',
    title: 'Approval email',
    description: 'You’re approved by email and your equipment ships with 2-day express shipping.',
  },
  {
    day: 'Day 5',
    title: 'Equipment delivered',
    description: 'Your equipment arrives and you start processing payments.',
  },
];

export default function OnboardingTimeline({ className }: { className?: string }) {
  return (
    <ol className={cn('grid gap-10 md:grid-cols-5 md:gap-6', className)}>
      {onboarding.map((step, i) => (
        <li key={step.day} className="relative md:pt-10">
          <div aria-hidden="true" className="absolute left-0 top-3 hidden h-px w-full bg-line md:block" />
          <span
            aria-hidden="true"
            className={`absolute left-0 top-0 hidden h-6 w-6 rounded-full border-2 md:block ${
              i === onboarding.length - 1 ? 'border-gold-500 bg-gold-400' : 'border-navy-900 bg-white'
            }`}
          />
          <p className="text-sm font-semibold text-navy-700">{step.day}</p>
          <h3 className="mt-1 text-lg font-bold text-navy-900">{step.title}</h3>
          <p className="mt-2 text-[0.95rem] text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
