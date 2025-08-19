import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from '@/db';
import { magicLink } from 'better-auth/plugins';
import { resend } from './email';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  providers: {
    email: {
      from: 'noreply@perfly.io',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
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
  secret: process.env.AUTH_SECRET,
  origin: process.env.AUTH_ORIGIN,
});
