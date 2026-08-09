/**
 * Wstawia dane strukturalne schema.org.
 *
 * Zawartosc pochodzi wylacznie z wlasnych danych katalogu (nie z wejscia
 * uzytkownika), a JSON.stringify escapuje cudzyslowy; dodatkowo zamieniamy
 * "<" na sekwencje unicode, zeby napis "</script>" w tresci nie mogl
 * przedwczesnie zamknac znacznika.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
