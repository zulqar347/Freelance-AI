import { auth } from "@/auth";
import ConnectDB from "@/lib/db";
import Generation from "@/lib/models/Generation";
import { ProposalGenerationSchema } from "@/lib/validators/zodValidations";
import { generateCoverLetter } from "@/services/ai.service";
import { executeWithCredits } from "@/services/credits.service";
import { fetchAiProfile } from "@/services/fetchAiProfile.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized, sign in to contiue",
      });
    }

    await ConnectDB();
    const { jobDescription } = ProposalGenerationSchema.parse(await req.json());
    const coverLetter = await executeWithCredits(userId, async () => {
      const aiProfile = await fetchAiProfile(userId);
      const generatedcover = await generateCoverLetter(
        aiProfile,
        jobDescription,
      );
      return Generation.create({
        userId,
        type: "cover-letter",
        platform: "upwork",
        jobDescription,
        content: generatedcover as object,
      });
    });
    return NextResponse.json(
      { success: true, data: coverLetter },
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
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    await ConnectDB();
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized, sign in to contiue",
      });
    }
    const coverLetters = await Generation.find({
      userId,
      type: "cover-letter",
    }).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: coverLetters },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
};
