import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';

import AppProviders from 'src/app/providers';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: 'Home Decor Admin', template: '%s | Home Decor Admin' },
  description: 'Home Decor Admin Panel - Manage products, orders, and customers',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// ----------------------------------------------------------------------

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mui-color-scheme="light" suppressHydrationWarning>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
