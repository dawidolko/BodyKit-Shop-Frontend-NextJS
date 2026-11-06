import Link from 'next/link';
import { LinkButton } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { getCategory } from '@/lib/categories';
import { getMakes } from '@/lib/products';
import { t } from '@/lib/utils';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

/*
 * Callouts read like the balloons on an exploded parts diagram. Positions are
 * percentages of the photo, which is why its frame keeps the photo's ratio
 * instead of letting object-fit crop it.
 */
const callouts = [
  { slug: 'carbon-parts', left: '79.5%', top: '44%', leader: '2.5rem', show: 'hidden xl:flex' },
  { slug: 'wheels', left: '71%', top: '80%', leader: '3.5rem', show: 'hidden xl:flex' },
  /* The plate covers this point of the car on narrower desktops. */
  {
    slug: 'front-splitters',
    left: '52.5%',
    top: '91%',
    leader: '2rem',
    show: 'hidden min-[1400px]:flex',
  },
];

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      <section className="livery relative isolate overflow-hidden lg:flex lg:min-h-[35rem]">
        <div className="relative aspect-[16/10] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-[7/3] lg:h-full lg:w-auto">
          <Picture
            name="hero-main"
            alt=""
            sizes="(min-width: 1024px) 82rem, 100vw"
            priority
            preloaded
            className="h-full w-full"
            imgClassName="object-cover object-[72%_center] lg:object-center"
          />
          {callouts.map(({ slug, left, top, leader, show }) => {
            const category = getCategory(slug);
            if (!category) return null;
            return (
              <Link
                key={slug}
                href={localePath(locale, `/categories/${slug}`)}
                className={`callout focus-ring ${show}`}
                style={{ left, top }}
              >
                <span aria-hidden="true" className="callout-line" style={{ width: leader }} />
                <span className="callout-label">{t(category.name, locale)}</span>
              </Link>
            );
          })}
        </div>

        <div className="hero-plate flex flex-col items-start justify-center px-4 py-8 lg:w-[56%] lg:py-8 lg:pl-[max(1.5rem,calc((100vw-90rem)/2+1.5rem))] lg:pr-16">
          <p className="index-tab">{dict.home.badge}</p>

          <h1 className="type-display-xl mt-4 text-carbon-50">
            <span className="block">{dict.home.headlineTop}</span>
            <span className="block">{dict.home.headlineAccent}</span>
          </h1>

          <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-carbon-200">
            {dict.home.lead}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <LinkButton href={localePath(locale, '/categories')} size="lg" className="ml-1.5">
              {dict.home.ctaPrimary}
            </LinkButton>
            <Link
              href={localePath(locale, '/help')}
              className="font-semibold text-carbon-50 underline decoration-sky decoration-2 underline-offset-4 focus-ring hover:text-sky"
            >
              {dict.home.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="makes-heading"
        className="border-b-2 border-border-strong bg-surface"
      >
        <div className="container-page flex flex-wrap items-center gap-x-10 gap-y-3 py-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 id="makes-heading" className="type-display text-sm">
              {dict.home.shopByMake}
            </h2>
            <ul className="flex flex-wrap gap-1.5">
              {getMakes().map((make) => (
                <li key={make}>
                  <Link
                    href={`${localePath(locale, '/search')}?q=${encodeURIComponent(make)}`}
                    className="inline-flex min-h-8 items-center border border-border-default px-3 text-sm font-semibold text-text-secondary transition-colors hover:border-border-strong hover:bg-text-primary hover:text-bg-base focus-ring"
                  >
                    {make}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <dl className="flex flex-wrap gap-x-8 gap-y-1 lg:ml-auto">
            {dict.home.stats.map((stat) => (
              <div key={stat.label} className="flex flex-row-reverse items-baseline gap-1.5">
                <dt className="text-xs text-text-muted">{stat.label}</dt>
                <dd className="type-display text-base text-text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
