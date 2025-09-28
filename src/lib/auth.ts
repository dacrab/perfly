import db from '@/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { resend } from './email';

const AUTH_SECRET = process.env['AUTH_SECRET'];
if (!AUTH_SECRET) {
  throw new Error('AUTH_SECRET is required');
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  // Better Auth v1: configure providers via plugins or top-level options.
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: 'noreply@perfly.io',
          to: email,
          subject: 'Sign in to Perfly',
          html: `<a href="${url}">Click here to sign in</a>`,
        });
      },
    }),
  ],
  secret: AUTH_SECRET,
});
