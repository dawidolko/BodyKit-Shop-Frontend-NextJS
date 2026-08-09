import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

export function ProcessSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="process-heading" className="container-page py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <Picture
            name="hero-garage"
            alt={dict.home.processImageAlt}
            sizes="(min-width: 1024px) 40rem, 90vw"
            className="rounded-lg border border-border-subtle"
          />
          {/* Slanted accent echoing the splitter shape in the logo. */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 bg-accent/20 clip-slant"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-text-brand">
            {dict.home.processEyebrow}
          </p>
          <h2 id="process-heading" className="mt-2 text-3xl font-extrabold uppercase sm:text-4xl">
            {dict.home.processHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {dict.home.processLead}
          </p>

          <ol className="mt-8 flex flex-col gap-6">
            {dict.home.processSteps.map((step) => (
              <li key={step.number} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="font-display text-2xl font-extrabold text-accent-fg"
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="text-base font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <LinkButton href={localePath(locale, '/help')} variant="secondary" className="mt-8">
            {dict.home.processCta}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
