import ProductCard from './ProductCard.jsx';

export default function RelatedProducts({ products }) {
  if (!products.length) return null;
  return (
    <section aria-labelledby="related-heading" className="py-14 md:py-20">
      <h2 id="related-heading" className="text-center text-3xl font-light">People Also Viewed</h2>
      <div className="mt-8 flex snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:none]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} className="w-[62%] shrink-0 snap-start md:w-[24%]" />
        ))}
      </div>
    </section>
  );
}
