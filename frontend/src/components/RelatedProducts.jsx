import ProductCard from './ProductCard.jsx';

export default function RelatedProducts({ products }) {
  if (!products.length) return null;
  return (
    <section aria-labelledby="related-heading" className="py-14 md:py-20">
      <h2 id="related-heading" className="text-center text-xl font-semibold uppercase tracking-[0.14em]">People Also Viewed</h2>
      <div className="mt-8 flex snap-x gap-6 overflow-x-auto pb-3 [scrollbar-width:none]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} className="w-[calc(50%-12px)] shrink-0 snap-start md:w-[calc(25%-18px)]" />
        ))}
      </div>
    </section>
  );
}
