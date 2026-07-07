import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  dashboard: icon('ic-dashboard'),
  product:   icon('ic-product'),
  order:     icon('ic-order'),
  customer:  icon('ic-user'),
  profile:   icon('ic-user'),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: 'Overview',
    items: [
      { title: 'Dashboard', path: '/admin/dashboard', icon: ICONS.dashboard },
    ],
  },
  {
    subheader: 'Management',
    items: [
      { title: 'Products',  path: '/admin/products',  icon: ICONS.product },
      { title: 'Orders',    path: '/admin/orders',    icon: ICONS.order },
      { title: 'Customers', path: '/admin/customers', icon: ICONS.customer },
    ],
  },
  {
    subheader: 'Account',
    items: [
      { title: 'Edit Profile', path: '/admin/profile', icon: ICONS.profile },
    ],
  },
];
