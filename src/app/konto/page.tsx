import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { TruckIcon, WrenchIcon } from '@/components/ui/Icon';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Panel klienta',
  description: 'Historia zamówień, dane do wysyłki i zapisane konfiguracje.',
  alternates: { canonical: '/konto/' },
  robots: { index: false, follow: true },
};

const orders = [
  {
    id: 'BK-2026-04788',
    date: '2026-07-28',
    status: 'W drodze',
    tone: 'accent' as const,
    total: 134800,
    items: ['Splitter przedni Street GT (ABS, czarny połysk)', 'Canardy boczne Aero Fin'],
    tracking: 'DPD 0012 4455 8891',
  },
  {
    id: 'BK-2026-04512',
    date: '2026-06-14',
    status: 'Dostarczone',
    tone: 'success' as const,
    total: 89900,
    items: ['Spoiler Ducktail Classic (ABS, czarny mat)'],
    tracking: null,
  },
  {
    id: 'BK-2026-03980',
    date: '2026-04-02',
    status: 'Dostarczone',
    tone: 'success' as const,
    total: 219900,
    items: ['Dyfuzor karbonowy Vortex (karbon połysk)'],
    tracking: null,
  },
];

const savedCars = [
  { name: 'BMW Seria 3 G20', detail: '2021, M-Pakiet', parts: 4 },
  { name: 'Toyota GR86', detail: '2023, wersja podstawowa', parts: 2 },
];

export default function AccountPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/konto/', label: 'Panel klienta' }]} />
      <PageHeader
        title="Panel klienta"
        description="Podgląd zamówień, zapisane auta i dane do wysyłki."
      />

      <div className="container-page pb-16">
        <div className="mb-8 rounded-sm border border-warning/40 bg-warning/5 p-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            <strong className="font-bold text-text-primary">Widok demonstracyjny.</strong> Panel
            pokazuje przykładowe dane — w tym projekcie nie ma logowania ani zapisu po stronie
            serwera.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <section aria-labelledby="orders-heading">
            <h2 id="orders-heading" className="text-xl font-extrabold uppercase tracking-tight">
              Historia zamówień
            </h2>

            <ul className="mt-5 flex flex-col gap-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="rounded-md border border-border-subtle bg-surface p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm font-bold text-text-primary">{order.id}</p>
                      <p className="mt-0.5 text-xs text-text-muted">
                        <time dateTime={order.date}>
                          {new Date(order.date).toLocaleDateString('pl-PL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      </p>
                    </div>
                    <Badge tone={order.tone}>{order.status}</Badge>
                  </div>

                  <ul className="mt-4 flex flex-col gap-1.5 border-t border-border-subtle pt-4">
                    {order.items.map((item) => (
                      <li key={item} className="text-sm text-text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
                    {order.tracking ? (
                      <p className="flex items-center gap-2 text-xs text-text-muted">
                        <TruckIcon className="size-4" />
                        {order.tracking}
                      </p>
                    ) : (
                      <span />
                    )}
                    <p className="text-base font-bold text-text-primary">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="flex flex-col gap-5">
            <div className="rounded-md border border-border-subtle bg-surface p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Dane do wysyłki
              </h2>
              <address className="mt-4 text-sm not-italic leading-relaxed text-text-secondary">
                Jan Kowalski
                <br />
                ul. Przykładowa 8/3
                <br />
                35-100 Rzeszów
                <br />
                <span className="text-text-muted">+48 600 100 200</span>
              </address>
              <LinkButton href="/kontakt/" variant="secondary" size="sm" className="mt-4">
                Zmień dane
              </LinkButton>
            </div>

            <div className="rounded-md border border-border-subtle bg-surface p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Zapisane auta
              </h2>
              <ul className="mt-4 flex flex-col gap-4">
                {savedCars.map((car) => (
                  <li key={car.name}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <WrenchIcon className="size-4 text-accent-fg" />
                      {car.name}
                    </p>
                    <p className="mt-0.5 pl-6 text-xs text-text-muted">{car.detail}</p>
                    <p className="mt-1 pl-6 text-xs text-text-muted">
                      Zamówione części: {car.parts}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border-subtle pt-4 text-xs leading-relaxed text-text-muted">
                Zapisane auto pozwala filtrować katalog tylko do pasujących części.{' '}
                <Link href="/kategorie/" className="text-text-brand underline focus-ring">
                  Przejdź do katalogu
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
