import { z } from 'zod';

const AuthConfigSchema = z.object({
  secretKey: z.string().min(1, 'Secret key must not be empty'),
  accessTokenExpiresIn: z.string().default('15m'),
  refreshTokenExpiresIn: z.string().default('7d'),
});

export function getConfig(): z.infer<typeof AuthConfigSchema> {
  const secretKey = process.env.AUTHWARDEN_KEY;
  if (!secretKey) {
    throw new Error('AUTHWARDEN_KEY is not defined in environment variables.');
  }

  return AuthConfigSchema.parse({
    secretKey,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
}