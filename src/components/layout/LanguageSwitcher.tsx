'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/i18n';
import { locales, localeNames, switchLocaleInPath, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * Language switcher.
 *
 * Renders real links rather than a scripted control, so the alternate language
 * is crawlable and works without JavaScript. Each link points at the same page
 * in the other locale by swapping only the locale segment of the path.
 */
export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();

  return (
    <div className={cn('flex items-center', className)}>
      <span className="sr-only" id="language-switcher-label">
        {dict.language.label}
      </span>
      <ul className="flex items-center gap-0.5" aria-labelledby="language-switcher-label">
        {locales.map((code) => {
          const isActive = code === locale;
          return (
            <li key={code}>
              <Link
                href={switchLocaleInPath(pathname, code)}
                hrefLang={code}
                aria-current={isActive ? 'true' : undefined}
                // The accessible name starts with the visible code (WCAG 2.5.3).
                aria-label={
                  isActive
                    ? undefined
                    : `${code.toUpperCase()}: ${dict.language.switchTo(localeNames[code])}`
                }
                className={cn(
                  'type-display flex h-8 items-center px-2 text-xs uppercase transition-colors focus-ring',
                  isActive
                    ? 'text-text-primary underline decoration-accent decoration-2 underline-offset-4'
                    : 'text-text-muted hover:text-text-primary',
                )}
              >
                {code}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
