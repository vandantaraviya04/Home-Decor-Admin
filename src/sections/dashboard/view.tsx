'use client';

import Link from 'next/link';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ORDERS, CUSTOMERS, PRODUCTS, DASHBOARD_STATS, SALES_DATA } from 'src/_mock/home-decor';

// ----------------------------------------------------------------------

const STAT_CARDS = [
  {
    title: 'Total Revenue',
    value: `£${DASHBOARD_STATS.totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    icon: 'solar:dollar-minimalistic-bold-duotone',
    color: 'primary',
    change: '+12.5%',
    up: true,
  },
  {
    title: 'Total Orders',
    value: DASHBOARD_STATS.totalOrders,
    icon: 'solar:bill-list-bold-duotone',
    color: 'info',
    change: '+8.2%',
    up: true,
  },
  {
    title: 'Total Customers',
    value: DASHBOARD_STATS.totalCustomers,
    icon: 'solar:users-group-rounded-bold-duotone',
    color: 'warning',
    change: '+4.6%',
    up: true,
  },
  {
    title: 'Total Products',
    value: DASHBOARD_STATS.totalProducts,
    icon: 'solar:box-bold-duotone',
    color: 'error',
    change: '-2.1%',
    up: false,
  },
];

type StatColor = 'primary' | 'info' | 'warning' | 'error';

const ORDER_STATUS_DATA = [
  { name: 'Delivered', value: ORDERS.filter(o => o.orderStatus === 'delivered').length, color: '#22C55E' },
  { name: 'Shipped', value: ORDERS.filter(o => o.orderStatus === 'shipped').length, color: '#3B82F6' },
  { name: 'Processing', value: ORDERS.filter(o => o.orderStatus === 'processing').length, color: '#F59E0B' },
  { name: 'Pending', value: ORDERS.filter(o => o.orderStatus === 'pending').length, color: '#8B5CF6' },
  { name: 'Cancelled', value: ORDERS.filter(o => o.orderStatus === 'cancelled').length, color: '#EF4444' },
];

const orderStatusLabel: Record<string, 'success' | 'info' | 'warning' | 'default' | 'error'> = {
  delivered: 'success',
  shipped: 'info',
  processing: 'warning',
  pending: 'default',
  cancelled: 'error',
};

const paymentStatusLabel: Record<string, 'success' | 'error' | 'warning' | 'default'> = {
  paid: 'success',
  failed: 'error',
  refunded: 'warning',
  pending: 'default',
};

// ----------------------------------------------------------------------

export default function DashboardView() {
  const theme = useTheme();

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {STAT_CARDS.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Sales Overview Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Sales Overview"
              subheader="Monthly revenue for the current year"
              action={
                <Button size="small" variant="outlined" component={Link} href="/admin/orders">
                  View All
                </Button>
              }
            />
            <CardContent sx={{ pb: '16px !important' }}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.vars.palette.primary.main} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={theme.vars.palette.primary.main} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.vars.palette.divider} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: theme.vars.palette.text.secondary }} />
                  <YAxis tick={{ fontSize: 12, fill: theme.vars.palette.text.secondary }} tickFormatter={(v) => `£${v}`} />
                  <Tooltip
                    formatter={(value) => [`£${value}`, 'Revenue']}
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: theme.shadows[8],
                      fontSize: 13,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={theme.vars.palette.primary.main}
                    strokeWidth={2.5}
                    fill="url(#revenueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Status Pie */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Order Status" subheader="Distribution by status" />
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={ORDER_STATUS_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {ORDER_STATUS_DATA.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Stack spacing={1} sx={{ mt: 1 }}>
                {ORDER_STATUS_DATA.map((item) => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.name}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{item.value}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardHeader
              title="Recent Orders"
              action={
                <Button size="small" variant="outlined" component={Link} href="/admin/orders">
                  View All
                </Button>
              }
            />
            <Box sx={{ overflowX: 'auto' }}>
              <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
                <Box component="thead">
                  <Box component="tr" sx={{ bgcolor: alpha(theme.palette.grey[500], 0.08) }}>
                    {['Order ID', 'Customer', 'Amount', 'Status', 'Payment'].map((h) => (
                      <Box
                        key={h}
                        component="th"
                        sx={{
                          px: 2, py: 1.5, textAlign: 'left',
                          fontSize: 12, fontWeight: 600,
                          color: 'text.secondary',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {ORDERS.slice(0, 6).map((order, idx) => (
                    <Box
                      key={order.id}
                      component="tr"
                      sx={{
                        borderTop: `1px solid ${theme.vars.palette.divider}`,
                        '&:hover': { bgcolor: alpha(theme.palette.grey[500], 0.04) },
                        cursor: 'pointer',
                      }}
                    >
                      <Box component="td" sx={{ px: 2, py: 1.5 }}>
                        <Typography
                          variant="body2"
                          component={Link}
                          href={`/admin/orders/${order.id}`}
                          sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                          {order.id}
                        </Typography>
                      </Box>
                      <Box component="td" sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="body2">{order.customerName}</Typography>
                      </Box>
                      <Box component="td" sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          £{order.totalAmount.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box component="td" sx={{ px: 2, py: 1.5 }}>
                        <Label color={orderStatusLabel[order.orderStatus] || 'default'} variant="soft">
                          {order.orderStatus}
                        </Label>
                      </Box>
                      <Box component="td" sx={{ px: 2, py: 1.5 }}>
                        <Label color={paymentStatusLabel[order.paymentStatus] || 'default'} variant="soft">
                          {order.paymentStatus}
                        </Label>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Latest Customers */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Latest Customers"
              action={
                <Button size="small" variant="outlined" component={Link} href="/admin/customers">
                  View All
                </Button>
              }
            />
            <CardContent sx={{ pt: 0, pb: '16px !important' }}>
              <Stack divider={<Divider flexItem />}>
                {CUSTOMERS.slice(0, 5).map((customer) => (
                  <Box
                    key={customer.id}
                    component={Link}
                    href={`/admin/customers/${customer.id}`}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 2, py: 1.5,
                      textDecoration: 'none',
                      '&:hover': { opacity: 0.8 },
                    }}
                  >
                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontSize: 14, fontWeight: 700 }}>
                      {customer.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" noWrap>{customer.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                        {customer.email}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                        £{customer.totalSpent.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {customer.totalOrders} orders
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Stats Row */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={3}>
          <QuickStatCard label="Pending Orders" value={DASHBOARD_STATS.pendingOrders} icon="solar:clock-circle-bold-duotone" color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickStatCard label="Delivered Orders" value={DASHBOARD_STATS.deliveredOrders} icon="solar:check-circle-bold-duotone" color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickStatCard label="Active Products" value={DASHBOARD_STATS.activeProducts} icon="solar:tag-price-bold-duotone" color="info" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickStatCard label="Out of Stock" value={DASHBOARD_STATS.outOfStockProducts} icon="solar:box-minimalistic-bold-duotone" color="error" />
        </Grid>
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

function StatCard({ stat }: { stat: typeof STAT_CARDS[0] }) {
  const theme = useTheme();
  const color = stat.color as StatColor;

  const colorMap: Record<StatColor, string> = {
    primary: theme.palette.primary.main,
    info: theme.palette.info.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
  };
  const bgColorMap: Record<StatColor, string> = {
    primary: alpha(theme.palette.primary.main, 0.12),
    info: alpha(theme.palette.info.main, 0.12),
    warning: alpha(theme.palette.warning.main, 0.12),
    error: alpha(theme.palette.error.main, 0.12),
  };

  return (
    <Card sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
            {stat.title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {stat.value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            <Iconify
              icon={stat.up ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
              width={16}
              sx={{ color: stat.up ? 'success.main' : 'error.main' }}
            />
            <Typography variant="caption" sx={{ color: stat.up ? 'success.main' : 'error.main', fontWeight: 600 }}>
              {stat.change}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              vs last month
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: 48, height: 48, borderRadius: 1.5,
            bgcolor: bgColorMap[color],
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Iconify icon={stat.icon} width={26} sx={{ color: colorMap[color] }} />
        </Box>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function QuickStatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  const theme = useTheme();
  // Use theme.palette (resolved hex values) — theme.vars.palette returns CSS var strings
  // that alpha() cannot process.
  const colorKey = color as keyof typeof theme.palette;
  const resolvedMain: string =
    (theme.palette[colorKey] as { main?: string } | undefined)?.main ??
    theme.palette.primary.main;

  return (
    <Card sx={{ p: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 44, height: 44, borderRadius: 1.5,
            bgcolor: alpha(resolvedMain, 0.12),
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <Iconify icon={icon} width={24} sx={{ color: `${color}.main` }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }}>{value}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{label}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
