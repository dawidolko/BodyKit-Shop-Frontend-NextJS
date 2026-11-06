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

const railLink =
  'relative flex h-11 items-center gap-2 px-3 text-sm font-semibold text-text-secondary ' +
  'transition-colors hover:text-text-primary focus-visible:-outline-offset-2 ' +
  'after:absolute after:inset-x-3 after:bottom-0 after:h-1 after:origin-left after:scale-x-0 ' +
  "after:bg-accent after:transition-transform after:content-[''] hover:after:scale-x-100";
const railLinkActive = 'text-text-primary after:scale-x-100';

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const { itemCount, isHydrated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: '/about', label: dict.nav.about },
    { href: '/business', label: dict.nav.business },
    { href: '/help', label: dict.nav.help },
    { href: '/contact', label: dict.nav.contact },
  ];

  /*
   * Closes the menu on navigation. Done during render rather than in an effect:
   * this is React's recommended way to reset state when an input changes, and
   * it avoids an extra render pass.
   */
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  /* Escape closes the menu and returns focus to the button that opened it. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape' || !menuOpen) return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  /* Locks background scrolling while the menu is open. */
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
  const iconButton =
    'inline-flex size-10 items-center justify-center text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring';

  return (
    /*
     * display: contents lets the middle row stick to the viewport on its own:
     * the info bar above it and the index below it scroll away, while all three
     * stay inside one banner landmark.
     */
    <header className="contents">
      <div className="livery hidden bg-bg-inset md:block">
        <div className="container-page flex items-center justify-between py-1.5 text-xs text-carbon-300">
          <p>{dict.topBar.shipping}</p>
          <p className="flex items-center gap-4">
            <a href={`tel:${site.phoneHref}`} className="hover:text-sky">
              {site.phone}
            </a>
            <span>{dict.topBar.hours}</span>
          </p>
        </div>
      </div>

      <div className="livery sticky top-0 z-50">
        <div className="container-page flex h-16 items-center gap-2 sm:gap-4">
          <Link href={href('/')} className="shrink-0 focus-visible:outline-offset-4">
            {/* Accessible name as real text, not aria-label: the SVG wordmark
                renders visible text that an aria-label would not match
                (WCAG 2.5.3, axe label-content-name-mismatch). */}
            <span className="sr-only">{dict.nav.home}</span>
            <Logo
              variant="mark"
              className="h-9 w-auto text-text-primary min-[400px]:hidden"
              decorative
            />
            <Logo className="hidden h-10 w-auto text-text-primary min-[400px]:block" decorative />
          </Link>

          <nav aria-label={dict.nav.mainNav} className="ml-4 hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'flex h-10 items-center px-3 text-sm font-semibold transition-colors hover:text-sky focus-ring',
                      isActive(link.href)
                        ? 'text-sky underline decoration-2 underline-offset-8'
                        : 'text-text-secondary',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <form
            role="search"
            aria-label={dict.nav.quickSearch}
            action={href('/search')}
            className="ml-auto hidden h-10 w-full max-w-sm items-stretch xl:flex"
          >
            <label htmlFor="header-search" className="sr-only">
              {dict.search.label}
            </label>
            <input
              id="header-search"
              type="search"
              name="q"
              placeholder={dict.search.placeholder}
              autoComplete="off"
              className="min-w-0 flex-1 border border-r-0 border-border-default bg-bg-subtle px-3 text-sm text-text-primary placeholder:text-text-muted focus-ring"
            />
            <button
              type="submit"
              aria-label={dict.nav.search}
              className="inline-flex w-10 items-center justify-center border border-border-default text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring"
            >
              <SearchIcon className="size-5" />
            </button>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1 xl:ml-0">
            <LanguageSwitcher locale={locale} className="mr-1 hidden sm:flex" />

            <Link
              href={href('/search')}
              aria-label={dict.nav.search}
              className={cn(iconButton, 'xl:hidden')}
            >
              <SearchIcon className="size-5" />
            </Link>

            <ThemeToggle locale={locale} />

            <Link
              href={href('/account')}
              aria-label={dict.nav.account}
              className={cn(iconButton, 'hidden sm:inline-flex')}
            >
              <UserIcon className="size-5" />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              className={cn(iconButton, 'lg:hidden')}
            >
              {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>

            <Link
              href={href('/cart')}
              className="btn ml-2 inline-flex h-10 items-center bg-accent px-3 text-text-on-brand transition-colors hover:bg-accent-hover focus-ring sm:ml-3 sm:px-4"
            >
              <span className="sr-only">{cartLabel}</span>
              <span aria-hidden="true" className="btn-face">
                <CartIcon className="size-5" />
                <span className="type-display hidden text-sm sm:inline">{dict.nav.cart}</span>
                {isHydrated && itemCount > 0 && (
                  <span className="type-display min-w-4 text-center text-sm">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </span>
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="border-t border-border-subtle lg:hidden">
            <nav
              aria-label={dict.nav.mobileNav}
              className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-4"
            >
              <div className="mb-4 sm:hidden">
                <LanguageSwitcher locale={locale} className="w-fit" />
              </div>

              <ul className="flex flex-col">
                {[{ href: '/categories', label: dict.nav.catalog }, ...navLinks].map((link) => (
                  <li key={link.href} className="border-b border-border-subtle">
                    <Link
                      href={href(link.href)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={cn(
                        'type-display flex h-12 items-center text-lg',
                        isActive(link.href) ? 'text-sky' : 'text-text-primary',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mb-1 mt-6 text-sm font-bold text-text-muted">
                {dict.nav.categoriesLabel}
              </p>
              <ul className="flex flex-col">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={href(`/categories/${category.slug}`)}
                      className="flex h-11 items-center gap-3 text-sm text-text-secondary"
                    >
                      <span className="type-data w-8 text-text-muted">{category.code}</span>
                      {t(category.name, locale)}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-border-subtle pt-4">
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
      </div>

      <nav
        aria-label={dict.nav.catalogIndex}
        className="border-b-2 border-border-strong bg-surface"
      >
        <ul className="no-scrollbar mx-auto flex max-w-[90rem] overflow-x-auto px-1 md:px-3">
          <li className="shrink-0">
            <Link
              href={href('/categories')}
              aria-current={pathname === href('/categories') ? 'page' : undefined}
              className={cn(railLink, pathname === href('/categories') && railLinkActive)}
            >
              {dict.nav.allParts}
            </Link>
          </li>
          {categories.map((category) => {
            const path = href(`/categories/${category.slug}`);
            return (
              <li key={category.slug} className="shrink-0">
                <Link
                  href={path}
                  aria-current={pathname === path ? 'page' : undefined}
                  className={cn(railLink, pathname === path && railLinkActive)}
                >
                  <span className="type-data text-xs text-text-muted">{category.code}</span>
                  {t(category.name, locale)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
