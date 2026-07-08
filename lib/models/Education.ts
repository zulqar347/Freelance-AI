import mongoose, { Document, Schema, Model } from "mongoose";

export interface IEducation extends Document {
  userId: mongoose.Types.ObjectId;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date | null;
  isCurrent: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema: Schema<IEducation> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      ref: "User",
      required: [true, "UserId is required"],
    },
    institution: {
      type: String,
      required: [true, "Institution/School name is required"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree (e.g., BS, MS, Certificate) is required"],
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: [
        true,
        "Field of study (e.g., Mathematics, Computer Science) is required",
      ],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      default: null,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Compound Index: Prevents a user from creating the exact same degree at the same school twice.
EducationSchema.index(
  { userId: 1, institution: 1, degree: 1 },
  { unique: true },
);

const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);

export default Education;
