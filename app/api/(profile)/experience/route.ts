import { auth } from "@/auth";
import { ExperienceGenerationSchema } from "@/lib/validators/zodValidations";
import { createExperience, getExperience } from "@/services/experience.service";
import { NextResponse } from "next/server";

// GET All The Experiences the user have
export const GET = async () => {
  try {
    const session = await auth();
    const id = session?.user?.id;
    if (!id) {
      return NextResponse.json(
        { Unauthorized: "Sign in to use this api" },
        { status: 403 },
      );
    }
    const experience = await getExperience(id);
    return NextResponse.json({ success: true, experience }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        Error:
          error instanceof Error ? error.message : "Error creating Experience",
      },
      { status: 500 },
    );
  }
};

// Add a new Experience
export const POST = async (req: Request) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { unauthorized: "You are not signedIN" },
        { status: 403 },
      );
    }

    const data = ExperienceGenerationSchema.parse(await req.json());
    const experience = await createExperience(data, userId);
    return NextResponse.json({ success: true, experience }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        Error:
          error instanceof Error ? error.message : "Error creating Experience",
      },
      { status: 500 },
    );
  }
};
