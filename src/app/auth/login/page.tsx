import type { Metadata } from 'next';

import LoginView from 'src/sections/auth/login-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: 'Login | Home Decor Admin' };

export default function LoginPage() {
  return <LoginView />;
}
