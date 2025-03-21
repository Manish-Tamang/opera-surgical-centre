import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyIdToken } from '@/lib/firebaseAdmin'; 

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('userAuthToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const decodedToken = await verifyIdToken(token);
    if (decodedToken.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/protected/:path*'],
};
