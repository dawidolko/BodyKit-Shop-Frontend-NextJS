import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const controlBase =
  'w-full rounded-sm border bg-surface px-4 text-sm text-text-primary ' +
  'placeholder:text-text-muted transition-colors duration-150 ' +
  'border-border-default hover:border-border-strong ' +
  'focus-visible:border-border-brand focus-ring ' +
  'disabled:cursor-not-allowed disabled:opacity-60 ' +
  'aria-[invalid=true]:border-danger';

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  /** Error message - linked to the field through aria-describedby. */
  error?: string;
  hint?: string;
  required?: boolean;
  /**
   * Screen-reader-only text appended after the required marker. The asterisk
   * alone is not announced meaningfully, so the wording has to be translatable.
   */
  requiredLabel?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Label + control + hint/error, wired together by id.
 * The error carries role="alert", so a screen reader announces it as soon as
 * it appears.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  requiredLabel,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-text-primary">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-1 text-danger">
              *
            </span>
            {requiredLabel && <span className="sr-only"> {requiredLabel}</span>}
          </>
        )}
      </label>
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="flex items-center gap-1 text-xs font-medium text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...rest }: ComponentPropsWithoutRef<'input'>) {
  return <input className={cn(controlBase, 'h-11', className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentPropsWithoutRef<'textarea'>) {
  return <textarea className={cn(controlBase, 'min-h-32 resize-y py-3', className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentPropsWithoutRef<'select'>) {
  return (
    <select className={cn(controlBase, 'h-11 appearance-none pr-10', className)} {...rest}>
      {children}
    </select>
  );
}

/** Checkbox with a label - the whole row is clickable. */
export function Checkbox({
  label,
  id,
  className,
  ...rest
}: { label: ReactNode } & ComponentPropsWithoutRef<'input'>) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <input
        type="checkbox"
        id={id}
        className={cn(
          'mt-0.5 size-5 shrink-0 cursor-pointer rounded-xs border border-border-default',
          'accent-accent',
          'focus-ring',
        )}
        {...rest}
      />
      <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-text-secondary">
        {label}
      </label>
    </div>
  );
}
