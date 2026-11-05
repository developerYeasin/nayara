import 'dotenv/config';

for (const key of ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']) {
  if (!process.env[key]) throw new Error(`Missing environment variable ${key}`);
}

export const config = {
  port: Number(process.env.PORT || 4100),
  publicUrl: (process.env.PUBLIC_URL || 'http://localhost:4100').replace(/\/$/, ''),
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5310').split(',').map((s) => s.trim()),
  whatsappNumber: (process.env.WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
