import type { SxProps, Theme } from '@mui/material/styles';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface IconifyProps {
  icon: string;
  width?: number;
  sx?: SxProps<Theme>;
  className?: string;
  [key: string]: unknown;
}

export declare const Iconify: ForwardRefExoticComponent<IconifyProps & RefAttributes<unknown>>;
