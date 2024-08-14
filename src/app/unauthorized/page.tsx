import { AuthLayout } from '@/components/AuthLayout';

export default function Unauthorized() {
  return (
    <AuthLayout title="Unauthorized">
      <h1 className="text-2xl font-semibold">Access Denied</h1>
      <p>You do not have permission to access this page.</p>
    </AuthLayout>
  );
}
