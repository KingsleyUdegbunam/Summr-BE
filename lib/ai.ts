import { createOpenAI } from "@ai-sdk/openai";
const OPENROUTER_KEY: string | undefined = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL: string | undefined = process.env.OPENROUTER_BASE_URL;

if (!OPENROUTER_KEY || !OPENROUTER_URL) {
  throw new Error("Missing OpenRoutr cofiguration");
}
export const openrouter = createOpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const SUMMARIZE_MODEL = "anthropic/claude-3-haiku";
