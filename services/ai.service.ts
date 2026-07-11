import { openai } from "@/lib/openai";
import {
  buildLandingPagePrompt,
  buildProfilePrompt,
  buildProposalPrompt,
  buildCoverLetterPrompt,
  UserProfilePayload,
} from "@/lib/prompts/builder";

async function generate<T>(
  systemInstruction: string,
  userContent: string,
): Promise<T> {
  const response = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: userContent },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const rawText = response.choices[0]?.message?.content;

  if (!rawText) {
    throw new Error("Empty response received from AI");
  }

  return JSON.parse(rawText) as T;
}

export async function generateProfile<T>(
  platform: "linkedin" | "fiverr" | "upwork" | "resume",
  profile: UserProfilePayload,
  jobDescription?: string,
): Promise<T> {
  const { systemInstruction, userContent } = buildProfilePrompt(
    platform,
    profile,
    jobDescription,
  );

  return generate<T>(systemInstruction, userContent);
}

export async function generateProposal<T>(
  profile: UserProfilePayload,
  jobDescription: string,
): Promise<T> {
  const { systemInstruction, userContent } = buildProposalPrompt(
    profile,
    jobDescription,
  );

  return generate<T>(systemInstruction, userContent);
}

export async function generateCoverLetter<T>(
  profile: UserProfilePayload,
  jobDescription: string,
): Promise<T> {
  const { systemInstruction, userContent } = buildCoverLetterPrompt(
    profile,
    jobDescription,
  );

  return generate<T>(systemInstruction, userContent);
}

export async function generateLandingPage<T>(
  profile: UserProfilePayload,
): Promise<T> {
  const { systemInstruction, userContent } = buildLandingPagePrompt(profile);

  return generate<T>(systemInstruction, userContent);
}
