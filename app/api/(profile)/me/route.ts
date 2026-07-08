import { auth } from "@/auth";
import ConnectDB from "@/lib/db";
import Education from "@/lib/models/Education";
import Experience from "@/lib/models/Experience";
import Profile from "@/lib/models/Profile";
import Project from "@/lib/models/Project";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await ConnectDB();
    const session = await auth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    if (!userId || !userEmail) {
      return NextResponse.json(
        { success: false, error: "Unauthorized, Sigin Required" },
        { status: 401 },
      );
    }
    const [user, profile, experience, projects, education] = await Promise.all([
      User.findOne({ email: userEmail }).select("-password"),
      Profile.findOne({ userId }),
      Experience.find({ userId }),
      Project.find({ userId }),
      Education.find({ userId }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          user,
          profile,
          experience,
          projects,
          education,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Error Getting Profile Data" },
      { status: 500 },
    );
  }
};
