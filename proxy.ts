import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {});

export const config = {
  matcher: ["/dashboard/:path*"],
};
