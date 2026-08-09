import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
import { t } from '@/lib/utils';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localePath, localeTags } from '@/i18n/config';

type PageParams = { locale: string };

const PATH = '/style-guide';

/**
 * Class names must be spelled out in full - Tailwind scans source files
 * statically, so `bg-brand-${shade}` would never reach the generated CSS.
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

/** Radius tokens - same static-scanning constraint as the colour scales. */
const radii = [
  { name: 'xs', className: 'rounded-xs' },
  { name: 'sm', className: 'rounded-sm' },
  { name: 'md', className: 'rounded-md' },
  { name: 'lg', className: 'rounded-lg' },
  { name: 'xl', className: 'rounded-xl' },
  { name: 'full', className: 'rounded-full' },
];

/**
 * Token names shown in the semantic token table. The localized usage
 * descriptions come from dict.styleGuide.tokenUsage, keyed by token name.
 */
const tokenNames = [
  '--bg-base',
  '--surface',
  '--text-primary',
  '--text-secondary',
  '--text-muted',
  '--accent',
  '--text-on-brand',
  '--border-subtle',
  '--focus-ring',
];

const iconSamples = [
  { Icon: CartIcon, name: 'cart' },
  { Icon: SearchIcon, name: 'search' },
  { Icon: UserIcon, name: 'user' },
  { Icon: CheckIcon, name: 'check' },
  { Icon: TruckIcon, name: 'truck' },
  { Icon: ShieldIcon, name: 'shield' },
  { Icon: WrenchIcon, name: 'wrench' },
  { Icon: PhoneIcon, name: 'phone' },
  { Icon: MailIcon, name: 'mail' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.styleGuide.title,
    description: dict.styleGuide.description,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, PATH)]),
      ),
    },
    robots: { index: false, follow: true },
  };
}

export default async function StyleGuidePage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const sample = products.slice(0, 2);
  const sampleCategory = dict.home.categoriesHeading;

  /** Token names paired with their localized usage description. */
  const semanticTokens = tokenNames.map((token) => ({
    token,
    usage: dict.styleGuide.tokenUsage[token as keyof typeof dict.styleGuide.tokenUsage],
  }));

  const sections = [
    { id: 'colors', label: dict.styleGuide.colors },
    { id: 'typography', label: dict.styleGuide.typography },
    { id: 'spacing', label: dict.styleGuide.spacing },
    { id: 'buttons', label: dict.styleGuide.buttons },
    { id: 'forms', label: dict.styleGuide.forms },
    { id: 'badges', label: dict.styleGuide.badges },
    { id: 'icons', label: dict.styleGuide.icons },
    { id: 'cards', label: dict.styleGuide.cards },
    { id: 'accessibility', label: dict.styleGuide.accessibility },
  ];

  return (
    <>
      <Breadcrumbs
        items={[{ href: PATH, label: dict.styleGuide.title }]}
        locale={locale}
        dict={dict}
      />
      <PageHeader title={dict.styleGuide.title} description={dict.styleGuide.description} />

      <div className="container-page pb-16">
        <div className="grid gap-10 lg:grid-cols-[14rem_1fr]">
          <nav aria-label={dict.styleGuide.sections} className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {dict.styleGuide.sections}
            </p>
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
            {/* Brand mark */}
            <section aria-labelledby="logo-heading">
              <h2 id="logo-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.brandMark}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-surface p-6 sm:p-8">
                  <Logo className="h-10 w-auto max-w-full text-text-primary sm:h-12" />
                </div>
                <div className="flex items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-carbon-950 p-6 sm:p-8">
                  <Logo className="h-10 w-auto max-w-full text-carbon-50 sm:h-12" />
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {dict.styleGuide.brandMarkNote}
              </p>
            </section>

            {/* Colours */}
            <section id="colors" aria-labelledby="colors-heading" className="scroll-mt-28">
              <h2 id="colors-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.colors}
              </h2>

              <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-text-muted">
                {dict.styleGuide.brandScale}
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
                {dict.styleGuide.carbonScale}
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
                {dict.styleGuide.semanticTokens}
              </h3>
              {/* max-w-full is required: without it a wide table stretches the
                  container instead of scrolling inside it. */}
              <div className="mt-3 max-w-full overflow-x-auto">
                <table className="w-full min-w-lg border-collapse text-sm">
                  <caption className="sr-only">{dict.styleGuide.tokenTableCaption}</caption>
                  <thead>
                    <tr className="border-b border-border-default text-left">
                      <th scope="col" className="py-2 pr-4 font-bold text-text-primary">
                        {dict.styleGuide.token}
                      </th>
                      <th scope="col" className="py-2 font-bold text-text-primary">
                        {dict.styleGuide.usage}
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

            {/* Typography */}
            <section id="typography" aria-labelledby="type-heading" className="scroll-mt-28">
              <h2 id="type-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.typography}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {dict.styleGuide.typographyNote}
              </p>

              <div className="mt-6 flex flex-col gap-5 rounded-md border border-border-subtle bg-surface p-6">
                <div>
                  <p className="text-xs text-text-muted">Display / 3rem / 800</p>
                  <p className="font-display text-5xl font-extrabold uppercase">
                    {dict.meta.keywords[0]}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">H2 / 1.875rem / 800</p>
                  <h3 className="text-3xl font-extrabold uppercase">{sampleCategory}</h3>
                </div>
                <div>
                  <p className="text-xs text-text-muted">H3 / 1.125rem / 700</p>
                  <p className="text-lg font-bold">{sample[0] ? t(sample[0].name, locale) : ''}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Body / 1rem / 400</p>
                  <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                    {sample[0] ? t(sample[0].shortDescription, locale) : ''}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Small / 0.875rem / 400</p>
                  <p className="text-sm text-text-muted">
                    {dict.shipping.fast} · {dict.product.warranty}
                  </p>
                </div>
              </div>
            </section>

            {/* Spacing */}
            <section id="spacing" aria-labelledby="spacing-heading" className="scroll-mt-28">
              <h2 id="spacing-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.spacing}
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
                    {dict.styleGuide.spacingScale}
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
                    {dict.styleGuide.radii}
                  </h3>
                  <ul className="mt-3 grid grid-cols-3 gap-3">
                    {radii.map((radius) => (
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

            {/* Buttons */}
            <section id="buttons" aria-labelledby="buttons-heading" className="scroll-mt-28">
              <h2 id="buttons-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.buttons}
              </h2>
              <div className="mt-5 flex flex-col gap-6 rounded-md border border-border-subtle bg-surface p-6">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    {dict.styleGuide.variants}
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
                    {dict.styleGuide.sizes}
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
                    {dict.styleGuide.onDark}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 rounded-sm bg-carbon-950 p-4">
                    <Button>Primary</Button>
                    <Button variant="on-dark">On dark</Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Forms */}
            <section id="forms" aria-labelledby="forms-heading" className="scroll-mt-28">
              <h2 id="forms-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.forms}
              </h2>
              <div className="mt-5 grid gap-5 rounded-md border border-border-subtle bg-surface p-6 sm:grid-cols-2">
                <Field label={dict.styleGuide.sampleField} htmlFor="sg-text" required>
                  <Input id="sg-text" placeholder={dict.styleGuide.samplePlaceholder} />
                </Field>
                <Field
                  label={dict.styleGuide.sampleError}
                  htmlFor="sg-error"
                  error={dict.styleGuide.sampleErrorMessage}
                >
                  <Input id="sg-error" defaultValue="invalid@" aria-invalid />
                </Field>
                <Field
                  label={dict.styleGuide.sampleSelect}
                  htmlFor="sg-select"
                  hint={dict.styleGuide.sampleSelectHint}
                >
                  <Select id="sg-select" defaultValue="">
                    <option value="" disabled>
                      {dict.styleGuide.sampleChoose}
                    </option>
                    <option>{dict.materials.abs}</option>
                    <option>{dict.materials.carbon}</option>
                  </Select>
                </Field>
                <Field label={dict.styleGuide.sampleDisabled} htmlFor="sg-disabled">
                  <Input
                    id="sg-disabled"
                    disabled
                    defaultValue={dict.styleGuide.sampleDisabledValue}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label={dict.styleGuide.sampleTextarea} htmlFor="sg-textarea">
                    <Textarea
                      id="sg-textarea"
                      rows={3}
                      placeholder={dict.styleGuide.sampleDescribe}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Checkbox id="sg-check" label={dict.styleGuide.sampleCheckbox} defaultChecked />
                </div>
              </div>
            </section>

            {/* Badges */}
            <section id="badges" aria-labelledby="badges-heading" className="scroll-mt-28">
              <h2 id="badges-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.badges}
              </h2>
              <div className="mt-5 flex flex-col gap-5 rounded-md border border-border-subtle bg-surface p-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge tone="accent">-16%</Badge>
                  <Badge tone="neutral">{dict.badges.new}</Badge>
                  <Badge tone="outline">{dict.badges.bestseller}</Badge>
                  <Badge tone="success">{dict.product.available}</Badge>
                  <Badge tone="danger">{dict.product.outOfStockShort}</Badge>
                  <Badge tone="on-image">{dict.badges.lastUnits}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <Rating value={4.7} count={128} dict={dict} />
                  <Rating value={4.0} count={12} dict={dict} size="sm" />
                  <Rating value={5.0} dict={dict} showCount={false} />
                </div>
              </div>
            </section>

            {/* Icons */}
            <section id="icons" aria-labelledby="icons-heading" className="scroll-mt-28">
              <h2 id="icons-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.icons}
              </h2>
              <ul className="mt-5 grid grid-cols-4 gap-4 rounded-md border border-border-subtle bg-surface p-6 sm:grid-cols-6 lg:grid-cols-9">
                {iconSamples.map(({ Icon, name }) => (
                  <li key={name} className="flex flex-col items-center gap-1.5">
                    <Icon className="size-6 text-text-secondary" />
                    <span className="text-[0.6875rem] text-text-muted">{name}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {dict.styleGuide.iconsNote}
              </p>
            </section>

            {/* Product cards */}
            <section id="cards" aria-labelledby="cards-heading" className="scroll-mt-28">
              <h2 id="cards-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.cards}
              </h2>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                {sample.map((product) => (
                  <li key={product.slug} className="flex">
                    <ProductCard product={product} locale={locale} dict={dict} className="w-full" />
                  </li>
                ))}
              </ul>
            </section>

            {/* Accessibility */}
            <section id="accessibility" aria-labelledby="a11y-heading" className="scroll-mt-28">
              <h2 id="a11y-heading" className="text-xl font-extrabold uppercase tracking-tight">
                {dict.styleGuide.accessibility}
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {dict.styleGuide.a11yItems.map((item) => (
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
                {dict.styleGuide.accessibilityFooter}{' '}
                <Link
                  href={localePath(locale, '/')}
                  className="text-text-brand underline focus-ring"
                >
                  {dict.styleGuide.homePage}
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
