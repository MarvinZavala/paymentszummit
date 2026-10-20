import Image from 'next/image';
import { cn } from '@/lib/utils';

// Real customer installations (originally on /portfolio). Quotes lightly edited for grammar only.
export const stories = [
  {
    business: 'Turos Tacos',
    type: 'Food truck',
    equipment: 'Clover Station + Kitchen Printers',
    quote:
      'Zummit Payments transformed our restaurant operations. The system is intuitive and our staff loves it. We also got the zero credit card payment processing fees.',
    metrics: [
      { value: '+100%', label: 'Efficiency boost' },
      { value: '5/5', label: 'Customer rating' },
    ],
    photo: { src: '/merchant.JPG', alt: 'Clover Station and printers installed at the Turos Tacos counter', width: 1206, height: 2144 },
  },
  {
    business: 'Casa de RJ',
    type: 'General construction',
    equipment: 'Payment Gateway + Invoice Management',
    quote:
      'Zummit Payments gave our clients another form of payment to speed up the projects. If they were short of cash, now they were able to use their credit cards, plus benefit from their card perks. And they gave us a great processing rate compared to the banks and other competitors.',
    metrics: [
      { value: '+90%', label: 'Faster payments' },
      { value: '5/5', label: 'Client rating' },
    ],
    logo: { src: '/Casa-rj.png', alt: 'Casa de RJ logo' },
  },
];

export default function CustomerStories({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-2', className)}>
      {stories.map((story) => (
        <figure key={story.business} className="flex flex-col overflow-hidden rounded-2xl bg-white text-ink">
          <div className="relative h-64 bg-paper">
            {story.photo && (
              <Image
                src={story.photo.src}
                alt={story.photo.alt}
                fill
                className="origin-top-left scale-[1.3] object-cover object-[0%_22%]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            )}
            {story.logo && (
              <div className="grid h-full place-items-center">
                <Image src={story.logo.src} alt={story.logo.alt} width={144} height={129} className="h-32 w-auto" />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-8 sm:p-10">
            <blockquote className="flex-1 text-lg leading-relaxed sm:text-xl">
              <p>&ldquo;{story.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-8 border-t border-line pt-6">
              <p className="font-bold text-navy-900">{story.business}</p>
              <p className="text-sm text-muted">
                {story.type}. {story.equipment}.
              </p>
            </figcaption>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {story.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse rounded-xl bg-paper px-4 py-3">
                  <dt className="text-sm text-muted">{metric.label}</dt>
                  <dd className="font-wide text-2xl font-extrabold text-navy-900">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </figure>
      ))}
    </div>
  );
}
