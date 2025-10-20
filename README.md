# Perfly · Minimal Website Performance Testing (Next.js + PSI)

Perfly is a lightweight web performance testing app. Enter a URL, queue a test, and view results powered by Google PageSpeed Insights. Results are stored in Postgres and presented in a clean UI.

## ✨ Features

- **Run tests for any URL**: Queues a background job and fetches metrics via PageSpeed Insights
- **Core metrics**: Performance score, Web Vitals (LCP, FID/TBT, CLS, TTFB, FCP, SI)
- **Persistent results**: Tests and results saved in Postgres (Neon) via Drizzle ORM
- **Email sign-in (magic link)**: Passwordless auth using Better Auth + Resend
- **Modern UI**: Tailwind CSS v4, shadcn/ui, Radix primitives, Lucide icons

## 🧱 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime / PM**: Bun
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: Better Auth (magic link)
- **Email**: Resend
- **Styling**: Tailwind CSS v4

### Directory Layout

```
src/
├─ app/                  # Routes (App Router)
│  ├─ api/               # API routes (tests, auth)
│  ├─ results/[id]/      # Result views
│  ├─ dashboard/         # Dashboard UI
│  └─ auth/              # Auth routes
├─ components/           # UI components (shadcn/ui)
├─ db/                   # Drizzle schema & migrations
└─ lib/                  # auth, email, logger, pagespeed client, queue, utils
```

### Data Model (Drizzle)

- `users` (id, email, hashedPassword?, githubId?)
- `sessions` (id, userId, expiresAt)
- `tests` (id, userId?, url, status, results?, error?, createdAt, updatedAt, completedAt?)

## 🚀 Getting Started

### Prerequisites

- Bun 1.x
- Neon PostgreSQL database (or any Postgres with a `DATABASE_URL`)

### Quick Setup

```bash
git clone https://github.com/dacrab/perfly
cd perfly
bun install

# Create local environment file
cp .env.example .env.local

# Generate and apply database migrations
bun run db:generate
bun run db:migrate

# Start dev server
bun run dev
```

Open `http://localhost:3000`.

### Environment Variables

Create `.env.local` with at least:

```bash
# Database
DATABASE_URL=postgresql://username:password@your-neon-host/dbname

# Authentication
AUTH_SECRET=your-random-secret

# Social (optional)
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Email (magic links)
RESEND_API_KEY=your-resend-api-key

# PageSpeed Insights
PAGESPEED_API_KEY=your-google-pagespeed-insights-api-key
# (also supported) GOOGLE_PAGESPEED_API_KEY

# Background processor (optional)
AUTO_START_PROCESSOR=true
```

Notes:
- `AUTH_SECRET` is required by Better Auth
- `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` enable Google sign-in
- `PAGESPEED_API_KEY` (or `GOOGLE_PAGESPEED_API_KEY`) is required to run tests
- Queue auto-starts in production; set `AUTO_START_PROCESSOR=true` to start in dev

## 🛠️ Scripts

```bash
# Development
bun run dev              # Start dev server
bun run build            # Build for production
bun run start            # Run production build

# Database (Drizzle)
bun run db:generate      # Generate migrations from schema
bun run db:migrate       # Apply migrations
bun run db:push          # Push schema changes

# Quality
bun run lint             # Typecheck + lint (TypeScript + Ultracite)
bun run format           # Format code (Ultracite)
```

## 🔌 API Endpoints

- `POST /api/tests/run` – Queue a test for a URL
- `GET /api/tests/[id]` – Fetch test status/results
- `GET /api/auth/[...all]` – Better Auth routes (magic link)

Example:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}' \
  http://localhost:3000/api/tests/run
```

## 🔄 CI/CD

GitHub Actions in `/.github/workflows`:
- `ci.yml` – Checkout, setup Bun, install, lint/typecheck, conditional tests, build
- `lighthouse.yml` – Build and run Lighthouse CI using `lighthouserc.json`

Dependabot config: `/.github/dependabot.yml` (weekly updates for npm + actions).

Lockfiles: `bun.lock`/`bun.lockb` are ignored; CI regenerates dependencies. Commit them if you prefer strict reproducibility.

## 📦 Deployment

Deploy on Vercel (recommended). Set required env vars in your hosting provider.

Basic manual flow:

```bash
npx vercel link
npx vercel --prod
```

## 🤝 Contributing

1. Create a feature branch
2. Make changes and run `bun run lint`
3. Open a PR

## 📄 License

MIT

---

Perfly — simple, modern performance testing with Next.js.
