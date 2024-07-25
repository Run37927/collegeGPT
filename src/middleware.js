import { NextResponse } from "next/server";
import { rateLimiter } from "./lib/rate-limiter"

export async function middleware(req, context) {
    const ip = req.ip ?? '127.0.0.1'
    console.log('Middleware called for IP:', ip);

    try {
        const { success, pending, limit, remaining, reset } = await rateLimiter.limit(ip);
        context.waitUntil(pending);

        console.log('Rate limit result:', { success, limit, remaining, reset });

        if (!success) {
            console.log('Rate limit exceeded');
            return new NextResponse('You are writing messages too fast', { status: 429 });
        }

        const res = NextResponse.next();

        res.headers.set("X-RateLimit-Limit", limit.toString());
        res.headers.set("X-RateLimit-Remaining", remaining.toString());
        res.headers.set("X-RateLimit-Reset", reset.toString());

        return res;
    } catch (error) {
        console.error('Rate limiting error:', error);
        return new NextResponse('Sorry, something went wrong processing your message. Please try again later.', { status: 500 });
    }
}

export const config = {
    matcher: '/api/message',
}
