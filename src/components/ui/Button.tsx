import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'inverse' | 'on-dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'btn inline-flex items-center justify-center font-display font-extrabold italic ' +
  'transition-[background-color,color,border-color,translate] duration-150 ' +
  'ease-out-quint focus-ring ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'active:translate-y-px';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-text-on-brand hover:bg-accent-hover active:bg-accent-active',
  secondary:
    'border-2 border-border-strong bg-transparent text-text-primary ' +
    'hover:bg-text-primary hover:text-bg-base',
  ghost: 'text-text-secondary hover:bg-bg-muted hover:text-text-primary',
  /* The surface behind is navy in both themes, so colours skip the theme tokens. */
  'on-dark':
    'border-2 border-carbon-50 bg-transparent text-carbon-50 ' +
    'hover:bg-carbon-50 hover:text-carbon-950',
  /* Fixed in both themes: the --danger-text token lightens in dark mode. */
  danger: 'bg-danger-600 text-white hover:bg-danger-700',
  inverse: 'bg-bg-inverse text-text-inverse hover:bg-carbon-700 dark:hover:bg-carbon-200',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-9 px-4 text-xs',
  md: 'min-h-11 px-6 text-sm',
  lg: 'min-h-13 px-8 text-base',
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
      <span className="btn-face">{children}</span>
    </button>
  );
}

/** Link variant - visually identical, but semantically navigation. */
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
      <span className="btn-face">{children}</span>
    </Link>
  );
}
