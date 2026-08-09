'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@/components/ui/Icon';

const STORAGE_KEY = 'bodykit-theme';

type Theme = 'light' | 'dark';

/**
 * Skrypt wstawiany do <head> i wykonywany synchronicznie przed pierwszym
 * malowaniem. Bez niego strona mrugnelaby jasnym motywem, zanim React
 * zdazylby ustawic klase - efekt szczegolnie drazniacy w ciemnym motywie.
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

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setMounted(true);
  }, []);

  // Reaguj na zmiane ustawien systemowych, ale tylko gdy uzytkownik
  // nie dokonal wlasnego wyboru.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      const next: Theme = event.matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      setTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Brak dostepu do storage - motyw zmieni sie tylko na czas sesji.
    }
    setTheme(next);
  }

  const label = theme === 'dark' ? 'Włącz motyw jasny' : 'Włącz motyw ciemny';

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
      {/* Przed hydracja renderujemy stala ikone, zeby markup serwera i klienta
          byly zgodne; po zamontowaniu przelaczamy na wlasciwa. */}
      {!mounted || theme === 'light' ? (
        <MoonIcon className="size-5" />
      ) : (
        <SunIcon className="size-5" />
      )}
    </button>
  );
}
