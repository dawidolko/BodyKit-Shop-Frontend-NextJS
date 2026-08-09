import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeTone = 'accent' | 'neutral' | 'success' | 'danger' | 'outline' | 'on-image';

const tones: Record<BadgeTone, string> = {
  accent: 'bg-accent text-text-on-brand',
  neutral: 'bg-bg-muted text-text-secondary',
  success: 'bg-bg-muted text-success',
  danger: 'bg-danger text-white',
  outline: 'border border-border-default text-text-secondary',
  // Na zdjeciu produktowym nie wiemy, czy tlo jest jasne czy ciemne,
  // wiec plakietka niesie wlasne, stale kontrastowe tlo.
  'on-image': 'bg-carbon-950/85 text-carbon-50 backdrop-blur-sm',
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
        'inline-flex items-center gap-1 rounded-xs px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-wider',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
