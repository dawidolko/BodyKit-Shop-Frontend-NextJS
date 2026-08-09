'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { ThemeToggle } from './ThemeToggle';
import { CartIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from '@/components/ui/Icon';
import { useCart } from '@/lib/cart';
import { categories } from '@/lib/categories';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/kategorie/', label: 'Katalog' },
  { href: '/o-nas/', label: 'O nas' },
  { href: '/dla-firm/', label: 'Dla firm' },
  { href: '/pomoc/', label: 'Pomoc' },
  { href: '/kontakt/', label: 'Kontakt' },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, isHydrated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const catalogRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Zamknij oba panele przy zmianie trasy - inaczej menu zostaje otwarte
  // po przejsciu na nowa strone.
  useEffect(() => {
    setMenuOpen(false);
    setCatalogOpen(false);
  }, [pathname]);

  // Escape zamyka panele, a fokus wraca na przycisk, ktory je otworzyl.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      if (catalogOpen) setCatalogOpen(false);
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, catalogOpen]);

  // Klikniecie poza rozwinieta liste kategorii ja zamyka.
  useEffect(() => {
    if (!catalogOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!catalogRef.current?.contains(event.target as Node)) {
        setCatalogOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [catalogOpen]);

  // Zablokuj przewijanie tla, gdy otwarte jest menu mobilne.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href.replace(/\/$/, '') + '/');

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-base/85 backdrop-blur-md">
      {/* Pasek informacyjny */}
      <div className="hidden bg-bg-inverse text-text-inverse md:block">
        <div className="container-page flex items-center justify-between py-2 text-xs">
          <p>Darmowa dostawa od 500 zł · Wysyłka w 24 h</p>
          <p className="flex items-center gap-4">
            <a href="tel:+48178123456" className="hover:text-accent">
              +48 17 812 34 56
            </a>
            <span aria-hidden="true" className="opacity-40">
              |
            </span>
            <span>pn-pt 8:00-17:00</span>
          </p>
        </div>
      </div>

      <div className="container-page flex items-center gap-4 py-3">
        <Link
          href="/"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
          aria-label="BodyKit Shop - strona główna"
        >
          <Logo className="h-9 w-auto text-text-primary" decorative />
        </Link>

        {/* Nawigacja desktopowa */}
        <nav aria-label="Nawigacja główna" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            <li ref={catalogRef} className="relative">
              <button
                type="button"
                onClick={() => setCatalogOpen((open) => !open)}
                aria-expanded={catalogOpen}
                aria-controls="catalog-panel"
                className={cn(
                  'flex h-10 items-center gap-1.5 rounded-sm px-4 text-sm font-semibold uppercase tracking-wide transition-colors',
                  'hover:bg-bg-muted focus-ring',
                  isActive('/kategorie/') ? 'text-text-brand' : 'text-text-secondary',
                )}
              >
                Katalog
                <svg
                  viewBox="0 0 24 24"
                  className={cn('size-4 transition-transform', catalogOpen && 'rotate-180')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {catalogOpen && (
                <div
                  id="catalog-panel"
                  className="absolute left-0 top-full z-50 mt-2 w-136 rounded-md border border-border-subtle bg-surface-raised p-3 shadow-(--shadow-lg)"
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {categories.map((category) => (
                      <li key={category.slug}>
                        <Link
                          href={`/kategorie/${category.slug}/`}
                          className="block rounded-sm px-3 py-2.5 transition-colors hover:bg-bg-muted focus-ring"
                        >
                          <span className="block text-sm font-semibold text-text-primary">
                            {category.name}
                          </span>
                          <span className="block text-xs text-text-muted">{category.tagline}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {navLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'flex h-10 items-center rounded-sm px-4 text-sm font-semibold uppercase tracking-wide transition-colors',
                    'hover:bg-bg-muted focus-ring',
                    isActive(link.href) ? 'text-text-brand' : 'text-text-secondary',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/szukaj/"
            aria-label="Szukaj produktów"
            className="inline-flex size-10 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring"
          >
            <SearchIcon className="size-5" />
          </Link>

          <ThemeToggle />

          <Link
            href="/konto/"
            aria-label="Panel klienta"
            className="hidden size-10 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring sm:inline-flex"
          >
            <UserIcon className="size-5" />
          </Link>

          <Link
            href="/koszyk/"
            className="relative inline-flex size-10 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring"
            aria-label={
              isHydrated && itemCount > 0
                ? `Koszyk, produktów: ${itemCount}`
                : 'Koszyk, pusty'
            }
          >
            <CartIcon className="size-5" />
            {isHydrated && itemCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[0.6875rem] font-bold text-text-on-brand"
              >
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            className="inline-flex size-10 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring lg:hidden"
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobilne */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border-subtle bg-bg-base lg:hidden"
        >
          <nav aria-label="Nawigacja mobilna" className="max-h-[calc(100dvh-8rem)] overflow-y-auto px-4 py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'flex h-12 items-center rounded-sm px-4 text-sm font-semibold uppercase tracking-wide',
                      isActive(link.href)
                        ? 'bg-accent-subtle text-text-brand'
                        : 'text-text-secondary hover:bg-bg-muted',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 mb-2 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">
              Kategorie
            </p>
            <ul className="flex flex-col gap-0.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/kategorie/${category.slug}/`}
                    className="flex h-11 items-center rounded-sm px-4 text-sm text-text-secondary hover:bg-bg-muted"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-border-subtle px-4 pt-4">
              <Link href="/konto/" className="flex h-11 items-center gap-3 text-sm text-text-secondary">
                <UserIcon className="size-5" />
                Panel klienta
              </Link>
              <a href="tel:+48178123456" className="flex h-11 items-center gap-3 text-sm text-text-secondary">
                +48 17 812 34 56
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
