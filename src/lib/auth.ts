import db from '@/db';
import type { BetterAuthPlugin } from 'better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { genericOAuth, magicLink } from 'better-auth/plugins';
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
  plugins: (() => {
    const plugins: BetterAuthPlugin[] = [
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
    ];

    const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
    const GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET'];

    // Add Google OAuth if env vars are provided
    if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
      plugins.push(
        genericOAuth({
          config: [
            {
              providerId: 'google',
              discoveryUrl:
                'https://accounts.google.com/.well-known/openid-configuration',
              clientId: GOOGLE_CLIENT_ID,
              clientSecret: GOOGLE_CLIENT_SECRET,
              scopes: ['openid', 'email', 'profile'],
              // Ensure we request offline access for refresh tokens in web apps
              accessType: 'offline',
              prompt: 'consent',
              pkce: true,
              overrideUserInfo: true,
            },
          ],
        })
      );
    }

    return plugins;
  })(),
  secret: AUTH_SECRET,
});
