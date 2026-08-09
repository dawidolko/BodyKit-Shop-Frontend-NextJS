type LogoProps = {
  /** Variant: full wordmark, or just the monogram (e.g. for a mobile header). */
  variant?: 'full' | 'mark';
  className?: string;
  /** Mark it decorative when the logo sits next to the site name in text. */
  decorative?: boolean;
};

/**
 * BodyKit Shop logo.
 *
 * The mark is a "BK" monogram set into an angled splitter - the same 12 degree
 * angle returns in .clip-slant and in the category tiles, so the brand keeps to
 * a single gesture. Colours come from currentColor plus the accent token, so it
 * works in both themes.
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

/** The symbol alone - shared by both variants. */
function LogoMark() {
  return (
    <g>
      {/* Body of the mark: an angled splitter, cut at the same angle as .clip-slant */}
      <path d="M3 6h27l7 9-7 19H3V6Z" className="fill-carbon-900 dark:fill-carbon-50" />
      {/* Orange leading edge */}
      <path d="M30 6l7 9-7 19-3.5-4 5-15-5-9H30Z" fill="var(--accent)" />
      {/* BK monogram cut into the body */}
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
