import { LinkButton } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

export function CtaBanner({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-accent text-white"
    >
      <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-[45%] lg:[clip-path:polygon(6rem_0,100%_0,100%_100%,0_100%)]">
        <Picture name="cta-banner" alt="" sizes="45vw" className="h-full w-full" />
      </div>

      <div className="container-page relative py-12 lg:py-16">
        <div className="max-w-[44rem] lg:max-w-[54%]">
          <h2 id="cta-heading" className="type-display-lg">
            {dict.home.ctaBannerHeading}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed">{dict.home.ctaBannerText}</p>
          <LinkButton
            href={localePath(locale, '/contact')}
            variant="inverse"
            size="lg"
            className="ml-1.5 mt-6"
          >
            {dict.home.ctaBannerButton}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
