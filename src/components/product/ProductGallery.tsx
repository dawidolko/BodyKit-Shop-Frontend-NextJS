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
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 bg-bg-muted">
        <Picture
          name={current}
          alt={dict.product.galleryAlt(productName, active + 1, images.length)}
          ratio={1}
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
          preloaded={active === 0}
          className="h-full w-full"
        />
      </div>

      {images.length > 1 && (
        <div
          role="radiogroup"
          aria-label={dict.product.gallery}
          className="grid grid-flow-col gap-px bg-border-subtle"
        >
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              role="radio"
              aria-checked={index === active}
              aria-label={dict.product.showImage(index + 1)}
              onClick={() => setActive(index)}
              className={cn(
                'relative overflow-hidden focus-visible:z-10 focus-visible:-outline-offset-4',
                "after:absolute after:inset-x-0 after:bottom-0 after:h-1.5 after:content-['']",
                index === active ? 'after:bg-accent' : 'opacity-80 hover:opacity-100',
              )}
            >
              <Picture name={image} alt="" ratio={3} sizes="20vw" className="w-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
