const unsplash = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const heroBanners = [
  {
    title: 'Design – Forward',
    subtitle: 'furniture & accessories',
    to: '/category/accent-chairs',
    image: unsplash('1631679706909-1844bbd07221'),
    alt: 'Warm neutral living room with a curved chair and round mirrors',
  },
  {
    title: 'New Arrivals',
    subtitle: 'Shop now',
    to: '/category/console',
    image: unsplash('1598928506311-c55ded91a20c'),
    alt: 'Bright living room with built-in shelves and pale seating',
  },
];

export const bestSelling = {
  title: 'Best Selling Furniture',
  subtitle: 'View now',
  to: '/category/sofas',
  image: unsplash('1616486338812-3dadae4b4ace'),
  alt: 'Cream sectional sofa with a round table in a styled room',
};

export const moodboard = [
  { image: unsplash('1555041469-a586c61ea9bc', 800), alt: 'Deep green velvet sofa against a pale wall' },
  { image: unsplash('1580480055273-228ff5388ef8', 800), alt: 'Beige upholstered chair' },
  { image: unsplash('1617806118233-18e1de247200', 800), alt: 'Dining room with green chairs and a round mirror' },
  { image: unsplash('1499933374294-4584851497cc', 800), alt: 'Round side table beside a bed' },
];
