import ConnectDB from "@/lib/db";
import Experience, { IExperience } from "@/lib/models/Experience";

export const getExperience = async (id: string) => {
  await ConnectDB();
  const experience = await Experience.find({ userId: id });
  return experience;
};

export const createExperience = async (
  data: Partial<IExperience>,
  userId: string,
) => {
  await ConnectDB();
  const requiredFields = ["company", "role", "startDate"];

  for (const field of requiredFields) {
    if (!data[field as keyof IExperience]) {
      throw new Error(`${field} is required`);
    }
  }

  if (data.isCurrent) {
    data.endDate = null;
  }
  const existingExperience = await Experience.findOne({
    userId: userId,
    company: data.company,
    role: data.role,
  });
  if (existingExperience) {
    throw new Error("Experience already exists for this user");
  }
  const experience = await Experience.create({ ...data, userId });
  return experience;
};

export const updateExperience = async (
  experienceId: string,
  userId: string,
  data: Partial<IExperience>,
) => {
  await ConnectDB();
  const experience = await Experience.findOneAndUpdate(
    { _id: experienceId, userId: userId },
    { $set: data },
    { new: true, runValidators: true },
  );
  return experience;
};

export const deleteExperience = async (
  experienceId: string,
  userId: string,
) => {
  await ConnectDB();
  const experince = await Experience.findOneAndDelete({
    _id: experienceId,
    userId: userId,
  });
  return experince;
};
