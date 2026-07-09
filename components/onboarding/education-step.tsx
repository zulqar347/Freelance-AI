"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationGenerationSchema } from "@/lib/validators/zodValidations";
import {
  useEducation,
  useEducationCreate,
  useEducationDelete,
  useEducationUpdate,
  type EducationType,
} from "@/hooks/use-app-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label, Input, Textarea } from "@/components/ui/field";
import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";

function EducationForm({
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
  initialData?: EducationType;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(EducationGenerationSchema),
    defaultValues: {
      institution: initialData?.institution || "",
      degree: initialData?.degree || "",
      fieldOfStudy: initialData?.fieldOfStudy || "",
      startDate: initialData?.startDate
        ? new Date(initialData.startDate).toISOString().split("T")[0]
        : "",
      endDate: initialData?.endDate
        ? new Date(initialData.endDate).toISOString().split("T")[0]
        : undefined,
      isCurrent: initialData?.isCurrent ?? false,
      description: initialData?.description || "",
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
            <Label htmlFor="institution">School/Institution *</Label>
            <Input
              id="institution"
              placeholder="e.g., MIT"
              {...register("institution")}
            />
            {errors.institution && (
              <p className="text-sm text-red-400">
                {errors.institution.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="degree">Degree *</Label>
            <Input
              id="degree"
              placeholder="e.g., Bachelor's"
              {...register("degree")}
            />
            {errors.degree && (
              <p className="text-sm text-red-400">{errors.degree.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="fieldOfStudy">Field of Study *</Label>
          <Input
            id="fieldOfStudy"
            placeholder="e.g., Computer Science"
            {...register("fieldOfStudy")}
          />
          {errors.fieldOfStudy && (
            <p className="text-sm text-red-400">
              {errors.fieldOfStudy.message}
            </p>
          )}
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
            <Input
              id="endDate"
              type="date"
              disabled={isCurrent}
              {...register("endDate")}
            />
            {errors.endDate && (
              <p className="text-sm text-red-400">{errors.endDate.message}</p>
            )}
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
            Currently studying here
          </Label>
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Achievements, relevant coursework, etc."
            {...register("description")}
          />
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

export function EducationStep({ onNext }: { onNext: () => void }) {
  const { data: education, isLoading } = useEducation();
  const createEdu = useEducationCreate();
  const updateEdu = useEducationUpdate();
  const deleteEdu = useEducationDelete();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<EducationType | undefined>();

  const handleSubmit = async (data: any) => {
    try {
      if (editingId) {
        await updateEdu.mutateAsync({
          id: editingId,
          data,
        });
        setEditingId(null);
        setEditingData(undefined);
      } else {
        await createEdu.mutateAsync(data);
      }
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: EducationType) => {
    setEditingId(item._id || item.id || "");
    setEditingData(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      await deleteEdu.mutateAsync(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setEditingData(undefined);
  };

  if (isLoading) {
    return <p className="text-zinc-400">Loading education...</p>;
  }

  const hasEntries = education && education.length > 0;

  return (
    <div className="space-y-6">
      {hasEntries && (
        <div className="space-y-3">
          {education.map((item) => (
            <Card key={item._id || item.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">
                    {item.institution}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {item.degree} in {item.fieldOfStudy}
                  </p>
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
        <EducationForm
          onSubmit={handleSubmit}
          isLoading={createEdu.isPending || updateEdu.isPending}
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
          + Add Education
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
