import { Header } from '@/components/header';
import { AdminPanel } from '@/components/admin-panel';

export const metadata = {
  title: 'Admin Panel',
  description: 'Manage your website collection.',
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <AdminPanel />
    </>
  );
}
