'use client';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { bulletColor } from 'src/components/nav-section';
import { useBoolean } from 'src/hooks/use-boolean';

import { navData } from './nav-config';
import { NavMobile } from './nav-mobile';
import { NavVertical } from './nav-vertical';
import AdminHeader from './header';

// ----------------------------------------------------------------------

export const dynamic = 'force-dynamic';

const LAYOUT_QUERY = 'lg' as const;

const NAV_VERTICAL_WIDTH = 280;
const NAV_MINI_WIDTH = 88;
const HEADER_HEIGHT = 64;

// ----------------------------------------------------------------------

function useNavColorVars(theme: any) {
  // Use theme.palette for resolved hex/rgba values so CSS vars never
  // contain nested var() references that Emotion can't resolve.
  const p = theme.palette;

  return useMemo(() => ({
    layout: {
      '--layout-nav-bg': p.grey[900],
      '--layout-nav-border-color': 'transparent',
      '--layout-nav-zIndex': String(theme.zIndex.drawer + 1),
      '--layout-nav-mobile-width': `${NAV_VERTICAL_WIDTH}px`,
      '--layout-nav-mini-width': `${NAV_MINI_WIDTH}px`,
      '--layout-nav-vertical-width': `${NAV_VERTICAL_WIDTH}px`,
      '--layout-nav-text-primary-color': p.common.white,
      '--layout-nav-text-secondary-color': p.grey[500],
      '--layout-nav-text-disabled-color': p.grey[600],
      '--layout-transition-easing': 'linear',
      '--layout-transition-duration': '120ms',
    },
    section: {
      '--nav-item-caption-color': p.grey[600],
      '--nav-subheader-color': p.grey[600],
      '--nav-subheader-hover-color': p.common.white,
      '--nav-item-color': p.grey[500],
      '--nav-item-root-active-color': p.primary.light,
      '--nav-item-root-open-color': p.common.white,
      '--nav-item-root-active-bg': `rgba(${p.primary.mainChannel ?? '0 167 111'} / 0.08)`,
      '--nav-item-root-active-hover-bg': `rgba(${p.primary.mainChannel ?? '0 167 111'} / 0.16)`,
      '--nav-item-hover-bg': p.action.hover,
      '--nav-bullet-light-color': bulletColor.dark,
      '--nav-item-sub-active-color': p.common.white,
      '--nav-item-sub-open-color': p.common.white,
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [p]);
}

// ----------------------------------------------------------------------

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const mobileNav = useBoolean();
  const [isNavMini, setIsNavMini] = useState(false);

  const navColorVars = useNavColorVars(theme as any);
  const navWidth = isNavMini ? NAV_MINI_WIDTH : NAV_VERTICAL_WIDTH;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        ...navColorVars.layout,
      }}
    >
      {/* ── Mobile drawer ── */}
      {/* @ts-ignore JS component */}
      <NavMobile
        data={navData}
        open={mobileNav.value}
        onClose={mobileNav.onFalse}
        cssVars={navColorVars.section}
      />

      {/* ── Desktop vertical sidebar ── */}
      {/* @ts-ignore JS component */}
      <NavVertical
        data={navData}
        layoutQuery={LAYOUT_QUERY}
        isNavMini={isNavMini}
        cssVars={navColorVars.section}
        onToggleNav={() => setIsNavMini((prev) => !prev)}
      />

      {/* ── Main content column ── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          minWidth: 0,
          [theme.breakpoints.up(LAYOUT_QUERY)]: {
            pl: `${navWidth}px`,
            transition: theme.transitions.create('padding-left', {
              duration: 'var(--layout-transition-duration)',
              easing: 'var(--layout-transition-easing)',
            }),
          },
        }}
      >
        <AdminHeader
          onOpenNav={mobileNav.onTrue}
          headerHeight={HEADER_HEIGHT}
          navWidth={navWidth}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: `${HEADER_HEIGHT}px`,
            minHeight: '100vh',
          }}
        >
          <Box sx={{ pb: 10, px: { xs: 2, sm: 3, lg: 5 } }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
