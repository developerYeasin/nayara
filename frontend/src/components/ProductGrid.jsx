import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-14">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div role="status" aria-label="Loading products" className="grid grid-cols-2 gap-x-3 gap-y-9 md:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] bg-warm" />
          <div className="mx-auto mt-3 h-2 w-3/4 bg-warm" />
        </div>
      ))}
    </div>
  );
}
