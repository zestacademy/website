/**
 * SSO Utility Functions
 * 
 * Provides cryptographic and OAuth utility functions for secure SSO implementation.
 */

/**
 * Generate a cryptographically secure random state parameter for CSRF protection
 */
export function generateState(): string {
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined') {
    window.crypto.getRandomValues(array);
  } else {
    // Server-side
    const crypto = require('crypto');
    crypto.randomFillSync(array);
  }
  return base64UrlEncode(array);
}

/**
 * Generate a code verifier for PKCE (Proof Key for Code Exchange)
 */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined') {
    window.crypto.getRandomValues(array);
  } else {
    // Server-side
    const crypto = require('crypto');
    crypto.randomFillSync(array);
  }
  return base64UrlEncode(array);
}

/**
 * Generate a code challenge from a code verifier using SHA-256
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  if (typeof window !== 'undefined') {
    // Client-side
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(new Uint8Array(hash));
  } else {
    // Server-side
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(verifier).digest();
    return base64UrlEncode(hash);
  }
}

/**
 * Base64 URL encode (without padding)
 */
function base64UrlEncode(buffer: Uint8Array | Buffer): string {
  const base64 = typeof window !== 'undefined'
    ? btoa(String.fromCharCode(...Array.from(buffer)))
    : Buffer.from(buffer).toString('base64');
  
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Validate JWT token structure (basic validation)
 * Returns the decoded payload if valid, null otherwise
 */
export function decodeJWT(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = parts[1];
    const decoded = JSON.parse(
      typeof window !== 'undefined'
        ? atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        : Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
    );
    
    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Verify JWT token expiration
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
}

/**
 * Validate JWT issuer and audience
 */
export function validateJWT(token: string, expectedIssuer: string, expectedAudience?: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded) {
    return false;
  }
  
  // Check expiration
  if (isTokenExpired(token)) {
    return false;
  }
  
  // Validate issuer
  if (decoded.iss !== expectedIssuer) {
    console.error('Invalid token issuer:', decoded.iss);
    return false;
  }
  
  // Validate audience if provided
  if (expectedAudience) {
    if (Array.isArray(decoded.aud)) {
      if (!decoded.aud.includes(expectedAudience)) {
        console.error('Invalid token audience:', decoded.aud);
        return false;
      }
    } else if (decoded.aud !== expectedAudience) {
      console.error('Invalid token audience:', decoded.aud);
      return false;
    }
  }
  
  return true;
}
