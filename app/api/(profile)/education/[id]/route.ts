import { auth } from "@/auth";
import { EducationPatchSchema } from "@/lib/validators/zodValidations";
import {
  deleteEducation,
  getEducationById,
  updateEducation,
} from "@/services/education.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Sign in to continue" },
        { status: 403 },
      );
    }
    const data = EducationPatchSchema.parse(await req.json());
    const { id } = await params;
    const educationId = id;
    const education = await updateEducation(userId, educationId, data);
    if (!education) {
      return NextResponse.json(
        { success: false, error: "Error updating education" },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true, education }, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Error updating education",
      },
      { status: 500 },
    );
  }
};

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Sign in to continue" },
        { status: 403 },
      );
    }
    const { id } = await params;
    const educationId = id;
    const education = await getEducationById(userId, educationId);
    if (!education) {
      return NextResponse.json(
        { success: false, error: "Error fetching education" },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true, education }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Error fetching education",
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Sign in to continue" },
        { status: 403 },
      );
    }
    const { id } = await params;
    const educationId = id;
    const deletedEducation = await deleteEducation(userId, educationId);

    // Implement delete logic here
    return NextResponse.json(
      { success: true, deleted: deletedEducation },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Error deleting education",
      },
      { status: 500 },
    );
  }
};
