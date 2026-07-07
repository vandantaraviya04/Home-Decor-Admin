import type { Metadata } from 'next';

import CustomersListView from 'src/sections/customers/list-view';

export const metadata: Metadata = { title: 'Customers | Home Decor Admin' };

export default function CustomersPage() {
  return <CustomersListView />;
}
