import { LinkButton } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { ArrowRightIcon } from '@/components/ui/Icon';

const stats = [
  { value: '2 400+', label: 'zrealizowanych zamówień' },
  { value: '38', label: 'obsługiwanych modeli aut' },
  { value: '24 h', label: 'wysyłka z magazynu' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-bg-inset">
      <div className="absolute inset-0">
        <Picture
          name="hero-main"
          alt=""
          profile="hero"
          sizes="100vw"
          priority
          className="h-full w-full"
          imgClassName="object-cover"
        />
        {/* Przyciemnienie zapewnia kontrast tekstu niezaleznie od jasnosci zdjecia */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-carbon-950 via-carbon-950/85 to-carbon-950/40"
        />
      </div>

      <div className="container-page relative py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-xs border border-brand-500/40 bg-carbon-950/60 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-400">
            <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            Nowa kolekcja 2026
          </p>

          <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-carbon-50 sm:text-5xl lg:text-6xl">
            Dokładki, które
            <span className="block text-brand-500">pasują za pierwszym razem</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-carbon-300 sm:text-lg">
            Splittery, spoilery i dyfuzory projektowane pod konkretne roczniki i wersje
            nadwozia. Do każdego elementu dostajesz komplet montażowy i instrukcję po
            polsku — bez dopasowywania na miejscu.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/kategorie/" size="lg">
              Przeglądaj katalog
              <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href="/pomoc/" size="lg" variant="on-dark">
              Jak dobrać część?
            </LinkButton>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-carbon-700/60 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-carbon-50 sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-carbon-400">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
