'use client';

import Link from 'next/link';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CUSTOMERS, ORDERS, type OrderStatus, type PaymentStatus } from 'src/_mock/home-decor';

// ----------------------------------------------------------------------

const ORDER_STATUS_COLOR: Record<OrderStatus, 'success' | 'info' | 'warning' | 'default' | 'error'> = {
  delivered: 'success',
  shipped: 'info',
  processing: 'warning',
  pending: 'default',
  cancelled: 'error',
};

const PAYMENT_STATUS_COLOR: Record<PaymentStatus, 'success' | 'error' | 'warning' | 'default'> = {
  paid: 'success',
  failed: 'error',
  refunded: 'warning',
  pending: 'default',
};

// ----------------------------------------------------------------------

export default function CustomerDetailsView({ customerId }: { customerId: string }) {
  const theme = useTheme();
  const router = useRouter();

  const customer = CUSTOMERS.find((c) => c.id === customerId);
  const customerOrders = ORDERS.filter((o) => o.customerId === customerId);

  if (!customer) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Iconify icon="solar:users-group-rounded-bold-duotone" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>Customer not found</Typography>
        <Button component={Link} href="/admin/customers" sx={{ mt: 2 }} variant="contained">
          Back to Customers
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Breadcrumb */}
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
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{customer.name}</Typography>
      </Stack>

      <Grid container spacing={3}>
        {/* Customer Profile Card */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Avatar
                  sx={{
                    width: 80, height: 80,
                    bgcolor: 'primary.main',
                    fontSize: 28, fontWeight: 700,
                    mx: 'auto', mb: 2,
                  }}
                >
                  {customer.name.charAt(0)}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{customer.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{customer.email}</Typography>
                <Box sx={{ mt: 1.5 }}>
                  <Label color={customer.status === 'active' ? 'success' : 'warning'} variant="soft">
                    {customer.status}
                  </Label>
                </Box>
              </CardContent>
              <Divider />
              <CardContent sx={{ pt: 2 }}>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Iconify icon="solar:phone-bold-duotone" width={18} sx={{ color: 'text.disabled', mt: 0.25, flexShrink: 0 }} />
                    <Typography variant="body2">{customer.mobile}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Iconify icon="solar:map-point-bold-duotone" width={18} sx={{ color: 'text.disabled', mt: 0.25, flexShrink: 0 }} />
                    <Typography variant="body2">{customer.address}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Iconify icon="solar:calendar-bold-duotone" width={18} sx={{ color: 'text.disabled', flexShrink: 0 }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>Registered</Typography>
                      <Typography variant="body2">{customer.registrationDate}</Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader title="Purchase Statistics" />
              <CardContent sx={{ pt: 0 }}>
                <Stack spacing={2}>
                  <StatRow
                    icon="solar:bill-list-bold-duotone"
                    label="Total Orders"
                    value={String(customer.totalOrders)}
                    color={theme.vars.palette.info.main}
                  />
                  <StatRow
                    icon="solar:dollar-minimalistic-bold-duotone"
                    label="Total Spent"
                    value={`£${customer.totalSpent.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`}
                    color={theme.vars.palette.success.main}
                  />
                  <StatRow
                    icon="solar:calendar-date-bold-duotone"
                    label="Last Order"
                    value={customer.lastOrderDate}
                    color={theme.vars.palette.warning.main}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Orders Table */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title={`Orders (${customerOrders.length})`}
              subheader={`All orders placed by ${customer.name}`}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Products</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerOrders.map((order) => (
                    <TableRow key={order.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell>
                        <Typography
                          variant="body2"
                          component={Link}
                          href={`/admin/orders/${order.id}`}
                          sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{order.orderDate}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2">£{order.totalAmount.toFixed(2)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Label color={PAYMENT_STATUS_COLOR[order.paymentStatus]} variant="soft">
                          {order.paymentStatus}
                        </Label>
                      </TableCell>
                      <TableCell>
                        <Label color={ORDER_STATUS_COLOR[order.orderStatus]} variant="soft">
                          {order.orderStatus}
                        </Label>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{order.items.length} item{order.items.length > 1 ? 's' : ''}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <IconButton size="small" onClick={() => router.push(`/admin/orders/${order.id}`)} title="View">
                            <Iconify icon="solar:eye-bold" width={16} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  {customerOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          No orders found for this customer
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

function StatRow({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 40, height: 40, borderRadius: 1.5, flexShrink: 0,
          bgcolor: alpha(color, 0.12),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Iconify icon={icon} width={22} sx={{ color }} />
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>{label}</Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{value}</Typography>
      </Box>
    </Box>
  );
}
