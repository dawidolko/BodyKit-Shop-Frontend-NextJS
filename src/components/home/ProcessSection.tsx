import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

export function ProcessSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="process-heading" className="livery cut-top mt-14 pt-10">
      <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="max-lg:order-2 lg:[clip-path:polygon(0_0,100%_0,calc(100%-6rem)_100%,0_100%)]">
          <Picture
            name="hero-garage"
            alt={dict.home.processImageAlt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full"
          />
        </div>

        <div className="px-4 pb-8 pt-10 md:px-6 lg:max-w-[41rem] lg:py-12 lg:pl-4">
          <p className="index-tab">{dict.home.processEyebrow}</p>
          <h2 id="process-heading" className="type-display-lg mt-2">
            {dict.home.processHeading}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-text-secondary">
            {dict.home.processLead}
          </p>
        </div>
      </div>

      <ol className="container-page py-10">
        {dict.home.processSteps.map((step) => (
          <li
            key={step.number}
            className="grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-1 border-t border-border-default py-4 md:grid-cols-[6rem_minmax(0,22rem)_1fr] md:gap-x-8"
          >
            <span aria-hidden="true" className="type-display-md text-sky max-md:row-span-2">
              {step.number}
            </span>
            <h3 className="text-lg font-bold leading-snug text-text-primary">{step.title}</h3>
            <p className="max-w-prose leading-relaxed text-text-secondary">{step.text}</p>
          </li>
        ))}
        <li className="border-t border-border-default pt-6">
          <LinkButton href={localePath(locale, '/help')} variant="on-dark" className="ml-1.5">
            {dict.home.processCta}
          </LinkButton>
        </li>
      </ol>
    </section>
  );
}
