import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load env from .env.local if present, fallback to .env
dotenv.config({ path: ".env.local" });
dotenv.config();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env["DATABASE_URL"] ??
      (() => {
        throw new Error("DATABASE_URL is required");
      })(),
  },
  verbose: true,
  // Disable strict to allow non-interactive push in CI/agents
  strict: false,
});
