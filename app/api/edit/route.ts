import { NextResponse } from "next/server";
import { askJSON } from "@/lib/ai/client";
import { EDIT_SYSTEM } from "@/lib/ai/prompts";
import { clampSpec } from "@/lib/ai/validate";
import type { AidSpec } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { spec, instruction } = (await req.json()) as { spec: AidSpec; instruction: string };
  if (!spec || !instruction?.trim()) return NextResponse.json({ error: "Missing spec or instruction." }, { status: 400 });

  try {
    const out = await askJSON<{ spec: Partial<AidSpec>; changeSummary: string }>(
      EDIT_SYSTEM,
      `Current design:\n${JSON.stringify({ aidType: spec.aidType, title: spec.title, rationale: spec.rationale, params: spec.params, safetyNotes: spec.safetyNotes })}\n\nInstruction: ${instruction.trim()}`,
    );
    const next = clampSpec({ ...spec, ...out.spec, aidType: spec.aidType });
    return NextResponse.json({ spec: next, changeSummary: out.changeSummary || "Updated." });
  } catch (err) {
    console.error("[edit] AI failed:", err);
    return NextResponse.json({ spec, changeSummary: "Couldn't apply that change right now. Try rephrasing." });
  }
}
