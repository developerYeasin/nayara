import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg?raw';

export function LogoMark({ className = '' }) {
  return <span aria-hidden="true" className={`block [&>svg]:h-auto [&>svg]:w-full ${className}`} dangerouslySetInnerHTML={{ __html: logo }} />;
}

export default function Logo({ light = false, onClick, className = 'w-[92px]' }) {
  return (
    <Link to="/" onClick={onClick} aria-label="nayara home" className={`inline-block ${light ? 'text-white' : 'text-ink'}`}>
      <LogoMark className={className} />
    </Link>
  );
}
