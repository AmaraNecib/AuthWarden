import { verifyToken } from './index';

export function hasRole(token: string, roles: string | string[]): boolean {
  const { valid, payload } = verifyToken(token);
  if (!valid || typeof payload === 'string') {
    return false;
  }

  const requiredRoles = Array.isArray(roles) ? roles : [roles];
  return requiredRoles.includes(payload!.role);
}

export function hasPermission(token: string, permission: string): boolean {
  const { valid, payload } = verifyToken(token);
  if (!valid || typeof payload === 'string') {
    return false;
  }

  const userPermissions = payload!.permissions || [];
  return userPermissions.includes(permission);
}

export function getFromToken<T = any>(token: string, field: string): T | undefined {
  const { valid, payload } = verifyToken(token);
  if (!valid || typeof payload === 'string') {
    return undefined;
  }

  return payload![field];
}

export function getTokenExpiration(token: string): number | undefined {
  const { valid, payload } = verifyToken(token);
  if (!valid || typeof payload === 'string') {
    return undefined;
  }

  return payload!.exp;
}