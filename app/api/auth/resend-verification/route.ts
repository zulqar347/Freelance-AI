import { NextResponse } from "next/server";
import { resendVerificationEmail } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const result = await resendVerificationEmail(email);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to resend verification email" },
      { status: 500 },
    );
  }
}
