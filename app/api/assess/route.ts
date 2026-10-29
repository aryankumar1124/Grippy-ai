import { NextResponse } from "next/server";
import { askJSON } from "@/lib/ai/client";
import { ASSESS_SYSTEM } from "@/lib/ai/prompts";
import { clampSpec } from "@/lib/ai/validate";
import { fallbackAssess } from "@/lib/ai/fallback";
import type { AidSpec, IntakeInput } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const input = (await req.json()) as IntakeInput;
  if (!input?.problem?.trim()) return NextResponse.json({ error: "Describe what's hard for you." }, { status: 400 });

  const user = [
    `What's hard: ${input.problem.trim()}`,
    `Hand size: ${input.handSize ?? "unknown"}`,
    `Grip strength: ${input.gripStrength ?? "unknown"}`,
  ].join("\n");

  try {
    const raw = await askJSON<Partial<AidSpec>>(ASSESS_SYSTEM, user);
    return NextResponse.json({ spec: clampSpec(raw) });
  } catch (err) {
    console.error("[assess] AI failed, using fallback:", err);
    return NextResponse.json({ spec: fallbackAssess(input), fallback: true });
  }
}
