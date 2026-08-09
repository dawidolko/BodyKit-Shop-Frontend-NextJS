import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LinkButton } from '@/components/ui/Button';
import { CheckIcon, MailIcon, TruckIcon, WrenchIcon } from '@/components/ui/Icon';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags } from '@/i18n/config';

type Params = { locale: string };

/**
 * Icons for the follow-up steps, in the same order as dict.thankYou.steps.
 * Only the wording is translated, so the icons stay outside the dictionary.
 */
const stepIcons = [MailIcon, TruckIcon, WrenchIcon];

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.thankYou.title,
    description: dict.thankYou.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/checkout/thank-you'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/checkout/thank-you')]),
      ),
    },
    // Order confirmation is only ever reached after a submit - keep it out of
    // the index so it never shows up as a search result.
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent-subtle text-success">
          <CheckIcon className="size-8" />
        </span>

        <h1 className="mt-6 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
          {dict.thankYou.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-text-secondary">{dict.thankYou.lead}</p>

        <p className="mx-auto mt-6 inline-flex flex-col rounded-md border border-border-subtle bg-surface px-8 py-4">
          <span className="text-xs uppercase tracking-wider text-text-muted">
            {dict.thankYou.orderNumber}
          </span>
          <span className="mt-1 font-mono text-lg font-bold text-text-primary">BK-2026-04812</span>
        </p>

        <div className="mt-8 rounded-sm border border-warning/40 bg-warning/5 p-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            <strong className="font-bold text-text-primary">{dict.thankYou.demoNoteStrong}</strong>{' '}
            {dict.thankYou.demoNote}
          </p>
        </div>
      </div>

      <ol className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
        {dict.thankYou.steps.map((step, index) => {
          const Icon = stepIcons[index] ?? MailIcon;
          return (
            <li key={step.title} className="rounded-md border border-border-subtle bg-surface p-6">
              <span className="flex size-11 items-center justify-center rounded-sm bg-accent-subtle text-accent-fg">
                <Icon className="size-5" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-text-muted">
                {dict.thankYou.step} {index + 1}
              </p>
              <h2 className="mt-1 text-base font-bold text-text-primary">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.text}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
        <LinkButton href={localePath(locale, '/categories')} size="lg">
          {dict.thankYou.backToCatalog}
        </LinkButton>
        <LinkButton href={localePath(locale, '/account')} size="lg" variant="secondary">
          {dict.thankYou.accountPanel}
        </LinkButton>
      </div>
    </div>
  );
}
