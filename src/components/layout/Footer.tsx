import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { categories } from '@/lib/categories';
import { MailIcon, PhoneIcon, ShieldIcon, TruckIcon, WrenchIcon } from '@/components/ui/Icon';

const columns = [
  {
    title: 'Sklep',
    links: [
      { href: '/kategorie/', label: 'Wszystkie kategorie' },
      { href: '/szukaj/', label: 'Wyszukiwarka' },
      { href: '/pakiety/', label: 'Pakiety montażowe' },
      { href: '/dla-firm/', label: 'Oferta dla warsztatów' },
    ],
  },
  {
    title: 'Obsługa klienta',
    links: [
      { href: '/pomoc/', label: 'Centrum pomocy' },
      { href: '/kontakt/', label: 'Kontakt' },
      { href: '/konto/', label: 'Panel klienta' },
      { href: '/regulamin/', label: 'Regulamin i zwroty' },
    ],
  },
  {
    title: 'Firma',
    links: [
      { href: '/o-nas/', label: 'O BodyKit Shop' },
      { href: '/dla-firm/', label: 'Współpraca B2B' },
      { href: '/style-guide/', label: 'Design system' },
    ],
  },
];

const guarantees = [
  {
    icon: TruckIcon,
    title: 'Wysyłka w 24 h',
    text: 'Produkty z magazynu wysyłamy tego samego dnia.',
  },
  { icon: ShieldIcon, title: '24 miesiące gwarancji', text: 'Na wady materiałowe i wykonanie.' },
  {
    icon: WrenchIcon,
    title: 'Wsparcie montażu',
    text: 'Instrukcje PL i pomoc techniczna telefoniczna.',
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border-subtle bg-bg-subtle">
      {/* Pas gwarancji */}
      <div className="border-b border-border-subtle">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-3">
          {guarantees.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-accent-subtle text-accent-fg">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-text-primary">{title}</p>
                <p className="mt-0.5 text-sm text-text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6 kolumn: blok marki zajmuje 2, cztery nawigacje po jednej */}
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo className="h-10 w-auto text-text-primary" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
            Dokładki, spoilery i elementy karbonowe dopasowane do konkretnych modeli aut. Każdy
            produkt opisujemy tak, żebyś wiedział, co dostajesz, zanim klikniesz „do koszyka”.
          </p>

          <address className="mt-6 flex flex-col gap-2 text-sm not-italic text-text-secondary">
            <a
              href="tel:+48178123456"
              className="flex items-center gap-2.5 hover:text-text-brand focus-ring rounded-xs"
            >
              <PhoneIcon className="size-4 text-text-muted" />
              +48 17 812 34 56
            </a>
            <a
              href="mailto:kontakt@bodykitshop.pl"
              className="flex items-center gap-2.5 hover:text-text-brand focus-ring rounded-xs"
            >
              <MailIcon className="size-4 text-text-muted" />
              kontakt@bodykitshop.pl
            </a>
            <p className="mt-1 text-text-muted">ul. Warsztatowa 12, 35-001 Rzeszów</p>
          </address>
        </div>

        <nav aria-label="Kategorie produktów">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">
            Kategorie
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {categories.slice(0, 6).map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/kategorie/${category.slug}/`}
                  className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              {column.title}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border-subtle">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BodyKit Shop. Projekt demonstracyjny.</p>
          <p>Sklep prezentacyjny — zamówienia nie są realizowane, a płatności nie są pobierane.</p>
        </div>
      </div>
    </footer>
  );
}
