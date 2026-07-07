'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import toast from 'react-hot-toast';

import { Iconify } from 'src/components/iconify';
import { CUSTOMERS } from 'src/_mock/home-decor';

// ----------------------------------------------------------------------

const CustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Must be a valid email'),
  mobile: z.string().min(1, 'Mobile number is required'),
  address: z.string().min(1, 'Address is required'),
  status: z.string().min(1, 'Status is required'),
});

type CustomerFormData = z.infer<typeof CustomerSchema>;

// ----------------------------------------------------------------------

export default function CustomerFormView({ customerId }: { customerId?: string }) {
  const router = useRouter();
  const isEditing = !!customerId;
  const customer = customerId ? CUSTOMERS.find((c) => c.id === customerId) : null;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      address: '',
      status: 'active',
    },
  });

  const statusValue = watch('status');

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        email: customer.email,
        mobile: customer.mobile,
        address: customer.address,
        status: customer.status,
      });
    }
  }, [customer, reset]);

  const onSubmit = handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success(isEditing ? 'Customer updated successfully!' : 'Customer added successfully!');
    router.push('/admin/customers');
  });

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Button
          component={Link}
          href="/admin/customers"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          sx={{ color: 'text.secondary' }}
        >
          Customers
        </Button>
        <Iconify icon="eva:arrow-ios-forward-fill" width={16} sx={{ color: 'text.disabled' }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {isEditing ? 'Edit Customer' : 'Add New Customer'}
        </Typography>
      </Stack>

      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Customer Information" />
              <CardContent>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      {...register('mobile')}
                      error={!!errors.mobile}
                      helperText={errors.mobile?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      multiline
                      rows={3}
                      {...register('address')}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Account Status" />
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel shrink>Status</InputLabel>
                  <Select
                    label="Status"
                    value={statusValue}
                    onChange={(e) => setValue('status', e.target.value)}
                    notched
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" component={Link} href="/admin/customers">Cancel</Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator={isEditing ? 'Updating...' : 'Saving...'}>
            {isEditing ? 'Update Customer' : 'Add Customer'}
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
}
