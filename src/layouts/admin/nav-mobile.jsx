'use client';

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';

import { NavUserCard } from './nav-user-card';

// ----------------------------------------------------------------------

export function NavMobile({ data, open, onClose, cssVars, sx, ...other }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
        <Logo />
      </Box>

      <Scrollbar fillContent>
        <NavSectionVertical
          data={data}
          sx={{ px: 2, flex: '1 1 auto' }}
          cssVars={cssVars}
          {...other}
        />

        <NavUserCard />
      </Scrollbar>
    </Drawer>
  );
}
