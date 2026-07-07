'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';
import { varAlpha, bgGradient } from 'src/theme/styles';

// ----------------------------------------------------------------------

const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Must be a valid email'),
  password: z.string().min(1, 'Password is required').min(6, 'Must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof LoginSchema>;

// ----------------------------------------------------------------------

export default function LoginView() {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: 'admin@homedecor.com', password: 'admin123', rememberMe: false },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg('');
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (data.email === 'admin@homedecor.com' && data.password === 'admin123') {
        if (data.rememberMe && typeof window !== 'undefined') {
          localStorage.setItem('hd-auth', '1');
        }
        router.push('/admin/dashboard');
      } else {
        setErrorMsg('Invalid email or password.');
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
    }
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        ...bgGradient({
          color: `135deg, ${alpha(theme.palette.primary.light, 0.2)}, ${alpha(theme.palette.primary.dark, 0.1)}`,
          imgUrl: '/assets/background/background-3-blur.webp',
        }),
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 5,
          ...bgGradient({
            color: `135deg, ${alpha(theme.palette.primary.dark, 0.92)}, ${alpha(theme.palette.primary.main, 0.92)}`,
            imgUrl: '/assets/background/background-7.webp',
          }),
        }}
      >
        <Box sx={{ maxWidth: 400, textAlign: 'center', color: 'white' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration-dashboard.webp"
            alt="Dashboard"
            sx={{ width: '100%', maxWidth: 340, mb: 4, borderRadius: 2, boxShadow: 8 }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'white' }}>
            Manage Your Home Decor Business
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, color: 'white' }}>
            Track orders, manage products, and grow your customer base with our powerful admin panel.
          </Typography>
        </Box>
      </Box>

      {/* Right Section - Login Form */}
      <Box
        sx={{
          flex: { xs: 1, md: 'none' },
          width: { md: '480px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 5 },
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 420,
            p: { xs: 3, sm: 4 },
            boxShadow: theme.customShadows?.z24,
          }}
        >
          {/* Header */}
          <Stack spacing={0.5} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Box
                sx={{
                  width: 40, height: 40, borderRadius: 1,
                  bgcolor: 'primary.main',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:home-2-bold-duotone" width={22} sx={{ color: 'white' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Home Decor Admin
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Sign in to your account
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Enter your credentials to access the admin panel
            </Typography>
          </Stack>

          {/* Demo credentials hint */}
          <Alert severity="info" sx={{ mb: 3 }}>
            Use <strong>admin@homedecor.com</strong> / <strong>admin123</strong>
          </Alert>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMsg}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                autoComplete="email"
                InputLabelProps={{ shrink: true }}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
                  <Link
                    href="#"
                    variant="body2"
                    underline="hover"
                    sx={{ color: 'text.primary', fontSize: 13 }}
                  >
                    Forgot password?
                  </Link>
                </Box>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Min 6 characters"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <Iconify
                            icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                            width={18}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    {...register('rememberMe')}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Remember me
                  </Typography>
                }
              />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator="Signing in..."
                sx={{ mt: 1 }}
              >
                Sign In
              </LoadingButton>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
