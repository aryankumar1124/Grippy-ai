import Anthropic from "@anthropic-ai/sdk";

export const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

let client: Anthropic | null = null;
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not set in .env.local");
  if (!client) client = new Anthropic({ timeout: 25_000 });
  return client;
}

function extractJSON(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  return start >= 0 && end > start ? text.slice(start, end + 1) : text.trim();
}

/** Ask Claude for strict JSON and parse it. Retries once on a parse failure. */
export async function askJSON<T>(system: string, user: string): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await getClient().messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: `${system}\n\nRespond with ONLY a single valid JSON object. No prose, no markdown.`,
      messages: [{ role: "user", content: attempt === 0 ? user : `${user}\n\nYour last reply was not valid JSON. Reply with JSON only.` }],
    });
    const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    try {
      return JSON.parse(extractJSON(text)) as T;
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error(`Model did not return valid JSON: ${String(lastErr)}`);
}
