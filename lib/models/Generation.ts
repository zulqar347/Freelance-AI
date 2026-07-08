import mongoose, { Document } from "mongoose";

export interface IGeneration extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  platform: string;
  jobDescription?: string;
  content: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const GenerationSchema = new mongoose.Schema<IGeneration>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    type: {
      type: String,
      trim: true,
      required: [true, "Generation type is required"],
    },
    platform: {
      type: String,
      required: [true, "Platform is required"],
      trim: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "AI response payload is required"],
      default: {},
    },
    jobDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Generation: mongoose.Model<IGeneration> =
  mongoose.models.Generation ||
  mongoose.model<IGeneration>("Generation", GenerationSchema);

export default Generation;
