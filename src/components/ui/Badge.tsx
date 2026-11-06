import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeTone = 'accent' | 'neutral' | 'success' | 'danger' | 'outline' | 'on-image' | 'hazard';

const tones: Record<BadgeTone, string> = {
  accent: 'bg-accent text-text-on-brand',
  neutral: 'bg-bg-muted text-text-secondary',
  success: 'bg-bg-muted text-success',
  danger: 'bg-danger-600 text-white',
  outline: 'border border-border-default text-text-secondary',
  /* A photo can be light or dark, so the badge brings its own solid surface. */
  'on-image': 'bg-carbon-950 text-carbon-50',
  hazard: 'bg-hazard text-carbon-950',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 py-0.5 pl-2 pr-3 text-xs font-bold',
        '[clip-path:polygon(0_0,100%_0,calc(100%-0.4rem)_100%,0_100%)]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
