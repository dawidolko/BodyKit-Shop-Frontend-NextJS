import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckIcon } from '@/components/ui/Icon';
import { absoluteLocaleUrl, canonicalUrl, site } from '@/lib/site';
import { formatPrice } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags } from '@/i18n/config';

type PageParams = { locale: string };

const PATH = '/packages';

/**
 * Structural data for the package cards: image, prices and which card is
 * highlighted. Names, taglines, fitment lines and contents come from
 * dict.packages.items and are zipped with this array by index.
 */
const packageMeta = [
  { slug: 'street-line-complete', image: 'shot-detail-6', price: 209900, compareAt: 249700 },
  { slug: 'carbon-touch', image: 'cat-karbon', price: 279900, compareAt: 319700, featured: true },
  { slug: 'track-day', image: 'shot-detail-5', price: 449900, compareAt: 509700 },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.packages.title,
    description: dict.packages.description,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, PATH)]),
      ),
    },
    openGraph: {
      url: absoluteLocaleUrl(locale, PATH),
      title: `${dict.packages.title} — ${site.name}`,
      description: dict.packages.description,
    },
  };
}

export default async function PackagesPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs
        items={[{ href: PATH, label: dict.packages.title }]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={dict.packages.title} description={dict.packages.description} />

      <div className="container-page pb-16">
        <ul className="grid gap-6 lg:grid-cols-3">
          {packageMeta.map((pack, index) => {
            const copy = dict.packages.items[index];
            if (!copy) return null;
            const savings = pack.compareAt - pack.price;

            return (
              <li
                key={pack.slug}
                className={`flex flex-col overflow-hidden rounded-md border bg-surface ${
                  pack.featured
                    ? 'border-border-brand shadow-(--shadow-md)'
                    : 'border-border-subtle'
                }`}
              >
                <div className="relative bg-bg-muted">
                  <Picture
                    name={pack.image}
                    alt=""
                    ratio={1}
                    sizes="(min-width: 1024px) 26rem, 92vw"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge tone="accent">{dict.packages.save(formatPrice(savings, locale))}</Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-bold text-text-primary">{copy.name}</h2>
                  <p className="mt-1 text-sm text-text-muted">{copy.tagline}</p>

                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {copy.contents.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-text-secondary">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-5 border-t border-border-subtle pt-4 text-xs">
                    <dt className="font-bold uppercase tracking-wider text-text-muted">
                      {dict.packages.fits}
                    </dt>
                    <dd className="mt-1 text-text-secondary">{copy.fits}</dd>
                    <dt className="mt-3 font-bold uppercase tracking-wider text-text-muted">
                      {dict.packages.fitting}
                    </dt>
                    <dd className="mt-1 text-text-secondary">{copy.note}</dd>
                  </dl>

                  <div className="mt-5 border-t border-border-subtle pt-4">
                    <p className="text-xs text-text-muted line-through">
                      {formatPrice(pack.compareAt, locale)}
                    </p>
                    <p className="text-2xl font-extrabold text-text-primary">
                      {formatPrice(pack.price, locale)}
                    </p>
                    <LinkButton href={localePath(locale, '/contact')} className="mt-4 w-full">
                      {dict.packages.ask}
                    </LinkButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-text-muted">
          {dict.packages.footer}
        </p>
      </div>
    </>
  );
}
