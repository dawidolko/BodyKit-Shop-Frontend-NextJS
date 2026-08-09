import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'inverse' | 'on-dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase ' +
  'transition-[background-color,color,border-color,translate,box-shadow] duration-200 ' +
  'ease-(--ease-out-quint) rounded-sm focus-ring ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'active:translate-y-px';

const variants: Record<Variant, string> = {
  // Ciemny atrament na pomaranczu - 6.63:1, sprawdzone dla obu motywow.
  primary:
    'bg-accent text-text-on-brand hover:bg-accent-hover active:bg-accent-active ' +
    'shadow-[0_2px_0_0_var(--accent-active)] hover:shadow-[0_1px_0_0_var(--accent-active)]',
  secondary:
    'border border-border-default bg-surface text-text-primary ' +
    'hover:border-border-brand hover:text-text-brand',
  ghost: 'text-text-secondary hover:bg-bg-muted hover:text-text-primary',
  // Do uzycia na sekcjach z ciemnym tlem (hero, banery) - kolory nie zaleza
  // od motywu, bo tlo pod przyciskiem jest ciemne w obu.
  'on-dark':
    'border border-carbon-600 bg-carbon-950/40 text-carbon-50 backdrop-blur-sm ' +
    'hover:border-brand-500 hover:bg-carbon-950/70 hover:text-brand-400',
  // Stale ciemne tlo w obu motywach - token --danger-text rozjasnia sie w dark,
  // przez co bialy napis spadalby do 2.8:1.
  danger: 'bg-danger-600 text-white hover:bg-danger-700',
  inverse: 'bg-bg-inverse text-text-inverse hover:bg-carbon-700 dark:hover:bg-carbon-200',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps & ComponentPropsWithoutRef<'button'>;
type LinkButtonProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

/** Wariant linkowy - wizualnie identyczny, ale semantycznie nawigacja. */
export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...rest
}: LinkButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}
