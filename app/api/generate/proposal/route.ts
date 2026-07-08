import { auth } from "@/auth";
import ConnectDB from "@/lib/db";
import Generation from "@/lib/models/Generation";
import { ProposalGenerationSchema } from "@/lib/validators/zodValidations";
import { generateProposal } from "@/services/ai.service";
import { executeWithCredits } from "@/services/credits.service";
import { fetchAiProfile } from "@/services/fetchAiProfile.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized, sign in to contiue",
        },
        { status: 401 },
      );
    }
    await ConnectDB();
    const { jobDescription } = ProposalGenerationSchema.parse(await req.json());
    const proposal = await executeWithCredits(userId, async () => {
      const aiProfile = await fetchAiProfile(userId);
      const generatedProposal = await generateProposal(
        aiProfile,
        jobDescription,
      );
      return await Generation.create({
        userId,
        type: "proposal",
        platform: "upwork",
        jobDescription,
        content: generatedProposal as object,
      });
    });

    return NextResponse.json(
      { success: true, data: proposal },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues },
        { status: 400 },
      );
    }
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      },
    );
  }
};

export const GET = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized, sign in to contiue",
        },
        { status: 401 },
      );
    }
    await ConnectDB();

    const proposals = await Generation.find({
      userId,
      type: "proposal",
    }).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: proposals },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      },
    );
  }
};
