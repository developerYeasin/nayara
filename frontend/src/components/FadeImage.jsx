import { forwardRef, useEffect, useRef, useState } from 'react';

// Lazy image that resolves from blurred and faint to sharp once it has loaded.
const FadeImage = forwardRef(function FadeImage({ src, alt, className = '', eager = false }, forwardedRef) {
  const localRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(Boolean(localRef.current?.complete && localRef.current.naturalWidth));
  }, [src]);

  return (
    <img
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${className} transition-[opacity,filter,transform] duration-700 ${loaded ? 'opacity-100 blur-0' : 'opacity-30 blur-md'}`}
    />
  );
});

export default FadeImage;
