export const PLANS = {
  FREE: {
    name: "Free",
    credits: 10,
    price: 0,
  },

  PRO: {
    name: "Pro",
    credits: 100,
    price: 8.99,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
  },

  ENTERPRISE: {
    name: "Enterprise",
    credits: 300,
    price: 18.99,
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
  },
} as const;

export type PlanName = keyof typeof PLANS;
