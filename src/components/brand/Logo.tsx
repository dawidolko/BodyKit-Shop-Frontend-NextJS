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
 * The mark is a "BK" door number on a plate leaning 12 degrees, the angle shared
 * by the buttons, the hero plate and the section cuts. The wordmark inherits
 * currentColor, so it works on every surface.
 */
export function Logo({ variant = 'full', className, decorative = false }: LogoProps) {
  const a11y = decorative
    ? ({ 'aria-hidden': true } as const)
    : ({ role: 'img', 'aria-label': 'BodyKit Shop' } as const);

  if (variant === 'mark') {
    return (
      <svg viewBox="0 0 44 40" className={className} fill="none" {...a11y}>
        <LogoMark />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 196 40" className={className} fill="none" {...a11y}>
      <LogoMark />
      <text
        x="52"
        y="24"
        fill="currentColor"
        fontSize="21"
        fontWeight="900"
        fontStyle="italic"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        BODYKIT
      </text>
      <text
        x="50"
        y="36"
        fill="currentColor"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.3em"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        SHOP
      </text>
      <path d="M89 33h52l-1 3H88Z" fill="#c8102e" />
      <path d="M144 33h14l-1 3h-14Z" fill="currentColor" />
      <path d="M161 33h26l-1 3h-26Z" fill="#7cc8f2" />
    </svg>
  );
}

/** The symbol alone - shared by both variants. */
function LogoMark() {
  return (
    <g>
      <path d="M10 4h34l-8 32H2Z" fill="#c8102e" />
      <g transform="translate(5.5 -1.5) skewX(-12)" fill="#ffffff">
        <path d="M9.5 12.5h6.2c2.2 0 3.6 1.1 3.6 2.9 0 1.2-.6 2.1-1.7 2.5 1.4.4 2.2 1.4 2.2 2.9 0 2.1-1.6 3.4-4.1 3.4H9.5V12.5Zm5.6 4.6c.9 0 1.5-.5 1.5-1.3s-.6-1.2-1.5-1.2h-2.9v2.5h2.9Zm.3 5c1 0 1.7-.5 1.7-1.4s-.7-1.4-1.7-1.4h-3.2v2.8h3.2Z" />
        <path d="M22.2 12.5h2.7v4.8l4.2-4.8h3.2l-4.6 5.2 4.8 6.5h-3.3l-3.4-4.7-.9 1v3.7h-2.7V12.5Z" />
      </g>
    </g>
  );
}
