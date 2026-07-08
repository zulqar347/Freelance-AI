import ConnectDB from "@/lib/db";
import Profile, { IProfile } from "@/lib/models/Profile";

export const getProfile = async (id: string | null | undefined) => {
  await ConnectDB();
  const profile = await Profile.findOne({ userId: id }).populate({
    path: "userId",
  });
  return profile;
};

export const createProfile = async (
  data: Partial<IProfile>,
  userId: string,
) => {
  await ConnectDB();
  const requiredFields = [
    "headline",
    "profession",
    "bio",
    "country",
    "skills",
    "languages",
  ];

  for (const field of requiredFields) {
    if (!data[field as keyof IProfile]) {
      throw new Error(`${field} is required`);
    }
  }

  const profile = await Profile.findOneAndUpdate(
    { userId },
    { ...data },
    { new: true, runValidators: true, upsert: true },
  );
  return profile;
};

export const deleteProfile = async (id: string | null | undefined) => {
  await ConnectDB();
  const profile = await Profile.findOneAndDelete({ userId: id });
  return profile;
};

export const updateProfile = async (id: string, data: Partial<IProfile>) => {
  await ConnectDB();

  const updatedProfile = await Profile.findOneAndUpdate(
    { userId: id },
    { $set: data },
    { new: true, runValidators: true },
  );

  return updatedProfile;
};
