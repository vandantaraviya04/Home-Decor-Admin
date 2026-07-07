import type { Metadata } from 'next';

import ProductFormView from 'src/sections/products/form-view';

export const metadata: Metadata = { title: 'Edit Product | Home Decor Admin' };

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <ProductFormView productId={params.id} />;
}
