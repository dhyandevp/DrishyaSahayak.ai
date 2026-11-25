import type { MetadataRoute } from 'next';
import { SITE_META } from '@/content';

export default function robots(): MetadataRoute.Robots {
  const base = SITE_META.url.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
