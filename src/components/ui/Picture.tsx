import { asset, cn } from '@/lib/utils';
import manifest from '@/lib/image-manifest.json';

type ManifestEntry = { blur: string; widths: number[]; ratio: number };

const images = manifest as Record<string, ManifestEntry>;

type PictureProps = {
  /** Nazwa pliku bez rozszerzenia, np. "hero-main". */
  name: string;
  /** Tekst alternatywny. Pusty ciag oznacza obraz czysto dekoracyjny. */
  alt: string;
  /**
   * Proporcje ramki. Domyslnie te, w ktorych obraz zostal wykadrowany;
   * podaj wartosc, gdy chcesz wpisac obraz w inny ksztalt (object-cover
   * dokadruje resztę).
   */
  ratio?: number;
  /** Deklaracja rozmiaru dla przegladarki - klucz do trafnego wyboru z srcset. */
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** Hero nad zagieciem laduje sie z priorytetem, reszta leniwie. */
  priority?: boolean;
};

/**
 * Obraz w formatach AVIF + WebP z placeholderem LQIP.
 *
 * Przy output:'export' next/image nie ma serwera optymalizujacego, wiec
 * korzystamy z gotowych wariantow i natywnego <picture>. Lista szerokosci
 * pochodzi z manifestu generowanego przez scripts/optimize-images.mjs -
 * dzieki temu srcset nigdy nie wskazuje pliku, ktorego nie ma.
 */
export function Picture({
  name,
  alt,
  ratio,
  sizes = '100vw',
  className,
  imgClassName,
  priority = false,
}: PictureProps) {
  const entry = images[name];

  // Brak wpisu oznacza literowke w nazwie albo nieuruchomiony skrypt
  // optymalizacji. Lepiej pokazac pusta ramke niz zepsuc uklad strony.
  if (!entry) {
    return (
      <div
        className={cn('block bg-bg-muted', className)}
        style={{ aspectRatio: ratio ?? 1 }}
        aria-hidden={alt === '' ? true : undefined}
        role={alt === '' ? undefined : 'img'}
        aria-label={alt || undefined}
      />
    );
  }

  const displayRatio = ratio ?? entry.ratio;
  const largest = entry.widths[entry.widths.length - 1]!;

  const srcSet = (extension: string) =>
    entry.widths
      .map((width) => `${asset(`/images/${name}-${width}.${extension}`)} ${width}w`)
      .join(', ');

  return (
    <picture
      className={cn('block overflow-hidden', className)}
      style={{ aspectRatio: displayRatio }}
    >
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={asset(`/images/${name}-${largest}.webp`)}
        alt={alt}
        // Wymiary wewnetrzne rezerwuja miejsce zanim obraz sie zaladuje (CLS).
        width={largest}
        height={Math.round(largest / entry.ratio)}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('h-full w-full object-cover', imgClassName)}
        style={{
          backgroundImage: `url("${entry.blur}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </picture>
  );
}
