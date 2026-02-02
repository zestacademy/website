/**
 * Logout Handler
 * 
 * This API route handles user logout.
 * It clears local tokens and redirects to the auth server logout endpoint
 * to support global logout across all ZestAcademy platforms.
 * 
 * Security:
 * - Clears all authentication cookies
 * - Supports global logout via auth server
 */

import { NextRequest, NextResponse } from 'next/server';
import { SSO_CONFIG, getLogoutUrl } from '@/lib/sso-config';

export async function GET(request: NextRequest) {
  try {
    // Get the redirect URI after logout
    const searchParams = request.nextUrl.searchParams;
    const returnTo = searchParams.get('return_to') || '/';
    
    // Build the full return URL
    const returnUrl = new URL(returnTo, request.url).toString();

    // Create response that redirects to auth server logout
    const response = NextResponse.redirect(getLogoutUrl(returnUrl));

    // Clear all authentication cookies
    response.cookies.delete(SSO_CONFIG.TOKEN_COOKIE_NAME);
    response.cookies.delete(SSO_CONFIG.REFRESH_TOKEN_COOKIE_NAME);
    response.cookies.delete(SSO_CONFIG.STATE_COOKIE_NAME);
    response.cookies.delete(SSO_CONFIG.CODE_VERIFIER_COOKIE_NAME);

    return response;
  } catch (error) {
    console.error('Logout handler error:', error);
    
    // Even if there's an error, clear cookies and redirect to home
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete(SSO_CONFIG.TOKEN_COOKIE_NAME);
    response.cookies.delete(SSO_CONFIG.REFRESH_TOKEN_COOKIE_NAME);
    response.cookies.delete(SSO_CONFIG.STATE_COOKIE_NAME);
    response.cookies.delete(SSO_CONFIG.CODE_VERIFIER_COOKIE_NAME);
    
    return response;
  }
}

export async function POST(request: NextRequest) {
  // Support POST method as well for logout
  return GET(request);
}
