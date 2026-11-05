import { Router } from 'express';
import { pool } from '../db/pool.js';
import { config } from '../config.js';

export const api = Router();

const wrap = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const mediaUrl = (url) => (/^https?:\/\//.test(url) ? url : `${config.publicUrl}${url}`);
const clampInt = (value, fallback, min, max) => {
  const n = Number.parseInt(value, 10);
  return Number.isNaN(n) ? fallback : Math.min(max, Math.max(min, n));
};

const LIST_COLUMNS = `p.id, p.slug, p.name, c.slug AS category_slug, c.name AS category_name,
  (SELECT i.url FROM product_images i WHERE i.product_id = p.id ORDER BY i.sort_order LIMIT 1) AS image,
  (SELECT i.url FROM product_images i WHERE i.product_id = p.id ORDER BY i.sort_order LIMIT 1 OFFSET 1) AS hover_image`;

const toListItem = (row) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  category: { slug: row.category_slug, name: row.category_name },
  image: row.image ? mediaUrl(row.image) : null,
  hoverImage: row.hover_image ? mediaUrl(row.hover_image) : null,
});

api.get('/health', wrap(async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ status: 'ok' });
}));

api.get('/settings', wrap(async (_req, res) => {
  const [rows] = await pool.query('SELECT name, value FROM settings');
  res.set('Cache-Control', 'public, max-age=300');
  res.json(Object.fromEntries(rows.map((r) => [r.name, r.value])));
}));

api.get('/categories', wrap(async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT c.slug, c.name, COUNT(p.id) AS product_count
     FROM categories c LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
     GROUP BY c.id ORDER BY c.sort_order`,
  );
  res.set('Cache-Control', 'public, max-age=300');
  res.json(rows.map((r) => ({ slug: r.slug, name: r.name, productCount: Number(r.product_count) })));
}));

api.get('/products', wrap(async (req, res) => {
  const limit = clampInt(req.query.limit, 48, 1, 100);
  const offset = clampInt(req.query.offset, 0, 0, 100000);
  const where = ['p.is_active = 1'];
  const params = [];

  if (typeof req.query.category === 'string' && req.query.category) {
    where.push('c.slug = ?');
    params.push(req.query.category);
  }
  if (typeof req.query.q === 'string' && req.query.q.trim()) {
    const term = req.query.q.trim().slice(0, 100).replace(/[\\%_]/g, '\\$&');
    where.push('(p.name LIKE ? OR c.name LIKE ?)');
    params.push(`%${term}%`, `%${term}%`);
  }

  const from = `FROM products p JOIN categories c ON c.id = p.category_id WHERE ${where.join(' AND ')}`;
  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total ${from}`, params);
  const [rows] = await pool.query(
    `SELECT ${LIST_COLUMNS} ${from} ORDER BY c.sort_order, p.sort_order LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  );
  res.json({ items: rows.map(toListItem), total: Number(total), limit, offset });
}));

api.get('/products/:slug', wrap(async (req, res) => {
  const [[product]] = await pool.query(
    `SELECT p.*, c.slug AS category_slug, c.name AS category_name
     FROM products p JOIN categories c ON c.id = p.category_id
     WHERE p.slug = ? AND p.is_active = 1`,
    [req.params.slug],
  );
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const [images] = await pool.query(
    'SELECT url, alt FROM product_images WHERE product_id = ? ORDER BY sort_order',
    [product.id],
  );
  const [related] = await pool.query(
    `SELECT ${LIST_COLUMNS} FROM products p JOIN categories c ON c.id = p.category_id
     WHERE p.category_id = ? AND p.id <> ? AND p.is_active = 1 ORDER BY RAND() LIMIT 6`,
    [product.category_id, product.id],
  );

  return res.json({
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: { slug: product.category_slug, name: product.category_name },
    description: product.description,
    dimensions: { width: product.width_cm, depth: product.depth_cm, height: product.height_cm, unit: 'cm' },
    materials: { fabric: product.fabric, frame: product.frame, legs: product.legs },
    images: images.map((i) => ({ url: mediaUrl(i.url), alt: i.alt })),
    related: related.map(toListItem),
  });
}));
