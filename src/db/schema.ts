import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  hashedPassword: text('hashed_password'),
  githubId: text('github_id').unique(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const tests = pgTable('tests', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: text('user_id').references(() => users.id),
  url: text('url').notNull(),
  status: text('status').notNull().default('PENDING'),
  webPageTestId: text('webpagetest_id'),
  results: text('results'),
  error: text('error'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export type Test = InferSelectModel<typeof tests>;
