import { useParams } from 'react-router-dom';
import Breadcrumb from './Breadcrumb.jsx';
import NotFound from './NotFound.jsx';
import ProductGallery from '../components/ProductGallery.jsx';
import InquireButton from '../components/InquireButton.jsx';
import RelatedProducts from '../components/RelatedProducts.jsx';
import { AccordionItem, SpecTable } from '../components/Accordion.jsx';
import { ErrorState } from '../components/Status.jsx';
import { useApi } from '../hooks/useApi.js';
import { useTitle } from '../hooks/useTitle.js';

export default function Product() {
  const { slug } = useParams();
  const { data: product, error, loading, retry } = useApi(`/products/${encodeURIComponent(slug)}`);
  useTitle(product?.name);

  if (error?.status === 404) return <NotFound />;
  if (error) return <ErrorState onRetry={retry} />;
  if (loading) return <div role="status" aria-label="Loading product" className="mx-4 mt-3 h-[55vh] animate-pulse bg-warm" />;

  const { width, depth, height, unit } = product.dimensions;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-3 md:px-6">
      <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-14">
        <ProductGallery key={product.slug} images={product.images} />
        <div className="mt-7 text-center lg:mt-10 lg:text-left">
          <Breadcrumb items={[
            { label: 'nayara', to: '/' },
            { label: product.category.name, to: `/category/${product.category.slug}` },
            { label: product.name },
          ]} />
          <h1 className="mt-5 text-base font-bold uppercase tracking-[0.1em] md:text-lg">{product.name}</h1>
          <div className="mt-8"><InquireButton productName={product.name} /></div>
          <div className="mt-6 text-left">
            <AccordionItem title="Description"><p>{product.description}</p></AccordionItem>
            <AccordionItem title="Dimensions">
              <SpecTable rows={[['Width', `${width} ${unit}`], ['Depth', `${depth} ${unit}`], ['Height', `${height} ${unit}`]]} />
            </AccordionItem>
            <AccordionItem title="Materials">
              <SpecTable rows={[['Fabric', product.materials.fabric], ['Frame', product.materials.frame], ['Legs', product.materials.legs]]} />
            </AccordionItem>
          </div>
        </div>
      </div>
      <RelatedProducts products={product.related} />
    </div>
  );
}
