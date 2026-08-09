'use client';

import { useSyncExternalStore } from 'react';
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

/**
 * Motyw zyje poza Reactem - jako klasa na <html> ustawiana przez skrypt
 * inicjalizujacy. useSyncExternalStore czyta go bezposrednio ze zrodla,
 * dzieki czemu nie potrzebujemy setState w efekcie ani osobnej kopii stanu.
 */
function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  // Zmiana ustawien systemowych wplywa na motyw tylko wtedy, gdy uzytkownik
  // nie dokonal wlasnego wyboru.
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

/** Podczas prerenderu nie ma DOM - zakladamy motyw jasny i korygujemy po hydracji. */
const getServerTheme = (): Theme => 'light';

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Brak dostepu do storage - motyw zmieni sie tylko na czas sesji.
    }
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
      {/* getServerTheme zwraca 'light', wiec markup serwera i klienta
          zgadzaja sie przy pierwszym renderze. */}
      {theme === 'light' ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
    </button>
  );
}
