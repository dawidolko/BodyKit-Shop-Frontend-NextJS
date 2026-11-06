import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { Picture } from '@/components/ui/Picture';
import { absoluteLocaleUrl } from '@/lib/site';
import { cn } from '@/lib/utils';
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
      <nav aria-label={dict.nav.breadcrumb} className="container-page py-2.5">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-muted">
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
                      className="transition-colors hover:text-text-brand focus-ring"
                    >
                      {crumb.label}
                    </Link>
                    <span aria-hidden="true" className="font-bold text-accent-fg">
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

/**
 * The navy title band that opens every inner page. `code` prints the catalogue
 * section on a tab and `image` sets a photo into the band's right-hand side.
 */
export function PageHeader({
  title,
  description,
  code,
  image,
  children,
}: {
  title: string;
  description?: string;
  code?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="livery cut-bottom relative isolate overflow-hidden">
      <div aria-hidden="true" className="drafting-grid absolute inset-0 -z-10 opacity-40" />
      {image && (
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] lg:block lg:[clip-path:polygon(6rem_0,100%_0,100%_100%,0_100%)]">
          <Picture name={image} alt="" sizes="42vw" priority className="h-full w-full" />
        </div>
      )}
      <div
        className={cn(
          'container-page grid items-end gap-x-12 gap-y-4 pb-16 pt-8 lg:pb-20 lg:pt-10',
          image ? 'lg:max-w-[90rem]' : 'lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]',
        )}
      >
        <div className={cn(image && 'lg:max-w-[52%]')}>
          {code && <p className="index-tab mb-3">{code}</p>}
          <h1 className="type-display-lg">{title}</h1>
          {image && description && (
            <p className="mt-4 max-w-prose leading-relaxed text-text-secondary">{description}</p>
          )}
        </div>
        {!image && description && (
          <p className="max-w-prose leading-relaxed text-text-secondary">{description}</p>
        )}
        {children}
      </div>
    </header>
  );
}
