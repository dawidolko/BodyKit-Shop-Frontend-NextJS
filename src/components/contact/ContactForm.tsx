'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Field';
import { CheckIcon } from '@/components/ui/Icon';
import { site } from '@/lib/site';
import { getDictionary, type Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';

type Errors = Partial<Record<string, string>>;

function validate(
  name: string,
  value: string,
  required: boolean,
  dict: Dictionary,
): string | undefined {
  const trimmed = value.trim();
  if (required && !trimmed) return dict.contact.validation.required;
  if (name === 'email' && trimmed && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(trimmed)) {
    return dict.contact.validation.email;
  }
  if (name === 'message' && trimmed && trimmed.length < 20) {
    return dict.contact.validation.message(trimmed.length);
  }
  return undefined;
}

/**
 * Contact form.
 *
 * There is no backend - this is a static shop - so after validation we show a
 * confirmation and state plainly that the message was not sent. Faking a
 * submission would mislead the user.
 */
export function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  function handleBlur(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, required } = event.target;
    setErrors((current) => ({ ...current, [name]: validate(name, value, required, dict) }));
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
      const error = validate(name, value, required, dict);
      if (error) next[name] = error;
    }

    if (!data.get('privacy')) {
      next.privacy = dict.contact.validation.privacy;
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
        <h2 className="mt-4 text-lg font-bold text-text-primary">{dict.contact.sentHeading}</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{dict.contact.sentText}</p>
        <p className="mt-4 text-sm text-text-secondary">
          {dict.contact.sentContactPrefix}{' '}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-text-brand underline focus-ring"
          >
            {site.email}
          </a>
          .
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
          {dict.contact.fillAgain}
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
            {dict.contact.fixFields(errorEntries.length)}
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
        <Field label={dict.contact.name} htmlFor="contact-name" required error={errors.name}>
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
        <Field label={dict.contact.email} htmlFor="contact-email" required error={errors.email}>
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

      <Field label={dict.contact.topic} htmlFor="contact-topic" required error={errors.topic}>
        <Select
          id="contact-topic"
          name="topic"
          required
          defaultValue=""
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.topic)}
        >
          <option value="" disabled>
            {dict.contact.topicPlaceholder}
          </option>
          {dict.contact.topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </Select>
      </Field>

      <Field label={dict.contact.car} htmlFor="contact-car" hint={dict.contact.carHint}>
        <Input
          id="contact-car"
          name="car"
          onBlur={handleBlur}
          aria-describedby="contact-car-hint"
        />
      </Field>

      <Field label={dict.contact.message} htmlFor="contact-message" required error={errors.message}>
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
              {dict.contact.privacy}
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
        {dict.contact.submit}
      </Button>
    </form>
  );
}
