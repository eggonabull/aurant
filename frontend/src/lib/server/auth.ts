import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface UserSession {
  userId: string;
  email: string;
  role: string;
  restaurantId?: string;
  restaurantName?: string;
}

export async function getServerSession(): Promise<UserSession | null> {
  const sessionCookie = (await cookies()).get('session_token');
  if (!sessionCookie) return null;

  try {
    const decoded = verify(sessionCookie.value, JWT_SECRET) as UserSession;
    
    // Fetch fresh user data from database
    const user = await prisma.user.findUnique({
      where: { user_id: decoded.userId },
      select: {
        user_id: true,
        email: true,
        role: true,
        restaurant: {
          select: {
            restaurant_id: true,
            name: true
          }
        }
      }
    });

    if (!user) return null;

    return {
      userId: user.user_id,
      email: user.email,
      role: user.role,
      restaurantId: user.restaurant?.restaurant_id,
      restaurantName: user.restaurant?.name
    };
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
}
