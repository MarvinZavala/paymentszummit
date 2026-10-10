import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Zummit',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#1e3a8a',
    icons: [
      { src: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { src: '/icon.png', sizes: '1024x1024', type: 'image/png' },
    ],
  };
}
