import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[10px] uppercase tracking-[0.14em] text-muted ${className}`}>
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && <span aria-hidden="true"> / </span>}
          {item.to
            ? <Link to={item.to} className="hover:text-ink">{item.label}</Link>
            : <span aria-current="page" className="text-ink">{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
