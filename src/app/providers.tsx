'use client';

import { defaultSettings, SettingsProvider } from 'src/components/settings';
import { ThemeProvider } from 'src/theme/theme-provider';

// ----------------------------------------------------------------------

// Wrap to avoid TS strict mode issues with JS components
const AnySettingsProvider = SettingsProvider as React.ComponentType<{ settings: typeof defaultSettings; children: React.ReactNode }>;

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AnySettingsProvider settings={defaultSettings}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AnySettingsProvider>
  );
}
