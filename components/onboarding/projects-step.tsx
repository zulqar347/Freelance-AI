"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectGenerationSchema } from "@/lib/validators/zodValidations";
import {
  useProjectsList,
  useProjectCreate,
  useProjectDelete,
  useProjectUpdate,
  type ProjectType,
} from "@/hooks/use-app-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label, Input, Textarea } from "@/components/ui/field";
import { useState } from "react";
import { Trash2, Edit2, ExternalLink } from "lucide-react";

function ProjectForm({
  onSubmit,
  isLoading,
  editingId,
  onCancel,
  initialData,
}: {
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  editingId: string | null;
  onCancel: () => void;
  initialData?: ProjectType;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(ProjectGenerationSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      technologies: initialData?.technologies?.join(", ") || "",
      liveUrl: initialData?.liveUrl || "",
      githubUrl: initialData?.githubUrl || "",
    },
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const onFormSubmit = handleSubmit((data) => {
    // Convert technologies string to array
    const techs = data.technologies
      .split(",")
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0);

    onSubmit({
      ...data,
      technologies: techs,
    });
  });

  return (
    <Card className="space-y-4 p-4">
      <form onSubmit={onFormSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Project Title *</Label>
          <Input
            id="title"
            placeholder="e.g., E-Commerce Platform"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="What does this project do?"
            {...register("description")}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="technologies">Technologies (comma-separated) *</Label>
          <Input
            id="technologies"
            placeholder="e.g., React, Node.js, MongoDB"
            {...register("technologies")}
          />
          {errors.technologies && (
            <p className="text-sm text-red-400">
              {errors.technologies.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              type="url"
              placeholder="https://example.com"
              {...register("liveUrl")}
            />
            {errors.liveUrl && (
              <p className="text-sm text-red-400">{errors.liveUrl.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              type="url"
              placeholder="https://github.com/user/repo"
              {...register("githubUrl")}
            />
            {errors.githubUrl && (
              <p className="text-sm text-red-400">{errors.githubUrl.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Saving..." : editingId ? "Update" : "Add"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function ProjectsStep({ onNext }: { onNext: () => void }) {
  const { data: projects, isLoading } = useProjectsList();
  const createProj = useProjectCreate();
  const updateProj = useProjectUpdate();
  const deleteProj = useProjectDelete();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<ProjectType | undefined>();

  const handleSubmit = async (data: any) => {
    try {
      if (editingId) {
        await updateProj.mutateAsync({
          id: editingId,
          data,
        });
        setEditingId(null);
        setEditingData(undefined);
      } else {
        await createProj.mutateAsync(data);
      }
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: ProjectType) => {
    setEditingId(item._id || item.id || "");
    setEditingData(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProj.mutateAsync(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setEditingData(undefined);
  };

  if (isLoading) {
    return <p className="text-zinc-400">Loading projects...</p>;
  }

  const hasEntries = projects && projects.length > 0;

  return (
    <div className="space-y-6">
      {hasEntries && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((item) => (
            <Card key={item._id || item.id} className="flex flex-col p-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white flex-1">
                    {item.title}
                  </h3>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 text-zinc-400 hover:text-cyan-400 transition"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id || "")}
                      className="p-1.5 text-zinc-400 hover:text-red-400 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {item.description && (
                  <p className="text-sm text-zinc-300 mb-3">
                    {item.description}
                  </p>
                )}

                {item.technologies && item.technologies.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Live
                  </a>
                )}
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition"
                  >
                    <ExternalLink className="h-3 w-3" />
                    GitHub
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {showForm ? (
        <ProjectForm
          onSubmit={handleSubmit}
          isLoading={createProj.isPending || updateProj.isPending}
          editingId={editingId}
          onCancel={handleCancel}
          initialData={editingData}
        />
      ) : (
        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowForm(true)}
        >
          + Add Project
        </Button>
      )}

      <div className="flex justify-end pt-4">
        <Button type="button" onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
