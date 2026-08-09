import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckIcon } from '@/components/ui/Icon';
import { absoluteUrl } from '@/lib/site';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pakiety montażowe',
  description:
    'Gotowe zestawy elementów tworzące spójną linię nadwozia — splitter, progi i dyfuzor dobrane pod jeden model auta.',
  alternates: { canonical: '/pakiety/' },
  openGraph: { url: absoluteUrl('/pakiety/'), title: 'Pakiety montażowe — BodyKit Shop' },
};

const packages = [
  {
    slug: 'street-line-komplet',
    name: 'Street Line — komplet',
    image: 'shot-detail-6',
    tagline: 'Spójna linia boczna bez ingerencji w nadwozie',
    price: 209900,
    compareAt: 249700,
    contents: [
      'Splitter przedni Street GT',
      'Nakładki progowe Street Line (para)',
      'Dyfuzor tylny Race Fin',
      'Komplet mocowań i taśmy 3M',
    ],
    fits: 'Volkswagen Golf VII/VIII, Audi A3 8V/8Y',
    note: 'Montaż bez wiercenia, ok. 2 godziny w warsztacie.',
  },
  {
    slug: 'carbon-touch',
    name: 'Carbon Touch',
    image: 'cat-karbon',
    tagline: 'Detale z karbonu, które widać z bliska',
    price: 279900,
    compareAt: 319700,
    contents: [
      'Obudowy lusterek karbonowe (para)',
      'Końcówki wydechu Carbon 101 (para)',
      'Listwy progowe karbonowe LED',
      'Zestaw pielęgnacyjny do karbonu',
    ],
    fits: 'BMW Seria 3 G20, BMW Seria 4 G22',
    note: 'Wszystkie elementy w jednym splocie 2x2 twill.',
    featured: true,
  },
  {
    slug: 'track-day',
    name: 'Track Day',
    image: 'shot-detail-5',
    tagline: 'Aerodynamika pod jazdę torową',
    price: 449900,
    compareAt: 509700,
    contents: [
      'Splitter Track Lip Aero z regulacją kąta',
      'Skrzydło GT Wing 1400',
      'Canardy boczne Aero Fin',
      'Instrukcja ustawienia balansu aero',
    ],
    fits: 'Toyota GR86, Subaru BRZ ZD8',
    note: 'Wymaga wiercenia w belce zderzaka i klapie bagażnika.',
  },
];

export default function PackagesPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/pakiety/', label: 'Pakiety' }]} />
      <PageHeader
        title="Pakiety montażowe"
        description="Zestawy złożone z elementów, które projektowano razem — ten sam kąt załamania krawędzi i spójna grubość materiału na całej długości nadwozia."
      />

      <div className="container-page pb-16">
        <ul className="grid gap-6 lg:grid-cols-3">
          {packages.map((pack) => {
            const savings = pack.compareAt - pack.price;
            return (
              <li
                key={pack.slug}
                className={`flex flex-col overflow-hidden rounded-md border bg-surface ${
                  pack.featured
                    ? 'border-border-brand shadow-(--shadow-md)'
                    : 'border-border-subtle'
                }`}
              >
                <div className="relative bg-bg-muted">
                  <Picture
                    name={pack.image}
                    alt=""
                    ratio={1}
                    sizes="(min-width: 1024px) 26rem, 92vw"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge tone="accent">Oszczędzasz {formatPrice(savings)}</Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-bold text-text-primary">{pack.name}</h2>
                  <p className="mt-1 text-sm text-text-muted">{pack.tagline}</p>

                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {pack.contents.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-text-secondary">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-5 border-t border-border-subtle pt-4 text-xs">
                    <dt className="font-bold uppercase tracking-wider text-text-muted">
                      Pasuje do
                    </dt>
                    <dd className="mt-1 text-text-secondary">{pack.fits}</dd>
                    <dt className="mt-3 font-bold uppercase tracking-wider text-text-muted">
                      Montaż
                    </dt>
                    <dd className="mt-1 text-text-secondary">{pack.note}</dd>
                  </dl>

                  <div className="mt-5 border-t border-border-subtle pt-4">
                    <p className="text-xs text-text-muted line-through">
                      {formatPrice(pack.compareAt)}
                    </p>
                    <p className="text-2xl font-extrabold text-text-primary">
                      {formatPrice(pack.price)}
                    </p>
                    <LinkButton href="/kontakt/" className="mt-4 w-full">
                      Zapytaj o pakiet
                    </LinkButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-text-muted">
          Chcesz zestaw pod inny model? Napisz, jakim autem jeździsz i jaki efekt chcesz osiągnąć —
          złożymy propozycję z dostępnych elementów.
        </p>
      </div>
    </>
  );
}
