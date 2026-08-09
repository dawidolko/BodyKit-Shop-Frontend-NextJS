import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';
import { CheckIcon, ShieldIcon, TruckIcon, WrenchIcon } from '@/components/ui/Icon';
import { absoluteLocaleUrl, canonicalUrl, site } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags } from '@/i18n/config';

type PageParams = { locale: string };

const PATH = '/business';

/**
 * Structural data for the tier cards. The middle tier is the one we highlight;
 * everything textual comes from dict.business.tiers, zipped in by index.
 */
const tierFeatured = [false, true, false];

/** Icons for the benefit list, zipped with dict.business.benefits by index. */
const benefitIcons = [TruckIcon, WrenchIcon, ShieldIcon];

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.business.title,
    description: dict.business.description,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, PATH)]),
      ),
    },
    openGraph: {
      url: absoluteLocaleUrl(locale, PATH),
      title: `${dict.business.title} — ${site.name}`,
      description: dict.business.description,
    },
  };
}

export default async function BusinessPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs items={[{ href: PATH, label: dict.nav.business }]} locale={locale} dict={dict} />
      <PageHeader title={dict.business.title} description={dict.business.description} />

      <div className="container-page pb-8">
        <Picture
          name="business-fleet"
          alt={dict.business.imageAlt}
          sizes="(min-width: 1536px) 88rem, 95vw"
          priority
          className="rounded-lg border border-border-subtle"
        />
      </div>

      <section aria-labelledby="tiers-heading" className="container-page py-12">
        <h2 id="tiers-heading" className="text-2xl font-extrabold uppercase tracking-tight">
          {dict.business.tiersHeading}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          {dict.business.tiersLead}
        </p>

        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {dict.business.tiers.map((tier, index) => {
            const featured = tierFeatured[index] ?? false;
            return (
              <li
                key={tier.name}
                className={`flex flex-col rounded-md border bg-surface p-6 ${
                  featured ? 'border-border-brand shadow-(--shadow-md)' : 'border-border-subtle'
                }`}
              >
                {featured && (
                  <p className="mb-3 inline-flex self-start rounded-xs bg-accent px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-text-on-brand">
                    {dict.business.mostPopular}
                  </p>
                )}
                <h3 className="text-lg font-bold text-text-primary">{tier.name}</h3>
                <p className="mt-1 text-xs text-text-muted">{tier.threshold}</p>
                <p className="mt-4 font-display text-4xl font-extrabold text-accent-fg">
                  {tier.discount}
                </p>
                <p className="text-xs uppercase tracking-wider text-text-muted">
                  {dict.business.discountLabel}
                </p>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-2.5 text-sm text-text-secondary">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="benefits-heading"
        className="border-y border-border-subtle bg-bg-subtle"
      >
        <div className="container-page py-14">
          <h2 id="benefits-heading" className="text-2xl font-extrabold uppercase tracking-tight">
            {dict.business.benefitsHeading}
          </h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-3">
            {dict.business.benefits.map((benefit, index) => {
              const Icon = benefitIcons[index] ?? ShieldIcon;
              return (
                <li key={benefit.title}>
                  <span className="flex size-11 items-center justify-center rounded-sm bg-accent-subtle text-accent-fg">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-text-primary">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{benefit.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="apply-heading" className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="apply-heading" className="text-2xl font-extrabold uppercase tracking-tight">
            {dict.business.applyHeading}
          </h2>
          <ol className="mt-8 flex flex-col gap-5 text-left">
            {dict.business.applySteps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-text-on-brand">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-text-secondary">{step}</span>
              </li>
            ))}
          </ol>

          <LinkButton href={localePath(locale, '/contact')} size="lg" className="mt-10">
            {dict.business.applyCta}
          </LinkButton>
        </div>
      </section>
    </>
  );
}
