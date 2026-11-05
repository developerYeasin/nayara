import { useSearchParams } from 'react-router-dom';
import ProductGrid, { ProductGridSkeleton } from '../components/ProductGrid.jsx';
import { EmptyState, ErrorState } from '../components/Status.jsx';
import { useApi } from '../hooks/useApi.js';
import { useTitle } from '../hooks/useTitle.js';

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  const { data, error, loading, retry } = useApi(`/products?q=${encodeURIComponent(query)}&limit=100`);
  useTitle(`Search: ${query}`);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <h1 className="py-10 text-center text-2xl font-light uppercase tracking-[0.12em]">
        {query ? `Results for “${query}”` : 'Search'}
      </h1>
      {loading && <ProductGridSkeleton />}
      {error && <ErrorState onRetry={retry} />}
      {data && (data.items.length
        ? <ProductGrid products={data.items} />
        : <EmptyState>Nothing matched “{query}”. Try a category such as sofas or beds.</EmptyState>)}
    </div>
  );
}
