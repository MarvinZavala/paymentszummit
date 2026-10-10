import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/credit-card-processing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/get-quote', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/company', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/support', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/support/account', priority: 0.5, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
