'use client';

import { useSyncExternalStore } from 'react';
import { MoonIcon, SunIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';

const STORAGE_KEY = 'bodykit-theme';

type Theme = 'light' | 'dark';

/**
 * Injected into <head> and executed synchronously before first paint. Without
 * it the page would flash the light theme before React could apply the class —
 * especially jarring for someone who chose dark mode.
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`.trim();

/**
 * The theme lives outside React, as a class on <html> set by the init script.
 * useSyncExternalStore reads it straight from the source, so we need neither a
 * setState inside an effect nor a duplicate copy of the state.
 */
function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  // A change in system settings only affects the theme when the visitor has
  // not made an explicit choice.
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onMediaChange = (event: MediaQueryListEvent) => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    document.documentElement.classList.toggle('dark', event.matches);
  };
  media.addEventListener('change', onMediaChange);

  return () => {
    observer.disconnect();
    media.removeEventListener('change', onMediaChange);
  };
}

const getTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

/** There is no DOM during prerender — assume light and correct after hydration. */
const getServerTheme = (): Theme => 'light';

export function ThemeToggle({ locale, className }: { locale: Locale; className?: string }) {
  const dict = getDictionary(locale);
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // No storage access — the theme changes for this session only.
    }
  }

  const label = theme === 'dark' ? dict.theme.toLight : dict.theme.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={
        'inline-flex size-10 items-center justify-center rounded-sm text-text-secondary ' +
        'transition-colors hover:bg-bg-muted hover:text-text-primary ' +
        'focus-ring ' +
        (className ?? '')
      }
    >
      {/* getServerTheme returns 'light', so server and client markup agree on
          the first render. */}
      {theme === 'light' ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
    </button>
  );
}
