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

  const { pathname } = req.nextUrl

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const role = token.user?.rol

  if (pathname.startsWith('/admin') && role !== 'ADMINISTRADOR') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (pathname.startsWith('/shop') && role !== 'ESTUDIANTE') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}
