import localFont from 'next/font/local';

/*
 * Both files are subsets of Saira (SIL OFL, see src/fonts/OFL.txt) cut down to
 * Basic Latin, Polish and catalogue punctuation. Only the display face is
 * preloaded: it sets the hero headline, and the text face swaps in on a
 * metric-matched fallback without moving the layout.
 */
export const sairaDisplay = localFont({
  src: '../fonts/saira-display-italic.woff2',
  weight: '700 900',
  style: 'italic',
  variable: '--font-bk-display',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
});

export const sairaText = localFont({
  src: '../fonts/saira-text.woff2',
  weight: '400 700',
  style: 'normal',
  variable: '--font-bk-text',
  display: 'swap',
  preload: false,
  declarations: [{ prop: 'font-stretch', value: '75% 100%' }],
  adjustFontFallback: 'Arial',
});

export const fontVariables = `${sairaDisplay.variable} ${sairaText.variable}`;
