# nayara

Inquiry-based furniture site. `frontend/` (React) and `backend/` (Node.js) are separate apps that talk only through the REST API. Database credentials live only in `backend/.env`.

## Run

```
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev          # http://localhost:4100

cd frontend
npm install
npm run dev          # http://localhost:5310
```

## API

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | API and database check |
| `GET /api/settings` | Brand name, WhatsApp number, social links |
| `GET /api/categories` | Categories with product counts |
| `GET /api/products?category=&q=&limit=&offset=` | Product list and search |
| `GET /api/products/:slug` | Product detail with images and related products |

## Configure

- WhatsApp: set `WHATSAPP_NUMBER` in `backend/.env`, then run `npm run db:seed`.
- Social links: set `instagram_url` and `facebook_url` in the `settings` table. Each shows in the footer once it has a value.
- Production: set `PUBLIC_URL` and `CORS_ORIGIN` in the backend, and `VITE_API_URL` in the frontend.
- Sample data: `backend/src/db/catalog.js` holds placeholder products. Product images are cut-outs made from Unsplash photos (in `backend/public/media/products/`), plus Unsplash room photos; replace the rows in `product_images` with real photos.
