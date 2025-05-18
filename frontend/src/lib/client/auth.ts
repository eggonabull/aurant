'use client';

import { useState, useEffect } from 'react';

export interface UserSession {
  userId: string;
  email: string;
  role: string;
  restaurantId?: string;
  restaurantName?: string;
}

export const useSession = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setSession(data.session);
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  return { session, loading };
};
