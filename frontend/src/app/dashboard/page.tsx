'use client';

import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/client/auth';

export default function DashboardPage() {
  const router = useRouter();
  const { session, loading } = useSession();

  // Redirect to login if not authenticated
  if (!loading && !session) {
    router.push('/auth/login');
    return null;
  }

  // Show loading state while fetching session
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
            {session && (
              <div className="mt-6">
                <p className="text-lg font-semibold mb-2">User Information</p>
                <div className="space-y-2">
                  <p>Email: {session.email}</p>
                  <p>Role: {session.role}</p>
                  {session.restaurantId && (
                    <p>Restaurant: {session.restaurantName}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
