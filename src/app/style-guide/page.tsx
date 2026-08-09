import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Field';
import { Rating } from '@/components/product/Rating';
import { ProductCard } from '@/components/product/ProductCard';
import {
  ArrowRightIcon,
  CartIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  ShieldIcon,
  TruckIcon,
  UserIcon,
  WrenchIcon,
} from '@/components/ui/Icon';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Design system',
  description:
    'Dokumentacja systemu projektowego BodyKit Shop: kolory, typografia, odstępy, komponenty i zasady dostępności.',
  alternates: { canonical: '/style-guide/' },
  robots: { index: false, follow: true },
};

/**
 * Klasy musza byc zapisane w calosci - Tailwind skanuje pliki statycznie,
 * wiec `bg-brand-${shade}` nigdy nie trafiloby do wynikowego CSS.
 */
const brandScale = [
  { shade: 50, className: 'bg-brand-50' },
  { shade: 100, className: 'bg-brand-100' },
  { shade: 200, className: 'bg-brand-200' },
  { shade: 300, className: 'bg-brand-300' },
  { shade: 400, className: 'bg-brand-400' },
  { shade: 500, className: 'bg-brand-500' },
  { shade: 600, className: 'bg-brand-600' },
  { shade: 700, className: 'bg-brand-700' },
  { shade: 800, className: 'bg-brand-800' },
  { shade: 900, className: 'bg-brand-900' },
  { shade: 950, className: 'bg-brand-950' },
];

const carbonScale = [
  { shade: 50, className: 'bg-carbon-50' },
  { shade: 100, className: 'bg-carbon-100' },
  { shade: 200, className: 'bg-carbon-200' },
  { shade: 300, className: 'bg-carbon-300' },
  { shade: 400, className: 'bg-carbon-400' },
  { shade: 500, className: 'bg-carbon-500' },
  { shade: 600, className: 'bg-carbon-600' },
  { shade: 700, className: 'bg-carbon-700' },
  { shade: 800, className: 'bg-carbon-800' },
  { shade: 900, className: 'bg-carbon-900' },
  { shade: 950, className: 'bg-carbon-950' },
];

const semanticTokens = [
  { token: '--bg-base', usage: 'Tło strony' },
  { token: '--surface', usage: 'Tło kart i paneli' },
  { token: '--text-primary', usage: 'Tekst główny (≥16:1)' },
  { token: '--text-secondary', usage: 'Tekst uzupełniający (≥7:1)' },
  { token: '--text-muted', usage: 'Podpisy i metadane (≥5:1)' },
  { token: '--accent', usage: 'Tło elementów akcji' },
  { token: '--text-on-brand', usage: 'Tekst na akcencie (6.6:1)' },
  { token: '--border-subtle', usage: 'Linie rozdzielające' },
  { token: '--focus-ring', usage: 'Pierścień fokusu' },
];

const sections = [
  { id: 'kolory', label: 'Kolory' },
  { id: 'typografia', label: 'Typografia' },
  { id: 'odstepy', label: 'Odstępy i promienie' },
  { id: 'przyciski', label: 'Przyciski' },
  { id: 'formularze', label: 'Formularze' },
  { id: 'plakietki', label: 'Plakietki i oceny' },
  { id: 'ikony', label: 'Ikony' },
  { id: 'karty', label: 'Karty produktu' },
  { id: 'dostepnosc', label: 'Dostępność' },
];

export default function StyleGuidePage() {
  const sample = products.slice(0, 2);

  return (
    <>
      <Breadcrumbs items={[{ href: '/style-guide/', label: 'Design system' }]} />
      <PageHeader
        title="Design system"
        description="Dokumentacja tokenów i komponentów użytych w BodyKit Shop. Wszystkie pary kolorów przetestowano pod kątem WCAG 2.2 AA w obu motywach."
      />

      <div className="container-page pb-16">
        <div className="grid gap-10 lg:grid-cols-[14rem_1fr]">
          <nav aria-label="Sekcje dokumentacji" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Sekcje</p>
            <ul className="mt-4 flex flex-col gap-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex min-w-0 flex-col gap-16">
            {/* Logo */}
            <section aria-labelledby="logo-heading">
              <h2 id="logo-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Znak marki
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-center rounded-md border border-border-subtle bg-surface p-8">
                  <Logo className="h-12 w-auto text-text-primary" />
                </div>
                <div className="flex items-center justify-center rounded-md border border-border-subtle bg-carbon-950 p-8">
                  <Logo className="h-12 w-auto text-carbon-50" />
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Monogram zbudowany jest z ukośnego splittera. Ten sam kąt wraca w narzędziu{' '}
                <code className="rounded-xs bg-bg-muted px-1.5 py-0.5 text-xs text-text-primary">
                  .clip-slant
                </code>{' '}
                i w kaflach kategorii.
              </p>
            </section>

            {/* Kolory */}
            <section id="kolory" aria-labelledby="colors-heading" className="scroll-mt-28">
              <h2 id="colors-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Kolory
              </h2>

              <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-text-muted">
                Marka — elektryczny pomarańcz
              </h3>
              <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
                {brandScale.map((entry) => (
                  <li key={entry.shade}>
                    <div
                      className={`h-14 rounded-sm border border-border-subtle ${entry.className}`}
                    />
                    <p className="mt-1 text-center text-[0.6875rem] text-text-muted">
                      {entry.shade}
                    </p>
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-text-muted">
                Carbon — baza neutralna
              </h3>
              <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
                {carbonScale.map((entry) => (
                  <li key={entry.shade}>
                    <div
                      className={`h-14 rounded-sm border border-border-subtle ${entry.className}`}
                    />
                    <p className="mt-1 text-center text-[0.6875rem] text-text-muted">
                      {entry.shade}
                    </p>
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-text-muted">
                Tokeny semantyczne
              </h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[32rem] border-collapse text-sm">
                  <caption className="sr-only">Tokeny semantyczne i ich zastosowanie</caption>
                  <thead>
                    <tr className="border-b border-border-default text-left">
                      <th scope="col" className="py-2 pr-4 font-bold text-text-primary">
                        Token
                      </th>
                      <th scope="col" className="py-2 font-bold text-text-primary">
                        Zastosowanie
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {semanticTokens.map((entry) => (
                      <tr key={entry.token} className="border-b border-border-subtle">
                        <td className="py-2.5 pr-4">
                          <code className="rounded-xs bg-bg-muted px-1.5 py-0.5 text-xs text-text-primary">
                            {entry.token}
                          </code>
                        </td>
                        <td className="py-2.5 text-text-secondary">{entry.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Typografia */}
            <section id="typografia" aria-labelledby="type-heading" className="scroll-mt-28">
              <h2 id="type-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Typografia
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Nagłówki: Barlow Condensed (700-800). Tekst: Barlow (400-600). Obie rodziny ładowane
                lokalnie przez{' '}
                <code className="rounded-xs bg-bg-muted px-1.5 py-0.5 text-xs text-text-primary">
                  next/font
                </code>
                .
              </p>

              <div className="mt-6 flex flex-col gap-5 rounded-md border border-border-subtle bg-surface p-6">
                <div>
                  <p className="text-xs text-text-muted">Display / 3rem / 800</p>
                  <p className="font-display text-5xl font-extrabold uppercase">
                    Dokładki i spoilery
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">H2 / 1.875rem / 800</p>
                  <h3 className="text-3xl font-extrabold uppercase">Wybierz kategorię</h3>
                </div>
                <div>
                  <p className="text-xs text-text-muted">H3 / 1.125rem / 700</p>
                  <p className="text-lg font-bold">Splitter przedni Street GT</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Body / 1rem / 400</p>
                  <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                    Splitter przedni prowadzi powietrze pod nadwoziem i zwiększa docisk przedniej
                    osi przy wyższych prędkościach.
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Small / 0.875rem / 400</p>
                  <p className="text-sm text-text-muted">
                    Wysyłka w 24-48 h · 24 miesiące gwarancji
                  </p>
                </div>
              </div>
            </section>

            {/* Odstępy */}
            <section id="odstepy" aria-labelledby="spacing-heading" className="scroll-mt-28">
              <h2 id="spacing-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Odstępy i promienie
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
                    Skala odstępów
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {[1, 2, 3, 4, 6, 8, 12, 16].map((step) => (
                      <li key={step} className="flex items-center gap-3">
                        <span className="w-10 text-xs text-text-muted">{step * 4}px</span>
                        <span
                          className="h-4 rounded-xs bg-accent"
                          style={{ width: `${step * 4}px` }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
                    Promienie
                  </h3>
                  <ul className="mt-3 grid grid-cols-3 gap-3">
                    {[
                      { name: 'xs', className: 'rounded-xs' },
                      { name: 'sm', className: 'rounded-sm' },
                      { name: 'md', className: 'rounded-md' },
                      { name: 'lg', className: 'rounded-lg' },
                      { name: 'xl', className: 'rounded-xl' },
                      { name: 'full', className: 'rounded-full' },
                    ].map((radius) => (
                      <li key={radius.name}>
                        <div
                          className={`h-14 border-2 border-accent bg-accent-subtle ${radius.className}`}
                        />
                        <p className="mt-1 text-center text-xs text-text-muted">{radius.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Przyciski */}
            <section id="przyciski" aria-labelledby="buttons-heading" className="scroll-mt-28">
              <h2 id="buttons-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Przyciski
              </h2>
              <div className="mt-5 flex flex-col gap-6 rounded-md border border-border-subtle bg-surface p-6">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    Warianty
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="inverse">Inverse</Button>
                    <Button variant="danger">Danger</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    Rozmiary
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">
                      Large
                      <ArrowRightIcon className="size-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    Na ciemnym tle
                  </p>
                  <div className="flex flex-wrap items-center gap-3 rounded-sm bg-carbon-950 p-4">
                    <Button>Primary</Button>
                    <Button variant="on-dark">On dark</Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Formularze */}
            <section id="formularze" aria-labelledby="forms-heading" className="scroll-mt-28">
              <h2 id="forms-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Formularze
              </h2>
              <div className="mt-5 grid gap-5 rounded-md border border-border-subtle bg-surface p-6 sm:grid-cols-2">
                <Field label="Pole tekstowe" htmlFor="sg-text" required>
                  <Input id="sg-text" placeholder="Wpisz tekst…" />
                </Field>
                <Field label="Pole z błędem" htmlFor="sg-error" error="Podaj poprawny adres e-mail">
                  <Input id="sg-error" defaultValue="niepoprawny@" aria-invalid />
                </Field>
                <Field label="Lista wyboru" htmlFor="sg-select" hint="Wskazówka pod etykietą">
                  <Select id="sg-select" defaultValue="">
                    <option value="" disabled>
                      Wybierz…
                    </option>
                    <option>ABS</option>
                    <option>Karbon</option>
                  </Select>
                </Field>
                <Field label="Pole wyłączone" htmlFor="sg-disabled">
                  <Input id="sg-disabled" disabled defaultValue="Niedostępne" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Obszar tekstowy" htmlFor="sg-textarea">
                    <Textarea id="sg-textarea" rows={3} placeholder="Opisz sprawę…" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Checkbox id="sg-check" label="Pole wyboru z etykietą" defaultChecked />
                </div>
              </div>
            </section>

            {/* Plakietki */}
            <section id="plakietki" aria-labelledby="badges-heading" className="scroll-mt-28">
              <h2 id="badges-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Plakietki i oceny
              </h2>
              <div className="mt-5 flex flex-col gap-5 rounded-md border border-border-subtle bg-surface p-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge tone="accent">-16%</Badge>
                  <Badge tone="neutral">Nowość</Badge>
                  <Badge tone="outline">Bestseller</Badge>
                  <Badge tone="success">Dostępny</Badge>
                  <Badge tone="danger">Wyprzedany</Badge>
                  <Badge tone="on-image">Na zdjęciu</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <Rating value={4.7} count={128} />
                  <Rating value={4.0} count={12} size="sm" />
                  <Rating value={5.0} showCount={false} />
                </div>
              </div>
            </section>

            {/* Ikony */}
            <section id="ikony" aria-labelledby="icons-heading" className="scroll-mt-28">
              <h2 id="icons-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Ikony
              </h2>
              <ul className="mt-5 grid grid-cols-4 gap-4 rounded-md border border-border-subtle bg-surface p-6 sm:grid-cols-6 lg:grid-cols-9">
                {[
                  { Icon: CartIcon, name: 'cart' },
                  { Icon: SearchIcon, name: 'search' },
                  { Icon: UserIcon, name: 'user' },
                  { Icon: CheckIcon, name: 'check' },
                  { Icon: TruckIcon, name: 'truck' },
                  { Icon: ShieldIcon, name: 'shield' },
                  { Icon: WrenchIcon, name: 'wrench' },
                  { Icon: PhoneIcon, name: 'phone' },
                  { Icon: MailIcon, name: 'mail' },
                ].map(({ Icon, name }) => (
                  <li key={name} className="flex flex-col items-center gap-1.5">
                    <Icon className="size-6 text-text-secondary" />
                    <span className="text-[0.6875rem] text-text-muted">{name}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Ikony rysowane są{' '}
                <code className="rounded-xs bg-bg-muted px-1.5 py-0.5 text-xs text-text-primary">
                  currentColor
                </code>
                . Bez atrybutu{' '}
                <code className="rounded-xs bg-bg-muted px-1.5 py-0.5 text-xs text-text-primary">
                  title
                </code>{' '}
                są dekoracyjne i ukryte przed czytnikami ekranu.
              </p>
            </section>

            {/* Karty */}
            <section id="karty" aria-labelledby="cards-heading" className="scroll-mt-28">
              <h2 id="cards-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Karty produktu
              </h2>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                {sample.map((product) => (
                  <li key={product.slug} className="flex">
                    <ProductCard product={product} className="w-full" />
                  </li>
                ))}
              </ul>
            </section>

            {/* Dostępność */}
            <section id="dostepnosc" aria-labelledby="a11y-heading" className="scroll-mt-28">
              <h2 id="a11y-heading" className="text-xl font-extrabold uppercase tracking-tight">
                Dostępność
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {[
                  {
                    title: 'Kontrast',
                    text: 'Wszystkie pary tekst/tło osiągają minimum 4.5:1, a elementy interfejsu 3:1. Biały tekst na pomarańczu dawał tylko 2.8:1, dlatego na powierzchniach akcentu używamy ciemnego atramentu (6.6:1).',
                  },
                  {
                    title: 'Fokus',
                    text: 'Jednolity pierścień 2px z odstępem 2px, wspólna klasa .focus-ring. Widoczny tylko przy nawigacji klawiaturą (:focus-visible).',
                  },
                  {
                    title: 'Ruch',
                    text: 'Wszystkie animacje respektują prefers-reduced-motion — przy włączonym ograniczeniu czas trwania spada do 0.01 ms.',
                  },
                  {
                    title: 'Formularze',
                    text: 'Każde pole ma powiązaną etykietę, błędy są ogłaszane przez role="alert", a po nieudanej wysyłce fokus przechodzi na podsumowanie błędów.',
                  },
                  {
                    title: 'Nawigacja klawiaturą',
                    text: 'Link pomijający treść, Escape zamyka panele i przywraca fokus, menu i lista kategorii obsługują aria-expanded.',
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="rounded-md border border-border-subtle bg-surface p-5"
                  >
                    <h3 className="flex items-center gap-2 text-sm font-bold text-text-primary">
                      <CheckIcon className="size-4 text-success" />
                      {item.title}
                    </h3>
                    <p className="mt-2 pl-6 text-sm leading-relaxed text-text-muted">{item.text}</p>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm leading-relaxed text-text-muted">
                Pełny opis architektury znajdziesz w pliku README projektu, a wszystkie komponenty w
                działaniu — na{' '}
                <Link href="/" className="text-text-brand underline focus-ring">
                  stronie głównej
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
