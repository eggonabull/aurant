import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/server/auth';

export async function GET() {
  try {
    const session = await getServerSession();
    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error getting session:', error);
    return NextResponse.json(
      { error: 'Failed to get session' },
      { status: 500 }
    );
  }
}
