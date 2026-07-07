'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

const OrderSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  orderStatus: z.string().min(1, 'Order status is required'),
  paymentStatus: z.string().min(1, 'Payment status is required'),
  notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof OrderSchema>;

// ----------------------------------------------------------------------

export default function OrderFormView({ orderId }: { orderId?: string }) {
  const router = useRouter();
  const isEditing = !!orderId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      customerId: '',
      deliveryAddress: '',
      orderStatus: 'pending',
      paymentStatus: 'pending',
      notes: '',
    },
  });

  const customerIdValue = watch('customerId');
  const orderStatusValue = watch('orderStatus');
  const paymentStatusValue = watch('paymentStatus');

  const selectedCustomer = CUSTOMERS.find((c) => c.id === customerIdValue);

  const onSubmit = handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Order created successfully!');
    router.push('/admin/orders');
  });

  const handleCustomerChange = (customerId: string) => {
    setValue('customerId', customerId);
    const customer = CUSTOMERS.find((c) => c.id === customerId);
    if (customer) setValue('deliveryAddress', customer.address);
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Button
          component={Link}
          href="/admin/orders"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          sx={{ color: 'text.secondary' }}
        >
          Orders
        </Button>
        <Iconify icon="eva:arrow-ios-forward-fill" width={16} sx={{ color: 'text.disabled' }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>Add New Order</Typography>
      </Stack>

      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Order Information" />
              <CardContent>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.customerId}>
                      <InputLabel shrink>Customer</InputLabel>
                      <Select
                        label="Customer"
                        value={customerIdValue || ''}
                        onChange={(e) => handleCustomerChange(e.target.value)}
                        notched
                      >
                        {CUSTOMERS.map((c) => (
                          <MenuItem key={c.id} value={c.id}>{c.name} – {c.email}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Delivery Address"
                      multiline
                      rows={2}
                      {...register('deliveryAddress')}
                      error={!!errors.deliveryAddress}
                      helperText={errors.deliveryAddress?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Notes (Optional)"
                      multiline
                      rows={3}
                      {...register('notes')}
                      InputLabelProps={{ shrink: true }}
                      placeholder="Any special instructions..."
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Status" />
              <CardContent>
                <Stack spacing={2.5}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Order Status</InputLabel>
                    <Select
                      label="Order Status"
                      value={orderStatusValue}
                      onChange={(e) => setValue('orderStatus', e.target.value)}
                      notched
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel shrink>Payment Status</InputLabel>
                    <Select
                      label="Payment Status"
                      value={paymentStatusValue}
                      onChange={(e) => setValue('paymentStatus', e.target.value)}
                      notched
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="failed">Failed</MenuItem>
                      <MenuItem value="refunded">Refunded</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" component={Link} href="/admin/orders">Cancel</Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Creating...">
            Create Order
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
}
