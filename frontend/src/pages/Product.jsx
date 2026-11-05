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
import { useInquiryList } from '../context/InquiryContext.jsx';

export default function Product() {
  const { slug } = useParams();
  const { data: product, error, loading, retry } = useApi(`/products/${encodeURIComponent(slug)}`);
  const { has, toggle } = useInquiryList();
  useTitle(product?.name);

  if (error?.status === 404) return <NotFound />;
  if (error) return <ErrorState onRetry={retry} />;
  if (loading) return <div role="status" aria-label="Loading product" className="aspect-[4/5] animate-pulse bg-warm" />;

  const { width, depth, height, unit } = product.dimensions;
  const saved = has(product.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-14">
        <ProductGallery key={product.slug} images={product.images} />
        <div className="mt-7 text-center lg:sticky lg:top-24 lg:mt-0 lg:self-start lg:text-left">
          <Breadcrumb items={[
            { label: 'nayara', to: '/' },
            { label: product.category.name, to: `/category/${product.category.slug}` },
            { label: product.name },
          ]} />
          <h1 className="mt-4 text-[1.7rem] font-light uppercase leading-tight tracking-[0.08em] md:text-3xl">{product.name}</h1>
          <div className="mt-8"><InquireButton productName={product.name} /></div>
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => toggle({ slug: product.slug, name: product.name, image: product.images[0]?.url })}
            className="mt-3 w-full border border-charcoal py-3 font-sans text-[10px] uppercase tracking-label transition-colors hover:bg-warm"
          >
            {saved ? 'Remove From Inquiry List' : 'Add To Inquiry List'}
          </button>
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
