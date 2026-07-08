import mongoose, { Document } from "mongoose";

export interface IExperience extends Document {
  userId: mongoose.Types.ObjectId;
  company: string;
  role: string;
  description?: string;
  startDate: Date;
  endDate?: Date | null; // Can be null if it's the user's current role
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: mongoose.Schema<IExperience> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: [true, "UserId is required"],
    },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: [true, "Role Is Required"], trim: true },
    description: { type: String, trim: true, default: "" },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      // Custom validation logic to ensure sequential dates
      validate: {
        validator: function (this: IExperience, value: Date) {
          if (this.isCurrent) return true; // Skip validation if still working there
          return !value || value >= this.startDate;
        },
        message: "End date must be after the start date.",
      },
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Experience: mongoose.Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;
