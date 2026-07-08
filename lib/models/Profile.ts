import mongoose, { Document } from "mongoose";

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  headline: string;
  profession: string;
  bio: string;
  country: string;
  languages: string[];
  experience: string;
  hourlyRate: number;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: mongoose.Schema<IProfile> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      ref: "User",
      required: [true, "UserId is required"],
    },
    headline: {
      type: String,
      required: [true, "Headline is required"],
      trim: true,
    },
    profession: {
      type: String,
      required: [true, "Profession is required"],
      trim: true,
    },
    bio: { type: String, required: [true, "Bio is required"], trim: true },
    experience: { type: String, default: "0 years" },
    country: { type: String, required: [true, "Country is required"] },
    languages: [{ type: String }],
    hourlyRate: {
      type: Number,
      default: 0,
      min: [0, "Hourly Rate Cannot be negative"],
    },
    skills: [{ type: String, required: [true, "Skills are required"] }],
  },
  {
    timestamps: true,
  },
);

const Profile: mongoose.Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;
