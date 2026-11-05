import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="text-2xl font-light uppercase tracking-[0.12em]">Page Not Found</h1>
      <Link to="/" className="mt-6 inline-block border-b border-ink font-sans text-[10px] uppercase tracking-label">Back Home</Link>
    </div>
  );
}
