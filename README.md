# Perfly - Website Performance Testing Platform

Perfly is a modern web application that lets users run website speed tests with a sleek and
responsive interface. It provides detailed performance metrics, AI-powered analysis, and historical
data tracking.

## Features

- 🔗 **Run Performance Tests**: Input a URL and trigger a backend test run
- 📊 **Results Page**: Display performance metrics, resource usage, and size breakdown
- 📁 **History Dashboard**: Authenticated users can view past tests and compare metrics
- 🧠 **AI Assistant**: Summarize performance bottlenecks and suggest optimizations using Gemini 2.5
  Pro
- 🧾 **Account Management**: Simple login/sign-up with GitHub authentication

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI Kit**: shadcn/ui (with Tailwind CSS, Radix UI, Lucide Icons)
- **Database**: Neon (PostgreSQL-compatible, serverless)
- **ORM**: Drizzle (type-safe, schema-first)
- **Authentication**: BetterAuth (simple, modern auth for Next.js)
- **AI Integration**: Gemini 2.5 Flash
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Neon PostgreSQL database
- GitHub OAuth application
- Gemini API key

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Database
DATABASE_URL=postgresql://username:password@your-neon-db-host/dbname

# Authentication
AUTH_SECRET=your-random-secret-key
AUTH_ORIGIN=http://localhost:3000
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# AI
GEMINI_API_KEY=your-gemini-api-key
```

### Installation

```bash
# Install dependencies
bun install

# Generate database migrations
bun db:generate

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: All Next.js routes
- `/components`: Reusable UI components
- `/lib`: Shared utilities
- `/db`: Drizzle schema + migrations
- `/ai`: Gemini prompt templates and handlers

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

## License

This project is licensed under the MIT License.
