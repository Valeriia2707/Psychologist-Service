import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {

    const session = request.cookies.get('session_token')?.value;

    const isPrivate = request.nextUrl.pathname.startsWith('/favorites');

    if (isPrivate && !session){
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/favorites/:path*']
}