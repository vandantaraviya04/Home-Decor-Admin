import type { Metadata } from 'next';

import OrderDetailsView from 'src/sections/orders/details-view';

export const metadata: Metadata = { title: 'Order Details | Home Decor Admin' };

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return <OrderDetailsView orderId={params.id} />;
}
