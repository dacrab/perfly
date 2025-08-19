## 🔥 Project Prompt — _Perfly_

**Goal:** Build **Perfly**, a modern, authenticated **web performance testing platform** (think
WebPageTest UI done right) where users can run tests against URLs, see rich, visualized results
(Core Web Vitals, filmstrips, waterfalls, timings), and keep a **personal history** of runs. Add an
**AI assistant (Gemini 2.5 Flash)** that analyzes results and suggests fixes. Use **Bun** for
everything (package manager, scripts, dev server).

---

## 🧱 Tech Stack (hard requirements)

- **Runtime / PM:** **Bun**
- **Framework:** **Next.js** (App Router, SSR/ISR where needed)
- **UI:** **shadcn/ui** + **Tailwind CSS** + **Radix UI** + **Lucide icons**
  - Add components via **`bun shadcn@latest add <component>`**

- **ORM:** **Drizzle ORM**
- **DB:** **Neon (PostgreSQL, serverless)**
  - Use **branching** strategy for dev/test

- **Auth:** **Better Auth** (email/password, optional OAuth later)
- **Email:** **Resend** (verification, test-complete notifications)
- **AI:** **Gemini 2.5 Flash** (summaries, recommendations, explanations)
- **Deployment:** **Vercel**
- **Validation:** **zod**
- **Testing:** **Vitest** + **Playwright** (optional)
- **Linting/Formatting:** **Biome** or **ESLint + Prettier**

---

## 🗂 High-level Architecture

```
apps/perfly (single app)
  /app
    /(marketing)
      page.tsx
    /(auth)
      sign-in/page.tsx
      sign-up/page.tsx
      callback/...
    /(dashboard)
      dashboard/page.tsx
      results/[id]/page.tsx
      history/page.tsx
      settings/page.tsx
    /api
      /auth/* (Better Auth)
      /tests/run/route.ts        // Kick off WPT test
      /tests/status/route.ts     // Poll test status
      /tests/[id]/route.ts       // Fetch stored test
      /locations/route.ts        // Proxy to WPT getLocations
    layout.tsx
    globals.css
  /components
    ui/* (shadcn)
    charts/*
    forms/*
    results/*
  /db
    schema.ts
    drizzle.config.ts
    migrations/*
  /lib
    db.ts
    auth.ts
    wpt.ts               // thin client around WPT endpoints
    ai.ts                // Gemini prompt builders
    validation.ts
    utils.ts
  /styles
    tailwind.css
  /scripts
    seed.ts
```

---

## 🧭 Feature List & Clear Goals

### Public / Anonymous

- Run a one-off test (URL + location + connectivity profile)
- View the results page (shareable link)
- Limited retention / no personal history

### Authenticated

- Full **history** of tests
- Test **comparison view** (compare 2–3 runs side-by-side)
- **Email notifications** when a test completes
- **AI summary** & recommendations (Gemini 2.5 Flash) per run
- Saved **presets** (default location, connectivity, runs, etc.)
- **Organization / Team** (optional phase 2)

### Admin (phase 2+)

- System metrics
- API rate limits
- Feature flags

---

## 🔌 WebPageTest (or compatible) API integration

Implement a thin `lib/wpt.ts` that wraps:

- `POST /runtest.php?f=json&url=...&location=...&connectivity=...&runs=...`
- `GET  /jsonResult.php?test=<id>`
- `GET  /getLocations.php?f=json`

**Server-side route handlers** (Next.js) should:

- Accept request payload from the client
- Forward to WPT
- Store minimal snapshot in DB (testId, userId, status)
- Poll or use client polling to finalize
- Persist the full JSON result blob (or summarized metrics) in DB

---

## 🧮 Data Model (Drizzle)

```ts
// db/schema.ts
import { pgTable, text, timestamp, integer, boolean, jsonb, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tests = pgTable('tests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  url: text('url').notNull(),
  location: text('location').notNull(),
  connectivity: text('connectivity').notNull(),
  runs: integer('runs').default(1),
  status: text('status').notNull().default('queued'), // queued | running | complete | error
  wptTestId: text('wpt_test_id').notNull(),
  metrics: jsonb('metrics'), // summarized metrics (TTFB, FCP, LCP, SI, TTI, CLS, etc.)
  raw: jsonb('raw'), // optional full WPT payload
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  key: text('key').notNull().unique(),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## 🧠 Gemini 2.5 Flash — AI Features

**Endpoints / hooks:**

- `POST /api/ai/summarize`: Given WPT JSON metrics, output:
  - Plain-language explanation
  - Ordered list of bottlenecks
  - Recommended fixes (short-term / long-term)
  - Annotated CWV (LCP, CLS, INP) explanations

- `POST /api/ai/compare`: Compare two test runs and generate a diff summary

**Prompts should include:**

- URL context, device/connectivity
- Key metrics (LCP, TTI, SI, CLS, TBT/INP, TTFB)
- Waterfall size / request counts
- Largest contentful element details (if present)

---

## 🧩 shadcn/ui — Components to scaffold (via Bun)

Use **`bun shadcn@latest add <component>`**. Start with:

```
bun shadcn@latest add button input form label select textarea
bun shadcn@latest add table badge card dropdown-menu dialog alert
bun shadcn@latest add tabs toast tooltip skeleton progress
bun shadcn@latest add sheet separator pagination
```

Optional:

- **Charts**: Integrate `recharts` or `visx` and wrap them in your own `ChartCard` components.
- **Code blocks**: for JSON raw payload previews.

---

## 🧪 Acceptance Criteria (MVP)

1. **Run Test (Anonymous)**
   - Input URL
   - Choose location & connectivity (fetched from WPT getLocations)
   - On submit, show a “running” state
   - Poll status until complete → show result page

2. **View Results**
   - Show main metrics (TTFB, FCP, LCP, SI, TTI, CLS)
   - Simple waterfall image or link
   - AI summary (button: “Explain these results”)

3. **Auth + History**
   - Sign up / Sign in (Better Auth)
   - Saved tests linked to user
   - History page: filter by URL, date range

4. **Email**
   - Resend verification & “test complete” notification

5. **DB**
   - Drizzle migrations runnable with Bun

6. **Deploy**
   - Vercel deploy + Neon DB
   - `.env` properly set

7. **DX**
   - `bun run dev`, `bun run db:push`, `bun run db:migrate`

---

## 🔐 Env Vars (example)

```
# Database
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require"

# Auth
BETTER_AUTH_SECRET="..."
BETTER_AUTH_URL="https://perfly.app"

# Email
RESEND_API_KEY="re_..."

# WPT
WPT_BASE_URL="https://your-wpt-instance"
WPT_API_KEY=""                # if needed

# AI
GEMINI_API_KEY="..."

# App
NEXT_PUBLIC_APP_URL="https://perfly.app"
```

---

## 🧰 Bun-first Commands

**Scaffold app**

```bash
bunx create-next-app@latest perfly --ts --eslint --app --src-dir --tailwind --no-experimental-app
cd perfly
```

**Install deps**

```bash
bun add drizzle-orm @neondatabase/serverless pg zod better-auth resend
bun add -d drizzle-kit @types/node @types/pg
```

**shadcn/ui init**

```bash
bun shadcn@latest init
# then add components:
bun shadcn@latest add button input form label select textarea table badge card dropdown-menu dialog alert tabs toast tooltip skeleton progress sheet separator pagination
```

**Drizzle config + migrate**

```bash
bunx drizzle-kit init
# edit drizzle.config.ts to point to Neon + schema.ts
bun run db:push      # or db:migrate depending on your flow
```

**Dev**

```bash
bun run dev
```

---

## 🧪 Testing (optional but recommended)

- **Vitest** for unit tests of lib functions (ai.ts, wpt.ts)
- **Playwright** for e2e: run test → view results → login → history

---

## 🗺 Milestones

1. **Scaffold & Auth (Better Auth)**
2. **DB Schema (Drizzle + Neon)**
3. **Run Test Flow (API + client)**
4. **Results Page + AI Summary**
5. **History & Compare**
6. **Email Notifications (Resend)**
7. **Polish UI (shadcn components, charts)**
8. **Deploy to Vercel**
9. **Docs + Pricing page (if SaaS)**

---

## ✅ Deliverables (MVP)

- Working **Next.js (App Router) app** with Bun
- **Auth + History** powered by Neon/Drizzle
- **Run → Poll → Render Results** flow
- **AI analysis** (Gemini 2.5 Flash) on demand
- **Resend emails** for verification + test complete
- Clean, typed codebase with shadcn/ui
