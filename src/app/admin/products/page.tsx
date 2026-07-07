import type { Metadata } from 'next';

import ProductsListView from 'src/sections/products/list-view';

export const metadata: Metadata = { title: 'Products | Home Decor Admin' };

export default function ProductsPage() {
  return <ProductsListView />;
}
