/**
 * Renders schema.org structured data.
 *
 * The content comes only from our own catalog data (not from user input), and
 * JSON.stringify escapes quotes; in addition we replace "<" with a unicode
 * sequence so that the string "</script>" in the content cannot close the tag
 * prematurely.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
