export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" />
      <path d="M9 8.2c-.5.4-.8 1.2-.5 2.2.6 2 2.6 4 4.8 4.8 1 .3 1.8 0 2.3-.6l.3-.8-2-1.1-.8.8c-1-.4-1.9-1.3-2.4-2.3l.8-.8-1-2.1-1 .1z" />
    </svg>
  );
}

const silhouettes = {
  console: <path d="M12 22h76v4H12zM17 26h4v50h-4zM79 26h4v50h-4zM21 56h58v3H21z" />,
  ottomans: <path d="M22 34c0-6 10-9 28-9s28 3 28 9v26c0 5-10 7-28 7s-28-2-28-7zM28 67h5v9h-5zM67 67h5v9h-5z" />,
  nightstands: <path fillRule="evenodd" d="M24 20h52v52H24zM27 24v21h46V24zM27 48v21h46V48zM28 72h5v8h-5zM67 72h5v8h-5z" />,
  'dining-chairs': <path d="M26 24c0-5 4-7 9-7h30c5 0 9 2 9 7v13h-5V24c0-1-2-2-4-2H35c-2 0-4 1-4 2v13h-5zM24 42h52v8H24zM28 50h3v36h-3zM69 50h3v36h-3z" />,
  'bar-stools': <path d="M33 8h34v18H33zM29 29h42v7H29zM33 36h3v54h-3zM64 36h3v54h-3zM35 68h30v3H35z" />,
  benches: <path d="M8 38h84v11H8zM14 49h4v30h-4zM82 49h4v30h-4z" />,
  beds: <path d="M12 24h76v30H12zM6 50h88v18H6zM10 68h4v8h-4zM86 68h4v8h-4z" />,
  'side-tables': <path d="M26 22h48v5H26zM48 27h4v48h-4zM34 75h32v4H34z" />,
  'dining-tables': <path d="M6 32h88v4H6zM18 36h5l13 42h-4zM82 36h-5L64 78h4z" />,
  sofas: <path d="M16 28c0-3 3-5 6-5h56c3 0 6 2 6 5v18H16zM6 38c0-3 2-5 5-5s5 2 5 5v14h68V38c0-3 2-5 5-5s5 2 5 5v28H6zM12 66h5v7h-5zM83 66h5v7h-5z" />,
  'accent-chairs': <path d="M28 18c0-4 4-6 8-6h28c4 0 8 2 8 6v30H28zM18 36c4 0 6 3 6 6v12h52V42c0-3 2-6 6-6s5 3 5 6v28H13V42c0-3 1-6 5-6zM22 70h4v12h-4zM74 70h4v12h-4z" />,
  stools: <path d="M26 26c0-3 10-5 24-5s24 2 24 5-10 6-24 6-24-3-24-6zM38 33c4 1 8 1 12 1s8 0 12-1l-4 40h8v5H34v-5h8z" />,
};

export function CategoryIcon({ slug, className = 'h-24 w-24' }) {
  return (
    <svg viewBox="0 0 100 100" fill="#5F5F5F" className={className} aria-hidden="true">
      {silhouettes[slug] ?? silhouettes.sofas}
    </svg>
  );
}
