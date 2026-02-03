/**
 * SSO Configuration for ZestAcademy Authentication
 * 
 * This configuration defines the OAuth 2.0 settings for integrating
 * with the centralized auth.zestacademy.tech authentication server.
 */

export const SSO_CONFIG = {
  // Auth server endpoints
  AUTH_SERVER_URL: process.env.NEXT_PUBLIC_AUTH_SERVER_URL || 'https://auth.zestacademy.tech',
  AUTHORIZE_ENDPOINT: '/api/oauth/authorize',
  TOKEN_ENDPOINT: '/api/oauth/token',
  LOGOUT_ENDPOINT: '/api/auth/logout',
  USERINFO_ENDPOINT: '/api/oauth/userinfo',

  // Client configuration
  CLIENT_ID: process.env.NEXT_PUBLIC_SSO_CLIENT_ID || '',
  CLIENT_SECRET: process.env.SSO_CLIENT_SECRET || '', // Server-side only

  // Redirect URIs (must be registered with auth server)
  REDIRECT_URI: process.env.NEXT_PUBLIC_SSO_REDIRECT_URI || '',

  // OAuth parameters
  SCOPE: 'openid profile email',
  RESPONSE_TYPE: 'code',

  // Token settings
  TOKEN_COOKIE_NAME: 'zest_access_token',
  REFRESH_TOKEN_COOKIE_NAME: 'zest_refresh_token',
  STATE_COOKIE_NAME: 'zest_oauth_state',
  CODE_VERIFIER_COOKIE_NAME: 'zest_code_verifier',

  // Cookie settings (secure, HTTP-only)
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

/**
 * Get the full authorization URL for redirecting users to the auth server
 */
export function getAuthorizationUrl(state: string, codeChallenge: string): string {
  const params = new URLSearchParams({
    client_id: SSO_CONFIG.CLIENT_ID,
    redirect_uri: SSO_CONFIG.REDIRECT_URI,
    scope: SSO_CONFIG.SCOPE,
    response_type: SSO_CONFIG.RESPONSE_TYPE,
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  return `${SSO_CONFIG.AUTH_SERVER_URL}${SSO_CONFIG.AUTHORIZE_ENDPOINT}?${params.toString()}`;
}

/**
 * Get the full logout URL for the auth server
 */
export function getLogoutUrl(redirectUri?: string): string {
  const params = new URLSearchParams({
    client_id: SSO_CONFIG.CLIENT_ID,
    ...(redirectUri && { post_logout_redirect_uri: redirectUri }),
  });

  return `${SSO_CONFIG.AUTH_SERVER_URL}${SSO_CONFIG.LOGOUT_ENDPOINT}?${params.toString()}`;
}
