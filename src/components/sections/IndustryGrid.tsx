import Image from 'next/image';
import { ShoppingCart, Store, UtensilsCrossed, Wrench, type LucideIcon } from 'lucide-react';
import { CheckIcon } from '@/components/ui/Button';
import { IconTile } from '@/components/ui/Visuals';
import { cn } from '@/lib/utils';

type Industry = {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  image: { src: string; alt: string; width: number; height: number; fit: 'contain' | 'cover' };
};

// Business types from /credit-card-processing, each shown with equipment photos the site already has.
export const industries: Industry[] = [
  {
    title: 'Retail stores',
    description: 'Brick-and-mortar shops.',
    features: ['In-person payments', 'POS integration', 'Inventory management'],
    icon: Store,
    image: {
      src: '/posmeerchant.JPG',
      alt: 'Clover POS station with cash drawer, barcode scanner and card terminal',
      width: 1320,
      height: 800,
      fit: 'contain',
    },
  },
  {
    title: 'Restaurants',
    description: 'Built for food service.',
    features: ['Table-side payments', 'Tip management', 'Kitchen integration'],
    icon: UtensilsCrossed,
    image: {
      src: '/CLOVERPOSSUSTEMS.PNG',
      alt: 'Impact and thermal kitchen printers for Clover POS',
      width: 2240,
      height: 1260,
      fit: 'contain',
    },
  },
  {
    title: 'E-commerce',
    description: 'Online payment processing.',
    features: ['Shopping cart integration', 'Recurring billing', 'Mobile optimization'],
    icon: ShoppingCart,
    image: {
      src: '/gateway.JPG',
      alt: 'Illustration of online payments on a laptop and card terminal',
      width: 1024,
      height: 1024,
      fit: 'cover',
    },
  },
  {
    title: 'Service businesses',
    description: 'Get paid for your services.',
    features: ['Mobile payments', 'Invoicing', 'Appointment booking'],
    icon: Wrench,
    image: {
      src: '/merchant2.PNG',
      alt: 'Clover Flex handheld card terminal',
      width: 887,
      height: 661,
      fit: 'contain',
    },
  },
];

export default function IndustryGrid({ className }: { className?: string }) {
  return (
    <ul className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {industries.map((industry) => (
        <li key={industry.title} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
          <div className="relative h-44 border-b border-line bg-white">
            <Image
              src={industry.image.src}
              alt={industry.image.alt}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
              className={industry.image.fit === 'cover' ? 'object-cover' : 'object-contain p-4'}
            />
          </div>
          <div className="relative flex-1 p-6 pt-9">
            <IconTile icon={industry.icon} className="absolute -top-6 left-6 ring-4 ring-white" />
            <h3 className="text-xl font-bold text-navy-900">{industry.title}</h3>
            <p className="mt-1 text-muted">{industry.description}</p>
            <ul className="mt-4 space-y-2">
              {industry.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-[0.95rem]">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-navy-700" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
