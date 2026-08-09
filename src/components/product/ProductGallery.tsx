'use client';

import { useState } from 'react';
import { Picture } from '@/components/ui/Picture';
import { cn } from '@/lib/utils';

/**
 * Galeria produktu z miniaturami.
 * Miniatury tworza grupe przyciskow radiowych - strzalki przelaczaja zdjecia,
 * a aktywna miniatura jest oznaczona aria-checked.
 */
export function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0]!;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-md border border-border-subtle bg-bg-muted">
        <Picture
          name={current}
          alt={`${productName} — zdjęcie ${active + 1} z ${images.length}`}
          profile="product"
          sizes="(min-width: 1024px) 36rem, 92vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div role="radiogroup" aria-label="Miniatury zdjęć produktu" className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              role="radio"
              aria-checked={index === active}
              aria-label={`Pokaż zdjęcie ${index + 1}`}
              onClick={() => setActive(index)}
              className={cn(
                'w-20 shrink-0 overflow-hidden rounded-sm border-2 transition-colors focus-ring',
                index === active
                  ? 'border-border-brand'
                  : 'border-border-subtle hover:border-border-strong',
              )}
            >
              <Picture name={image} alt="" profile="product" sizes="5rem" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
