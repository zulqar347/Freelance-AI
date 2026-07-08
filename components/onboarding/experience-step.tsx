"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperienceGenerationSchema } from "@/lib/validators/zodValidations";
import {
  useExperienceList,
  useExperienceCreate,
  useExperienceDelete,
  useExperienceUpdate,
  type ExperienceType,
} from "@/hooks/use-app-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label, Input, Textarea } from "@/components/ui/field";
import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { z } from "zod";

function ExperienceForm({
  onSubmit,
  isLoading,
  editingId,
  onCancel,
  initialData,
}: {
  onSubmit: (data: z.infer<typeof ExperienceGenerationSchema>) => Promise<void>;
  isLoading: boolean;
  editingId: string | null;
  onCancel: () => void;
  initialData?: ExperienceType;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(ExperienceGenerationSchema),
    defaultValues: {
      company: initialData?.company || "",
      role: initialData?.role || "",
      description: initialData?.description || "",
      startDate: initialData?.startDate
        ? new Date(initialData.startDate).toISOString().split("T")[0]
        : "",
      endDate: initialData?.endDate
        ? new Date(initialData.endDate).toISOString().split("T")[0]
        : undefined,
      isCurrent: initialData?.isCurrent ?? false,
    },
  });

  const isCurrent = watch("isCurrent");

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Card className="space-y-4 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              placeholder="e.g., Google"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-sm text-red-400">{errors.company.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="role">Job Title *</Label>
            <Input
              id="role"
              placeholder="e.g., Senior Engineer"
              {...register("role")}
            />
            {errors.role && (
              <p className="text-sm text-red-400">{errors.role.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Your responsibilities and achievements..."
            {...register("description")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="startDate">Start Date *</Label>
            <Input id="startDate" type="date" {...register("startDate")} />
            {errors.startDate && (
              <p className="text-sm text-red-400">{errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="endDate">End Date</Label>
            {!isCurrent && <Input type="date" {...register("endDate")} />}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isCurrent"
            {...register("isCurrent")}
            className="mr-2"
          />
          <Label htmlFor="isCurrent" className="mb-0 cursor-pointer">
            I currently work here
          </Label>
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

export function ExperienceStep({ onNext }: { onNext: () => void }) {
  const { data: experience, isLoading } = useExperienceList();
  const createExp = useExperienceCreate();
  const updateExp = useExperienceUpdate();
  const deleteExp = useExperienceDelete();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<ExperienceType | undefined>();

  const handleSubmit = async (data: any) => {
    try {
      if (editingId) {
        await updateExp.mutateAsync({
          id: editingId,
          data,
        });
        setEditingId(null);
        setEditingData(undefined);
      } else {
        await createExp.mutateAsync(data);
      }
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: ExperienceType) => {
    setEditingId(item._id || item.id || "");
    setEditingData(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience entry?")) {
      await deleteExp.mutateAsync(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setEditingData(undefined);
  };

  if (isLoading) {
    return <p className="text-zinc-400">Loading experience...</p>;
  }

  const hasEntries = experience && experience.length > 0;

  return (
    <div className="space-y-6">
      {hasEntries && (
        <div className="space-y-3">
          {experience.map((item) => (
            <Card key={item._id || item.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.company}</h3>
                  <p className="text-sm text-zinc-400">{item.role}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {new Date(item.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                    {" - "}
                    {item.isCurrent
                      ? "Present"
                      : item.endDate
                        ? new Date(item.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : ""}
                  </p>
                  {item.description && (
                    <p className="mt-2 text-sm text-zinc-300">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-zinc-400 hover:text-cyan-400 transition"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id || item.id || "")}
                    className="p-2 text-zinc-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showForm ? (
        <ExperienceForm
          onSubmit={handleSubmit}
          isLoading={createExp.isPending || updateExp.isPending}
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
          + Add Experience
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
