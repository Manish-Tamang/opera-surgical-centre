import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase/auth';
import { app } from '@/firebase/config';

const auth = getAuth(app);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('userAuthToken');

  if (!token) {
    return NextResponse.redirect(new URL('/signIn', request.url));
  }

  try {
    await auth.verifyIdToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/signIn', request.url));
  }
}

export const config = {
  matcher: '/patientRegister/:path*',
};