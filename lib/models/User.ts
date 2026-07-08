import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional, plan to add OAuth (Google/GitHub) later
  provider: "credentials" | "google";
  image?: string;
  plan: "Free" | "Pro" | "Enterprise";
  credits: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  subscriptionStatus?:
    | "inactive"
    | "active"
    | "trialing"
    | "past_due"
    | "canceled";
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  verified: boolean;
  verificationToken?: string;
  verificationExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String },
    image: { type: String, default: "" },
    plan: {
      type: String,
      enum: ["Free", "Pro", "Enterprise"],
      default: "Free",
    },
    credits: {
      type: Number,
      default: 10,
      min: [0, "Credits cannot be negative"],
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },

    stripeSubscriptionId: {
      type: String,
      default: null,
    },

    stripePriceId: {
      type: String,
      default: null,
    },

    subscriptionStatus: {
      type: String,
      default: "inactive",
    },

    currentPeriodStart: {
      type: Date,
      default: null,
    },

    currentPeriodEnd: {
      type: Date,
      default: null,
    },

    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    verificationExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const User: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
