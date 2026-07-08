import { auth } from "@/auth";
import { EducationGenerationSchema } from "@/lib/validators/zodValidations";
import { createEducation, getEducation } from "@/services/education.service";
import { NextResponse } from "next/server";
import zod from "zod";

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Sign in to continue" },
        { status: 403 },
      );
    }
    const data = EducationGenerationSchema.parse(await req.json());
    const education = await createEducation(userId, data);
    if (!education) {
      return NextResponse.json(
        { success: false, error: "Error creating education" },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true, education }, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof zod.ZodError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Error creating education",
      },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Sign in to continue" },
        { status: 403 },
      );
    }
    const education = await getEducation(userId);
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
