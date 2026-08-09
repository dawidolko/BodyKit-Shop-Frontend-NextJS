'use client';

import { useState } from 'react';
import { Picture } from '@/components/ui/Picture';
import { cn } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';

/**
 * Product gallery with thumbnails.
 * The thumbnails form a radio group - arrow keys switch images, and the active
 * thumbnail is marked with aria-checked.
 */
export function ProductGallery({
  images,
  productName,
  locale,
}: {
  images: string[];
  productName: string;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0]!;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-md border border-border-subtle bg-bg-muted">
        <Picture
          name={current}
          alt={dict.product.galleryAlt(productName, active + 1, images.length)}
          ratio={1}
          sizes="(min-width: 1024px) 36rem, 92vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div role="radiogroup" aria-label={dict.product.gallery} className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              role="radio"
              aria-checked={index === active}
              aria-label={dict.product.showImage(index + 1)}
              onClick={() => setActive(index)}
              className={cn(
                'w-20 shrink-0 overflow-hidden rounded-sm border-2 transition-colors focus-ring',
                index === active
                  ? 'border-border-brand'
                  : 'border-border-subtle hover:border-border-strong',
              )}
            >
              <Picture name={image} alt="" ratio={1} sizes="5rem" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
