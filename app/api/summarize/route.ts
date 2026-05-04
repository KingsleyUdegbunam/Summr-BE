import { openrouter, SUMMARIZE_MODEL } from "@/lib/ai";
import { streamText } from "ai";
import { NextRequest } from "next/server";

// export const runtime = "edge";

// export async function POST(req: NextRequest) {
//   // Get text sent from the browser extension
//   const { text } = await req.json();
//   console.log(text);

//   //send text to AI model and stream response back
//   // stream returns wrd for word
//   const result = streamText({
//     model: openrouter(SUMMARIZE_MODEL),
//     system: `You are a concise article summarizer. Given an article text, write a clear and accurate summary in the following format:
//     - Bullet-point summary
//     - Key insight
//     - Estimated reading time`,
//     messages: [{ role: "user", content: text }],
//     maxOutputTokens: 300,
//   });

//   //Stream AI reponse back to extension
//   //CORS header required from origin mismatch
//   return result.toTextStreamResponse({
//     headers: { "Access-Control-Allow-Origin": "*" },
//   });
// }
export const runtime = "edge";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text || typeof text !== "string") {
    return new Response("Invalid input", { status: 400 });
  }

  const result = streamText({
    model: openrouter(SUMMARIZE_MODEL),
    system: `You are a strict formatting engine.

You MUST follow this exact output format. Do NOT add explanations, headers, or extra text.

Output format:

- Bullet-point summary:
• point 1
• point 2
• point 3

- Key insight:
single sentence insight only

- Estimated reading time:
X minute(s)

Rules:
- Do not explain the format
- Do not add extra sections
- Do not repeat the input
- Keep bullet points short`,
    messages: [{ role: "user", content: text }],
    maxOutputTokens: 300,
  });

  return result.toTextStreamResponse({
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
