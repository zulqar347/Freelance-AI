import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  plan: "Free" | "Starter" | "Pro";
  status: "active" | "expired" | "canceled";

  credits: number;

  stripeCustomerId?: string;
  stripeSubscriptionId?: string;

  expiresAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    plan: {
      type: String,
      enum: ["Free", "Starter", "Pro"],
      default: "Free",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
      required: true,
    },

    credits: {
      type: Number,
      default: 5,
      min: 0,
      required: true,
    },

    stripeCustomerId: {
      type: String,
    },

    stripeSubscriptionId: {
      type: String,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

export default Subscription;
