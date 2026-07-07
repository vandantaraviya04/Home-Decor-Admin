import type { SxProps, Theme } from '@mui/material/styles';
import type { ForwardRefExoticComponent, RefAttributes, ReactNode } from 'react';

export interface LabelProps {
  children?: ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  variant?: 'filled' | 'outlined' | 'ghost' | 'soft' | 'inverted';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: unknown;
}

export declare const Label: ForwardRefExoticComponent<LabelProps & RefAttributes<unknown>>;
