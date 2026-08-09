import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/Icon';
import { absoluteLocaleUrl, canonicalUrl, site } from '@/lib/site';
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
    title: dict.about.title,
    description: dict.about.description,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, PATH)]),
      ),
    },
    openGraph: {
      url: absoluteLocaleUrl(locale, PATH),
      title: `${dict.about.title} — ${site.name}`,
      description: dict.about.description,
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

      <div className="container-page pb-8">
        <Picture
          name="about-workshop"
          alt={dict.about.imageAlt}
          sizes="(min-width: 1536px) 88rem, 95vw"
          priority
          className="rounded-lg border border-border-subtle"
        />
      </div>

      <section aria-labelledby="story-heading" className="container-page py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-2xl">
            <h2 id="story-heading" className="text-2xl font-extrabold uppercase tracking-tight">
              {dict.about.storyHeading}
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-text-secondary">
              {dict.about.story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-extrabold uppercase tracking-tight">
              {dict.about.valuesHeading}
            </h2>
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

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-md border border-border-subtle bg-surface p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                {dict.about.milestonesHeading}
              </h2>
              <ol className="mt-5 flex flex-col gap-5">
                {dict.about.milestones.map((milestone) => (
                  <li key={milestone.year} className="flex gap-4">
                    <span className="font-display text-lg font-extrabold text-accent-fg">
                      {milestone.year}
                    </span>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {milestone.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5 rounded-md border border-border-subtle bg-bg-subtle p-6">
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
