import type { Metadata } from 'next';
import Link from 'next/link';
import { LinkButton } from '@/components/ui/Button';
import { categories } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'Nie znaleziono strony (404)',
  description: 'Ta strona nie istnieje lub została przeniesiona.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-page py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p
          aria-hidden="true"
          className="font-display text-8xl font-extrabold leading-none text-accent sm:text-9xl"
        >
          404
        </p>

        <h1 className="mt-6 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
          Ta strona wypadła z zakrętu
        </h1>

        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Nie znaleźliśmy strony, której szukasz. Mogła zostać przeniesiona albo adres zawiera
          literówkę.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/" size="lg">
            Strona główna
          </LinkButton>
          <LinkButton href="/szukaj/" size="lg" variant="secondary">
            Szukaj produktu
          </LinkButton>
        </div>
      </div>

      <nav aria-labelledby="popular-heading" className="mx-auto mt-16 max-w-3xl">
        <h2
          id="popular-heading"
          className="text-center text-xs font-bold uppercase tracking-wider text-text-muted"
        >
          Popularne kategorie
        </h2>
        <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/kategorie/${category.slug}/`}
                className="inline-flex items-center rounded-sm border border-border-default px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-border-brand hover:text-text-brand focus-ring"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
