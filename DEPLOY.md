# Steppa Challenge — Deployment Guide

## Stack
- **Frontend**: Vercel (React/Vite)
- **Backend**: Vercel (Express via @vercel/node) OR Railway
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Socket.io (works on Railway; limited on Vercel serverless)

---

## 1. Supabase Setup

Your Supabase project is already live: `sxcwqkaufujgsqbsjqgp`

1. Go to https://supabase.com/dashboard/project/sxcwqkaufujgsqbsjqgp/settings/database
2. Scroll to **Connection string** → select **URI**
3. Copy the **Transaction pooler** URL (port 6543) → this is your `DATABASE_URL`
4. Copy the **Session pooler** URL (port 5432) → this is your `DIRECT_URL`
5. Replace `[YOUR-PASSWORD]` in both URLs with your Supabase DB password

---

## 2. Backend on Railway (Recommended for Socket.io)

1. Go to https://railway.app → New Project → Deploy from GitHub Repo
2. Select `Saad200327/steppa-challenge`
3. Set **Root Directory** to `server`
4. Add these environment variables in Railway dashboard:

```
DATABASE_URL=postgresql://postgres.sxcwqkaufujgsqbsjqgp:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.sxcwqkaufujgsqbsjqgp:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
JWT_ACCESS_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-other-secret-here
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
NODE_ENV=production
CLIENT_URL=https://your-vercel-frontend-url.vercel.app
ENABLE_REAL_PAYMENTS=false
```

5. Railway gives you a URL like `https://steppa-server.up.railway.app`
6. Copy that URL for the next step

---

## 3. Frontend on Vercel

1. Go to https://vercel.com → New Project → Import `Saad200327/steppa-challenge`
2. Set **Root Directory** to `client`
3. Framework: **Vite** (auto-detected)
4. Add environment variable:
```
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```
5. Click Deploy

---

## 4. Demo Login Credentials

All demo users have password: `demo1234`

| Username | Email | Role |
|---|---|---|
| `demo_user` | demo@steppa.gg | Demo |
| `alex_j` | alex@demo.com | Demo |
| `sarah_walks` | sarah@demo.com | Demo |
| `jess_run` | jess@demo.com | Demo |
| `steppa_admin` | admin@steppa.gg | Admin |

---

## 5. Local Development

```bash
git clone https://github.com/Saad200327/steppa-challenge
cd steppa-challenge
npm install
cd server && npm install
cd ../client && npm install
cd ..

# Create server/.env from .env.example and fill in your Supabase URLs
cp server/.env.example server/.env

# Generate Prisma client (schema already applied to Supabase)
cd server && npx prisma generate

# Run both frontend + backend
cd .. && npm run dev
```
