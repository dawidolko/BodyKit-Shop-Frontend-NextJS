import { LinkButton } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

export function CtaBanner({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="cta-heading" className="container-page pb-20">
      <div className="relative overflow-hidden rounded-lg border border-border-subtle">
        <Picture
          name="cta-banner"
          alt=""
          sizes="(min-width: 1536px) 88rem, 95vw"
          className="h-full w-full"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-carbon-950 via-carbon-950/80 to-transparent"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-lg p-8 sm:p-12">
            <h2
              id="cta-heading"
              className="text-2xl font-extrabold uppercase leading-tight text-carbon-50 sm:text-3xl"
            >
              {dict.home.ctaBannerHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-carbon-300 sm:text-base">
              {dict.home.ctaBannerText}
            </p>
            <LinkButton href={localePath(locale, '/contact')} className="mt-6">
              {dict.home.ctaBannerButton}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
