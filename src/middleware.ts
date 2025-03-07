import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/sign-in' || path === '/sign-up' || path === '/'
    const token = request.cookies.get("token")?.value || request.cookies.get("next-auth.session-token")?.value

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/home',
    ]
}