import '@mui/material/styles';
import type { CssVarsTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends CssVarsTheme {
    customShadows?: {
      z1?: string;
      z4?: string;
      z8?: string;
      z12?: string;
      z16?: string;
      z20?: string;
      z24?: string;
      card?: string;
      dropdown?: string;
      dialog?: string;
      primary?: string;
      secondary?: string;
      info?: string;
      success?: string;
      warning?: string;
      error?: string;
    };
  }
}
