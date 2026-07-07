import type { Metadata } from 'next';

import OrderFormView from 'src/sections/orders/form-view';

export const metadata: Metadata = { title: 'Edit Order | Home Decor Admin' };

export default function EditOrderPage({ params }: { params: { id: string } }) {
  return <OrderFormView orderId={params.id} />;
}
