import ConnectDB from "@/lib/db";
import Education, { IEducation } from "@/lib/models/Education";

export const createEducation = async (
  userId: string,
  data: Partial<IEducation>,
) => {
  await ConnectDB();
  const previousEducation = await Education.findOne({
    userId: userId,
    institution: data.institution,
    degree: data.degree,
    fieldOfStudy: data.fieldOfStudy,
  });
  if (previousEducation) {
    throw new Error("Education already exists");
  }
  const education = await Education.create({
    userId: userId,
    ...data,
  });
  if (!education) {
    throw new Error("Error creating education");
  }
  return education;
};

export const getEducation = async (userId: string) => {
  await ConnectDB();
  const education = await Education.find({ userId: userId });
  if (!education) {
    throw new Error("Error fetching education");
  }
  return education;
};

export const deleteEducation = async (userId: string, educationId: string) => {
  await ConnectDB();
  const education = await Education.findOneAndDelete({
    _id: educationId,
    userId: userId,
  });
  return education;
};

export const updateEducation = async (
  userId: string,
  educationId: string,
  data: Partial<IEducation>,
) => {
  await ConnectDB();
  const education = await Education.findOneAndUpdate(
    { _id: educationId, userId: userId },
    { ...data },
    { new: true },
  );
  if (!education) {
    throw new Error("Error updating education");
  }
  return education;
};

export const getEducationById = async (userId: string, educationId: string) => {
  await ConnectDB();
  const education = await Education.findOne({
    _id: educationId,
    userId: userId,
  });
  if (!education) {
    throw new Error("Education not found");
  }
  return education;
};
