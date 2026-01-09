import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter for demo purposes
// In production, use Redis (e.g., Upstash) for persistence across lambdas
const rateLimitMap = new Map();

export function middleware(request: NextRequest) {
    const ip = request.ip || '127.0.0.1';
    const limit = 20; // Requests per window
    const windowMs = 60 * 1000; // 1 minute

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, {
            count: 0,
            lastReset: Date.now(),
        });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
        ipData.count = 0;
        ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
        return new NextResponse(null, {
            status: 429,
            statusText: 'Too Many Requests',
            headers: {
                'Retry-After': '60',
                'Content-Type': 'text/plain',
            },
        });
    }

    ipData.count += 1;

    // Security Headers
    const response = NextResponse.next();
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

    return response;
}

export const config = {
    matcher: '/api/:path*',
};
