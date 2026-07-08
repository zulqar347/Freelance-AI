import { NextResponse } from "next/server";
import { auth } from "@/auth";
import ConnectDB from "@/lib/db";
import User from "@/lib/models/User";
import { stripe } from "@/lib/payments/stripe";
import { PLANS } from "@/lib/payments/plans";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();

    if (plan !== "Pro" && plan !== "Enterprise") {
      return NextResponse.json({ message: "Invalid plan." }, { status: 400 });
    }

    await ConnectDB();

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const priceId =
      plan === "Pro" ? PLANS.PRO.stripePriceId : PLANS.ENTERPRISE.stripePriceId;

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      });

      customerId = customer.id;

      user.stripeCustomerId = customer.id;

      await user.save();
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",

      customer: customerId,

      payment_method_types: ["card"],

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      success_url:
        `${process.env.NEXTAUTH_URL}/billing/success` +
        "?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: `${process.env.NEXTAUTH_URL}/billing`,

      metadata: {
        userId: user._id.toString(),
        plan,
      },
    });

    return NextResponse.json({
      data: {
        url: checkoutSession.url,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to create checkout session.",
      },
      {
        status: 500,
      },
    );
  }
}
