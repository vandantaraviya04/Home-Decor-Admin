import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface CustomPopoverProps {
  open: HTMLElement | null | boolean;
  anchorEl?: HTMLElement | null;
  onClose: () => void;
  children?: ReactNode;
  slotProps?: {
    paper?: { sx?: SxProps<Theme> };
    arrow?: { placement?: string; offset?: number; size?: number };
  };
  [key: string]: unknown;
}

export declare function CustomPopover(props: CustomPopoverProps): JSX.Element;

export declare function usePopover(): {
  open: HTMLElement | null;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  setOpen: (open: HTMLElement | null) => void;
};
