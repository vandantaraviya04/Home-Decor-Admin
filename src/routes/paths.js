// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  ADMIN: '/admin',
};

// ----------------------------------------------------------------------

export const paths = {
  // Auth
  auth: {
    login: `${ROOTS.AUTH}/login`,
    signIn: `${ROOTS.AUTH}/login`,
    jwt: {
      signIn: `${ROOTS.AUTH}/login`,
      signUp: `${ROOTS.AUTH}/login`,
    },
  },
  // Admin
  admin: {
    root: `${ROOTS.ADMIN}/dashboard`,
    dashboard: `${ROOTS.ADMIN}/dashboard`,
    products: {
      root: `${ROOTS.ADMIN}/products`,
      new: `${ROOTS.ADMIN}/products/new`,
      edit: (id) => `${ROOTS.ADMIN}/products/${id}/edit`,
    },
    orders: {
      root: `${ROOTS.ADMIN}/orders`,
      view: (id) => `${ROOTS.ADMIN}/orders/${id}`,
      new: `${ROOTS.ADMIN}/orders/new`,
      edit: (id) => `${ROOTS.ADMIN}/orders/${id}/edit`,
    },
    customers: {
      root: `${ROOTS.ADMIN}/customers`,
      view: (id) => `${ROOTS.ADMIN}/customers/${id}`,
      new: `${ROOTS.ADMIN}/customers/new`,
      edit: (id) => `${ROOTS.ADMIN}/customers/${id}/edit`,
    },
    profile: `${ROOTS.ADMIN}/profile`,
  },
  // Dashboard alias (for Minimal UI compatibility)
  dashboard: {
    root: `${ROOTS.ADMIN}/dashboard`,
    user: {
      root: `${ROOTS.ADMIN}/profile`,
      account: `${ROOTS.ADMIN}/profile`,
    },
  },
  // Error pages
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
};
