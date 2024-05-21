import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authConfig from '@/utils/auth';


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get(authConfig.storageTokenKeyName);
    console.log('token');
    if (!token) {
        return NextResponse.rewrite(new URL('/singnup', request.url))
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '*'
}