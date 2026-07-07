'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import InputAdornment from '@mui/material/InputAdornment';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ORDERS, type Order, type OrderStatus, type PaymentStatus } from 'src/_mock/home-decor';

// ----------------------------------------------------------------------

const ROWS_PER_PAGE = 8;

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

export default function OrdersListView() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch = !search ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || o.orderStatus === statusFilter;
      const matchPayment = !paymentFilter || o.paymentStatus === paymentFilter;
      return matchSearch && matchStatus && matchPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const confirmDelete = () => {
    if (deleteId) setOrders((prev) => prev.filter((o) => o.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <Box>
      {/* Toolbar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems={{ sm: 'center' }}>
        <TextField
          size="small"
          placeholder="Search by Order ID, Customer..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={18} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 280, flex: 1 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Order Status</InputLabel>
          <Select label="Order Status" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Payment</InputLabel>
          <Select label="Payment" value={paymentFilter} onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
            <MenuItem value="refunded">Refunded</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          component={Link}
          href="/admin/orders/new"
          sx={{ flexShrink: 0 }}
        >
          Add Order
        </Button>
      </Stack>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Showing {filtered.length} order{filtered.length !== 1 ? 's' : ''}
      </Typography>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((order) => (
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
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.customerName}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{order.customerEmail}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.orderDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.items.length} item{order.items.length > 1 ? 's' : ''}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2">£{order.totalAmount.toFixed(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Label color={ORDER_STATUS_COLOR[order.orderStatus]} variant="soft">
                      {order.orderStatus}
                    </Label>
                  </TableCell>
                  <TableCell>
                    <Label color={PAYMENT_STATUS_COLOR[order.paymentStatus]} variant="soft">
                      {order.paymentStatus}
                    </Label>
                  </TableCell>
                  <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <IconButton size="small" onClick={() => router.push(`/admin/orders/${order.id}`)} title="View">
                        <Iconify icon="solar:eye-bold" width={16} />
                      </IconButton>
                      <IconButton size="small" onClick={() => router.push(`/admin/orders/${order.id}/edit`)} title="Edit">
                        <Iconify icon="solar:pen-bold" width={16} />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => setDeleteId(order.id)} title="Delete">
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <Iconify icon="solar:bill-list-bold-duotone" width={48} sx={{ color: 'text.disabled', display: 'block', mx: 'auto', mb: 1 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>No orders found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {totalPages > 1 && (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" shape="rounded" />
          </Box>
        )}
      </Card>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this order? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
