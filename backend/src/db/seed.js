// Safe to re-run: rows are upserted by slug and nothing is truncated.
import { pool } from './pool.js';
import { config } from '../config.js';
import { categories, imagesFor, materialsFor, productsByCategory } from './catalog.js';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

try {
  for (const [index, [slug, name]] of categories.entries()) {
    await pool.execute(
      'INSERT INTO categories (slug, name, sort_order) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), sort_order = VALUES(sort_order)',
      [slug, name, index],
    );
  }

  let count = 0;
  for (const [categorySlug, items] of Object.entries(productsByCategory)) {
    const [[category]] = await pool.execute('SELECT id FROM categories WHERE slug = ?', [categorySlug]);
    const materials = materialsFor(categorySlug);

    for (const [index, [name, kind, color, width, depth, height]] of items.entries()) {
      const slug = slugify(name);
      const description = `The ${name} pairs a calm, architectural silhouette with generous proportions. Made to order, with custom sizes and finishes available on request.`;
      await pool.execute(
        `INSERT INTO products (slug, name, category_id, description, width_cm, depth_cm, height_cm, fabric, frame, legs, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), category_id = VALUES(category_id), description = VALUES(description),
           width_cm = VALUES(width_cm), depth_cm = VALUES(depth_cm), height_cm = VALUES(height_cm),
           fabric = VALUES(fabric), frame = VALUES(frame), legs = VALUES(legs), sort_order = VALUES(sort_order)`,
        [slug, name, category.id, description, width, depth, height, materials.fabric, materials.frame, materials.legs, index],
      );
      const [[product]] = await pool.execute('SELECT id FROM products WHERE slug = ?', [slug]);

      const images = imagesFor(categorySlug, index, kind, color).map((url, i) => ({ url, alt: `${name}, view ${i + 1}` }));

      await pool.execute('DELETE FROM product_images WHERE product_id = ?', [product.id]);
      for (const [position, image] of images.entries()) {
        await pool.execute(
          'INSERT INTO product_images (product_id, url, alt, sort_order) VALUES (?, ?, ?, ?)',
          [product.id, image.url, image.alt, position],
        );
      }
      count += 1;
    }
  }

  const settings = {
    brand_name: 'nayara',
    brand_tagline: 'modern furniture & home decor',
    whatsapp_number: config.whatsappNumber,
    instagram_url: '',
    facebook_url: '',
  };
  for (const [name, value] of Object.entries(settings)) {
    await pool.execute(
      'INSERT INTO settings (name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = IF(VALUES(value) = "", value, VALUES(value))',
      [name, value],
    );
  }

  console.log(`Seed complete: ${categories.length} categories, ${count} products.`);
} finally {
  await pool.end();
}
