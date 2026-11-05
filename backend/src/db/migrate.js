import { readFileSync } from 'node:fs';
import { pool } from './pool.js';

const sql = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8');
const statements = sql.split(';').map((s) => s.trim()).filter(Boolean);

try {
  for (const statement of statements) await pool.query(statement);
  console.log(`Migration complete (${statements.length} tables checked).`);
} finally {
  await pool.end();
}
