# SSO Quick Start Guide

## What Was Built

A complete Single Sign-On (SSO) authentication system using OAuth 2.0 with PKCE for ZestAcademy websites.

## File Structure

```
lib/
├── sso-config.ts          # SSO configuration and URL builders
└── sso-utils.ts           # Cryptographic utilities and JWT validation

app/api/auth/
├── callback/route.ts      # OAuth callback handler
├── logout/route.ts        # Logout handler
└── me/route.ts           # User info endpoint

contexts/
└── SSOContext.tsx        # React context for authentication state

app/
├── login/page.tsx        # Updated with SSO flow
├── register/page.tsx     # Updated with SSO flow
└── layout.tsx           # Added SSOProvider wrapper

components/layout/
└── UserProfile.tsx       # Updated to use SSO context

Documentation/
├── SSO_IMPLEMENTATION.md        # Comprehensive technical guide
├── SSO_INTEGRATION_SUMMARY.md   # Integration summary
└── .env.example                # Environment variables
```

## How It Works

### 1. User clicks "Login with ZestAcademy"
```tsx
<button onClick={login}>Login with ZestAcademy</button>
```

### 2. Redirect to auth server
```
https://auth.zestacademy.tech/authorize?
  client_id=zestacademy-website&
  redirect_uri=https://zestacademy.tech/api/auth/callback&
  scope=openid+profile+email&
  response_type=code&
  state=RANDOM_STATE&
  code_challenge=SHA256_HASH&
  code_challenge_method=S256
```

### 3. User authenticates on auth server
- Handled by auth.zestacademy.tech
- User enters credentials
- Consents to authorization

### 4. Callback with authorization code
```
https://zestacademy.tech/api/auth/callback?
  code=AUTHORIZATION_CODE&
  state=RANDOM_STATE
```

### 5. Backend exchanges code for tokens
```typescript
// app/api/auth/callback/route.ts
const tokens = await fetch(authServerTokenEndpoint, {
  method: 'POST',
  body: {
    grant_type: 'authorization_code',
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET, // Backend only!
    code_verifier: CODE_VERIFIER,
  }
})
```

### 6. Set HTTP-only cookies
```typescript
response.cookies.set('zest_access_token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
})
```

### 7. User is authenticated!
```tsx
const { user, isAuthenticated } = useSSO()
// user = { id, email, name, picture }
```

## Environment Variables

```env
NEXT_PUBLIC_AUTH_SERVER_URL=https://auth.zestacademy.tech
NEXT_PUBLIC_SSO_CLIENT_ID=zestacademy-website
SSO_CLIENT_SECRET=your_secret_here
NEXT_PUBLIC_SSO_REDIRECT_URI=https://zestacademy.tech/api/auth/callback
```

## Usage in Components

```tsx
import { useSSO } from '@/contexts/SSOContext'

function MyComponent() {
  const { user, isLoading, isAuthenticated, login, logout } = useSSO()

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <button onClick={login}>Login</button>

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

## Security Features

✅ **No passwords** - Handled by auth server  
✅ **HTTP-only cookies** - Tokens never in JavaScript  
✅ **PKCE** - Prevents code interception  
✅ **CSRF protection** - State parameter  
✅ **JWT validation** - Signature, expiry, issuer, audience  
✅ **Backend token exchange** - Client secret never exposed  

## Deployment Checklist

Before going live:

1. ☐ Deploy auth.zestacademy.tech
2. ☐ Register client with auth server
3. ☐ Set environment variables in production
4. ☐ Test OAuth flow end-to-end
5. ☐ Verify tokens in HTTP-only cookies
6. ☐ Test global logout across platforms

## Testing

```bash
# 1. Set environment variables
cp .env.example .env.local
# Edit .env.local with actual values

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Visit http://localhost:3000/login
# 5. Click "Login with ZestAcademy"
# 6. Should redirect to auth server
```

## Troubleshooting

**"State mismatch" error**
- Clear cookies and try again
- Check state cookie is being set correctly

**"Token exchange failed"**
- Verify CLIENT_SECRET is correct
- Check redirect_uri matches registered value
- Ensure auth server is accessible

**"Invalid token"**
- Token may be expired
- Check JWT validation logic
- Verify issuer and audience claims

## Next Steps

1. Deploy auth server at auth.zestacademy.tech
2. Configure client registration
3. Set production environment variables
4. Test OAuth flow in staging
5. Deploy to production

## Support

- Technical Guide: [SSO_IMPLEMENTATION.md](./SSO_IMPLEMENTATION.md)
- Integration Summary: [SSO_INTEGRATION_SUMMARY.md](./SSO_INTEGRATION_SUMMARY.md)
- Environment Setup: [.env.example](./.env.example)
