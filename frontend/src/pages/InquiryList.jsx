import { Link } from 'react-router-dom';
import InquireButton from '../components/InquireButton.jsx';
import { EmptyState } from '../components/Status.jsx';
import { useInquiryList } from '../context/InquiryContext.jsx';
import { useTitle } from '../hooks/useTitle.js';

export default function InquiryList() {
  const { items, toggle } = useInquiryList();
  useTitle('Inquiry List');
  const message = `I'm interested in:\n${items.map((item) => `- ${item.name}`).join('\n')}`;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16">
      <h1 className="py-10 text-center text-2xl font-light uppercase tracking-[0.12em]">Inquiry List</h1>
      {items.length === 0 ? (
        <EmptyState>Pieces you add for an inquiry will appear here.</EmptyState>
      ) : (
        <>
          <ul className="border-t border-line">
            {items.map((item) => (
              <li key={item.slug} className="flex items-center gap-4 border-b border-line py-3">
                <img src={item.image} alt="" className="h-16 w-20 object-contain" />
                <Link to={`/product/${item.slug}`} className="flex-1 text-xs uppercase tracking-[0.12em]">{item.name}</Link>
                <button type="button" onClick={() => toggle(item)} aria-label={`Remove ${item.name}`} className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6f6f6f] underline underline-offset-4">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8"><InquireButton message={message} label="Inquire About These Pieces" /></div>
        </>
      )}
    </div>
  );
}
