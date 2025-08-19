This document provides a comprehensive overview of the Perfly project, a modern web performance
testing platform. It is intended to be a guide for developers working on the project, providing
information about the project's architecture, key components, and development conventions.

## 1. Project Overview

Perfly is a web performance testing platform that allows users to run tests against URLs, see rich,
visualized results, and keep a personal history of runs. It also includes an AI assistant that
analyzes results and suggests fixes.

## 2. Tech Stack

- **Runtime / Package Manager:** Bun
- **Framework:** Next.js (App Router)
- **UI:** shadcn/ui, Tailwind CSS, Lucide React
- **ORM:** Drizzle ORM
- **Database:** Neon (PostgreSQL, serverless)
- **Authentication:** Better Auth
- **Email:** Resend
- **AI:** Gemini 2.5 Flash
- **Deployment:** Vercel

## 3. Architecture

The project follows a single-app architecture with the following directory structure:

```
/home/dacrab/Documents/GitHub/perfly/
├───.env.example
├───.gitignore
├───bun.lock
├───components.json
├───drizzle.config.ts
├───eslint.config.mjs
├───next.config.ts
├───package-lock.json
├───package.json
├───plan.md
├───postcss.config.mjs
├───README.md
├───tsconfig.json
├───.git/...
├───.next/...
├───node_modules/...
├───public/
│   ├───file.svg
│   ├───globe.svg
│   ├───next.svg
│   ├───vercel.svg
│   └───window.svg
└───src/
    ├───ai/
    │   └───index.ts
    ├───app/
    │   ├───favicon.ico
    │   ├───globals.css
    │   ├───layout.tsx
    │   ├───not-found.tsx
    │   ├───page.tsx
    │   ├───api/
    │   │   ├───ai/
    │   │   │   └───analyze/
    │   │   │       └───route.ts
    │   │   ├───auth/
    │   │   │   └───[...all]/
    │   │   │       └───route.ts
    │   │   └───tests/
    │   │       └───run/
    │   │           └───route.ts
    │   ├───auth/
    │   │   └───page.tsx
    │   ├───dashboard/
    │   │   └───page.tsx
    │   ├───results/
    │   │   └───[id]/
    │   │       ├───loading.tsx
    │   │       └───page.tsx
    │   └───run/
    │       └───page.tsx
    ├───components/
    │   ├───navigation.tsx
    │   └───ui/
    │       ├───alert.tsx
    │       ├───avatar.tsx
    │       ├───badge.tsx
    │       ├───button.tsx
    │       ├───card.tsx
    │       ├───dropdown-menu.tsx
    │       ├───input.tsx
    │       ├───label.tsx
    │       ├───progress.tsx
    │       ├───skeleton.tsx
    │       ├───switch.tsx
    │       ├───table.tsx
    │       └───tabs.tsx
    ├───db/
    │   ├───index.ts
    │   ├───schema.ts
    │   └───migrations/
    │       ├───0000_lumpy_bug.sql
    │       └───meta/
    │           ├───_journal.json
    │           └───0000_snapshot.json
    └───lib/
        ├───auth-client.ts
        ├───auth.ts
        ├───email.ts
        └───utils.ts
```

## 4. Data Model

The data model is defined using Drizzle ORM and consists of the following tables:

- `users`: Stores user information.
- `tests`: Stores test run information.
- `api_keys`: Stores API keys for users.

## 5. Key Components

- **`src/app`**: Contains the main application code, including pages, API routes, and layout.
- **`src/components`**: Contains reusable UI components.
- **`src/db`**: Contains the database schema and migrations.
- **`src/lib`**: Contains utility functions and libraries.

## 6. Development Conventions

- **Commits:** Commits should follow the Conventional Commits specification.
- **Code Style:** Code should be formatted using Biome.
- **Testing:** Tests should be written using Vitest and Playwright.
