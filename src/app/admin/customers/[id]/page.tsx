import type { Metadata } from 'next';

import CustomerDetailsView from 'src/sections/customers/details-view';

export const metadata: Metadata = { title: 'Customer Details | Home Decor Admin' };

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  return <CustomerDetailsView customerId={params.id} />;
}
