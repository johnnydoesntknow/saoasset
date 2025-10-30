// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// Optional: Configure which paths the middleware runs on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}