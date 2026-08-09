import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { TruckIcon, WrenchIcon } from '@/components/ui/Icon';
import { getProduct } from '@/lib/products';
import type { Finish, Material } from '@/lib/types';
import { formatDate, formatPrice, t } from '@/lib/utils';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags } from '@/i18n/config';

type PageParams = { locale: string };

const PATH = '/account';

/**
 * Sample order history. Line items reference catalog products by slug so the
 * part names follow the active locale instead of being frozen in one language;
 * material and finish are resolved through dict.materials / dict.finishes.
 */
const orders = [
  {
    id: 'BK-2026-04788',
    date: '2026-07-28',
    status: 'inTransit' as const,
    tone: 'accent' as const,
    total: 134800,
    items: [
      {
        slug: 'street-gt-front-splitter',
        material: 'abs' as Material,
        finish: 'gloss-black' as Finish,
      },
      { slug: 'aero-fin-canards' },
    ],
    tracking: 'DPD 0012 4455 8891',
  },
  {
    id: 'BK-2026-04512',
    date: '2026-06-14',
    status: 'delivered' as const,
    tone: 'success' as const,
    total: 89900,
    items: [
      {
        slug: 'ducktail-classic-spoiler',
        material: 'abs' as Material,
        finish: 'matte-black' as Finish,
      },
    ],
    tracking: null,
  },
  {
    id: 'BK-2026-03980',
    date: '2026-04-02',
    status: 'delivered' as const,
    tone: 'success' as const,
    total: 219900,
    items: [{ slug: 'vortex-carbon-diffuser', finish: 'carbon-gloss' as Finish }],
    tracking: null,
  },
];

/** Saved cars - makes, models and trim names are brand names, so not translated. */
const savedCars = [
  { name: 'BMW 3 Series G20', detail: '2021, M Sport', parts: 4 },
  { name: 'Toyota GR86', detail: '2023, base', parts: 2 },
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
    title: dict.account.title,
    description: dict.account.description,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, PATH)]),
      ),
    },
    robots: { index: false, follow: true },
  };
}

export default async function AccountPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs
        items={[{ href: PATH, label: dict.account.title }]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={dict.account.title} description={dict.account.description} />

      <div className="container-page pb-16">
        <div className="mb-8 rounded-sm border border-warning/40 bg-warning/5 p-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            <strong className="font-bold text-text-primary">{dict.account.demoNoticeStrong}</strong>{' '}
            {dict.account.demoNotice}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <section aria-labelledby="orders-heading">
            <h2 id="orders-heading" className="text-xl font-extrabold uppercase tracking-tight">
              {dict.account.orderHistory}
            </h2>

            <ul className="mt-5 flex flex-col gap-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="rounded-md border border-border-subtle bg-surface p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm font-bold text-text-primary">{order.id}</p>
                      <p className="mt-0.5 text-xs text-text-muted">
                        <time dateTime={order.date}>{formatDate(order.date, locale)}</time>
                      </p>
                    </div>
                    <Badge tone={order.tone}>{dict.account.statuses[order.status]}</Badge>
                  </div>

                  <ul className="mt-4 flex flex-col gap-1.5 border-t border-border-subtle pt-4">
                    {order.items.map((item) => {
                      const product = getProduct(item.slug);
                      const name = product ? t(product.name, locale) : item.slug;
                      const details = [
                        'material' in item && item.material ? dict.materials[item.material] : null,
                        'finish' in item && item.finish ? dict.finishes[item.finish] : null,
                      ].filter(Boolean);

                      return (
                        <li key={item.slug} className="text-sm text-text-secondary">
                          {details.length > 0 ? `${name} (${details.join(', ')})` : name}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
                    {order.tracking ? (
                      <p className="flex items-center gap-2 text-xs text-text-muted">
                        <TruckIcon className="size-4" />
                        {order.tracking}
                      </p>
                    ) : (
                      <span />
                    )}
                    <p className="text-base font-bold text-text-primary">
                      {formatPrice(order.total, locale)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="flex flex-col gap-5">
            <div className="rounded-md border border-border-subtle bg-surface p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                {dict.account.deliveryDetails}
              </h2>
              <address className="mt-4 text-sm not-italic leading-relaxed text-text-secondary">
                Jan Kowalski
                <br />
                ul. Przykładowa 8/3
                <br />
                35-100 Rzeszów
                <br />
                <span className="text-text-muted">+48 600 100 200</span>
              </address>
              <LinkButton
                href={localePath(locale, '/contact')}
                variant="secondary"
                size="sm"
                className="mt-4"
              >
                {dict.account.changeDetails}
              </LinkButton>
            </div>

            <div className="rounded-md border border-border-subtle bg-surface p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                {dict.account.savedCars}
              </h2>
              <ul className="mt-4 flex flex-col gap-4">
                {savedCars.map((car) => (
                  <li key={car.name}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <WrenchIcon className="size-4 text-accent-fg" />
                      {car.name}
                    </p>
                    <p className="mt-0.5 pl-6 text-xs text-text-muted">{car.detail}</p>
                    <p className="mt-1 pl-6 text-xs text-text-muted">
                      {dict.account.orderedParts} {car.parts}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border-subtle pt-4 text-xs leading-relaxed text-text-muted">
                {dict.account.savedCarsNote}{' '}
                <Link
                  href={localePath(locale, '/categories')}
                  className="text-text-brand underline focus-ring"
                >
                  {dict.account.goToCatalog}
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
