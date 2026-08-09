'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Checkbox, Field, Input } from '@/components/ui/Field';
import { Picture } from '@/components/ui/Picture';
import { useCart } from '@/lib/cart';
import { formatPrice, t } from '@/lib/utils';
import { getDictionary, type Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';

type Errors = Partial<Record<string, string>>;

/** Delivery option ids are stable identifiers - only the labels are translated. */
type DeliveryId = 'courier' | 'locker' | 'pickup';

const deliveryOptions: { id: DeliveryId; price: number }[] = [
  { id: 'courier', price: 2490 },
  { id: 'locker', price: 1690 },
  { id: 'pickup', price: 0 },
];

/** Validation of a single field - one place for all the rules. */
function validateField(
  name: string,
  value: string,
  dict: Dictionary,
  required = true,
): string | undefined {
  const trimmed = value.trim();
  if (required && !trimmed) return dict.checkout.validation.required;

  switch (name) {
    case 'email':
      if (trimmed && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(trimmed)) {
        return dict.checkout.validation.email;
      }
      break;
    case 'phone':
      if (trimmed && !/^(\+48\s?)?(\d\s?){9}$/.test(trimmed)) {
        return dict.checkout.validation.phone;
      }
      break;
    case 'postalCode':
      if (trimmed && !/^\d{2}-\d{3}$/.test(trimmed)) {
        return dict.checkout.validation.postalCode;
      }
      break;
    case 'nip':
      if (trimmed && !/^\d{10}$/.test(trimmed.replace(/[\s-]/g, ''))) {
        return dict.checkout.validation.taxId;
      }
      break;
  }
  return undefined;
}

/**
 * Checkout form with client-side validation.
 *
 * Errors are collected into a summary above the form which takes focus after a
 * failed submit - that way a person using a screen reader immediately learns
 * what to fix, instead of hunting for errors blindly.
 */
export function CheckoutForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const router = useRouter();
  const { detailedLines, subtotal, isHydrated, clear } = useCart();
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryId>(deliveryOptions[0]!.id);
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const deliveryOption = deliveryOptions.find((option) => option.id === delivery)!;
  const shippingCost = subtotal >= 50000 ? 0 : deliveryOption.price;
  const total = subtotal + shippingCost;

  function handleBlur(event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, required } = event.target;
    const error = validateField(name, value, dict, required);
    setErrors((current) => ({ ...current, [name]: error }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Errors = {};

    for (const [name, value] of data.entries()) {
      if (typeof value !== 'string') continue;
      const element = form.elements.namedItem(name);
      const required =
        element instanceof HTMLInputElement || element instanceof HTMLSelectElement
          ? element.required
          : false;
      const error = validateField(name, value, dict, required);
      if (error) nextErrors[name] = error;
    }

    if (!data.get('terms')) {
      nextErrors.terms = dict.checkout.validation.terms;
    }

    setErrors(nextErrors);
    setSubmitted(true);

    if (Object.keys(nextErrors).length > 0) {
      // Focus the error summary - the screen reader reads the list right away.
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    clear();
    router.push(localePath(locale, '/checkout/thank-you'));
  }

  const errorEntries = Object.entries(errors).filter(([, message]) => Boolean(message));

  if (isHydrated && detailedLines.length === 0) {
    return (
      <div className="container-page pb-16">
        <div className="rounded-md border border-dashed border-border-default px-6 py-16 text-center">
          <p className="text-lg font-bold text-text-primary">{dict.checkout.emptyCart}</p>
          <p className="mt-2 text-sm text-text-muted">{dict.checkout.emptyCartHint}</p>
          <Button
            variant="primary"
            className="mt-6"
            onClick={() => router.push(localePath(locale, '/categories'))}
          >
            {dict.cart.browse}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page pb-16">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-10">
          {submitted && errorEntries.length > 0 && (
            <div
              ref={summaryRef}
              tabIndex={-1}
              role="alert"
              className="rounded-sm border border-danger bg-danger/5 p-4 focus-ring"
            >
              <p className="text-sm font-bold text-danger">
                {dict.checkout.errorSummary(errorEntries.length)}
              </p>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-sm text-text-secondary">
                {errorEntries.map(([name, message]) => (
                  <li key={name}>
                    <a href={`#${name}`} className="underline hover:text-danger focus-ring">
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <fieldset className="flex flex-col gap-5">
            <legend className="mb-2 text-lg font-bold uppercase tracking-wide">
              {dict.checkout.step1}
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={dict.checkout.firstName}
                htmlFor="firstName"
                required
                error={errors.firstName}
              >
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                />
              </Field>
              <Field
                label={dict.checkout.lastName}
                htmlFor="lastName"
                required
                error={errors.lastName}
              >
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                />
              </Field>
              <Field label={dict.checkout.email} htmlFor="email" required error={errors.email}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </Field>
              <Field
                label={dict.checkout.phone}
                htmlFor="phone"
                required
                hint={dict.checkout.phoneHint}
                error={errors.phone}
              >
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-5">
            <legend className="mb-2 text-lg font-bold uppercase tracking-wide">
              {dict.checkout.step2}
            </legend>
            <Field label={dict.checkout.street} htmlFor="street" required error={errors.street}>
              <Input
                id="street"
                name="street"
                required
                autoComplete="street-address"
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.street)}
                aria-describedby={errors.street ? 'street-error' : undefined}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
              <Field
                label={dict.checkout.postalCode}
                htmlFor="postalCode"
                required
                error={errors.postalCode}
              >
                <Input
                  id="postalCode"
                  name="postalCode"
                  required
                  placeholder="00-000"
                  autoComplete="postal-code"
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.postalCode)}
                  aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
                />
              </Field>
              <Field label={dict.checkout.city} htmlFor="city" required error={errors.city}>
                <Input
                  id="city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? 'city-error' : undefined}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 text-lg font-bold uppercase tracking-wide">
              {dict.checkout.step3}
            </legend>
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center gap-4 rounded-sm border p-4 transition-colors ${
                  delivery === option.id
                    ? 'border-border-brand bg-accent-subtle'
                    : 'border-border-subtle hover:border-border-strong'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={delivery === option.id}
                  onChange={() => setDelivery(option.id)}
                  className="size-4 accent-accent focus-ring"
                />
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-text-primary">
                    {dict.checkout.deliveryOptions[option.id].label}
                  </span>
                  <span className="block text-xs text-text-muted">
                    {dict.checkout.deliveryOptions[option.id].time}
                  </span>
                </span>
                <span className="text-sm font-bold text-text-primary">
                  {option.price === 0 ? dict.cart.free : formatPrice(option.price, locale)}
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 text-lg font-bold uppercase tracking-wide">
              {dict.checkout.step4}
            </legend>

            <Checkbox
              id="invoice"
              name="invoice"
              checked={wantsInvoice}
              onChange={(event) => setWantsInvoice(event.target.checked)}
              label={dict.checkout.wantInvoice}
            />

            {wantsInvoice && (
              <div className="grid gap-5 rounded-sm border border-border-subtle p-4 sm:grid-cols-2">
                <Field
                  label={dict.checkout.company}
                  htmlFor="company"
                  required
                  error={errors.company}
                >
                  <Input
                    id="company"
                    name="company"
                    required
                    autoComplete="organization"
                    onBlur={handleBlur}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? 'company-error' : undefined}
                  />
                </Field>
                <Field label={dict.checkout.taxId} htmlFor="nip" required error={errors.nip}>
                  <Input
                    id="nip"
                    name="nip"
                    required
                    inputMode="numeric"
                    placeholder="0000000000"
                    onBlur={handleBlur}
                    aria-invalid={Boolean(errors.nip)}
                    aria-describedby={errors.nip ? 'nip-error' : undefined}
                  />
                </Field>
              </div>
            )}

            <div>
              <Checkbox
                id="terms"
                name="terms"
                aria-invalid={Boolean(errors.terms)}
                aria-describedby={errors.terms ? 'terms-error' : undefined}
                label={
                  <>
                    {dict.checkout.acceptTerms}{' '}
                    <a
                      href={localePath(locale, '/terms')}
                      className="font-medium text-text-brand underline focus-ring"
                    >
                      {dict.checkout.termsLink}
                    </a>{' '}
                    {dict.checkout.andPrivacy}
                    <span aria-hidden="true" className="ml-1 text-danger">
                      *
                    </span>
                  </>
                }
              />
              {errors.terms && (
                <p id="terms-error" role="alert" className="mt-1.5 text-xs font-medium text-danger">
                  {errors.terms}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto">
              {dict.checkout.submit}
            </Button>
          </fieldset>
        </form>

        {/* Order summary */}
        <aside
          aria-labelledby="order-summary"
          className="rounded-md border border-border-subtle bg-surface p-6 lg:sticky lg:top-28"
        >
          <h2 id="order-summary" className="text-lg font-bold uppercase tracking-wide">
            {dict.checkout.yourOrder}
          </h2>

          <ul className="mt-5 flex flex-col gap-4">
            {detailedLines.map((line) => (
              <li key={`${line.productSlug}-${line.variantId}`} className="flex gap-3">
                <div className="w-14 shrink-0 overflow-hidden rounded-sm">
                  <Picture
                    name={line.product.images[0] ?? 'shot-detail-1'}
                    alt=""
                    ratio={1}
                    sizes="3.5rem"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {t(line.product.name, locale)}
                  </p>
                  <p className="text-xs text-text-muted">
                    {dict.cart.quantityLabel(line.quantity)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-text-primary">
                  {formatPrice(line.lineTotal, locale)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-6 flex flex-col gap-2.5 border-t border-border-subtle pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">{dict.cart.products(detailedLines.length)}</dt>
              <dd className="text-text-primary">{formatPrice(subtotal, locale)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">{dict.cart.delivery}</dt>
              <dd className="text-text-primary">
                {shippingCost === 0 ? (
                  <span className="text-success">{dict.cart.free}</span>
                ) : (
                  formatPrice(shippingCost, locale)
                )}
              </dd>
            </div>
            <div className="mt-1 flex justify-between border-t border-border-subtle pt-3">
              <dt className="text-base font-bold text-text-primary">{dict.cart.grandTotal}</dt>
              <dd className="text-xl font-extrabold text-text-primary">
                {formatPrice(total, locale)}
              </dd>
            </div>
          </dl>

          <p className="mt-5 text-xs leading-relaxed text-text-muted">{dict.checkout.demoNote}</p>
        </aside>
      </div>
    </div>
  );
}
