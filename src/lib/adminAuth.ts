import crypto from 'crypto';
import { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'aln_admin_session';

const getMasterKey = (): string => {
  return process.env.ADMIN_ACCESS_KEY || 'aln_studio_tangier_2026';
};

const getSalt = (): string => {
  return 'aln_salt_strait_of_gibraltar_tangier';
};

/**
 * Validates the provided master key against the server environment key.
 */
export const validateMasterKey = (inputKey: string): boolean => {
  const masterKey = getMasterKey();
  if (!inputKey || !masterKey) return false;
  
  // Timing-safe comparison to prevent timing attacks
  const inputBuffer = Buffer.from(inputKey.trim());
  const masterBuffer = Buffer.from(masterKey.trim());
  
  if (inputBuffer.length !== masterBuffer.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(inputBuffer, masterBuffer);
};

/**
 * Generates an HMAC SHA-256 signed session token derived from the master key.
 */
export const generateSessionToken = (): string => {
  const masterKey = getMasterKey();
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto
    .createHmac('sha256', masterKey + getSalt())
    .update(`session:${timestamp}`)
    .digest('hex');
  
  return `${timestamp}.${signature}`;
};

/**
 * Verifies if an HMAC session token is valid and not expired (e.g. valid for 14 days).
 */
export const verifySessionToken = (token: string): boolean => {
  if (!token || typeof token !== 'string') return false;
  
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [timestamp, signature] = parts;
  const tokenTime = parseInt(timestamp, 10);
  
  if (isNaN(tokenTime)) return false;
  
  // 14 days session expiration limit
  const maxAgeSeconds = 14 * 24 * 60 * 60;
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - tokenTime > maxAgeSeconds || tokenTime > currentTime + 300) {
    return false;
  }
  
  const masterKey = getMasterKey();
  const expectedSignature = crypto
    .createHmac('sha256', masterKey + getSalt())
    .update(`session:${timestamp}`)
    .digest('hex');
  
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  
  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
};

/**
 * Helper to check if an incoming NextRequest contains a valid admin session cookie.
 */
export const isAuthenticated = (req: NextRequest): boolean => {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
  if (!cookie?.value) return false;
  return verifySessionToken(cookie.value);
};
