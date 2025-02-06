import { verifyToken } from './index';

export async function hasRole(token: string, roles: string | string[]): Promise<boolean> {
  const { valid, payload } = await verifyToken(token);
  if (!valid || typeof payload === 'string') {
    return false;
  }

  const requiredRoles = Array.isArray(roles) ? roles : [roles];
  return requiredRoles.includes((payload as { role: string }).role);
}

export async function hasPermission(token: string, permission: string): Promise<boolean> {
  const { valid, payload } = await verifyToken(token);
  if (!valid || typeof payload === 'string') {
    return false;
  }

  const userPermissions: string[] = Array.isArray(payload!.permissions) ? payload!.permissions : [];
  return userPermissions.includes(permission as string);
}

export async function getFromToken<T = any>(token: string, field: string): Promise<T | undefined> {
  const { valid, payload } = await verifyToken(token);
  if (!valid || typeof payload === 'string') {
    return undefined;
  }

  return (payload as any)[field] as T;
}

export async function getTokenExpiration(token: string): Promise<number | undefined> {
  const { valid, payload } = await verifyToken(token);
  if (!valid || typeof payload === 'string') {
    return undefined;
  }

  return payload!.exp;
}