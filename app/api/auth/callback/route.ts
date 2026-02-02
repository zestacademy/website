/**
 * OAuth Callback Handler
 * 
 * This API route handles the OAuth callback from the auth server.
 * It exchanges the authorization code for access tokens and sets secure cookies.
 * 
 * Security:
 * - Validates state parameter (CSRF protection)
 * - Uses PKCE (code verifier) for additional security
 * - Stores tokens in HTTP-only cookies (never exposed to frontend)
 * - Backend-only token exchange (client secret never exposed)
 */

import { NextRequest, NextResponse } from 'next/server';
import { SSO_CONFIG } from '@/lib/sso-config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    // Validate required parameters
    if (!code || !state) {
      console.error('Missing code or state parameter');
      return NextResponse.redirect(
        new URL('/login?error=invalid_callback', request.url)
      );
    }

    // Validate state (CSRF protection)
    const storedState = request.cookies.get(SSO_CONFIG.STATE_COOKIE_NAME)?.value;
    if (!storedState || storedState !== state) {
      console.error('State mismatch - possible CSRF attack');
      return NextResponse.redirect(
        new URL('/login?error=state_mismatch', request.url)
      );
    }

    // Get code verifier for PKCE
    const codeVerifier = request.cookies.get(SSO_CONFIG.CODE_VERIFIER_COOKIE_NAME)?.value;
    if (!codeVerifier) {
      console.error('Missing code verifier');
      return NextResponse.redirect(
        new URL('/login?error=missing_verifier', request.url)
      );
    }

    // Exchange authorization code for tokens (backend only)
    // NOTE: This route runs server-side only (Next.js API route)
    // The CLIENT_SECRET is never exposed to the browser
    const tokenResponse = await fetch(
      `${SSO_CONFIG.AUTH_SERVER_URL}${SSO_CONFIG.TOKEN_ENDPOINT}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: SSO_CONFIG.REDIRECT_URI,
          client_id: SSO_CONFIG.CLIENT_ID,
          client_secret: SSO_CONFIG.CLIENT_SECRET,
          code_verifier: codeVerifier,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return NextResponse.redirect(
        new URL('/login?error=token_exchange_failed', request.url)
      );
    }

    const tokens = await tokenResponse.json();

    // Create response and set secure cookies
    const response = NextResponse.redirect(new URL('/', request.url));

    // Set access token (HTTP-only, secure)
    response.cookies.set(SSO_CONFIG.TOKEN_COOKIE_NAME, tokens.access_token, {
      ...SSO_CONFIG.COOKIE_OPTIONS,
      maxAge: tokens.expires_in || SSO_CONFIG.COOKIE_OPTIONS.maxAge,
    });

    // Set refresh token if provided (HTTP-only, secure)
    if (tokens.refresh_token) {
      response.cookies.set(SSO_CONFIG.REFRESH_TOKEN_COOKIE_NAME, tokens.refresh_token, {
        ...SSO_CONFIG.COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    // Clear temporary cookies
    response.cookies.delete(SSO_CONFIG.STATE_COOKIE_NAME);
    response.cookies.delete(SSO_CONFIG.CODE_VERIFIER_COOKIE_NAME);

    return response;
  } catch (error) {
    console.error('Callback handler error:', error);
    return NextResponse.redirect(
      new URL('/login?error=server_error', request.url)
    );
  }
}
