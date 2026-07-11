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

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ORDERS, type OrderStatus, type PaymentStatus } from 'src/_mock/home-decor';

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

export default function OrderDetailsView({ orderId }: { orderId: string }) {
  const order = ORDERS.find((o) => o.id === orderId);

  if (!order) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Iconify icon="solar:bill-list-bold-duotone" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>Order not found</Typography>
        <Button component={Link} href="/admin/orders" sx={{ mt: 2 }} variant="contained">
          Back to Orders
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
          href="/admin/orders"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          sx={{ color: 'text.secondary' }}
        >
          Orders
        </Button>
        <Iconify icon="eva:arrow-ios-forward-fill" width={16} sx={{ color: 'text.disabled' }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.id}</Typography>
      </Stack>

      {/* Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" sx={{ mb: 3 }} spacing={2}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{order.id}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Placed on {order.orderDate}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Label color={ORDER_STATUS_COLOR[order.orderStatus]} variant="soft" sx={{ fontSize: 13, py: 0.5, px: 1.5 }}>
            {order.orderStatus}
          </Label>
          <Label color={PAYMENT_STATUS_COLOR[order.paymentStatus]} variant="soft" sx={{ fontSize: 13, py: 0.5, px: 1.5 }}>
            {order.paymentStatus}
          </Label>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {/* Order Items */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Order Items" subheader={`${order.items.length} item${order.items.length > 1 ? 's' : ''}`} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Qty</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.productId} sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={item.image}
                            variant="rounded"
                            sx={{ width: 48, height: 48 }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.productName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right">₹{item.price.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2">₹{(item.price * item.quantity).toFixed(2)}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ p: 2.5 }}>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Subtotal</Typography>
                  <Typography variant="body2">₹{order.totalAmount.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Shipping</Typography>
                  <Typography variant="body2" sx={{ color: 'success.main' }}>Free</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ₹{order.totalAmount.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Customer Info */}
            <Card>
              <CardHeader title="Customer Information" />
              <CardContent sx={{ pt: 0 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontWeight: 700 }}>
                      {order.customerName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">{order.customerName}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{order.customerEmail}</Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 0.5 }}>
                      DELIVERY ADDRESS
                    </Typography>
                    <Typography variant="body2">{order.deliveryAddress}</Typography>
                  </Box>
                  {order.notes && (
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 0.5 }}>
                        NOTES
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{order.notes}</Typography>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader title="Order Summary" />
              <CardContent sx={{ pt: 0 }}>
                <Stack spacing={1.5}>
                  <InfoRow label="Order ID" value={order.id} />
                  <InfoRow label="Order Date" value={order.orderDate} />
                  <InfoRow label="Items" value={`${order.items.length} item${order.items.length > 1 ? 's' : ''}`} />
                  <InfoRow
                    label="Order Status"
                    value={
                      <Label color={ORDER_STATUS_COLOR[order.orderStatus]} variant="soft" sx={{ textTransform: 'capitalize' }}>
                        {order.orderStatus}
                      </Label>
                    }
                  />
                  <InfoRow
                    label="Payment Status"
                    value={
                      <Label color={PAYMENT_STATUS_COLOR[order.paymentStatus]} variant="soft" sx={{ textTransform: 'capitalize' }}>
                        {order.paymentStatus}
                      </Label>
                    }
                  />
                  <Divider />
                  <InfoRow
                    label="Total Amount"
                    value={<Typography variant="subtitle2" sx={{ color: 'primary.main' }}>₹{order.totalAmount.toFixed(2)}</Typography>}
                    bold
                  />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

function InfoRow({ label, value, bold }: { label: string; value: React.ReactNode; bold?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{label}</Typography>
      {typeof value === 'string' ? (
        <Typography variant="body2" sx={{ fontWeight: bold ? 700 : 400, textAlign: 'right', ml: 2 }}>
          {value}
        </Typography>
      ) : value}
    </Box>
  );
}
