'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { alpha, useTheme } from '@mui/material/styles';
import toast from 'react-hot-toast';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const ProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Must be a valid email'),
  mobile: z.string().min(1, 'Mobile is required'),
  address: z.string().optional(),
});

const PasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ProfileFormData = z.infer<typeof ProfileSchema>;
type PasswordFormData = z.infer<typeof PasswordSchema>;

// ----------------------------------------------------------------------

const INITIAL_PROFILE = {
  name: 'Admin User',
  email: 'admin@homedecor.com',
  mobile: '+44 7700 900000',
  address: '1 Admin Street, London, W1A 1AA, UK',
  avatar: '',
};

// ----------------------------------------------------------------------

export default function ProfileView() {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(INITIAL_PROFILE.avatar);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: INITIAL_PROFILE,
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onProfileSubmit = handleProfileSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Profile updated successfully!');
  });

  const onPasswordSubmit = handlePasswordSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (data.currentPassword !== 'admin123') {
      toast.error('Current password is incorrect');
      return;
    }
    toast.success('Password changed successfully!');
    resetPassword();
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Avatar Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent sx={{ py: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  src={avatar}
                  sx={{
                    width: 100, height: 100,
                    bgcolor: 'primary.main',
                    fontSize: 36, fontWeight: 700,
                    mx: 'auto',
                  }}
                >
                  A
                </Avatar>
                <Box
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 28, height: 28, borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 4,
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  <Iconify icon="solar:camera-bold" width={14} sx={{ color: 'white' }} />
                </Box>
              </Box>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarUpload}
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Admin User</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>admin@homedecor.com</Typography>
              <Box sx={{ mt: 1.5 }}>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  Allowed PNG, JPG, GIF (max 3MB)
                </Typography>
              </Box>
              {avatar && (
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  sx={{ mt: 1.5 }}
                  onClick={() => setAvatar('')}
                >
                  Remove Photo
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Personal Information" subheader="Update your profile details" />
            <CardContent>
              <Box component="form" onSubmit={onProfileSubmit}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...registerProfile('name')}
                      error={!!profileErrors.name}
                      helperText={profileErrors.name?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      {...registerProfile('email')}
                      error={!!profileErrors.email}
                      helperText={profileErrors.email?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      {...registerProfile('mobile')}
                      error={!!profileErrors.mobile}
                      helperText={profileErrors.mobile?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      multiline
                      rows={2}
                      {...registerProfile('address')}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isProfileSubmitting}
                    loadingIndicator="Saving..."
                  >
                    Save Changes
                  </LoadingButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Change Password */}
        <Grid item xs={12} md={8} sx={{ ml: { md: 'auto' } }}>
          <Card>
            <CardHeader
              title="Change Password"
              subheader="Update your account password"
            />
            <CardContent>
              <Alert severity="info" sx={{ mb: 3 }}>
                Current password for demo: <strong>admin123</strong>
              </Alert>
              <Box component="form" onSubmit={onPasswordSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showCurrentPw ? 'text' : 'password'}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setShowCurrentPw((p) => !p)}>
                            <Iconify icon={showCurrentPw ? 'solar:eye-bold' : 'solar:eye-closed-bold'} width={18} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...registerPassword('currentPassword')}
                    error={!!passwordErrors.currentPassword}
                    helperText={passwordErrors.currentPassword?.message}
                  />

                  <TextField
                    fullWidth
                    label="New Password"
                    type={showNewPw ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setShowNewPw((p) => !p)}>
                            <Iconify icon={showNewPw ? 'solar:eye-bold' : 'solar:eye-closed-bold'} width={18} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...registerPassword('newPassword')}
                    error={!!passwordErrors.newPassword}
                    helperText={passwordErrors.newPassword?.message}
                  />

                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showConfirmPw ? 'text' : 'password'}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setShowConfirmPw((p) => !p)}>
                            <Iconify icon={showConfirmPw ? 'solar:eye-bold' : 'solar:eye-closed-bold'} width={18} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...registerPassword('confirmPassword')}
                    error={!!passwordErrors.confirmPassword}
                    helperText={passwordErrors.confirmPassword?.message}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="inherit"
                      loading={isPasswordSubmitting}
                      loadingIndicator="Changing..."
                    >
                      Change Password
                    </LoadingButton>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
