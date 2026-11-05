import { useRef } from 'react';
import { Link } from 'react-router-dom';
import FadeImage from './FadeImage.jsx';
import { useProductTransition } from './PageTransition.jsx';

export default function ProductCard({ product, className = '' }) {
  const imageRef = useRef(null);
  const openProduct = useProductTransition();

  const onClick = (event) => {
    // Keep browser behaviour for open-in-new-tab gestures.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    openProduct(product, imageRef.current);
  };

  return (
    <Link to={`/product/${product.slug}`} onClick={onClick} className={`group block ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-warm">
        <FadeImage ref={imageRef} src={product.image} alt={product.name} className="h-full w-full object-cover saturate-[.82]" />
        {product.hoverImage && (
          <img src={product.hoverImage} alt="" loading="lazy" className="absolute inset-0 hidden h-full w-full object-cover opacity-0 saturate-[.82] transition-opacity duration-700 group-hover:opacity-100 md:block" />
        )}
      </div>
      <h3 className="mt-3 text-center text-[11px] uppercase leading-snug tracking-[0.13em] md:text-xs">{product.name}</h3>
    </Link>
  );
}
