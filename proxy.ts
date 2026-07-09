import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth", req.nextUrl));
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/billing/:path*",
    "/settings/:path*",
    "/career-profile/:path*",
    "/onboarding/:path*",
    "/portfolio/:path*",
    "/cover-letter-generator/:path*",
    "/profile-generator/:path*",
    "/proposal-generator/:path*",
    "/resume-generator/:path*",
  ],
};
