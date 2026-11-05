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
    <Link to={`/product/${product.slug}`} onClick={onClick} className={`group block text-center ${className}`}>
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden">
        <FadeImage ref={imageRef} src={product.image} alt={product.name} className="h-full w-full object-contain" />
      </div>
      <h3 className="mx-auto mt-3 max-w-[11rem] text-[11px] uppercase leading-snug tracking-[0.13em] md:text-xs">{product.name}</h3>
    </Link>
  );
}
