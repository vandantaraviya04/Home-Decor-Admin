import type { Metadata } from 'next';

import CustomerFormView from 'src/sections/customers/form-view';

export const metadata: Metadata = { title: 'Add Customer | Home Decor Admin' };

export default function NewCustomerPage() {
  return <CustomerFormView />;
}
