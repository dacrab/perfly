# Deployment Setup Guide

This document outlines the required configuration for deploying Perfly to Vercel with GitHub Actions.

## Required GitHub Secrets

Navigate to your GitHub repository settings: `Settings > Secrets and variables > Actions > Repository secrets`

### Vercel Deployment Secrets

These secrets are required for automatic deployment to Vercel:

#### `VERCEL_TOKEN`
- **Description**: Vercel API token for deployment access
- **How to get**: 
  1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
  2. Create a new token with the name "GitHub Actions"
  3. Copy the token value

#### `VERCEL_ORG_ID`
- **Description**: Your Vercel organization/team ID
- **How to get**:
  1. Run `npx vercel link` in your project root
  2. Follow the prompts to link your project
  3. Check the `.vercel/project.json` file for the `orgId` value
  4. Or find it in your Vercel dashboard URL: `vercel.com/team/[ORG_ID]`

#### `VERCEL_PROJECT_ID`
- **Description**: Your Vercel project ID
- **How to get**:
  1. Run `npx vercel link` in your project root (if not done above)
  2. Check the `.vercel/project.json` file for the `projectId` value
  3. Or find it in your Vercel project settings

### Neon Database Secrets

These secrets are required for preview environment database branching:

#### `NEON_PROJECT_ID`
- **Description**: Your Neon database project ID
- **How to get**:
  1. Go to your [Neon Console](https://console.neon.tech)
  2. Select your project
  3. Find the Project ID in the project settings or connection details

#### `NEON_API_KEY`
- **Description**: Neon API key for database operations
- **How to get**:
  1. Go to [Neon Account Settings](https://console.neon.tech/app/settings/api-keys)
  2. Generate a new API key
  3. Copy the key value

#### `NEON_DATABASE_USERNAME` (Optional)
- **Description**: Database username for connections
- **Default**: `neondb_owner` (if not specified)
- **How to get**: Check your database connection details in Neon Console

## Setup Steps

### 1. Configure Vercel Project

```bash
# Link your project to Vercel
npx vercel link

# Deploy once manually to create the project
npx vercel --prod
```

### 2. Set Environment Variables in Vercel

In your Vercel project settings, add these environment variables:

```bash
# Database
DATABASE_URL=your-neon-connection-string

# Authentication  
AUTH_SECRET=your-random-secret-key
AUTH_ORIGIN=https://your-domain.vercel.app
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret

# Email (optional)
RESEND_API_KEY=your-resend-api-key
```

### 3. Add GitHub Secrets

Copy each secret value from the steps above and add them to your GitHub repository:

1. Go to `Settings > Secrets and variables > Actions`
2. Click "New repository secret"
3. Add each secret with the exact name and value

### 4. Verify Setup

Once configured, your GitHub Actions will:
- ✅ Automatically deploy to Vercel on main branch pushes
- ✅ Create isolated database branches for PR previews
- ✅ Run quality checks and security scans
- ✅ Provide deployment status in PR comments

## Troubleshooting

### Common Issues

1. **"Context access might be invalid" warnings**
   - This means the secret hasn't been added to GitHub yet
   - Add the missing secret in repository settings

2. **Vercel deployment fails**
   - Verify `VERCEL_TOKEN` has correct permissions
   - Check that `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` match your project

3. **Neon branch creation fails**
   - Verify `NEON_API_KEY` is valid and has project access
   - Check that `NEON_PROJECT_ID` is correct

4. **Preview environment not working**
   - Ensure all Neon secrets are configured
   - Check that your Neon project supports branching (available in Pro plan)

### Testing Your Setup

1. Create a test PR to verify preview environment creation
2. Push to main branch to verify production deployment
3. Check workflow logs for any remaining issues

## Security Notes

- Never commit secrets to your repository
- Use environment-specific secrets in Vercel dashboard
- Regularly rotate API tokens and keys
- Monitor secret usage in GitHub Actions logs
