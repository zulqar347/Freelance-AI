import ConnectDB from "@/lib/db";
import Project, { IProject } from "@/lib/models/Project";

export const getProject = async (userId: string) => {
  await ConnectDB();
  const projects = await Project.find({ userId: userId });
  return projects;
};

export const createProject = async (
  data: Partial<IProject>,
  userId: string,
) => {
  await ConnectDB();
  if (!data.title) {
    throw new Error("Title is required");
  }

  if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
    throw new Error("Technologies are required");
  }

  const existingProject = await Project.findOne({
    userId,
    title: { $regex: new RegExp(`^${data.title.trim()}$`, "i") }, // Case-insensitive exact match
  });

  if (existingProject) {
    throw new Error("A project with this title already exists.");
  }

  const project = await Project.create({
    ...data,
    title: data.title.trim(),
    userId,
  });
  return project;
};

export const getProjectById = async (projectId: string, userId: string) => {
  await ConnectDB();
  const project = await Project.findOne({ _id: projectId, userId });
  return project;
};

export const updateProject = async (
  projectId: string,
  userId: string,
  data: Partial<IProject>,
) => {
  await ConnectDB();
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId },
    { $set: data },
    { new: true },
  );
  if (!project) {
    throw new Error(
      "Project not found or you do not have permission to update it.",
    );
  }
  return project;
};
