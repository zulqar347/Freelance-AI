import mongoose from "mongoose";

export interface IPortfolioPage extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  slug: string;
  template: "professional" | "developer" | "premium";
  title: string;
  isPublished: boolean;
  content: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const PortfolioPageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      default: "",
    },

    template: {
      type: String,
      enum: ["professional", "developer", "premium"],
      default: "professional",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PortfolioPage =
  mongoose.models.PortfolioPage ||
  mongoose.model("PortfolioPage", PortfolioPageSchema);

export default PortfolioPage;
