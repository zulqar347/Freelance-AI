import { auth } from "@/auth";
import ConnectDB from "@/lib/db";
import Project from "@/lib/models/Project";
import { ProjectPatchSchema } from "@/lib/validators/zodValidations";
import { getProjectById, updateProject } from "@/services/project.services";
import { NextResponse } from "next/server";
import zod from "zod";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Sign in required." },
        { status: 401 },
      );
    }
    const { id } = await params;
    const projectId = id;
    const project = await getProjectById(projectId, session?.user?.id);
    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, project });
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

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Sign in required." },
        { status: 401 },
      );
    }
    const { id } = await params;
    const projectId = id;
    await ConnectDB();
    const deletedProject = await Project.findOneAndDelete({
      _id: projectId,
      userId: session?.user?.id,
    });
    if (!deletedProject) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
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

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Sign in required." },
        { status: 401 },
      );
    }
    const { id } = await params;
    const projectId = id;
    const projectData = ProjectPatchSchema.parse(await req.json());
    const updatedProject = await updateProject(
      projectId,
      session?.user?.id,
      projectData,
    );
    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error(error);
    if (error instanceof zod.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.message,
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
