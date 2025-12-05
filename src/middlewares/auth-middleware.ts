import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authMiddleware(req: NextRequest) {
  // replace with __Secure-better-auth.session_token before deployment
  const SESSION_COOKIE_NAME = "better-auth.session_token";

  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  // If no session token → redirect to /auth
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect dashboard and subroutes
    "/products/:path*", // Protect products subroutes
  ],
};
