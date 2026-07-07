import type { Metadata } from 'next';

import OrdersListView from 'src/sections/orders/list-view';

export const metadata: Metadata = { title: 'Orders | Home Decor Admin' };

export default function OrdersPage() {
  return <OrdersListView />;
}
