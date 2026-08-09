import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { locales } from '@/i18n/config';

export const dynamic = 'force-static';

/**
 * Transactional routes and the design system carry no search value, so they are
 * disallowed in every locale. Paths are expanded per locale because each one
 * lives under its own prefix.
 */
const privatePaths = ['/cart/', '/checkout/', '/account/', '/search/', '/style-guide/'];

export default function robots(): MetadataRoute.Robots {
  const disallow = locales.flatMap((locale) => privatePaths.map((path) => `/${locale}${path}`));

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
