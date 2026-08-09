import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/site';

export type Crumb = { href: string; label: string };

/**
 * Sciezka nawigacyjna z danymi strukturalnymi BreadcrumbList.
 * Ostatni element jest biezaca strona - nie jest linkiem i ma aria-current.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ href: '/', label: 'Strona główna' }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Ścieżka nawigacyjna" className="container-page pt-6">
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
                      href={crumb.href}
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

/** Naglowek strony - tytul, opis i opcjonalny slot na akcje. */
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
