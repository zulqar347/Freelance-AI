import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import ConnectDB from "@/lib/db";
import User from "@/lib/models/User";
import { PLANS } from "@/lib/payments/plans";
import { stripe } from "@/lib/payments/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { message: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  await ConnectDB();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const checkout = event.data.object as Stripe.Checkout.Session;

        const userId = checkout.metadata?.userId;

        const plan = checkout.metadata?.plan;

        if (!userId || !plan) break;

        const subscriptionId = checkout.subscription as string;

        const customerId = checkout.customer as string;

        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);

        const currentPeriodStart = new Date(
          subscription.items.data[0].current_period_start * 1000,
        );

        const currentPeriodEnd = new Date(
          subscription.items.data[0].current_period_end * 1000,
        );

        const credits =
          plan === "Pro" ? PLANS.PRO.credits : PLANS.ENTERPRISE.credits;

        await User.findByIdAndUpdate(userId, {
          plan,

          credits,

          stripeCustomerId: customerId,

          stripeSubscriptionId: subscriptionId,

          stripePriceId: subscription.items.data[0].price.id,

          subscriptionStatus: subscription.status,

          currentPeriodStart,

          currentPeriodEnd,

          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        });

        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        const customerId = subscription.customer as string;

        const priceId = subscription.items.data[0].price.id;

        let plan: "Pro" | "Enterprise" = "Pro";
        let credits: number = PLANS.PRO.credits;

        if (priceId === PLANS.ENTERPRISE.stripePriceId) {
          plan = "Enterprise";
          credits = PLANS.ENTERPRISE.credits;
        }

        await User.findOneAndUpdate(
          {
            stripeCustomerId: customerId,
          },
          {
            plan,
            credits,

            stripePriceId: priceId,

            stripeSubscriptionId: subscription.id,

            subscriptionStatus: subscription.status,

            currentPeriodStart: new Date(
              subscription.items.data[0].current_period_start * 1000,
            ),

            currentPeriodEnd: new Date(
              subscription.items.data[0].current_period_end * 1000,
            ),

            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        );

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await User.findOneAndUpdate(
          {
            stripeCustomerId: subscription.customer as string,
          },
          {
            plan: "Free",

            credits: PLANS.FREE.credits,

            stripeSubscriptionId: null,

            stripePriceId: null,

            subscriptionStatus: "inactive",

            currentPeriodStart: null,

            currentPeriodEnd: null,

            cancelAtPeriodEnd: false,
          },
        );

        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;

        if (!invoice.customer) break;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer.id;

        const user = await User.findOne({
          stripeCustomerId: customerId,
        });

        if (!user) break;

        let credits = PLANS.FREE.credits;

        if (user.plan === "Pro") {
          credits = PLANS.PRO.credits;
        }

        if (user.plan === "Enterprise") {
          credits = PLANS.ENTERPRISE.credits;
        }

        user.credits = credits;

        await user.save();

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice?.customer?.id;

        await User.findOneAndUpdate(
          {
            stripeCustomerId: customerId,
          },
          {
            subscriptionStatus: "past_due",
          },
        );

        break;
      }

      default:
        console.log(`Unhandled Event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Webhook failed.",
      },
      {
        status: 500,
      },
    );
  }
}
