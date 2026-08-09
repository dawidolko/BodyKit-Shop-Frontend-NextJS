'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Field';
import { CheckIcon } from '@/components/ui/Icon';
import { plural } from '@/lib/utils';

type Errors = Partial<Record<string, string>>;

const topics = [
  'Dobór części do mojego auta',
  'Pytanie o dostępność i termin',
  'Montaż i instrukcja',
  'Reklamacja lub zwrot',
  'Współpraca B2B',
  'Inne',
];

function validate(name: string, value: string, required: boolean): string | undefined {
  const trimmed = value.trim();
  if (required && !trimmed) return 'To pole jest wymagane';
  if (name === 'email' && trimmed && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(trimmed)) {
    return 'Podaj poprawny adres e-mail';
  }
  if (name === 'message' && trimmed && trimmed.length < 20) {
    return `Opisz sprawę nieco szerzej (min. 20 znaków, masz ${trimmed.length})`;
  }
  return undefined;
}

/**
 * Formularz kontaktowy.
 *
 * Nie ma backendu - to sklep statyczny - wiec po walidacji pokazujemy
 * potwierdzenie i jasno zaznaczamy, ze wiadomosc nie zostala wyslana.
 * Udawanie wysylki byloby wprowadzaniem uzytkownika w blad.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  function handleBlur(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, required } = event.target;
    setErrors((current) => ({ ...current, [name]: validate(name, value, required) }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};

    for (const [name, value] of data.entries()) {
      if (typeof value !== 'string') continue;
      const element = form.elements.namedItem(name);
      const required =
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
          ? element.required
          : false;
      const error = validate(name, value, required);
      if (error) next[name] = error;
    }

    if (!data.get('privacy')) {
      next.privacy = 'Zgoda na przetwarzanie danych jest wymagana';
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setSent(true);
    form.reset();
    window.requestAnimationFrame(() => confirmationRef.current?.focus());
  }

  const errorEntries = Object.entries(errors).filter(([, message]) => Boolean(message));

  if (sent) {
    return (
      <div
        ref={confirmationRef}
        tabIndex={-1}
        role="status"
        className="rounded-md border border-success/40 bg-success/5 p-8 focus-ring"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-accent-subtle text-success">
          <CheckIcon className="size-6" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-text-primary">Formularz wypełniony poprawnie</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          To jest sklep demonstracyjny, więc wiadomość nie została nigdzie wysłana ani zapisana. W
          działającym sklepie w tym miejscu pojawiłoby się potwierdzenie z numerem zgłoszenia.
        </p>
        <p className="mt-4 text-sm text-text-secondary">
          Jeśli chcesz się z nami skontaktować naprawdę, napisz na{' '}
          <a
            href="mailto:kontakt@bodykitshop.pl"
            className="font-medium text-text-brand underline focus-ring"
          >
            kontakt@bodykitshop.pl
          </a>
          .
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
          Wypełnij ponownie
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-sm border border-danger bg-danger/5 p-4 focus-ring"
        >
          <p className="text-sm font-bold text-danger">
            Popraw {errorEntries.length} {plural(errorEntries.length, 'pole', 'pola', 'pól')}:
          </p>
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-sm text-text-secondary">
            {errorEntries.map(([name, message]) => (
              <li key={name}>
                <a href={`#contact-${name}`} className="underline focus-ring">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Imię i nazwisko" htmlFor="contact-name" required error={errors.name}>
          <Input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
        </Field>
        <Field label="E-mail" htmlFor="contact-email" required error={errors.email}>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
        </Field>
      </div>

      <Field label="Temat" htmlFor="contact-topic" required error={errors.topic}>
        <Select
          id="contact-topic"
          name="topic"
          required
          defaultValue=""
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.topic)}
        >
          <option value="" disabled>
            Wybierz temat…
          </option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Auto (marka, model, rocznik)"
        htmlFor="contact-car"
        hint="Np. BMW Seria 3 G20, 2021, M-Pakiet — pomoże nam odpowiedzieć precyzyjnie"
      >
        <Input
          id="contact-car"
          name="car"
          onBlur={handleBlur}
          aria-describedby="contact-car-hint"
        />
      </Field>

      <Field label="Wiadomość" htmlFor="contact-message" required error={errors.message}>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
      </Field>

      <div>
        <Checkbox
          id="contact-privacy"
          name="privacy"
          aria-invalid={Boolean(errors.privacy)}
          aria-describedby={errors.privacy ? 'contact-privacy-error' : undefined}
          label={
            <>
              Zgadzam się na przetwarzanie moich danych w celu udzielenia odpowiedzi
              <span aria-hidden="true" className="ml-1 text-danger">
                *
              </span>
            </>
          }
        />
        {errors.privacy && (
          <p
            id="contact-privacy-error"
            role="alert"
            className="mt-1.5 text-xs font-medium text-danger"
          >
            {errors.privacy}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="self-start">
        Wyślij wiadomość
      </Button>
    </form>
  );
}
