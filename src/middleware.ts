// export { default } from "next-auth/middleware"
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        console.log("request", request.nextUrl.pathname)

        if (request.nextUrl.pathname.startsWith("/mixer")
            && request.nextauth.token?.user_type !== "admin"
            && request.nextauth.token?.user_type !== "editor"
        ) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
        if (request.nextUrl.pathname.startsWith("/account")
            && request.nextauth.token?.user_type !== "admin"
            && request.nextauth.token?.user_type !== "editor"
            && request.nextauth.token?.user_type !== "user"
        ) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = { matcher: ["/mixer", "/account"] }