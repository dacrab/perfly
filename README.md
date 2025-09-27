# Perfly · Website Performance Testing Platform

Perfly is a modern web performance testing platform that lets you run comprehensive website speed tests with AI-powered analysis and historical tracking.

Think WebPageTest, but with a streamlined, developer-friendly UX and intelligent insights.

## ✨ Features

- **Performance Testing**: Run tests for any URL with multiple locations and connection profiles
- **Core Web Vitals**: LCP, CLS, FCP, TTI and more
- **Waterfall & Resources**: Timing breakdowns and asset details
- **AI Analysis (Gemini 2.5 Flash)**: Plain-language insights and prioritized recommendations
- **History & Trends**: Save and review past tests (auth required)
- **Auth via GitHub**: Better Auth with GitHub OAuth and optional magic links (Resend)

## 🧱 Architecture Overview

- **Framework**: Next.js 15 (App Router)
- **Runtime / PM**: Bun
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: Better Auth (GitHub, magic link)
- **AI**: Google Gemini 2.5 Flash (`@google/generative-ai`)
- **Email**: Resend
- **UI**: Tailwind CSS + shadcn/ui + Radix UI + Lucide Icons
- **Deployment**: Vercel

### Directory Layout

```
src/
├─ app/                  # Routes (App Router)
│  ├─ api/               # API routes (tests, ai/analyze, auth)
│  ├─ results/[id]/      # Result views
│  ├─ dashboard/         # User dashboard
│  └─ auth/              # Auth UI
├─ components/           # UI components (shadcn/ui)
├─ db/                   # Drizzle schema & migrations
├─ lib/                  # Auth, email, logger, queue, utils, webpagetest
└─ ai/                   # AI helpers
```

### Data Model (Drizzle)

- `users` (id, email, hashedPassword?, githubId?)
- `sessions` (id, userId, expiresAt)
- `tests` (id, userId?, url, status, webPageTestId?, results?, error?, createdAt, updatedAt, completedAt?)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Neon PostgreSQL database
- GitHub OAuth app (Client ID/Secret)
- Gemini API key

### Quick Setup

```bash
git clone <your-repo-url>
cd perfly
bun install

# Copy and edit environment variables
cp .env.example .env.local || true

# Generate and apply database migrations
bun run db:generate
bun run db:migrate

# Start dev server
bun run dev
```

Open http://localhost:3000

### Environment Variables

Create `.env.local` with:

```bash
# Database
DATABASE_URL=postgresql://username:password@your-neon-host/dbname

# Authentication
AUTH_SECRET=your-random-secret
AUTH_ORIGIN=http://localhost:3000
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# AI
GEMINI_API_KEY=your-gemini-api-key

# Email (optional)
RESEND_API_KEY=your-resend-api-key
```

## 🛠️ Scripts

```bash
# Development
bun run dev              # Start dev server
bun run build            # Build for production
bun run start            # Run production build

# Database
bun run db:generate      # Generate migrations
bun run db:migrate       # Apply migrations
bun run db:push          # Push schema changes

# Quality
bun run typecheck        # TypeScript checks
bun run lint             # ESLint
bun run format:check     # Prettier check
bun run format:fix       # Prettier write
bun run check-all        # Typecheck + Lint + Format check
```

## 🔌 Notable Endpoints

- `POST /api/tests/run` – Trigger a test for a URL
- `GET /api/tests/[id]` – Fetch test status/results
- `POST /api/ai/analyze` – Run Gemini analysis on results
- `GET /api/auth/[...all]` – Auth routes (Better Auth)

## 🧩 Implementation Notes

- **Auth**: Configured via Better Auth with GitHub provider and magic link plugin (Resend)
- **DB**: Drizzle with Neon; migrations in `src/db/migrations`
- **AI**: `@google/generative-ai` used by server routes for analysis
- **UI**: Tailwind v4 with shadcn/ui primitives

## 📦 Deployment

Perfly is optimized for Vercel.

1) Link and deploy once locally (optional):

```bash
npx vercel link
npx vercel --prod
```

2) Configure GitHub Actions secrets for automated deploys:

- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- `NEON_PROJECT_ID`, `NEON_API_KEY` (for PR preview DB branches)

See `docs/DEPLOYMENT_SETUP.md` for step‑by‑step instructions.

## 🔄 CI/CD (KISS Workflows)

Simple workflow set (see `docs/WORKFLOW-ARCHITECTURE.md`):

- `ci.yml` – Quality, security, build, deploy (main)
- `preview.yml` – PR preview envs with Neon branches
- `maintenance.yml` – Daily security & cleanup
- `deploy.yml` – Manual emergency deploys

## 🤝 Contributing

1. Fork and create a feature branch
2. Make changes and run `bun run check-all`
3. Commit and open a PR

## 📄 License

MIT

## 🔗 Resources

- Docs: `./docs`
- Tech: Next.js, Neon, Drizzle, Better Auth, Gemini, Resend, shadcn/ui

— Perfly: making performance testing accessible, intelligent, and actionable.
