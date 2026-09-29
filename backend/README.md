# Digital Resources – Backend (Login / Register)

Node.js + Express + MySQL (Prisma) + JWT.

## Chạy
```bash
npm install
npx prisma migrate dev --name init   # hoặc: npx prisma db push
npm run dev
```

## API
- `POST /api/auth/register` — body: `{ fullName, email, password }` → `{ token, user }`
- `POST /api/auth/login` — body: `{ email, password }` → `{ token, user }`
