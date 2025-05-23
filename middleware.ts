import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("Middleware - Token Ditemukan:", token);

  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    console.log("Middleware - Tidak Ada Token, Redirect ke /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token as string, SECRET_KEY) as { role: string };
    console.log("Middleware - Decoded Token:", decoded);

    if (decoded.role !== "admin") {
      console.log("Middleware - Bukan Admin, Redirect ke /dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } catch (error) {
    console.error("JWT Error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};