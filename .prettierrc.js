/** @type {import("prettier").Config} */
const config = {
  // Core formatting options
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',

  // Line and indentation
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // End of line
  endOfLine: 'lf',

  // Plugin configuration
  plugins: [
    'prettier-plugin-tailwindcss', // Must be last for proper class sorting
  ],

  // File-specific overrides
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 100,
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
        printWidth: 100,
      },
    },
  ],
};

module.exports = config;
