import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { ArrowRightIcon } from '@/components/ui/Icon';
import { categories } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags } from '@/i18n/config';

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.catalog.title,
    description: dict.catalog.description,
    alternates: {
      canonical: canonicalUrl(locale, '/categories'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/categories')]),
      ),
    },
  };
}

export default async function CategoriesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs
        items={[{ href: '/categories', label: dict.catalog.title }]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={dict.catalog.title} description={dict.catalog.description} />

      <div className="container-page pb-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const count = getProductsByCategory(category.slug).length;
            return (
              <li key={category.slug}>
                <Link
                  href={localePath(locale, `/categories/${category.slug}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-border-subtle bg-surface transition-[border-color,translate,box-shadow] duration-300 ease-out-quint hover:-translate-y-1 hover:border-border-brand hover:shadow-(--shadow-md) focus-ring"
                >
                  <div className="relative overflow-hidden bg-bg-muted">
                    <Picture
                      name={category.image}
                      alt=""
                      sizes="(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 90vw"
                      priority={index < 3}
                      imgClassName="transition-transform duration-500 ease-out-quint group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-carbon-950/75 to-transparent"
                    />
                    <p className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wide text-carbon-300">
                      {dict.catalog.productCount(count)}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-bold text-text-primary">
                      {t(category.name, locale)}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
                      {t(category.description, locale)}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-text-brand"
                    >
                      {dict.catalog.goToCategory}
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
