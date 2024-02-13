import { NextResponse } from 'next/server'

export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    if (pathname === '/') { return NextResponse.redirect(new URL('/dashboard', request.url)) };
    if (pathname === '/targets') {return NextResponse.redirect(new URL('/targets/commission-level', request.url))}
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/targets']
}