import { useParams } from 'react-router-dom';
import Breadcrumb from './Breadcrumb.jsx';
import ProductGrid, { ProductGridSkeleton } from '../components/ProductGrid.jsx';
import { EmptyState, ErrorState } from '../components/Status.jsx';
import { useApi } from '../hooks/useApi.js';
import { useTitle } from '../hooks/useTitle.js';
import { useSite } from '../context/SiteContext.jsx';
import NotFound from './NotFound.jsx';

export default function Category() {
  const { slug } = useParams();
  const { categories, categoriesLoading } = useSite();
  const { data, error, loading, retry } = useApi(`/products?category=${encodeURIComponent(slug)}&limit=100`);
  const category = categories.find((c) => c.slug === slug);
  useTitle(category?.name);

  if (!categoriesLoading && categories.length > 0 && !category) return <NotFound />;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <p className="mt-3 border-y border-line py-3 text-center text-[11px] uppercase tracking-[0.2em]">Custom-Design Services Available</p>
      <div className="py-10 text-center md:py-14">
        <Breadcrumb className="justify-center" items={[{ label: 'Home', to: '/' }, { label: category?.name ?? slug.replace(/-/g, ' ') }]} />
        <h1 className="mt-4 text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">{category?.name ?? ' '}</h1>
      </div>
      <div className="pb-16">
        {loading && <ProductGridSkeleton />}
        {error && <ErrorState onRetry={retry} />}
        {data && (data.items.length
          ? <ProductGrid products={data.items} />
          : <EmptyState>New pieces are coming to this collection soon.</EmptyState>)}
      </div>
    </div>
  );
}
