'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/profile': 'Edit Profile',
};

function getPageTitle(pathname: string): string {
  for (const [path, title] of Object.entries(PAGE_TITLES)) {
    if (pathname === path || pathname.startsWith(path + '/')) return title;
  }
  return 'Home Decor Admin';
}

// ----------------------------------------------------------------------

interface HeaderProps {
  onOpenNav: () => void;
  headerHeight: number;
  navWidth: number;
}

export default function AdminHeader({ onOpenNav, headerHeight, navWidth }: HeaderProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const popover = usePopover();

  const pageTitle = getPageTitle(pathname);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: headerHeight,
        zIndex: theme.zIndex.appBar,
        bgcolor: alpha(theme.palette.background.default, 0.8),
        backdropFilter: 'blur(6px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        transition: theme.transitions.create('width', {
          duration: 'var(--layout-transition-duration)',
          easing: 'var(--layout-transition-easing)',
        }),
        [theme.breakpoints.up('lg')]: {
          left: 'auto',
          right: 0,
          width: `calc(100% - ${navWidth}px)`,
        },
      }}
    >
      <Toolbar sx={{ height: 1, px: { xs: 2, sm: 3, lg: 5 }, gap: 1 }}>
        {isMobile && (
          <IconButton onClick={onOpenNav} sx={{ color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {pageTitle}
        </Typography>

        {/* Account button */}
        <IconButton
          onClick={popover.onOpen}
          sx={{
            p: 0,
            '&:hover': { opacity: 0.8 },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'primary.main',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            A
          </Avatar>
        </IconButton>

        <CustomPopover
          open={popover.open}
          anchorEl={popover.anchorEl}
          onClose={popover.onClose}
          slotProps={{ paper: { sx: { p: 0, width: 200 } }, arrow: { offset: 20 } }}
        >
          <Box sx={{ p: 2, pb: 1.5 }}>
            <Typography variant="subtitle2" noWrap>Admin User</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              admin@homedecor.com
            </Typography>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuList sx={{ p: 1 }}>
            <MenuItem
              component={Link}
              href="/admin/profile"
              onClick={popover.onClose}
              sx={{ borderRadius: 0.75, fontSize: 14 }}
            >
              <Iconify icon="solar:user-circle-bold" width={18} sx={{ mr: 1 }} />
              Edit Profile
            </MenuItem>
          </MenuList>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box sx={{ p: 1 }}>
            <MenuItem
              onClick={() => { popover.onClose(); router.push('/auth/login'); }}
              sx={{ borderRadius: 0.75, fontSize: 14, color: 'error.main' }}
            >
              <Iconify icon="solar:logout-3-bold" width={18} sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Box>
        </CustomPopover>
      </Toolbar>
    </AppBar>
  );
}
