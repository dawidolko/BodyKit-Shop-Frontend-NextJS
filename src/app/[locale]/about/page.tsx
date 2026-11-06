import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/Icon';
import { absoluteLocaleUrl, canonicalUrl, ogImage, seoTitle, site } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags } from '@/i18n/config';

type PageParams = { locale: string };

const PATH = '/about';

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: seoTitle(dict.about.title, locale),
    description: dict.about.metaDescription,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, PATH)]),
      ),
    },
    openGraph: {
      images: [ogImage],
      url: absoluteLocaleUrl(locale, PATH),
      title: `${dict.about.title} — ${site.name}`,
      description: dict.about.metaDescription,
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs items={[{ href: PATH, label: dict.nav.about }]} locale={locale} dict={dict} />
      <PageHeader title={dict.about.title} description={dict.about.description} />

      <Picture
        name="about-workshop"
        alt={dict.about.imageAlt}
        sizes="100vw"
        priority
        className="max-h-[32rem] w-full"
      />

      <section aria-labelledby="story-heading" className="container-page py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-2xl">
            <h2 id="story-heading" className="type-display-md">
              {dict.about.storyHeading}
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-text-secondary">
              {dict.about.story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-12 type-display-md">{dict.about.valuesHeading}</h2>
            <ul className="mt-6 flex flex-col gap-6">
              {dict.about.values.map((value) => (
                <li key={value.title} className="flex gap-4">
                  <CheckIcon className="mt-1 size-5 shrink-0 text-accent-fg" />
                  <div>
                    <h3 className="text-base font-bold text-text-primary">{value.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{value.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="sheet p-6">
              <h2 className="text-sm font-bold text-text-muted">{dict.about.milestonesHeading}</h2>
              <ol className="mt-5 flex flex-col gap-5">
                {dict.about.milestones.map((milestone) => (
                  <li key={milestone.year} className="flex gap-4">
                    <span className="type-display text-lg text-accent-fg">{milestone.year}</span>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {milestone.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5 sheet p-6">
              <p className="text-sm leading-relaxed text-text-secondary">{dict.about.asideText}</p>
              <LinkButton
                href={localePath(locale, '/contact')}
                variant="secondary"
                size="sm"
                className="mt-4"
              >
                {dict.about.asideCta}
              </LinkButton>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
