import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface UserSession {
  userId: string;
  email: string;
  role: string;
  restaurantId?: string;
  restaurantName?: string;
}

export function createSession(user: UserSession) {
  // Create JWT token
  const token = sign(
    {
      userId: user.userId,
      email: user.email,
      role: user.role,
      restaurantId: user.restaurantId,
      restaurantName: user.restaurantName
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Set session cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 // 24 hours
  });

  return response;
}
