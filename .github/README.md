# GitHub Actions & Automation Setup

This directory contains all the automated workflows and configurations for the Perfly project.

## 🚀 Workflows

### Core CI/CD Workflows

#### `ci.yml` - Continuous Integration

- **Triggers**: Push to main/develop, PRs to main/develop
- **Jobs**:
  - **Lint & Format**: ESLint checks using Bun
  - **Build & Test**: Next.js build with caching
  - **Database Check**: Ensures Drizzle migrations are up to date

#### `deploy.yml` - Deployment Monitoring

- **Triggers**: Push to main, manual workflow dispatch
- **Features**:
  - Monitors Vercel's automatic deployments
  - Post-deployment notifications
  - Simple status checking

#### `preview-environment.yml` - Preview Environments

- **Triggers**: PR open/sync/close
- **Features**:
  - **Automatic Neon database branching** for each PR
  - Isolated database environments
  - Database migrations applied automatically
  - Auto-cleanup when PR is closed

### Security & Quality

#### `security.yml` - Security Scanning

- **Features**:
  - CodeQL security analysis
  - Dependency review for PRs
  - Security audit with Bun
  - Weekly scheduled scans

#### `performance.yml` - Performance Monitoring

- **Features**:
  - Lighthouse CI performance testing
  - Bundle size analysis
  - Weekly performance reports

### Automation Workflows

#### `dependabot-auto.yml` - Dependabot Automation

- **Features**:
  - Auto-approve minor/patch updates
  - Auto-merge safe patch updates
  - Warning comments for major updates

#### `label-pr.yml` - PR Labeling

- **Features**:
  - Automatic labels based on file changes
  - Size labels (xs, s, m, l, xl)
  - Type labels based on branch naming

## 📋 Configuration Files

### `dependabot.yml`

- Weekly dependency updates for npm and GitHub Actions
- Grouped updates to reduce PR noise
- Automatic assignment and review requests

### `codeql/codeql-config.yml`

- CodeQL security scanning configuration
- Excludes build outputs and test files
- Enhanced security and quality queries

### `labeler.yml`

- Automatic PR labeling rules
- Area-based labels (database, frontend, api, etc.)
- Dependency and documentation labels

### `lighthouserc.json`

- Lighthouse CI configuration
- Performance thresholds and assertions
- Multiple URL testing

## 🔧 Required Setup

### GitHub Secrets (Minimal)

Add these secrets to your GitHub repository settings:

```
# For Neon database branching
NEON_PROJECT_ID=your-neon-project-id
NEON_API_KEY=your-neon-api-key

# Optional: For deployment monitoring
VERCEL_TOKEN=your-vercel-token
```

### Vercel Dashboard Setup (Recommended)

**Environment variables should be configured in Vercel dashboard, not GitHub:**

- `DATABASE_URL` - Your Neon database connection string
- `AUTH_SECRET` - Your authentication secret
- `GEMINI_API_KEY` - Your Gemini API key
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret

**Why Vercel Dashboard?**

- ✅ Automatic environment management
- ✅ Better security (no secret exposure in GitHub)
- ✅ Preview environment support
- ✅ Built-in secret management

See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed configuration.

## 🎯 Workflow Features

### 🔄 Automatic Database Branching

Every PR gets its own isolated Neon database branch:

1. Branch created automatically when PR is opened
2. Database migrations applied
3. Preview environment uses isolated database
4. Branch deleted when PR is closed

### 🤖 Smart Dependabot Integration

- Auto-approve safe updates (minor/patch)
- Auto-merge patch updates after CI passes
- Manual review required for major updates
- Grouped dependency updates

### 🔍 Comprehensive Security Scanning

- CodeQL static analysis
- Dependency vulnerability scanning
- Regular security audits
- PR-based dependency reviews

### 📊 Performance Monitoring

- Lighthouse CI for Core Web Vitals
- Bundle size tracking
- Performance regression detection
- Weekly performance reports

### 🏷️ Intelligent PR Labeling

- Automatic labels based on changed files
- Size labels for PR complexity
- Type labels from branch naming conventions
- Area-specific labels for easy filtering

## 🚦 Branch Protection Rules (Recommended)

Set up these branch protection rules for the `main` branch:

1. **Require status checks to pass before merging**:
   - `Lint & Format`
   - `Build & Test`
   - `Database Schema Check`
   - `CodeQL Security Scan`

2. **Require pull request reviews before merging**:
   - Required reviewers: 1
   - Dismiss stale reviews when new commits are pushed

3. **Require branches to be up to date before merging**

4. **Include administrators** in these restrictions

## 📈 Monitoring & Notifications

### Success Indicators

- ✅ All CI checks passing
- ✅ Security scans clean
- ✅ Performance thresholds met
- ✅ Dependencies up to date

### Alert Conditions

- ❌ Build failures
- ⚠️ Security vulnerabilities
- 📉 Performance regressions
- 🔄 Major dependency updates

## 🔗 Useful Links

- [Neon Database Branching Guide](https://neon.tech/docs/guides/branching)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git)
- [Dependabot Configuration](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
