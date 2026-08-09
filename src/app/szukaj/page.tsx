import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { SearchClient } from '@/components/search/SearchClient';

export const metadata: Metadata = {
  title: 'Wyszukiwarka produktów',
  description:
    'Znajdź dokładki, splittery i spoilery pasujące do Twojego auta — szukaj po nazwie części, marce lub modelu.',
  alternates: { canonical: '/szukaj/' },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/szukaj/', label: 'Wyszukiwarka' }]} />
      <PageHeader
        title="Wyszukiwarka"
        description="Szukaj po nazwie części, materiale albo marce i modelu auta."
      />
      <SearchClient />
    </>
  );
}
