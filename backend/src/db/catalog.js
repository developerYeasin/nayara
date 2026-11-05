// SAMPLE catalogue: names follow the brief; copy, sizes and materials are placeholders.
export const categories = [
  ['console', 'Console'], ['ottomans', 'Ottomans'], ['nightstands', 'Nightstands'],
  ['dining-chairs', 'Dining Chairs'], ['bar-stools', 'Bar Stools'], ['benches', 'Benches'],
  ['beds', 'Beds'], ['side-tables', 'Side Tables'], ['dining-tables', 'Dining Tables'],
  ['sofas', 'Sofas'], ['accent-chairs', 'Accent Chairs'], ['stools', 'Stools'],
];

// [name, illustration, colour, width, depth, height]
export const productsByCategory = {
  sofas: [
    ['Adell Single Seater Sofa', 'single', 'olive', 95, 90, 78],
    ['Adell Three Seater Sofa', 'three', 'olive', 230, 92, 78],
    ['Ashlee L-Shaped Sofa', 'lshape', 'stone', 290, 170, 74],
    ['Cambry Three Seater Sofa', 'curve', 'teal', 250, 100, 72],
    ['Camden Three Seater Sofa', 'three', 'navy', 225, 95, 76],
    ['Camden Two Seater Sofa', 'two', 'navy', 170, 95, 76],
    ['Como Sectional Sofa', 'sectional', 'grey', 320, 180, 72],
    ['Darcy Three Seater Sofa', 'three', 'cream', 220, 94, 74],
    ['Delvey Single Seater Sofa', 'accent', 'cream', 90, 88, 76],
    ['Delvey Three Seater Sofa', 'three', 'grey', 228, 92, 74],
    ['Eros Single Seater Sofa', 'accent', 'stone', 92, 90, 70],
    ['Eros Three Seater Sofa', 'curve', 'stone', 240, 98, 70],
    ['Ethan Sectional Sofa', 'sectional', 'stone', 330, 175, 72],
    ['Felis Single Seater Sofa', 'accent', 'cream', 88, 86, 72],
  ],
  console: [
    ['Alba Console', 'console', 'walnut', 140, 38, 80],
    ['Mira Console', 'console', 'black', 120, 35, 78],
    ['Sola Console', 'console', 'stone', 150, 40, 82],
  ],
  ottomans: [
    ['Luma Ottoman', 'ottoman', 'cream', 80, 60, 42],
    ['Vera Ottoman', 'ottoman', 'olive', 75, 55, 44],
    ['Noor Ottoman', 'ottoman', 'stone', 90, 60, 42],
  ],
  nightstands: [
    ['Ines Nightstand', 'nightstand', 'black', 50, 42, 58],
    ['Tala Nightstand', 'nightstand', 'walnut', 48, 40, 55],
    ['Orla Nightstand', 'nightstand', 'stone', 52, 42, 56],
  ],
  'dining-chairs': [
    ['Sena Dining Chair', 'chair', 'stone', 50, 54, 82],
    ['Rhea Dining Chair', 'chair', 'olive', 52, 56, 80],
    ['Isla Dining Chair', 'chair', 'black', 48, 52, 84],
  ],
  'bar-stools': [
    ['Kaia Bar Stool', 'barstool', 'black', 44, 46, 98],
    ['Remy Bar Stool', 'barstool', 'cream', 46, 48, 100],
    ['Zuri Bar Stool', 'barstool', 'olive', 44, 46, 96],
  ],
  benches: [
    ['Elio Bench', 'bench', 'stone', 140, 42, 46],
    ['Aria Bench', 'bench', 'olive', 150, 44, 45],
    ['Tove Bench', 'bench', 'walnut', 130, 40, 46],
  ],
  beds: [
    ['Selene Bed', 'bed', 'cream', 180, 215, 110],
    ['Nadia Bed', 'bed', 'olive', 200, 220, 115],
    ['Maren Bed', 'bed', 'grey', 180, 212, 105],
  ],
  'side-tables': [
    ['Oda Side Table', 'sidetable', 'black', 45, 45, 52],
    ['Lina Side Table', 'sidetable', 'walnut', 42, 42, 55],
    ['Pia Side Table', 'sidetable', 'stone', 50, 50, 48],
  ],
  'dining-tables': [
    ['Cassia Dining Table', 'diningtable', 'black', 220, 100, 75],
    ['Dara Dining Table', 'diningtable', 'walnut', 200, 95, 75],
    ['Etta Dining Table', 'diningtable', 'stone', 240, 105, 75],
  ],
  'accent-chairs': [
    ['Juno Accent Chair', 'accent', 'olive', 82, 80, 76],
    ['Mabel Accent Chair', 'accent', 'cream', 78, 78, 74],
    ['Thea Accent Chair', 'accent', 'teal', 80, 80, 75],
  ],
  stools: [
    ['Bo Stool', 'stool', 'walnut', 40, 40, 46],
    ['Nia Stool', 'stool', 'black', 38, 38, 45],
    ['Uma Stool', 'stool', 'stone', 42, 42, 44],
  ],
};

export const lifestyleImages = [
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1000&q=75',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=75',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=75',
];

export const materialsFor = (categorySlug) => {
  const upholstered = ['sofas', 'ottomans', 'dining-chairs', 'bar-stools', 'benches', 'beds', 'accent-chairs'];
  return upholstered.includes(categorySlug)
    ? { fabric: 'Performance velvet', frame: 'Kiln-dried solid wood', legs: 'Powder-coated steel' }
    : { fabric: 'Not applicable', frame: 'Solid wood with veneer finish', legs: 'Solid wood' };
};

// Placeholder photography per category, replaced by real product photos later.
const photo = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&h=1250&q=75`;
const P = {
  tanSofa: '1540574163026-643ea20ade25', greenSofa: '1555041469-a586c61ea9bc', tufted: '1493663284031-b7e3aefcae8e',
  cream: '1616486338812-3dadae4b4ace', blue: '1484101403633-562f891dc89a', greyRoom: '1618221195710-dd6b41faaea6',
  open: '1600607687939-ce8a6c25118c', corner: '1550581190-9c1c48d21d6c', warm: '1631679706909-1844bbd07221',
  shelf: '1532372320572-cda25653a26d', yellow: '1550226891-ef816aed4a98', nightstand: '1522771739844-6a9f6d5f14af',
  blackChair: '1592078615290-033ee584e267', dining: '1617806118233-18e1de247200', roundTable: '1533090481720-856c6e3c1fdc',
  barStool: '1581539250439-c96689b516dd', stool: '1503602642458-232111445657', bedA: '1616594039964-ae9021a400a0',
  bedB: '1505693416388-ac5ce068fe85', bedC: '1617104678098-de229db51175', sideTable: '1499933374294-4584851497cc',
  tuftedChair: '1567538096630-e0c55bd6374c', beige: '1580480055273-228ff5388ef8', whiteChair: '1519947486511-46149fa0a254',
};
const pools = {
  sofas: ['tanSofa', 'greenSofa', 'cream', 'tufted', 'greyRoom', 'blue', 'open', 'corner', 'warm'],
  console: ['shelf', 'warm', 'cream'],
  ottomans: ['warm', 'yellow', 'cream'],
  nightstands: ['nightstand', 'shelf', 'bedC'],
  'dining-chairs': ['blackChair', 'dining', 'roundTable'],
  'bar-stools': ['barStool', 'stool', 'blackChair'],
  benches: ['bedC', 'bedB', 'bedA'],
  beds: ['bedA', 'bedB', 'bedC'],
  'side-tables': ['sideTable', 'open', 'warm'],
  'dining-tables': ['dining', 'roundTable', 'blackChair'],
  'accent-chairs': ['tuftedChair', 'beige', 'whiteChair', 'yellow'],
  stools: ['stool', 'barStool', 'warm'],
};

// Rotates the pool so each product leads with a different photo where possible.
export const imagesFor = (categorySlug, index) => {
  const pool = pools[categorySlug];
  return Array.from({ length: Math.min(4, pool.length) }, (_, i) => photo(P[pool[(index + i) % pool.length]]));
};
