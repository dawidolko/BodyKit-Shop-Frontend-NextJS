import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { ArrowRightIcon } from '@/components/ui/Icon';
import { categories } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { plural } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Katalog części do tuningu karoserii',
  description:
    'Wszystkie kategorie BodyKit Shop: splittery, spoilery, dyfuzory, nakładki progowe, felgi, wydechy, zawieszenie i elementy karbonowe.',
  alternates: { canonical: '/kategorie/' },
};

export default function CategoriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/kategorie/', label: 'Katalog' }]} />
      <PageHeader
        title="Katalog"
        description="Osiem kategorii części do modyfikacji nadwozia i podwozia. Każdy produkt ma podaną listę pasujących modeli i roczników."
      />

      <div className="container-page pb-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const count = getProductsByCategory(category.slug).length;
            return (
              <li key={category.slug}>
                <Link
                  href={`/kategorie/${category.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-border-subtle bg-surface transition-[border-color,translate,box-shadow] duration-300 ease-(--ease-out-quint) hover:-translate-y-1 hover:border-border-brand hover:shadow-(--shadow-md) focus-ring"
                >
                  <div className="relative overflow-hidden bg-bg-muted">
                    <Picture
                      name={category.image}
                      alt=""
                      profile="category"
                      sizes="(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 90vw"
                      priority={index < 3}
                      imgClassName="transition-transform duration-500 ease-(--ease-out-quint) group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-carbon-950/75 to-transparent"
                    />
                    <p className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wide text-carbon-300">
                      {count} {plural(count, 'produkt', 'produkty', 'produktów')}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-bold text-text-primary">{category.name}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
                      {category.description}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-text-brand"
                    >
                      Przejdź do kategorii
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
