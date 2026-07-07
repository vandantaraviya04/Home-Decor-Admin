import type { SxProps } from '@mui/material/styles';

export interface IconifyProps {
  icon: string;
  width?: number;
  sx?: SxProps;
  className?: string;
  [key: string]: unknown;
}

export declare const Iconify: React.ForwardRefExoticComponent<IconifyProps & React.RefAttributes<unknown>>;
