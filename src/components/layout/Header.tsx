'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CartIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from '@/components/ui/Icon';
import { useCart } from '@/lib/cart';
import { categories } from '@/lib/categories';
import { cn, t } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';
import { site } from '@/lib/site';

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const { itemCount, isHydrated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const catalogRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: '/categories', label: dict.nav.catalog },
    { href: '/about', label: dict.nav.about },
    { href: '/business', label: dict.nav.business },
    { href: '/help', label: dict.nav.help },
    { href: '/contact', label: dict.nav.contact },
  ];

  // Close both panels on navigation. Done during render rather than in an
  // effect — this is React's recommended way to reset state when an input
  // changes, and it avoids an extra render pass.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setCatalogOpen(false);
  }

  // Escape closes the panels and returns focus to the button that opened them.
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

  // A click outside the expanded category list dismisses it.
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

  // Lock background scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const href = (path: string) => localePath(locale, path);
  const isActive = (path: string) => {
    const full = href(path);
    return pathname === full || pathname.startsWith(full);
  };

  const cartLabel =
    isHydrated && itemCount > 0 ? dict.nav.cartCount(itemCount) : dict.nav.cartEmpty;

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-base/85 backdrop-blur-md">
      {/* Info bar — permanently dark in both themes, so colours are written
          out directly instead of tokens that invert in dark mode. */}
      <div className="hidden bg-carbon-950 text-carbon-300 md:block">
        <div className="container-page flex items-center justify-between py-2 text-xs">
          <p>{dict.topBar.shipping}</p>
          <p className="flex items-center gap-4">
            <a href={`tel:${site.phoneHref}`} className="hover:text-accent-fg">
              {site.phone}
            </a>
            <span aria-hidden="true" className="opacity-40">
              |
            </span>
            <span>{dict.topBar.hours}</span>
          </p>
        </div>
      </div>

      <div className="container-page flex items-center gap-2 py-3 sm:gap-4">
        <Link
          href={href('/')}
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--focus-ring)"
          aria-label={dict.nav.home}
        >
          {/* Below 380 px the full wordmark would not fit next to the icons,
              so only the monogram is shown. */}
          <Logo
            variant="mark"
            className="h-9 w-auto text-text-primary min-[380px]:hidden"
            decorative
          />
          <Logo className="hidden h-9 w-auto text-text-primary min-[380px]:block" decorative />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label={dict.nav.mainNav} className="ml-6 hidden lg:block">
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
                  isActive('/categories') ? 'text-text-brand' : 'text-text-secondary',
                )}
              >
                {dict.nav.catalog}
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
                          href={href(`/categories/${category.slug}`)}
                          className="block rounded-sm px-3 py-2.5 transition-colors hover:bg-bg-muted focus-ring"
                        >
                          <span className="block text-sm font-semibold text-text-primary">
                            {t(category.name, locale)}
                          </span>
                          <span className="block text-xs text-text-muted">
                            {t(category.tagline, locale)}
                          </span>
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
                  href={href(link.href)}
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

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
          <LanguageSwitcher locale={locale} className="mr-1 hidden sm:flex" />

          <Link
            href={href('/search')}
            aria-label={dict.nav.search}
            className="inline-flex size-10 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring"
          >
            <SearchIcon className="size-5" />
          </Link>

          <ThemeToggle locale={locale} />

          <Link
            href={href('/account')}
            aria-label={dict.nav.account}
            className="hidden size-10 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring sm:inline-flex"
          >
            <UserIcon className="size-5" />
          </Link>

          <Link
            href={href('/cart')}
            className="relative inline-flex size-10 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring"
            aria-label={cartLabel}
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
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring lg:hidden"
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-border-subtle bg-bg-base lg:hidden">
          <nav
            aria-label={dict.nav.mobileNav}
            className="max-h-[calc(100dvh-8rem)] overflow-y-auto px-4 py-4"
          >
            <div className="mb-4 sm:hidden">
              <LanguageSwitcher locale={locale} className="w-fit" />
            </div>

            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
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

            <p className="mb-2 mt-6 px-4 text-xs font-bold uppercase tracking-wider text-text-muted">
              {dict.nav.categoriesLabel}
            </p>
            <ul className="flex flex-col gap-0.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={href(`/categories/${category.slug}`)}
                    className="flex h-11 items-center rounded-sm px-4 text-sm text-text-secondary hover:bg-bg-muted"
                  >
                    {t(category.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-border-subtle px-4 pt-4">
              <Link
                href={href('/account')}
                className="flex h-11 items-center gap-3 text-sm text-text-secondary"
              >
                <UserIcon className="size-5" />
                {dict.nav.account}
              </Link>
              <a
                href={`tel:${site.phoneHref}`}
                className="flex h-11 items-center gap-3 text-sm text-text-secondary"
              >
                {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
