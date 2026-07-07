import type { Metadata } from 'next';

import ProductFormView from 'src/sections/products/form-view';

export const metadata: Metadata = { title: 'Add Product | Home Decor Admin' };

export default function NewProductPage() {
  return <ProductFormView />;
}
