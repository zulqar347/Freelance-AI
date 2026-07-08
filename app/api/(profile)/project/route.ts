import { auth } from "@/auth";
import { ProjectGenerationSchema } from "@/lib/validators/zodValidations";
import { createProject, getProject } from "@/services/project.services";
import { NextResponse } from "next/server";
import zod from "zod";

export const GET = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Sign in required." },
        { status: 401 },
      );
    }
    const projects = await getProject(userId);
    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { Error: "Unauthorized. Sign in required." },
        { status: 401 },
      );
    }
    const data = ProjectGenerationSchema.parse(await req.json());
    const project = await createProject(data, userId);
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("API Route operational failure:", error);

    // 1. Handle Input Validation Failures (User Error)
    if (error instanceof zod.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed across incoming parameters.",
          errors: error.message,
        },
        { status: 400 },
      );
    }

    // 2. Handle Generic, Runtime, or Database Failures (Server Error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected server error occurred.",
      },
      { status: 500 },
    );
  }
};
