# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Essential Commands

- **Start development server**: `bun dev` (runs on http://localhost:3000)
- **Build production**: `bun run build`
- **Start production**: `bun run start`
- **Type checking**: `bun run typecheck`
- **Linting**: `bun run lint` or `bun run lint:fix`
- **Code formatting**: `bun run format` or `bun run format:check`
- **Complete check**: `bun run check-all` (runs typecheck, lint, and format check)

### Database Commands

- **Generate migrations**: `bun run db:generate`
- **Apply migrations**: Use Drizzle commands with `bunx drizzle-kit`
- **Database introspection**: `bunx drizzle-kit introspect`

### Package Management

- **Install dependencies**: `bun install`
- **Add new UI components**: `bun shadcn@latest add <component>`

## Project Architecture

### Tech Stack Overview

- **Runtime**: Bun (package manager, dev server, and scripts)
- **Framework**: Next.js 15+ with App Router (SSR/ISR)
- **UI**: shadcn/ui + Tailwind CSS + Radix UI + Lucide icons
- **Database**: Neon PostgreSQL (serverless) with Drizzle ORM
- **Authentication**: BetterAuth with GitHub OAuth and magic links
- **AI**: Google Gemini 2.5 Flash for performance analysis
- **Email**: Resend for notifications and magic links
- **Deployment**: Vercel

### Directory Structure

```
src/
├── ai/                     # Gemini AI integration
│   └── index.ts           # AI model configuration
├── app/                   # Next.js App Router pages and API
│   ├── api/              # API routes
│   │   ├── ai/analyze/   # AI analysis endpoint
│   │   ├── auth/         # BetterAuth handlers
│   │   └── tests/run/    # Test execution endpoint
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # User dashboard
│   ├── results/[id]/     # Test results pages
│   └── run/              # Test creation page
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   └── navigation.tsx   # Main navigation
├── db/                  # Database layer
│   ├── schema.ts        # Drizzle schema definitions
│   ├── index.ts         # Database connection
│   └── migrations/      # Database migrations
└── lib/                 # Utilities and configurations
    ├── auth.ts          # BetterAuth configuration
    ├── auth-client.ts   # Client-side auth
    ├── email.ts         # Resend email configuration
    └── utils.ts         # General utilities
```

### Core Architecture Patterns

#### Database Schema

The application uses three main tables:

- **users**: User accounts with email, GitHub ID, and hashed passwords
- **sessions**: Authentication sessions with expiration
- **tests**: Performance test records with URL, status, results, and user association

#### Authentication Flow

- BetterAuth handles multiple authentication methods:
  - GitHub OAuth for quick social login
  - Magic links via email (Resend integration)
  - Traditional email/password (with hashed passwords)
- Sessions are managed in the database with proper expiration

#### Performance Testing Workflow

1. User submits URL via home page form
2. API route creates test record in database with "PENDING" status
3. Test ID is returned and user is redirected to results page
4. Results page polls for test completion (implementation pending)
5. Once complete, AI analysis can be triggered via separate API

#### AI Integration

- Google Gemini 2.5 Flash provides performance analysis
- Analysis includes performance summary, top issues, recommendations, and grading
- Structured prompts analyze Core Web Vitals, resource counts, and file sizes

## Key Development Practices

### Environment Configuration

Required environment variables (see `.env.example`):

- `DATABASE_URL`: Neon PostgreSQL connection string
- `AUTH_SECRET`: BetterAuth secret (generate with `npx @better-auth/cli secret`)
- `AUTH_ORIGIN`: Application URL (http://localhost:3000 for dev)
- `GEMINI_API_KEY`: Google AI API key
- `RESEND_API_KEY`: Resend email service API key
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`: GitHub OAuth credentials

### Component Development

- Uses shadcn/ui component library built on Radix UI
- Add new components with: `bun shadcn@latest add <component-name>`
- Components follow Tailwind CSS styling patterns
- Theme provider enables dark/light mode switching

### Database Operations

- Drizzle ORM provides type-safe database operations
- Schema defined in `src/db/schema.ts` using pgTable
- Migrations generated with `bun run db:generate`
- Database connection configured for Neon PostgreSQL

### API Development

- Next.js API routes in `src/app/api/`
- Routes handle JSON requests/responses with proper error handling
- Authentication integration for user-specific operations
- AI integration for performance analysis

## Current Implementation Status

- ✅ Basic project setup with Next.js and Bun
- ✅ Database schema and Drizzle ORM integration
- ✅ BetterAuth with GitHub OAuth and magic links
- ✅ shadcn/ui components and Tailwind CSS
- ✅ Basic test creation and database storage
- ✅ AI analysis API with Gemini integration
- ⚠️ Test execution backend (pending WebPageTest integration)
- ⚠️ Results display and visualization
- ⚠️ User dashboard and test history

## Integration Points

### WebPageTest Integration (Planned)

The application is designed to integrate with WebPageTest API:

- Test execution will call WebPageTest endpoints
- Results polling will fetch completed test data
- Performance metrics will be stored in database
- AI analysis will process WebPageTest JSON results

### Email Notifications

- Resend integration for transactional emails
- Magic link authentication emails
- Test completion notifications (when implemented)

### Deployment Considerations

- Optimized for Vercel deployment
- Environment variables configured for production
- Database migrations handled via Drizzle
- Build process uses Next.js optimizations
