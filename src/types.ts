import { JwtPayload } from "jsonwebtoken";

// lets create a type fpr this ``{ valid: boolean; payload?: JwtPayload | string; error?: string }``
export interface TokenVerification {
    valid: boolean;
    payload?: JwtPayload | string;
    error?: string;
}

export interface TokenPayload extends Record<string, any> {
  role?: string;
  permissions?: string[];
  exp?: number;
}