# 🎨 Prettier Code Formatting Setup

## Overview

This project uses Prettier for consistent code formatting across the entire codebase. Prettier is
integrated with ESLint and automated through GitHub Actions.

## 🔧 Configuration

### Prettier Config (`.prettierrc.js`)

- **Single quotes** for strings
- **Semicolons** always
- **2 spaces** for indentation
- **80 character** line width
- **Trailing commas** in ES5-compatible locations
- **Tailwind CSS class sorting** via `prettier-plugin-tailwindcss`

### ESLint Integration

- `eslint-config-prettier` disables conflicting ESLint rules
- `eslint-plugin-prettier` runs Prettier as an ESLint rule
- Formatting violations appear as ESLint errors

## 📜 Available Scripts

```bash
# Format all files
bun run format

# Check if files are formatted (CI)
bun run format:check

# Format and fix (same as format)
bun run format:fix

# Run all checks (TypeScript + ESLint + Prettier)
bun run check-all

# Fix ESLint issues
bun run lint:fix
```

## 🤖 Automation Features

### 1. **CI/CD Integration**

- ✅ **Format check** runs on every PR
- ✅ **ESLint + Prettier** violations block merges
- ✅ **Automatic formatting** available via comment

### 2. **Auto-format PRs**

Comment `/format` on any PR to trigger automatic formatting:

- Runs Prettier on the entire codebase
- Commits changes directly to the PR branch
- Adds reaction and comment with status

### 3. **Pre-commit Hooks** (Optional)

To set up automatic formatting on commit:

```bash
# Install husky (optional)
bun add -d husky lint-staged

# Add to package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write", "git add"]
  }
}
```

### 4. **VS Code Integration**

The `.vscode/settings.json` file configures:

- ✅ **Format on save** enabled
- ✅ **Prettier as default formatter**
- ✅ **ESLint auto-fix** on save
- ✅ **Tailwind CSS IntelliSense**

## 📁 Files Excluded from Formatting

See `.prettierignore` for the complete list:

- Build outputs (`.next/`, `dist/`)
- Dependencies (`node_modules/`)
- Generated files (`src/db/migrations/`)
- Environment files (`.env*`)
- Lock files (`bun.lock`)

## 🎯 Formatting Rules

### JavaScript/TypeScript

```js
// ✅ Good
const message = 'Hello world';
const users = await getUsers();

// ❌ Bad
const message = 'Hello world';
const users = await getUsers();
```

### React/JSX

```jsx
// ✅ Good
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ Bad
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
```

### Tailwind CSS Classes

```jsx
// ✅ Good (classes automatically sorted)
<div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">

// ❌ Bad (unsorted classes)
<div className="bg-white p-4 flex shadow-md rounded-lg justify-between items-center">
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Format Existing Code

```bash
bun run format
```

### 3. Verify Setup

```bash
bun run check-all
```

### 4. Configure Your Editor

- **VS Code**: Install the Prettier extension
- **Settings are already configured** in `.vscode/settings.json`
- **Format on save** is enabled automatically

## 🔍 Troubleshooting

### Common Issues

**1. Prettier and ESLint conflicts**

```bash
# Check for conflicts
bun run lint

# Auto-fix most issues
bun run lint:fix
```

**2. Editor not formatting**

- Ensure Prettier extension is installed
- Check `.vscode/settings.json` is applied
- Restart VS Code

**3. CI formatting failures**

```bash
# Run locally to fix
bun run format
bun run lint:fix
git add .
git commit -m "fix: formatting"
```

**4. Tailwind classes not sorting**

- Ensure `prettier-plugin-tailwindcss` is installed
- Check plugin order in `.prettierrc.js`

## 📚 Additional Resources

- [Prettier Documentation](https://prettier.io/docs/)
- [ESLint + Prettier Integration](https://prettier.io/docs/en/integrating-with-linters.html)
- [Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## 🎉 Benefits

With this setup, you get:

- ✅ **Consistent code style** across the entire team
- ✅ **Automated formatting** in CI/CD
- ✅ **Zero configuration** for new developers
- ✅ **Tailwind class optimization**
- ✅ **Integration with existing tools**
- ✅ **Fast feedback** on formatting issues
