import { StarIcon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { Dictionary } from '@/i18n';

/**
 * Star rating. The stars themselves are decorative — the value is exposed as
 * text so a screen reader does not read out five icons in a row.
 */
export function Rating({
  value,
  count,
  dict,
  size = 'md',
  showCount = true,
  className,
}: {
  value: number;
  count?: number;
  dict: Dictionary;
  size?: 'sm' | 'md';
  showCount?: boolean;
  className?: string;
}) {
  const rounded = Math.round(value);
  const starSize = size === 'sm' ? 'size-3.5' : 'size-4';

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className="flex gap-0.5 text-accent-fg" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            filled={star <= rounded}
            className={cn(starSize, star > rounded && 'text-border-default')}
          />
        ))}
      </span>
      <span className={cn('text-text-muted', size === 'sm' ? 'text-xs' : 'text-sm')}>
        <span className="sr-only">{dict.product.rating} </span>
        {value.toFixed(1)}
        {showCount && count !== undefined && (
          <>
            {' '}
            <span className="text-text-muted">({dict.product.reviews(count)})</span>
          </>
        )}
      </span>
    </div>
  );
}
