export function ErrorState({ onRetry, message = 'We could not load this right now.' }) {
  return (
    <div role="alert" className="py-20 text-center">
      <p className="text-sm text-muted">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-4 border-b border-ink font-sans text-[10px] uppercase tracking-label">
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ children }) {
  return <p className="py-20 text-center text-sm text-muted">{children}</p>;
}
