'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifySession, UserSession } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    verifySession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        setSession(session);
      }
    });
  }, [router]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
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
          </div>
        </div>
      </main>
    </div>
  );
}
