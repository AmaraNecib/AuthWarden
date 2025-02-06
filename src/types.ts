import { JWTPayload } from "jose";

// lets create a type for this ``{ valid: boolean; payload?: JWTPayload | string; error?: string }``
export interface TokenVerification {
  valid: boolean;
  payload?: JWTPayload | string;
  error?: string;
}

export interface TokenPayload extends Record<string, any> {
  role?: string;
  permissions?: string[];
  exp?: number;
}