import { SignJWT, jwtVerify } from 'jose';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'development-only-change-me');
export async function createToken(userId: string) { return new SignJWT({ sub: userId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret); }
export async function getUserId(token?: string) { if (!token) return null; try { return (await jwtVerify(token, secret)).payload.sub ?? null; } catch { return null; } }
