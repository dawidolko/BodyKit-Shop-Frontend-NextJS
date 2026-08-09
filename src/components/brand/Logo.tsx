type LogoProps = {
  /** Wariant: pelne logo z nazwa lub sam monogram (np. do mobilnego headera). */
  variant?: 'full' | 'mark';
  className?: string;
  /** Gdy logo stoi obok tekstowej nazwy strony, oznacz je jako dekoracyjne. */
  decorative?: boolean;
};

/**
 * Logo BodyKit Shop.
 *
 * Znak to monogram "BK" wpisany w ukosny splitter - ten sam kat 12 stopni wraca
 * w .clip-slant i w kaflach kategorii, wiec marka trzyma sie jednego gestu.
 * Kolory dziedziczy z currentColor + tokenu akcentu, wiec dziala w obu motywach.
 */
export function Logo({ variant = 'full', className, decorative = false }: LogoProps) {
  const a11y = decorative
    ? ({ 'aria-hidden': true } as const)
    : ({ role: 'img', 'aria-label': 'BodyKit Shop' } as const);

  if (variant === 'mark') {
    return (
      <svg viewBox="0 0 40 40" className={className} fill="none" {...a11y}>
        <LogoMark />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 208 40" className={className} fill="none" {...a11y}>
      <LogoMark />
      <g fill="currentColor">
        <text
          x="50"
          y="21"
          fontFamily="var(--font-display), sans-serif"
          fontSize="18"
          fontWeight="800"
          letterSpacing="-0.02em"
        >
          BODYKIT
        </text>
        <text
          x="50"
          y="34"
          fontFamily="var(--font-sans), sans-serif"
          fontSize="10.5"
          fontWeight="600"
          letterSpacing="0.34em"
          opacity="0.62"
        >
          SHOP
        </text>
      </g>
    </svg>
  );
}

/** Sam symbol - wspoldzielony przez oba warianty. */
function LogoMark() {
  return (
    <g>
      {/* Bryla znaku: ukosny splitter, sciety pod tym samym katem co .clip-slant */}
      <path d="M3 6h27l7 9-7 19H3V6Z" className="fill-carbon-900 dark:fill-carbon-50" />
      {/* Pomaranczowa krawedz natarcia */}
      <path d="M30 6l7 9-7 19-3.5-4 5-15-5-9H30Z" fill="var(--accent)" />
      {/* Monogram BK wyciety w bryle */}
      <path
        d="M9.5 12.5h6.2c2.2 0 3.6 1.1 3.6 2.9 0 1.2-.6 2.1-1.7 2.5 1.4.4 2.2 1.4 2.2 2.9 0 2.1-1.6 3.4-4.1 3.4H9.5V12.5Zm5.6 4.6c.9 0 1.5-.5 1.5-1.3s-.6-1.2-1.5-1.2h-2.9v2.5h2.9Zm.3 5c1 0 1.7-.5 1.7-1.4s-.7-1.4-1.7-1.4h-3.2v2.8h3.2Z"
        fill="var(--accent)"
      />
      <path
        d="M22.2 12.5h2.7v4.8l4.2-4.8h3.2l-4.6 5.2 4.8 6.5h-3.3l-3.4-4.7-.9 1v3.7h-2.7V12.5Z"
        className="fill-carbon-50 dark:fill-carbon-900"
      />
    </g>
  );
}
