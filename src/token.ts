import jwt from 'jsonwebtoken';
import { getConfig } from './config';
import { TokenPayload, TokenVerification } from './types';



export function generateToken(payload: TokenPayload, expiresIn: string): string {
  const { secretKey } = getConfig();
  return jwt.sign(payload, secretKey, { expiresIn });
}

export function generateAccessToken(payload: TokenPayload): string {
  const { accessTokenExpiresIn } = getConfig();
  return generateToken(payload, accessTokenExpiresIn);
}

export function generateRefreshToken(payload: TokenPayload): string {
  const { refreshTokenExpiresIn } = getConfig();
  return generateToken(payload, refreshTokenExpiresIn);
}

export function verifyToken(token: string): TokenVerification {
  const { secretKey } = getConfig();
  try {
    const decoded = jwt.verify(token, secretKey);
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: 'Invalid token' };
  }
}