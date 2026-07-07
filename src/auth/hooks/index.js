'use client';

import { useLocalStorage } from 'src/hooks/use-local-storage';

// ----------------------------------------------------------------------

export function useMockedUser() {
  return {
    user: {
      id: '1',
      displayName: 'Admin User',
      email: 'admin@homedecor.com',
      photoURL: null,
      role: 'admin',
    },
  };
}

export function useAuthContext() {
  return {
    user: {
      id: '1',
      displayName: 'Admin User',
      email: 'admin@homedecor.com',
      photoURL: null,
      role: 'admin',
    },
    loading: false,
    authenticated: true,
    unauthenticated: false,
    checkUserSession: async () => {},
  };
}
