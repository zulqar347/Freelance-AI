import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API,

  baseURL: "https://api.groq.com/openai/v1",
});
