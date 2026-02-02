# Single Sign-On (SSO) Implementation Guide

## Overview

This website now uses a centralized Single Sign-On (SSO) system powered by `auth.zestacademy.tech`. This allows users to authenticate once and access all ZestAcademy platforms with a single account.

## Supported Platforms

The SSO system provides seamless authentication across:
- **zestacademy.tech** (Main website)
- **zestfolio.tech** (Portfolio platform)
- **zestcompilers.tech** (Compiler platform)

## Architecture

### OAuth 2.0 Flow with PKCE

The implementation uses the OAuth 2.0 Authorization Code Flow with PKCE (Proof Key for Code Exchange) for maximum security:

1. **User initiates login** → Clicks "Login with ZestAcademy" button
2. **Authorization request** → Redirects to `auth.zestacademy.tech/authorize` with:
   - `client_id`: Identifies this application
   - `redirect_uri`: Where to return after auth
   - `scope`: Requested permissions (openid, profile, email)
   - `response_type=code`: Request authorization code
   - `state`: CSRF protection token
   - `code_challenge`: PKCE challenge derived from code_verifier

3. **User authenticates** → On auth server (handled by auth.zestacademy.tech)

4. **Authorization callback** → Auth server redirects back with:
   - `code`: Authorization code
   - `state`: Original state for validation

5. **Token exchange** → Backend exchanges code for tokens:
   - Validates state (CSRF protection)
   - Validates code_verifier (PKCE)
   - Exchanges code + client_secret for access token
   - **Backend only** - client secret never exposed

6. **Token storage** → Tokens stored in HTTP-only cookies:
   - `zest_access_token`: Access token (HTTP-only, Secure)
   - `zest_refresh_token`: Refresh token (HTTP-only, Secure)

7. **User authenticated** → User can now access protected resources

## Security Features

### ✅ Implemented Security Measures

1. **No Password Handling**
   - Client websites never see or store passwords
   - All authentication handled by central auth server

2. **PKCE (Proof Key for Code Exchange)**
   - Prevents authorization code interception attacks
   - Uses SHA-256 code challenge

3. **CSRF Protection**
   - State parameter validates callback authenticity
   - Prevents cross-site request forgery

4. **HTTP-Only Cookies**
   - Tokens stored in HTTP-only cookies
   - Never exposed to JavaScript
   - Prevents XSS attacks

5. **Secure Token Exchange**
   - Client secret never exposed to frontend
   - Token exchange happens server-side only

6. **JWT Validation**
   - Validates token signature
   - Checks expiration time
   - Verifies issuer (iss) and audience (aud)

7. **Token Expiration**
   - Access tokens expire after configured time
   - Refresh tokens for longer sessions

8. **Global Logout**
   - Logout clears local tokens
   - Redirects to auth server for global logout
   - Supports logout across all platforms

## Environment Variables

Required environment variables for SSO configuration:

```env
# Auth Server URL
NEXT_PUBLIC_AUTH_SERVER_URL=https://auth.zestacademy.tech

# Client ID (must be registered with auth server)
NEXT_PUBLIC_SSO_CLIENT_ID=zestacademy-website

# Client Secret (backend only - NEVER expose to frontend)
SSO_CLIENT_SECRET=your_client_secret_here

# Redirect URI (must be registered with auth server)
NEXT_PUBLIC_SSO_REDIRECT_URI=https://zestacademy.tech/api/auth/callback
```

## API Routes

### `/api/auth/callback`
Handles OAuth callback and token exchange. Called by auth server after user authentication.

**Security:**
- Validates state parameter
- Verifies code_verifier
- Exchanges code for tokens server-side
- Sets HTTP-only cookies

### `/api/auth/logout`
Handles user logout.

**Features:**
- Clears all authentication cookies
- Redirects to auth server logout
- Supports global logout

### `/api/auth/me`
Returns current user information.

**Security:**
- Validates JWT token
- Checks expiration
- Returns user data only if authenticated

## Client Usage

### Using the SSO Context

```tsx
import { useSSO } from '@/contexts/SSOContext'

function MyComponent() {
  const { user, isLoading, isAuthenticated, login, logout } = useSSO()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <button onClick={login}>
        Login with ZestAcademy
      </button>
    )
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Available User Properties

```typescript
interface User {
  id: string        // Unique user ID
  email: string     // User email
  name: string      // Display name
  picture?: string  // Profile picture URL
}
```

## Cookie Configuration

### Access Token Cookie
- **Name:** `zest_access_token`
- **HTTPOnly:** ✅ Yes
- **Secure:** ✅ Yes (production)
- **SameSite:** Lax
- **MaxAge:** Token expiration time

### Refresh Token Cookie
- **Name:** `zest_refresh_token`
- **HTTPOnly:** ✅ Yes
- **Secure:** ✅ Yes (production)
- **SameSite:** Lax
- **MaxAge:** 30 days

## Testing

### Local Development

For local development, you can use mock auth server or test credentials:

```env
NEXT_PUBLIC_AUTH_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_SSO_CLIENT_ID=test-client
SSO_CLIENT_SECRET=test-secret
NEXT_PUBLIC_SSO_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

### Production

Ensure all environment variables are properly configured in your deployment platform (Vercel, etc.).

## Troubleshooting

### "State mismatch" error
- State parameter doesn't match stored value
- Possible CSRF attack attempt
- Clear cookies and try again

### "Token exchange failed"
- Check client secret is correct
- Verify redirect URI matches registered URI
- Check auth server is accessible

### "Invalid or expired token"
- Token has expired
- Re-login required
- Check token expiration settings

## Migration from Firebase Auth

The SSO implementation replaces Firebase Authentication:

1. **Login/Register pages** → Now use SSO flow
2. **UserProfile component** → Uses SSO context instead of Firebase
3. **Token storage** → HTTP-only cookies instead of Firebase session
4. **User data** → From JWT instead of Firebase user object

## Future Enhancements

Potential improvements for consideration:

1. **Token Refresh**
   - Automatic token refresh before expiration
   - Seamless session extension

2. **Social Login**
   - Google, GitHub, etc. via auth server
   - Unified social auth across platforms

3. **Multi-factor Authentication**
   - Enhanced security option
   - Configurable per user

4. **Session Management**
   - View active sessions
   - Revoke sessions remotely

## Support

For SSO-related issues or questions:
- Check auth server status: `auth.zestacademy.tech`
- Review auth server documentation
- Contact ZestAcademy support team
