import { auth } from "@/auth";
import { UserProfileSchema } from "@/lib/validators/zodValidations";
import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
} from "@/services/profile.service";
import { NextResponse } from "next/server";

// GET PROFILE USING getProfile method
export const GET = async () => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const profile = await getProfile(session.user.id);

    return NextResponse.json({ profile, success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Error fetching Profile",
      },
      { status: 500 },
    );
  }
};

// CREATE PROFILE USING createProfile method
export const POST = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = UserProfileSchema.parse(await req.json());
    const profile = await createProfile(data, session?.user?.id);
    return NextResponse.json({ profile }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Error creating Profile",
      },
      { status: 500 },
    );
  }
};

// UPDATE PROFILE USING updateProfile method
export const PATCH = async (req: Request) => {
  try {
    const data = UserProfileSchema.parse(await req.json());
    const session = await auth();
    const id = session?.user?.id;
    if (!id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const profile = await updateProfile(id, data);
    return NextResponse.json({ profile, success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        Error:
          error instanceof Error ? error.message : "Error updating Profile",
      },
      { status: 500 },
    );
  }
};

// DELETE PROFILE USING deleteProfile method
export const DELETE = async () => {
  try {
    const session = await auth();

    const id = session?.user?.id;

    if (!id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await deleteProfile(id);

    if (!profile) {
      return NextResponse.json({ Error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile deleted successfully", profile },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        Error:
          error instanceof Error ? error.message : "Error deleting profile",
      },
      { status: 500 },
    );
  }
};
