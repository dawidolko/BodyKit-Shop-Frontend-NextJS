import type { Metadata } from 'next';
import { LinkButton } from '@/components/ui/Button';
import { CheckIcon, MailIcon, TruckIcon, WrenchIcon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Dziękujemy za zamówienie',
  description: 'Potwierdzenie złożenia zamówienia w BodyKit Shop.',
  alternates: { canonical: '/zamowienie/dziekujemy/' },
  robots: { index: false, follow: false },
};

const nextSteps = [
  {
    icon: MailIcon,
    title: 'Potwierdzenie na e-mail',
    text: 'W ciągu kilku minut wyślemy podsumowanie zamówienia wraz z fakturą proforma.',
  },
  {
    icon: TruckIcon,
    title: 'Kompletacja i wysyłka',
    text: 'Produkty z magazynu pakujemy tego samego dnia roboczego. Numer przesyłki dostaniesz SMS-em.',
  },
  {
    icon: WrenchIcon,
    title: 'Wsparcie przy montażu',
    text: 'Instrukcja jest w zestawie, a w razie pytań nasz dział techniczny odbiera telefon do 17:00.',
  },
];

export default function ThankYouPage() {
  return (
    <div className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent-subtle text-success">
          <CheckIcon className="size-8" />
        </span>

        <h1 className="mt-6 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
          Dziękujemy za zamówienie
        </h1>

        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Zamówienie zostało przyjęte. Poniżej znajdziesz numer referencyjny —
          przyda się, gdybyś chciał dopytać o status.
        </p>

        <p className="mx-auto mt-6 inline-flex flex-col rounded-md border border-border-subtle bg-surface px-8 py-4">
          <span className="text-xs uppercase tracking-wider text-text-muted">
            Numer zamówienia
          </span>
          <span className="mt-1 font-mono text-lg font-bold text-text-primary">
            BK-2026-04812
          </span>
        </p>

        <div className="mt-8 rounded-sm border border-warning/40 bg-warning/5 p-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            <strong className="font-bold text-text-primary">To sklep demonstracyjny.</strong>{' '}
            Zamówienie nie zostało nigdzie wysłane, żadne dane nie zostały zapisane
            i nie pobrano żadnej płatności.
          </p>
        </div>
      </div>

      <ol className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
        {nextSteps.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="rounded-md border border-border-subtle bg-surface p-6">
            <span className="flex size-11 items-center justify-center rounded-sm bg-accent-subtle text-accent-fg">
              <Icon className="size-5" />
            </span>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-text-muted">
              Krok {index + 1}
            </p>
            <h2 className="mt-1 text-base font-bold text-text-primary">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
        <LinkButton href="/kategorie/" size="lg">
          Wróć do katalogu
        </LinkButton>
        <LinkButton href="/konto/" size="lg" variant="secondary">
          Panel klienta
        </LinkButton>
      </div>
    </div>
  );
}
