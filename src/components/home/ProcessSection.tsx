import { Picture } from '@/components/ui/Picture';
import { LinkButton } from '@/components/ui/Button';

const steps = [
  {
    number: '01',
    title: 'Podaj model i rocznik',
    text: 'Filtr dopasowania pokazuje wyłącznie części pasujące do Twojej wersji nadwozia — bez zgadywania.',
  },
  {
    number: '02',
    title: 'Wybierz materiał',
    text: 'ABS pod lakier, lekkie FRP albo pełny karbon. Przy każdym wariancie podajemy wagę i sposób montażu.',
  },
  {
    number: '03',
    title: 'Zamontuj według instrukcji',
    text: 'W zestawie znajdziesz komplet mocowań, taśmę przyciętą na wymiar i instrukcję krok po kroku.',
  },
];

export function ProcessSection() {
  return (
    <section aria-labelledby="proces-heading" className="container-page py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <Picture
            name="hero-garage"
            alt="Samochód sportowy w hali warsztatowej przygotowany do montażu elementów karoserii"
            sizes="(min-width: 1024px) 40rem, 90vw"
            className="rounded-lg border border-border-subtle"
          />
          {/* Ukosny akcent nawiazujacy do ksztaltu splittera w logo */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 bg-accent/20 clip-slant"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-text-brand">
            Jak to działa
          </p>
          <h2 id="proces-heading" className="mt-2 text-3xl font-extrabold uppercase sm:text-4xl">
            Trzy kroki do nowej sylwetki auta
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Najczęstszy problem z dokładkami to montaż: element nie przylega, trzeba szpachlować
            albo dowiercać otwory. Dlatego każdy produkt opisujemy przez konkretne roczniki, a nie
            „uniwersalne dopasowanie”.
          </p>

          <ol className="mt-8 flex flex-col gap-6">
            {steps.map((step) => (
              <li key={step.number} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="font-display text-2xl font-extrabold text-accent"
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="text-base font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <LinkButton href="/pomoc/" variant="secondary" className="mt-8">
            Sprawdź poradnik montażu
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
