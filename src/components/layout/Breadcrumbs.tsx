import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteLocaleUrl } from '@/lib/site';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

export type Crumb = { href: string; label: string };

/**
 * Breadcrumb trail with BreadcrumbList structured data.
 * The last entry is the current page: not a link, and marked aria-current.
 */
export function Breadcrumbs({
  items,
  locale,
  dict,
}: {
  items: Crumb[];
  locale: Locale;
  dict: Dictionary;
}) {
  const all: Crumb[] = [{ href: '/', label: dict.nav.homeLabel }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: absoluteLocaleUrl(locale, crumb.href),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label={dict.nav.breadcrumb} className="container-page pt-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted">
          {all.map((crumb, index) => {
            const isLast = index === all.length - 1;
            return (
              <li key={crumb.href + crumb.label} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-text-secondary">
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={localePath(locale, crumb.href)}
                      className="rounded-xs transition-colors hover:text-text-brand focus-ring"
                    >
                      {crumb.label}
                    </Link>
                    <span aria-hidden="true" className="text-border-default">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/** Page header — title, description and an optional slot for actions. */
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="container-page pb-8 pt-6">
      <h1 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}
