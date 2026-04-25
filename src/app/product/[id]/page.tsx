import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductClient from './ProductClient';

export function generateStaticParams() {
  return products.map((p) => ({
    id: p.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return <ProductClient product={product} related={related} />;
}

