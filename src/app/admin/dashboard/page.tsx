import type { Metadata } from 'next';

import DashboardView from 'src/sections/dashboard/view';

export const metadata: Metadata = { title: 'Dashboard | Home Decor Admin' };

export default function DashboardPage() {
  return <DashboardView />;
}
