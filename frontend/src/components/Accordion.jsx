import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Line({ rotated }) {
  return (
    <motion.span
      className="absolute left-0 top-1/2 h-px w-full bg-ink"
      animate={{ rotate: rotated ? 90 : 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
    />
  );
}

export function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-line">
      <h2>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-4 text-left text-sm font-medium">
          {title}
          <span aria-hidden="true" className="relative h-3 w-3">
            <Line rotated={false} />
            <Line rotated={!open} />
          </span>
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pb-5 text-sm leading-relaxed text-[#5f5f5f]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SpecTable({ rows }) {
  return (
    <table className="w-full">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-t border-line first:border-t-0">
            <th scope="row" className="py-2 text-left font-normal">{label}</th>
            <td className="py-2 text-right text-ink">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
