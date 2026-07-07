import type { Metadata } from 'next';

import ProfileView from 'src/sections/profile/view';

export const metadata: Metadata = { title: 'Edit Profile | Home Decor Admin' };

export default function ProfilePage() {
  return <ProfileView />;
}
