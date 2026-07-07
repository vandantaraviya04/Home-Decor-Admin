import type { Metadata } from 'next';

import OrderFormView from 'src/sections/orders/form-view';

export const metadata: Metadata = { title: 'Add Order | Home Decor Admin' };

export default function NewOrderPage() {
  return <OrderFormView />;
}
