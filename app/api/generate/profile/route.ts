import { auth } from "@/auth";
import ConnectDB from "@/lib/db";
import Generation from "@/lib/models/Generation";
import { ProfileGenerationSchema } from "@/lib/validators/zodValidations";
import { generateProfile } from "@/services/ai.service";
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
          error: "Unauthorized, sign in required",
        },
        {
          status: 401,
        },
      );
    }
    await ConnectDB();
    const { platform, jobDescription } = ProfileGenerationSchema.parse(
      await req.json(),
    );
    const profile = await executeWithCredits(userId, async () => {
      const aiProfile = await fetchAiProfile(userId);
      const generatedProfile = await generateProfile(
        platform,
        aiProfile,
        platform === "resume" && jobDescription?.trim()
          ? jobDescription
          : undefined,
      );
      return Generation.findOneAndUpdate(
        {
          platform,
          type: "profile",
          userId,
        },
        {
          content: generatedProfile,
        },
        {
          new: true,
          upsert: true,
        },
      );
    });

    return NextResponse.json(
      {
        success: true,
        data: profile,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.issues,
        },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      {
        status: 500,
      },
    );
  }
};

export const GET = async () => {
  try {
    await ConnectDB();
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized, sign in required" },
        { status: 401 },
      );
    }
    const generatedProfile = await Generation.find({
      userId,
      type: "profile",
    }).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: generatedProfile },
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
