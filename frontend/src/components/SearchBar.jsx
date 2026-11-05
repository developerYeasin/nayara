import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');

  useEffect(() => setQuery(params.get('q') ?? ''), [params]);

  const submit = (event) => {
    event.preventDefault();
    const term = query.trim();
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <form role="search" onSubmit={submit} className="mx-auto max-w-7xl px-4 pb-3 md:px-6">
      <div className="flex items-center gap-3 border-b border-ink/70 pb-2">
        <button type="submit" aria-label="Search"><Search className="h-4 w-4" strokeWidth={1.25} /></button>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
          placeholder="What can we help you find?"
          className="w-full bg-transparent text-base outline-none placeholder:text-muted md:text-sm"
        />
      </div>
    </form>
  );
}
