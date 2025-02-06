import { SignJWT, jwtVerify } from 'jose';
import { getConfig } from './config';
import { TokenPayload, TokenVerification } from './types';

export async function generateToken(payload: TokenPayload, expiresIn: string): Promise<string> {
  const { secretKey } = getConfig();
  const secret = new TextEncoder().encode(secretKey);
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(secret);
  return jwt;
}

export async function generateAccessToken(payload: TokenPayload): Promise<string> {
  const { accessTokenExpiresIn } = getConfig();
  return generateToken(payload, accessTokenExpiresIn);
}

export async function generateRefreshToken(payload: TokenPayload): Promise<string> {
  const { refreshTokenExpiresIn } = getConfig();
  return generateToken(payload, refreshTokenExpiresIn);
}

export async function verifyToken(token: string): Promise<TokenVerification> {
  const { secretKey } = getConfig();
  const secret = new TextEncoder().encode(secretKey);
  try {
    const { payload } = await jwtVerify(token, secret);
    return { valid: true, payload };
  } catch (error) {
    return { valid: false, error: 'Invalid token' };
  }
}