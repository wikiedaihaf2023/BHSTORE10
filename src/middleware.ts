import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(`[MIDDLEWARE] ${request.method} ${pathname}`);

    // Check if it's an admin API route
    if (pathname.startsWith("/api/admin")) {
        console.log(`[MIDDLEWARE] Admin API Route Hit: ${pathname}`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*", "/admin/:path*"],
};
