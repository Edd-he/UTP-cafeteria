import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/admin/:path*', '/shop/:path*'],
}

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const url = req.nextUrl.pathname

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const role = token.user?.rol

  if (url.startsWith('/admin') && role !== 'ADMINISTRADOR') {
    return NextResponse.redirect(new URL('/not-found', req.url))
  }

  if (url.startsWith('/shop') && role !== 'ESTUDIANTE') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}
