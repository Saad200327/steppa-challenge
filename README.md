# 🏃 Steppa Challenge

**Your laziness is someone else's paycheck.**

Steppa Challenge is a full-stack fitness betting platform where users stake virtual coins on hitting their daily step goal. Winners split the pool of losers' money proportionally.

## Screenshot

> Landing page features a live step counter, cinematic dark UI, and real-time payout ticker.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Zustand, Recharts |
| Backend | Node.js, Express, Prisma ORM, SQLite (dev) / PostgreSQL (prod) |
| Auth | JWT (access + refresh tokens), bcryptjs |
| Realtime | socket.io |
| Jobs | node-cron (midnight settlement, panic alerts, step sync) |
| Payments | Virtual StepCoins (Stripe scaffolded, feature-flagged) |

## Local Setup

```bash
# 1. Clone
git clone https://github.com/Saad200327/steppa-challenge.git
cd steppa-challenge

# 2. Install all dependencies
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# 3. Configure environment
cp server/.env.example server/.env
# Edit server/.env with your values

# 4. Run database migration + seed
cd server
npx prisma migrate dev --name init
node prisma/seed.js
cd ..

# 5. Start dev server (runs both client + server)
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3001

## Environment Variables

See `server/.env.example` for all required variables.

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL or SQLite connection string |
| `JWT_ACCESS_SECRET` | Secret for access tokens |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth app secret |
| `FITBIT_CLIENT_ID` | Fitbit OAuth app client ID |
| `FITBIT_CLIENT_SECRET` | Fitbit OAuth app secret |
| `STRIPE_SECRET_KEY` | Stripe secret (disabled by default) |
| `ENABLE_REAL_PAYMENTS` | Set `true` to enable Stripe |

## Google Fit OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → Enable **Fitness API**
3. OAuth 2.0 credentials → Web app
4. Set redirect URI: `http://localhost:3001/api/auth/oauth/callback/google`
5. Copy Client ID + Secret to `.env`

## Fitbit OAuth Setup

1. Go to [dev.fitbit.com](https://dev.fitbit.com)
2. Register a new app
3. Set callback URL: `http://localhost:3001/api/auth/oauth/callback/fitbit`
4. Copy Client ID + Secret to `.env`

## Deployment

**Frontend (GitHub Pages):**
```bash
cd client && npm run deploy
```

**Backend (Railway):**
1. Connect repo to [Railway](https://railway.app)
2. Set environment variables in Railway dashboard
3. Deploy command: `cd server && npm start`
4. Set `DATABASE_URL` to your Railway PostgreSQL or [Supabase](https://supabase.com) URL

## Architecture

```
steppa-challenge/
├── client/          # React + Vite SPA (GitHub Pages)
│   └── src/
│       ├── pages/   # 11 pages (Landing, Auth, Dashboard, etc.)
│       ├── components/  # UI, layout, challenge, leaderboard, wallet, social
│       ├── hooks/   # 6 custom hooks
│       ├── store/   # Zustand stores (auth, challenge, wallet)
│       └── services/ # API, auth, challenge, wallet, step services
└── server/          # Express API (Railway / Render)
    ├── prisma/      # Schema + seed
    └── src/
        ├── controllers/  # 7 controllers
        ├── routes/       # 7 route files
        ├── services/     # Settlement, step verification, socket, notifications
        ├── jobs/         # Midnight settlement, panic alerts, step sync crons
        └── middleware/   # Auth, rate limit, error handler, validator
```

## Seed Data

The seed creates:
- 1 admin user + 5 demo users (each with 100 StepCoins)
- 3 active daily challenges ($5 / $10 / $25 stakes)
- 2 completed challenges with settlement data
- Sample step logs and transactions

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m 'feat: your feature'`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

## License

MIT
