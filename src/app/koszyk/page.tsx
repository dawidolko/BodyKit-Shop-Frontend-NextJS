import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { CartClient } from '@/components/cart/CartClient';

export const metadata: Metadata = {
  title: 'Koszyk',
  description: 'Zawartość koszyka w BodyKit Shop.',
  alternates: { canonical: '/koszyk/' },
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/koszyk/', label: 'Koszyk' }]} />
      <PageHeader title="Koszyk" />
      <CartClient />
    </>
  );
}
