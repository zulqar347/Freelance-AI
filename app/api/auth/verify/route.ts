import { NextResponse } from "next/server";
import { verifyEmailToken } from "@/services/auth.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Missing verification token" },
      { status: 400 },
    );
  }

  const result = await verifyEmailToken(token);

  const redirectUrl = result.success ? "/auth?verified=1" : "/auth?verified=0";

  return NextResponse.redirect(new URL(redirectUrl, req.url));
}
