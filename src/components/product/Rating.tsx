import { StarIcon } from '@/components/ui/Icon';
import { cn, plural } from '@/lib/utils';

/**
 * Ocena w gwiazdkach. Same gwiazdki sa dekoracyjne - wartosc podawana jest
 * tekstem, zeby czytnik ekranu nie odczytywal piecu ikon po kolei.
 */
export function Rating({
  value,
  count,
  size = 'md',
  showCount = true,
  className,
}: {
  value: number;
  count?: number;
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
        <span className="sr-only">Ocena: </span>
        {value.toFixed(1)}
        {showCount && count !== undefined && (
          <>
            {' '}
            <span className="text-text-muted">
              ({count} {plural(count, 'opinia', 'opinie', 'opinii')})
            </span>
          </>
        )}
      </span>
    </div>
  );
}
