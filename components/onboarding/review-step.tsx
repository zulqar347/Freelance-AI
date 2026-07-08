"use client";

import { useMe } from "@/hooks/use-app-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2 } from "lucide-react";

interface ReviewStepProps {
  onNext: () => void;
  onEditStep: (step: number) => void;
}

export function ReviewStep({ onNext, onEditStep }: ReviewStepProps) {
  const { data: meData, isLoading } = useMe();
  const profile = meData?.profile;
  const experience = meData?.experience || [];
  const projects = meData?.projects || [];
  const education = meData?.education || [];

  if (isLoading) {
    return <p className="text-zinc-400">Loading your profile...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(0)}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </div>

        {profile ? (
          <Card className="space-y-3 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase">Headline</p>
                <p className="text-sm text-white">{profile.headline}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase">Profession</p>
                <p className="text-sm text-white">{profile.profession}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-zinc-500 uppercase">Bio</p>
              <p className="text-sm text-white">{profile.bio}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase">Country</p>
                <p className="text-sm text-white">{profile.country}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase">Experience</p>
                <p className="text-sm text-white">{profile.experience}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase">Hourly Rate</p>
                <p className="text-sm text-white">${profile.hourlyRate}/hr</p>
              </div>
            </div>

            {profile.languages && profile.languages.length > 0 && (
              <div>
                <p className="text-xs text-zinc-500 uppercase mb-2">
                  Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <span
                      key={lang}
                      className="inline-block rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.skills && profile.skills.length > 0 && (
              <div>
                <p className="text-xs text-zinc-500 uppercase mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ) : (
          <p className="text-sm text-zinc-400">No profile data</p>
        )}
      </div>

      {/* Education Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Education ({education.length})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(1)}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </div>

        {education.length > 0 ? (
          <div className="space-y-2">
            {education.map((item) => (
              <Card key={item._id || item.id} className="p-3">
                <h3 className="font-semibold text-white">{item.institution}</h3>
                <p className="text-sm text-zinc-400">
                  {item.degree} in {item.fieldOfStudy}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {new Date(item.startDate).toLocaleDateString()}
                  {" - "}
                  {item.isCurrent
                    ? "Present"
                    : item.endDate
                      ? new Date(item.endDate).toLocaleDateString()
                      : ""}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">No education entries</p>
        )}
      </div>

      {/* Experience Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Experience ({experience.length})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(2)}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </div>

        {experience.length > 0 ? (
          <div className="space-y-2">
            {experience.map((item) => (
              <Card key={item._id || item.id} className="p-3">
                <h3 className="font-semibold text-white">{item.company}</h3>
                <p className="text-sm text-zinc-400">{item.role}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {new Date(item.startDate).toLocaleDateString()}
                  {" - "}
                  {item.isCurrent
                    ? "Present"
                    : item.endDate
                      ? new Date(item.endDate).toLocaleDateString()
                      : ""}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">No experience entries</p>
        )}
      </div>

      {/* Projects Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Projects ({projects.length})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(3)}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {projects.map((item) => (
              <Card key={item._id || item.id} className="p-3">
                <h3 className="font-semibold text-white">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-zinc-300 mt-1">
                    {item.description}
                  </p>
                )}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
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
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">No projects</p>
        )}
      </div>

      {/* Finish Button */}
      <div className="flex justify-end pt-6">
        <Button onClick={onNext} size="lg">
          Finish Onboarding
        </Button>
      </div>
    </div>
  );
}
