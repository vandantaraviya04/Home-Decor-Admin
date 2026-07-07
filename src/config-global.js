// ----------------------------------------------------------------------

export const CONFIG = {
  site: {
    name: 'Home Decor Admin',
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
    assetURL: process.env.NEXT_PUBLIC_ASSET_URL ?? '',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    version: '1.0.0',
  },
  isStaticExport: false,
  auth: {
    method: 'custom',
    skip: false,
    redirectPath: '/admin/dashboard',
  },
};
