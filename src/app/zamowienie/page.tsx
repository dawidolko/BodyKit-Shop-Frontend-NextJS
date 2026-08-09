import type { Metadata } from 'next';
import { Breadcrumbs, PageHeader } from '@/components/layout/Breadcrumbs';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export const metadata: Metadata = {
  title: 'Zamówienie',
  description: 'Dane do wysyłki i podsumowanie zamówienia.',
  alternates: { canonical: '/zamowienie/' },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/koszyk/', label: 'Koszyk' },
          { href: '/zamowienie/', label: 'Zamówienie' },
        ]}
      />
      <PageHeader
        title="Zamówienie"
        description="Wypełnij dane do wysyłki. Pola oznaczone gwiazdką są wymagane."
      />
      <CheckoutForm />
    </>
  );
}
