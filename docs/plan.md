# Perfly Development Plan

## 🎯 Project Vision

Build **Perfly**, a modern web performance testing platform that makes website speed analysis accessible, intelligent, and actionable for developers and businesses.

**Core Mission**: Transform complex performance data into clear, actionable insights using AI-powered analysis.

---

## 🧱 Technology Stack

### Core Technologies
- **Runtime**: **Bun** (package manager, scripts, development server)
- **Framework**: **Next.js 15** with App Router
- **Database**: **Neon PostgreSQL** with branching for development
- **ORM**: **Drizzle** for type-safe database operations
- **Deployment**: **Vercel** with automatic CI/CD

### UI & Frontend
- **Styling**: **Tailwind CSS** + **shadcn/ui** components
- **Icons**: **Lucide React** icons
- **Components**: **Radix UI** primitives
- **Type Safety**: **TypeScript** throughout

### Backend Services
- **Authentication**: **Better Auth** with GitHub OAuth
- **AI Analysis**: **Gemini 2.5 Flash** for performance insights
- **Email**: **Resend** for notifications
- **Performance Testing**: **WebPageTest API** integration
- **Validation**: **Zod** schemas

---

## 🏗️ Application Architecture

### Project Structure
```
src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── (dashboard)/        # User dashboard
│   ├── results/[id]/       # Test results
│   ├── api/                # API routes
│   │   ├── auth/           # Better Auth endpoints
│   │   ├── tests/          # Test management
│   │   └── ai/             # AI analysis
│   └── globals.css
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── charts/             # Performance visualizations
│   └── forms/              # Form components
├── lib/                    # Utilities and clients
│   ├── db.ts               # Database connection
│   ├── auth.ts             # Authentication config
│   ├── wpt.ts              # WebPageTest client
│   ├── ai.ts               # Gemini AI client
│   └── utils.ts            # Helper functions
└── db/                     # Database schema
    ├── schema.ts           # Drizzle schema
    └── migrations/         # Database migrations
```

### Key Components

#### Performance Testing Engine
- **WebPageTest Integration**: API client for running tests
- **Test Queue Management**: Handle multiple concurrent tests
- **Results Processing**: Parse and store performance metrics
- **Real-time Updates**: WebSocket or polling for test status

#### AI Analysis System
- **Gemini Integration**: Performance analysis and recommendations
- **Insight Generation**: Convert metrics to actionable advice
- **Comparison Analysis**: Highlight performance changes
- **Plain Language Explanations**: Make technical data accessible

---

## 🚀 Feature Roadmap

### Phase 1: Core Testing Platform
**Anonymous Users**
- ✅ Landing page with URL input
- ✅ Test configuration (location, connection type)
- ✅ Real-time test progress
- ✅ Basic results visualization
- ✅ Shareable result links

**Authenticated Users**
- ✅ GitHub OAuth sign-in
- ✅ Personal test history
- ✅ Test management dashboard
- ✅ Account settings

### Phase 2: AI-Powered Insights
- 🚧 **Gemini AI Integration**: Performance analysis and recommendations
- 🚧 **Insight Cards**: Plain-language explanations of metrics
- 🚧 **Optimization Suggestions**: Actionable improvement recommendations
- 🚧 **Performance Scoring**: Overall site performance rating

### Phase 3: Advanced Features
- 📋 **Test Comparison**: Side-by-side performance analysis
- 📋 **Historical Trends**: Performance tracking over time
- 📋 **Email Notifications**: Test completion alerts
- 📋 **Saved Presets**: Quick test configurations
- 📋 **Custom Alerts**: Performance regression notifications

### Phase 4: Collaboration & Scale
- 📋 **Team Workspaces**: Shared test results and collaboration
- 📋 **API Access**: Programmatic test running and results
- 📋 **Custom Dashboards**: Tailored performance monitoring
- 📋 **Integration**: CI/CD pipeline integration

---

## 📊 Database Design

### Core Tables

```sql
-- Users and Authentication
users (id, email, name, github_id, created_at, updated_at)

-- Performance Tests
tests (
  id, user_id, url, location, connectivity, 
  status, wpt_test_id, created_at, completed_at
)

-- Test Results and Metrics
test_results (
  id, test_id, metrics_json, raw_data_json, 
  performance_score, created_at
)

-- AI Analysis and Insights
test_insights (
  id, test_id, analysis_text, recommendations_json,
  bottlenecks_json, created_at
)
```

### Key Relationships
- **Users → Tests**: One-to-many (user can have multiple tests)
- **Tests → Results**: One-to-one (each test has one result)
- **Tests → Insights**: One-to-one (each test has AI analysis)

### Performance Considerations
- **Indexes**: Optimized queries for user history and test lookups
- **JSON Storage**: Flexible storage for metrics and AI analysis
- **Soft Deletes**: Preserve test history for analytics

---

## 🤖 AI Analysis System

### Gemini 2.5 Flash Integration

**Core Analysis Features:**
- **Performance Summary**: Plain-language explanation of test results
- **Bottleneck Identification**: Prioritized list of performance issues
- **Optimization Recommendations**: Actionable improvement suggestions
- **Core Web Vitals Explanation**: Clear breakdown of LCP, CLS, FCP metrics

**API Endpoints:**
```typescript
// Analyze single test results
POST /api/ai/analyze
{
  testId: string,
  metrics: PerformanceMetrics,
  context: TestContext
}

// Compare two test results
POST /api/ai/compare
{
  baseTestId: string,
  compareTestId: string
}
```

**AI Prompting Strategy:**
- Include website context and test configuration
- Focus on actionable, specific recommendations
- Prioritize high-impact optimizations
- Explain technical concepts in simple terms

---

## 🎨 UI Component Strategy

### shadcn/ui Foundation
Essential components already installed:
- **Forms**: `button`, `input`, `label`, `select`, `textarea`
- **Data Display**: `table`, `badge`, `card`, `progress`
- **Navigation**: `tabs`, `dropdown-menu`, `sheet`
- **Feedback**: `alert`, `toast`, `skeleton`, `dialog`

### Custom Performance Components
- **MetricsCard**: Core Web Vitals visualization
- **WaterfallChart**: Resource loading timeline
- **PerformanceScore**: Overall performance rating
- **InsightCard**: AI-generated recommendations
- **ComparisonView**: Side-by-side test results

---

## ✅ Development Checklist

### Phase 1: Foundation ✅
- [x] **Project Setup**: Next.js 15 + Bun + TypeScript
- [x] **Database**: Neon PostgreSQL + Drizzle ORM
- [x] **Authentication**: Better Auth with GitHub OAuth
- [x] **UI Framework**: shadcn/ui + Tailwind CSS
- [x] **Deployment**: Vercel with GitHub Actions

### Phase 2: Core Features 🚧
- [ ] **WebPageTest Integration**: API client and test running
- [ ] **Results Visualization**: Performance metrics display
- [ ] **AI Analysis**: Gemini 2.5 Flash integration
- [ ] **User Dashboard**: Test history and management
- [ ] **Email Notifications**: Resend integration

### Phase 3: Advanced Features 📋
- [ ] **Test Comparison**: Side-by-side analysis
- [ ] **Performance Trends**: Historical tracking
- [ ] **Saved Presets**: Quick test configurations
- [ ] **API Access**: Programmatic testing

---

## 🚀 Deployment Architecture

### Vercel Platform
**Why Vercel?**
- **Zero Configuration**: Automatic deployments from GitHub
- **Edge Functions**: Fast API routes with global distribution
- **Preview Environments**: Automatic PR previews
- **Performance Monitoring**: Built-in Web Vitals tracking
- **Seamless Scaling**: Automatic scaling based on traffic

### Infrastructure Stack
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│  Vercel Deploy  │───▶│  Neon Database  │
│                 │    │                 │    │                 │
│ • Source Code   │    │ • Next.js App   │    │ • PostgreSQL   │
│ • CI/CD Actions │    │ • Edge Functions │    │ • Branching     │
│ • Auto Deploy   │    │ • Preview URLs   │    │ • Auto Scaling  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Environment Configuration
```bash
# Production (.env)
DATABASE_URL=your-neon-connection-string
AUTH_SECRET=your-auth-secret
AUTH_ORIGIN=https://perfly.vercel.app
GITHUB_CLIENT_ID=your-github-oauth-id
GITHUB_CLIENT_SECRET=your-github-oauth-secret
GEMINI_API_KEY=your-gemini-api-key
RESEND_API_KEY=your-resend-api-key
```

---

## 🛠️ Development Workflow

### Local Development
```bash
# Setup
git clone https://github.com/your-username/perfly.git
cd perfly
bun install

# Database
bun run db:generate  # Generate migrations
bun run db:migrate   # Apply to database

# Development
bun run dev          # Start dev server
bun run check-all    # Run all quality checks
```

### Quality Assurance
- **Type Safety**: Full TypeScript coverage
- **Code Quality**: ESLint + Prettier formatting
- **Testing**: Unit tests for critical functions
- **Performance**: Lighthouse CI on every deploy
- **Security**: Automated vulnerability scanning

### Deployment Process
1. **Push to GitHub** → Triggers CI/CD pipeline
2. **Quality Checks** → Code quality and security scans
3. **Build & Test** → Application compilation and testing
4. **Deploy to Vercel** → Automatic deployment (main branch)
5. **Preview Environments** → Every PR gets a preview URL

---

## 📚 Documentation Structure

- `README.md` - Quick start guide and overview
- `docs/PROJECT_OVERVIEW.md` - Comprehensive project documentation
- `docs/DEPLOYMENT_SETUP.md` - Vercel and database setup
- `docs/WORKFLOW-ARCHITECTURE.md` - CI/CD system documentation

**Next Steps**: See `docs/DEPLOYMENT_SETUP.md` for detailed setup instructions.
