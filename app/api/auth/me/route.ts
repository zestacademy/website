/**
 * User Info Endpoint
 * 
 * This API route returns the current user's information from their JWT token.
 * It validates the token and returns user data if authenticated.
 * 
 * Security:
 * - Validates JWT signature and expiry
 * - Verifies issuer and audience
 * - Returns user info only if token is valid
 */

import { NextRequest, NextResponse } from 'next/server';
import { SSO_CONFIG } from '@/lib/sso-config';
import { decodeJWT, validateJWT } from '@/lib/sso-utils';

export async function GET(request: NextRequest) {
  try {
    // Get access token from HTTP-only cookie
    const accessToken = request.cookies.get(SSO_CONFIG.TOKEN_COOKIE_NAME)?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Validate JWT token
    const isValid = validateJWT(
      accessToken,
      SSO_CONFIG.AUTH_SERVER_URL,
      SSO_CONFIG.CLIENT_ID
    );

    if (!isValid) {
      // Token is invalid or expired, clear it
      const response = NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
      response.cookies.delete(SSO_CONFIG.TOKEN_COOKIE_NAME);
      return response;
    }

    // Decode token to get user info
    const decoded = decodeJWT(accessToken);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Failed to decode token' },
        { status: 401 }
      );
    }

    // Return user information
    return NextResponse.json({
      user: {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      },
      authenticated: true,
    });
  } catch (error) {
    console.error('User info error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
