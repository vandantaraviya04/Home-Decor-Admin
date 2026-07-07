'use client';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function NavUserCard() {
  return (
    <Stack sx={{ px: 2, pb: 3, pt: 1 }}>
      <Divider sx={{ borderStyle: 'dashed', mb: 2, borderColor: 'var(--layout-nav-border-color, rgba(255,255,255,0.08))' }} />

      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'primary.main',
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          A
        </Avatar>

        <Stack spacing={0} sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ color: 'var(--layout-nav-text-primary-color)' }}
          >
            Admin User
          </Typography>
          <Typography
            variant="caption"
            noWrap
            sx={{ color: 'var(--layout-nav-text-disabled-color)' }}
          >
            admin@homedecor.com
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
