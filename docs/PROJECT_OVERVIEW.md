# Perfly - Website Performance Testing Platform

## 🎯 Project Overview

**Perfly** is a modern web performance testing platform that lets users run comprehensive website speed tests with AI-powered analysis and historical tracking.

Think **WebPageTest** but with a modern, user-friendly interface powered by AI insights.

## ✨ Key Features

### 🔍 **Performance Testing**
- Run speed tests against any website URL
- Support for multiple test locations and connection types
- Core Web Vitals measurement (LCP, CLS, FCP, TTI)
- Detailed waterfall analysis and resource breakdown
- Performance metrics history and trends

### 🔎 **Analysis**
- Optional rule-based insights and recommendations
- Plain-language explanations of technical metrics
- Test comparison and regression analysis

### 👥 **User Management**
- GitHub OAuth authentication via **Better Auth**
- Personal test history and dashboard
- Test comparison tools
- Saved test configurations and presets
- Email notifications for test completion

### 🌟 **Modern Tech Stack**
- **Next.js 15** with App Router for optimal performance
- **Bun** for ultra-fast package management and development
- **Neon PostgreSQL** with database branching for isolated development
- **Vercel** deployment with automatic preview environments
- **shadcn/ui** + **Tailwind CSS** for beautiful, accessible UI

## 🏗️ Architecture

### Frontend
```
src/app/
├── (auth)/              # Authentication pages
├── (dashboard)/         # User dashboard and history
├── results/[id]/        # Test results visualization
├── api/                 # API routes
└── components/          # Reusable UI components
```

### Backend Services
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with GitHub provider
- **AI**: Gemini 2.5 Flash for performance analysis
- **Email**: Resend for notifications
- **Testing Engine**: Google PageSpeed Insights (Lighthouse) API integration

### Infrastructure
- **Hosting**: Vercel with automatic deployments
- **Database**: Neon with preview branches for PRs
- **CI/CD**: GitHub Actions with simplified workflows
- **Monitoring**: Built-in performance and error tracking

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** or **Bun** (recommended)
- **Neon PostgreSQL** database
- **GitHub OAuth** application
- **Gemini API** key

### Quick Setup

1. **Clone and install**:
   ```bash
   git clone https://github.com/your-username/perfly.git
   cd perfly
   bun install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

3. **Setup database**:
   ```bash
   bun run db:generate
   bun run db:migrate
   ```

4. **Start development**:
   ```bash
   bun run dev
   ```

### Environment Variables

Create `.env.local` with:

```bash
# Database
DATABASE_URL=your-neon-connection-string

# Authentication
AUTH_SECRET=your-random-secret
AUTH_ORIGIN=http://localhost:3000
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret

# AI Analysis
GEMINI_API_KEY=your-gemini-api-key

# Email (optional)
RESEND_API_KEY=your-resend-api-key
```

## 📊 User Journey

### Anonymous Users
1. **Visit homepage** → Enter website URL to test
2. **Configure test** → Select location and connection type
3. **Run test** → View real-time progress
4. **See results** → Performance metrics and basic analysis
5. **Get AI insights** → Click "Explain Results" for detailed analysis

### Authenticated Users
1. **Sign in with GitHub** → Quick OAuth authentication
2. **Access dashboard** → View all previous tests
3. **Compare tests** → Side-by-side performance comparison
4. **Save presets** → Quick test configurations
5. **Get notifications** → Email alerts when tests complete
6. **Track trends** → Historical performance data

## 🛠️ Development

### Tech Stack Details

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 15 | React framework with App Router |
| **Runtime** | Bun | Fast package manager and JavaScript runtime |
| **Database** | Neon PostgreSQL | Serverless Postgres with branching |
| **ORM** | Drizzle | Type-safe database operations |
| **Authentication** | Better Auth | Modern auth for Next.js |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **UI Components** | shadcn/ui | Beautiful, accessible React components |
| **AI** | Gemini 2.5 Flash | Performance analysis and insights |
| **Email** | Resend | Transactional email service |
| **Deployment** | Vercel | Modern web platform |

### Key Scripts

```bash
# Development
bun run dev              # Start development server
bun run build            # Build for production
bun run start            # Start production server

# Database
bun run db:generate      # Generate new migrations
bun run db:migrate       # Apply migrations
bun run db:push          # Push schema changes

# Code Quality
bun run lint             # Run ESLint
bun run format:check     # Check code formatting
bun run format:fix       # Fix code formatting
bun run typecheck        # TypeScript type checking

# All quality checks
bun run check-all        # Run all quality checks
```

## 🚀 Deployment

### Vercel Deployment

The application is optimized for **Vercel** deployment:

1. **Automatic deployments** from GitHub
2. **Preview environments** for every PR
3. **Environment variable** management
4. **Performance monitoring** built-in
5. **Edge function** support for API routes

### Required Secrets

Configure these in your **GitHub repository settings** for CI/CD:

- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `NEON_PROJECT_ID` - Neon database project ID
- `NEON_API_KEY` - Neon API key for database branching

See `docs/DEPLOYMENT_SETUP.md` for detailed deployment instructions.

## 📋 Project Status

### ✅ Completed
- [x] Project setup with Next.js 15 and Bun
- [x] Database schema with Drizzle ORM
- [x] Authentication with Better Auth
- [x] Basic UI with shadcn/ui components
- [x] Simplified GitHub Actions workflows
- [x] Vercel deployment configuration

### 🚧 In Progress
- [ ] WebPageTest API integration
- [ ] Performance test result visualization
- [ ] Gemini AI analysis implementation
- [ ] User dashboard and history
- [ ] Email notifications with Resend

### 🎯 Planned Features
- [ ] Test comparison tools
- [ ] Performance trend analysis
- [ ] Saved test presets
- [ ] Team collaboration features
- [ ] API access for integrations

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure tests pass
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- **Keep it simple** - Follow the KISS principle
- **Type safety** - Use TypeScript for all code
- **Code quality** - Run `bun run check-all` before committing
- **UI consistency** - Use shadcn/ui components
- **Performance** - Optimize for Core Web Vitals

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

## 🔗 Resources

- **Documentation**: See `/docs` folder for detailed guides
- **API Reference**: Built-in OpenAPI documentation
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Neon](https://neon.tech/)
- **Deployment**: [Vercel](https://vercel.com/)

---

**Perfly** - Making website performance testing accessible, intelligent, and actionable for everyone.
