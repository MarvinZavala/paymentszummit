import type { Metadata } from 'next';

export const SITE_URL = 'https://www.zummitpayments.com';
export const SITE_NAME = 'Zummit Payments';
export const SITE_TAGLINE = 'Merchant Services & Credit Card Processing';
export const SITE_DESCRIPTION =
  'Zummit Payments helps businesses lower credit card processing fees with transparent merchant services, Clover POS systems, payment gateways and 24/7 support. Get a free savings analysis.';
export const CONTACT_EMAIL = 'Save.zummitpayments@gmail.com';
export const PHONE_DISPLAY = '833.480.7829';
export const PHONE_HREF = 'tel:+18334807829';
export const INSTAGRAM_URL = 'https://www.instagram.com/zummit.payments';
export const SOCIAL_PROFILES = [INSTAGRAM_URL];
// Free 30-minute consultation. No month param, so it always opens on the current month.
export const CALENDLY_URL = 'https://calendly.com/save-zummitpayments/30min';

type PageSeo = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

// Per-page metadata. Child segments replace (not merge) openGraph/twitter/alternates,
// so every page sets its own canonical and social fields here. The title is absolute
// because a parent segment with a plain-string title drops the root template.
export function pageMetadata({ title, description, path, noIndex }: PageSeo): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: '/opengraph-image',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: '/opengraph-image',
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}
