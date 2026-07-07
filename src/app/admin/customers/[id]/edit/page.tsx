import type { Metadata } from 'next';

import CustomerFormView from 'src/sections/customers/form-view';

export const metadata: Metadata = { title: 'Edit Customer | Home Decor Admin' };

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  return <CustomerFormView customerId={params.id} />;
}
