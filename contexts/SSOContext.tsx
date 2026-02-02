/**
 * SSO Authentication Context
 * 
 * Provides authentication state and methods throughout the application.
 * Uses HTTP-only cookies for token storage (never exposed to frontend).
 * 
 * Security:
 * - No tokens stored in localStorage or sessionStorage
 * - All token operations happen server-side via API routes
 * - Client only receives user info, not tokens
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SSO_CONFIG, getAuthorizationUrl } from '@/lib/sso-config';
import { generateState, generateCodeVerifier, generateCodeChallenge } from '@/lib/sso-utils';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface SSOContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const SSOContext = createContext<SSOContextType | undefined>(undefined);

export function SSOProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to check auth:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function login() {
    try {
      // Generate state for CSRF protection
      const state = generateState();
      
      // Generate code verifier and challenge for PKCE
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      // Store state and code verifier in cookies (will be validated on callback)
      document.cookie = `${SSO_CONFIG.STATE_COOKIE_NAME}=${state}; path=/; max-age=600; SameSite=Lax${
        SSO_CONFIG.COOKIE_OPTIONS.secure ? '; Secure' : ''
      }`;
      document.cookie = `${SSO_CONFIG.CODE_VERIFIER_COOKIE_NAME}=${codeVerifier}; path=/; max-age=600; SameSite=Lax${
        SSO_CONFIG.COOKIE_OPTIONS.secure ? '; Secure' : ''
      }`;

      // Redirect to auth server
      const authUrl = getAuthorizationUrl(state, codeChallenge);
      window.location.href = authUrl;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async function logout() {
    try {
      // Clear user state immediately
      setUser(null);
      
      // Redirect to logout endpoint which will clear cookies and redirect to auth server
      window.location.href = '/api/auth/logout?return_to=/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async function refreshUser() {
    setIsLoading(true);
    await checkAuth();
  }

  const value: SSOContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  };

  return <SSOContext.Provider value={value}>{children}</SSOContext.Provider>;
}

export function useSSO() {
  const context = useContext(SSOContext);
  if (context === undefined) {
    throw new Error('useSSO must be used within a SSOProvider');
  }
  return context;
}
