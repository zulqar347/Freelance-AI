import { auth } from "@/auth";
import ConnectDB from "@/lib/db";
import LandingPage from "@/lib/models/PortfolioPage";
import User from "@/lib/models/User";

import { generateLandingPage } from "@/services/ai.service";
import { executeWithCredits } from "@/services/credits.service";
import { fetchAiProfile } from "@/services/fetchAiProfile.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ success: true, data: null }, { status: 200 });
    }

    await ConnectDB();
    const page = await LandingPage.findOne({ userId }).lean();

    return NextResponse.json(
      {
        success: true,
        data: page
          ? {
              slug: page.slug,
              template: page.template,
              url: `/lp/${page.slug}`,
              content: page.content as Record<string, unknown>,
            }
          : null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Unable to load landing page" },
      { status: 500 },
    );
  }
}

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
    const data = await req.json();
    const { template } = data;
    const plan = await User.findById(userId).select("plan");
    if (plan?.plan === "Free") {
      return NextResponse.json(
        { success: false, error: "Upgrade to Pro to create a landing page" },
        { status: 403 },
      );
    }
    const landingPage = await executeWithCredits(userId, async () => {
      const aiProfile = await fetchAiProfile(userId);
      const generatedcover = await generateLandingPage(aiProfile);
      const slug =
        session?.user?.name?.toLowerCase().replace(/\s+/g, "-") ||
        "landing-page";

      return LandingPage.findOneAndUpdate(
        { userId },
        {
          userId,
          slug,
          template: template,
          isPublished: true,
          content: generatedcover as object,
        },
        {
          // new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    });
    return NextResponse.json(
      {
        success: true,
        data: landingPage
          ? {
              slug: landingPage.slug,
              template: landingPage.template,
              url: `/lp/${landingPage.slug}`,
              content: landingPage.content as Record<string, unknown>,
            }
          : null,
      },
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
