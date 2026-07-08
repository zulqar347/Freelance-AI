import { auth } from "@/auth";
import ConnectDB from "@/lib/db";
import Experience from "@/lib/models/Experience";
import { ExperiencePatchSchema } from "@/lib/validators/zodValidations";
import {
  deleteExperience,
  updateExperience,
} from "@/services/experience.service";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Get the Experience with specific id
export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const experienceId = id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid experience ID" },
        { status: 400 },
      );
    }
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { Unauthorized: "Sign in to continue" },
        { status: 403 },
      );
    }
    await ConnectDB();
    const experience = await Experience.findOne({
      _id: experienceId,
      userId: userId,
    });
    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, experience }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        Error:
          error instanceof Error ? error.message : "Error updating experience",
      },
      { status: 500 },
    );
  }
};

// UPdate the existing experience
export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { unauthorized: "Sign in to update experince" },
        { status: 403 },
      );
    }
    const { id } = await params;
    const experienceId = id;
    const data = ExperiencePatchSchema.parse(await req.json());
    const experience = await updateExperience(experienceId, userId, data);
    return NextResponse.json({ success: true, experience }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        Error:
          error instanceof Error ? error.message : "Error updating experience",
      },
      { status: 500 },
    );
  }
};

// Delete the existing experince
export const DELETE = async (
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { Unauthorized: "Sign in to delete experience" },
        { status: 403 },
      );
    }
    const { id } = await params;
    const experienceId = id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid experience ID" },
        { status: 400 },
      );
    }

    const deletedExperience = await deleteExperience(experienceId, userId);
    return NextResponse.json(
      { success: true, deletedExperience },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error deleting experience",
      },
      { status: 500 },
    );
  }
};
