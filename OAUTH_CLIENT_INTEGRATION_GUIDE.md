# OAuth 2.0 Client Integration Guide

This guide shows you how to integrate **Zest Academy**, **Zestfolio**, and **Zest Compilers** with the Zest Auth OAuth 2.0 server.

## Overview

Your applications will use the **OAuth 2.0 Authorization Code Flow with PKCE** to authenticate users via Zest Auth.

### Registered OAuth Clients

After running `npx prisma db seed`, you'll have these OAuth clients:

| Application | Client ID | Redirect URIs | Trusted |
|------------|-----------|---------------|---------|
| **Zest Academy** | `zest_academy` | http://localhost:3001/auth/callback<br>https://zestacademy.tech/auth/callback<br>https://www.zestacademy.tech/auth/callback | ✅ Yes |
| **Zestfolio** | `zestfolio` | http://localhost:3002/auth/callback<br>https://zestfolio.zestacademy.tech/auth/callback | ✅ Yes |
| **Zest Compilers** | `zest_compilers` | http://localhost:3003/auth/callback<br>https://compilers.zestacademy.tech/auth/callback | ✅ Yes |

**Trusted = Yes** means users won't see a consent screen (seamless login experience).

---

## Quick Implementation Guide

### Step 1: Install PKCE Library (Client-Side)

```bash
npm install pkce-challenge
```

### Step 2: Create OAuth Helper

Create `lib/oauth.ts` or `utils/oauth.ts` in your client application:

```typescript
import pkceChallenge from 'pkce-challenge'

const AUTH_SERVER_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'https://auth.zestacademy.tech'
const CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID // e.g., 'zest_academy'
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI // e.g., 'https://zestacademy.tech/auth/callback'

/**
 * Generate PKCE challenge and redirect to authorization endpoint
 */
export async function initiateLogin() {
  // Generate PKCE challenge
  const challenge = await pkceChallenge()
  
  // Store code_verifier in sessionStorage (needed for token exchange)
  sessionStorage.setItem('pkce_code_verifier', challenge.code_verifier)
  
  // Generate random state for CSRF protection
  const state = generateRandomString(32)
  sessionStorage.setItem('oauth_state', state)
  
  // Build authorization URL
  const authUrl = new URL(`${AUTH_SERVER_URL}/api/oauth/authorize`)
  authUrl.searchParams.set('client_id', CLIENT_ID)
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', 'openid profile email')
  authUrl.searchParams.set('state', state)
  authUrl.searchParams.set('code_challenge', challenge.code_challenge)
  authUrl.searchParams.set('code_challenge_method', 'S256')
  
  // Redirect to auth server
  window.location.href = authUrl.toString()
}

/**
 * Generate random string for state parameter
 */
function generateRandomString(length: number): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}
```

### Step 3: Create Login Button

```tsx
// components/LoginButton.tsx
import { initiateLogin } from '@/lib/oauth'

export function LoginButton() {
  return (
    <button onClick={initiateLogin} className="btn-primary">
      Sign in with Zest Account
    </button>
  )
}
```

### Step 4: Create Callback Handler (Backend)

Create an API route to handle the OAuth callback and exchange the code for tokens:

#### Next.js Example (`app/api/auth/callback/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL || 'https://auth.zestacademy.tech'
const CLIENT_ID = process.env.OAUTH_CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { code, state, code_verifier: codeVerifier } = body
  const error = body.error
  
  // Handle error
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  
  // Validate required parameters
  if (!code || !state || !codeVerifier) {
    return NextResponse.json({ error: 'missing_params' }, { status: 400 })
  }
  
  try {
    
    // Exchange authorization code for tokens
    const tokenResponse = await fetch(`${AUTH_SERVER_URL}/api/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    })
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error('Token exchange failed:', errorData)
      return NextResponse.json({ error: 'token_exchange_failed' }, { status: 401 })
    }
    
    const tokens = await tokenResponse.json()
    
    // Get user info
    const userInfoResponse = await fetch(`${AUTH_SERVER_URL}/api/oauth/userinfo`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })
    
    if (!userInfoResponse.ok) {
      return NextResponse.json({ error: 'userinfo_failed' }, { status: 401 })
    }
    
    const user = await userInfoResponse.json()
    
    // Return success response with tokens
    const response = NextResponse.json({ success: true, user })
    
    // Store tokens in httpOnly cookies (set on the response)
    response.cookies.set('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
    })
    
    if (tokens.refresh_token) {
      response.cookies.set('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })
    }
    
    // Store user info
    response.cookies.set('user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
    })
    
    return response
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
```

### Step 5: Create Callback Page (Frontend)

Since the OAuth flow needs to pass the PKCE verifier from the client to the server, create a client component:

#### Next.js Example (`app/auth/callback/page.tsx`)

```tsx
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    
    if (error) {
      router.push(`/login?error=${error}`)
      return
    }
    
    if (!code || !state) {
      router.push('/login?error=missing_params')
      return
    }
    
    // Verify state
    const savedState = sessionStorage.getItem('oauth_state')
    if (state !== savedState) {
      router.push('/login?error=invalid_state')
      return
    }
    
    // Get code_verifier
    const codeVerifier = sessionStorage.getItem('pkce_code_verifier')
    if (!codeVerifier) {
      router.push('/login?error=missing_verifier')
      return
    }
    
    // Send to backend API with code_verifier
    fetch('/api/auth/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        state,
        code_verifier: codeVerifier,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          // Clean up
          sessionStorage.removeItem('pkce_code_verifier')
          sessionStorage.removeItem('oauth_state')
          
          // Redirect to dashboard
          router.push('/dashboard')
        } else {
          const error = await res.json()
          router.push(`/login?error=${error.error || 'auth_failed'}`)
        }
      })
      .catch(() => {
        router.push('/login?error=network_error')
      })
  }, [router, searchParams])
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Completing authentication...</p>
      </div>
    </div>
  )
}
```

### Step 6: Environment Variables

Create `.env.local` in each client application:

#### For Zest Academy:
```env
# OAuth Configuration
NEXT_PUBLIC_AUTH_URL=https://auth.zestacademy.tech
NEXT_PUBLIC_OAUTH_CLIENT_ID=zest_academy
NEXT_PUBLIC_REDIRECT_URI=https://zestacademy.tech/auth/callback

# Server-side only (not prefixed with NEXT_PUBLIC_)
AUTH_SERVER_URL=https://auth.zestacademy.tech
OAUTH_CLIENT_ID=zest_academy
REDIRECT_URI=https://zestacademy.tech/auth/callback
```

#### For Zestfolio:
```env
NEXT_PUBLIC_AUTH_URL=https://auth.zestacademy.tech
NEXT_PUBLIC_OAUTH_CLIENT_ID=zestfolio
NEXT_PUBLIC_REDIRECT_URI=https://zestfolio.zestacademy.tech/auth/callback

AUTH_SERVER_URL=https://auth.zestacademy.tech
OAUTH_CLIENT_ID=zestfolio
REDIRECT_URI=https://zestfolio.zestacademy.tech/auth/callback
```

#### For Zest Compilers:
```env
NEXT_PUBLIC_AUTH_URL=https://auth.zestacademy.tech
NEXT_PUBLIC_OAUTH_CLIENT_ID=zest_compilers
NEXT_PUBLIC_REDIRECT_URI=https://compilers.zestacademy.tech/auth/callback

AUTH_SERVER_URL=https://auth.zestacademy.tech
OAUTH_CLIENT_ID=zest_compilers
REDIRECT_URI=https://compilers.zestacademy.tech/auth/callback
```

---

## Token Management

### Accessing Protected Resources

Once authenticated, use the access token to access protected resources:

```typescript
// Example: Fetch user profile
async function getUserProfile() {
  const response = await fetch('/api/user/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  
  return response.json()
}
```

### Token Refresh

Access tokens expire after 1 hour. Use the refresh token to get a new access token:

```typescript
async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(`${AUTH_SERVER_URL}/api/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    }),
  })
  
  if (!response.ok) {
    throw new Error('Token refresh failed')
  }
  
  return response.json() // { access_token, refresh_token, ... }
}
```

### Logout

To log out, call your logout API endpoint which handles token revocation:

```typescript
async function logout() {
  // Call the logout API endpoint
  await fetch('/api/auth/logout', {
    method: 'POST',
  })
  
  // Redirect to login
  window.location.href = '/login'
}
```

#### Backend Logout Handler (`app/api/auth/logout/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server'

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL || 'https://auth.zestacademy.tech'
const CLIENT_ID = process.env.OAUTH_CLIENT_ID

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookie
    const refreshToken = request.cookies.get('refresh_token')?.value
    
    if (refreshToken) {
      // Revoke refresh token on auth server
      await fetch(`${AUTH_SERVER_URL}/api/oauth/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: refreshToken,
          client_id: CLIENT_ID,
          token_type_hint: 'refresh_token',
        }),
      }).catch(err => console.error('Token revocation failed:', err))
    }
    
    // Clear cookies
    const response = NextResponse.json({ success: true })
    response.cookies.delete('access_token')
    response.cookies.delete('refresh_token')
    response.cookies.delete('user')
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'logout_failed' }, { status: 500 })
  }
}
```

---

## Testing the Integration

### 1. Run the Seed Script

First, ensure your OAuth clients are registered:

```bash
cd zest.auth
npx prisma db seed
```

### 2. Test Locally

Start your auth server:
```bash
cd zest.auth
npm run dev  # Runs on http://localhost:3000
```

Start your client app (e.g., Zest Academy):
```bash
cd zest-academy
npm run dev  # Runs on http://localhost:3001
```

### 3. Test the Flow

1. Navigate to your app (http://localhost:3001)
2. Click "Sign in with Zest Account"
3. You should be redirected to `http://localhost:3000/api/oauth/authorize`
4. If not logged in, you'll be redirected to the login page
5. After login, you'll be redirected back to your app at `/auth/callback`
6. Your app exchanges the code for tokens
7. User is authenticated and redirected to dashboard

---

## Common Issues & Solutions

### Issue: "Invalid client_id"
**Solution**: Ensure you've run `npx prisma db seed` and the client_id matches exactly.

### Issue: "Redirect URI mismatch"
**Solution**: Check that your REDIRECT_URI in `.env` matches exactly what's registered in the database.

### Issue: "Missing PKCE verifier"
**Solution**: Ensure `sessionStorage` is working and the verifier is being stored before redirecting to the auth server.

### Issue: Infinite redirect loop
**Solution**: Make sure your callback handler properly clears the OAuth state and doesn't trigger another login.

---

## Security Checklist

- ✅ Use PKCE (code_challenge + code_verifier)
- ✅ Validate state parameter (CSRF protection)
- ✅ Store tokens in httpOnly cookies (XSS protection)
- ✅ Use HTTPS in production
- ✅ Implement token refresh logic
- ✅ Handle token expiration gracefully
- ✅ Never expose tokens in URLs or localStorage
- ✅ Implement proper logout with token revocation


Happy coding! 🚀
