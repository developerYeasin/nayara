const unsplash = (id, w = 1400, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`;

export const hero = {
  title: 'Design – Forward',
  subtitle: 'furniture & accessories',
  to: '/category/accent-chairs',
  image: unsplash('1631679706909-1844bbd07221', 1800),
  alt: 'Warm neutral living room with a curved chair and round mirrors',
};

export const newArrivals = {
  title: 'New Arrivals',
  subtitle: 'Shop now',
  to: '/category/console',
  image: unsplash('1532372320572-cda25653a26d', 1400),
  alt: 'Pale wood console styled with books and a plant',
};

export const bestSelling = {
  title: 'Best Selling Furniture',
  subtitle: 'View now',
  to: '/category/sofas',
  image: unsplash('1540574163026-643ea20ade25', 1800),
  alt: 'Tan leather three seater sofa against a pale wall',
};

const tile = (id) => unsplash(id, 600, 800);
export const categoryPhotos = {
  console: tile('1532372320572-cda25653a26d'),
  ottomans: tile('1550226891-ef816aed4a98'),
  nightstands: tile('1522771739844-6a9f6d5f14af'),
  'dining-chairs': tile('1592078615290-033ee584e267'),
  'bar-stools': tile('1581539250439-c96689b516dd'),
  benches: tile('1617104678098-de229db51175'),
  beds: tile('1616594039964-ae9021a400a0'),
  'side-tables': tile('1499933374294-4584851497cc'),
  'dining-tables': tile('1533090481720-856c6e3c1fdc'),
  sofas: tile('1555041469-a586c61ea9bc'),
  'accent-chairs': tile('1567538096630-e0c55bd6374c'),
  stools: tile('1503602642458-232111445657'),
};

export const moodboard = [
  { image: unsplash('1616486338812-3dadae4b4ace', 1200), alt: 'Cream sectional sofa with a round table', span: 'col-span-12 md:col-span-7 aspect-[4/3]' },
  { image: unsplash('1580480055273-228ff5388ef8', 800, 1000), alt: 'Beige upholstered chair', span: 'col-span-6 md:col-span-5 aspect-[4/5] md:row-span-2 md:aspect-auto' },
  { image: unsplash('1617806118233-18e1de247200', 800, 1000), alt: 'Dining room with a round mirror', span: 'col-span-6 md:col-span-3 aspect-[4/5]' },
  { image: unsplash('1499933374294-4584851497cc', 800, 1000), alt: 'Round side table beside a bed', span: 'col-span-12 md:col-span-4 aspect-[4/3] md:aspect-[4/5]' },
];
