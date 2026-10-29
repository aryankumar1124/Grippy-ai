import { CATALOG } from "@/lib/catalog";
import type { AidSpec, AidType } from "@/lib/types";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Rough PLA mass estimate (g) from the main dimensions, at ~20% infill. */
function estimateGrams(aidType: AidType, p: Record<string, number>): number {
  const solidCm3 =
    aidType === "key_turner"
      ? (p.handleLength * p.handleThickness * 22) / 1000
      : (Math.PI * (p.outerDiameter / 2) ** 2 * p.length) / 1000;
  return Math.max(3, Math.round(solidCm3 * 1.24 * 0.35));
}

/** Guarantees the CAD engine never receives bad input. */
export function clampSpec(raw: Partial<AidSpec>): AidSpec {
  const aidType: AidType = raw.aidType && raw.aidType in CATALOG ? raw.aidType : "key_turner";
  const entry = CATALOG[aidType];
  const params: Record<string, number> = {};
  for (const [key, def] of Object.entries(entry.params)) {
    const v = Number(raw.params?.[key]);
    params[key] = Number.isFinite(v) ? clamp(v, def.min, def.max) : def.default;
  }
  if ("gripGrooves" in params) params.gripGrooves = params.gripGrooves >= 0.5 ? 1 : 0;

  return {
    aidType,
    title: raw.title?.trim() || entry.name,
    rationale: raw.rationale?.trim() || entry.description,
    params,
    safetyNotes: Array.isArray(raw.safetyNotes) ? raw.safetyNotes.filter(Boolean).slice(0, 2) : [],
    estGrams: estimateGrams(aidType, params),
  };
}
