import { authMiddleware } from "./middlewares/auth-middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // List of protected route prefixes
  const protectedRoutes = ["/dashboard", "/fill-your-information", "/admin"];

  for (const route of protectedRoutes) {
    if (pathname.startsWith(route)) {
      return authMiddleware(req);
    }
  }

  return NextResponse.next();
}
