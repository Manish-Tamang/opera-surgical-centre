import { NextResponse } from 'next/server';
import { generateCustomToken } from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
  const { uid, role } = await request.json();

  if (!uid || !role) {
    return NextResponse.json({ error: 'UID and role are required' }, { status: 400 });
  }

  try {
    const token = await generateCustomToken(uid, role);
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating token' }, { status: 500 });
  }
}
