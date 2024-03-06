import { NextResponse } from 'next/server'
import { encryptToken } from './utils/cryptoJs';
import { headers } from 'next/headers';

export async function middleware(request) {
    //get user device ip.
    const header = headers()
    const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

    const pathname = request.nextUrl.pathname;

    const response = NextResponse.next();
    
    // TODO: Make a function the get the token from redirected link from IC Employees portal.
    // TODO: Make a custom page that show unauthorized if no at.
    
    if(!request.cookies.get('at')) {
        const ciphertext = await encryptToken(process.env.TOKEN, ip);
        response.cookies.set('at', ciphertext);
        return response;
    }       

    if (pathname === '/') { return NextResponse.redirect(new URL('/dashboard', request.url)) };
    if (pathname === '/targets') { return NextResponse.redirect(new URL('/targets/commission-level', request.url)) }
}

export const config = {
    matcher: ['/', '/dashboard', '/targets']
}