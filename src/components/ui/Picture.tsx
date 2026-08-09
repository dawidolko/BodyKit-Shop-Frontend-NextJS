import { asset, cn } from '@/lib/utils';
import blurMap from '@/lib/blur-map.json';

/** Szerokosci wygenerowane przez scripts/optimize-images.mjs dla kazdego profilu. */
const WIDTHS: Record<string, number[]> = {
  hero: [960, 1440, 1920],
  banner: [800, 1200, 1600],
  category: [400, 600, 800],
  product: [400, 600, 900],
  editorial: [600, 900, 1200],
};

/** Proporcje odpowiadajace profilom w skrypcie optymalizacji. */
const RATIOS: Record<string, string> = {
  hero: '21 / 9',
  banner: '16 / 6',
  category: '4 / 3',
  product: '1 / 1',
  editorial: '3 / 2',
};

type PictureProps = {
  /** Nazwa pliku bez rozszerzenia, np. "hero-main". */
  name: string;
  /** Tekst alternatywny. Pusty ciag oznacza obraz czysto dekoracyjny. */
  alt: string;
  profile: keyof typeof WIDTHS;
  /** Deklaracja rozmiaru dla przegladarki - klucz do trafnego wyboru z srcset. */
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** Hero nad zagieciem laduje sie z priorytetem, reszta leniwie. */
  priority?: boolean;
};

function profileFor(name: string): keyof typeof WIDTHS {
  if (name.startsWith('cat-')) return 'category';
  if (name.startsWith('shot-')) return 'product';
  return 'editorial';
}

/**
 * Obraz w formatach AVIF + WebP z placeholderem LQIP.
 *
 * Przy output:'export' next/image nie ma serwera optymalizujacego, wiec
 * korzystamy z gotowych wariantow i natywnego <picture>. LQIP jest wstawiany
 * jako tlo, wiec uklad nie skacze i nie ma pustego prostokata przy wolnym laczu.
 */
export function Picture({
  name,
  alt,
  profile,
  sizes = '100vw',
  className,
  imgClassName,
  priority = false,
}: PictureProps) {
  const resolvedProfile = WIDTHS[profile] ? profile : profileFor(name);
  const widths = WIDTHS[resolvedProfile] ?? WIDTHS.editorial!;
  const ratio = RATIOS[resolvedProfile] ?? '3 / 2';
  const largest = widths[widths.length - 1]!;
  const blur = (blurMap as Record<string, string>)[name];

  const srcSet = (extension: string) =>
    widths.map((width) => `${asset(`/images/${name}-${width}.${extension}`)} ${width}w`).join(', ');

  return (
    <picture className={cn('block overflow-hidden', className)} style={{ aspectRatio: ratio }}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={asset(`/images/${name}-${largest}.webp`)}
        alt={alt}
        // Wymiary wewnetrzne rezerwuja miejsce zanim obraz sie zaladuje (CLS).
        width={largest}
        height={Math.round(largest / parseRatio(ratio))}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('h-full w-full object-cover', imgClassName)}
        style={
          blur
            ? {
                backgroundImage: `url("${blur}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      />
    </picture>
  );
}

/** Zamienia zapis "16 / 9" na liczbe 1.777... */
function parseRatio(ratio: string): number {
  const [w, h] = ratio.split('/').map((part) => Number(part.trim()));
  if (!w || !h) return 1;
  return w / h;
}
