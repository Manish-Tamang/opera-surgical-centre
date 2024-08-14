import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyIdToken } from '@/lib/firebaseAdmin'
import { parseCookies } from 'nookies'

export async function middleware(request: NextRequest) {
  const cookies = parseCookies({ req: request })
  const token = cookies.authToken || ''
  const role = cookies.role

  try {
    await verifyIdToken(token)

    if (role === 'admin') {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  } catch (error) {
    console.error('Error verifying token:', error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: '/admin/:path*',
}
