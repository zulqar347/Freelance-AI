import { NextResponse } from "next/server";
import ConnectDB from "@/lib/db";
import User from "@/lib/models/User";
import { createUser } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const { name, email, password } = await req.json();

    const normalizedEmail = String(email).toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const createdUser = await createUser(name, normalizedEmail, password);

    if (createdUser === "User Already Exists") {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message:
          "User created successfully. Please verify your email before signing in.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
