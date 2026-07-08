import { NextResponse } from "next/server";

import { auth } from "@/auth";

import ConnectDB from "@/lib/db";

import User from "@/lib/models/User";

import { stripe } from "@/lib/payments/stripe";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  await ConnectDB();

  const user = await User.findById(session.user.id);

  if (!user) {
    return NextResponse.json(
      {
        message: "User not found.",
      },
      {
        status: 404,
      },
    );
  }

  if (!user.stripeCustomerId) {
    return NextResponse.json(
      {
        message: "No Stripe customer exists.",
      },
      {
        status: 400,
      },
    );
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,

    return_url: `${process.env.NEXTAUTH_URL}/billing`,
  });

  return NextResponse.json({
    data: {
      url: portal.url,
    },
  });
}
