import { CATALOG } from "@/lib/catalog";
import { clampSpec } from "@/lib/ai/validate";
import type { AidSpec } from "@/lib/types";

/**
 * Simple keyword edits used only when /api/edit can't reach the AI (no key, offline demo),
 * so "make the handle longer" still visibly changes the model.
 */
export function localEdit(spec: AidSpec, instruction: string): { spec: AidSpec; changeSummary: string } | null {
  const t = instruction.toLowerCase();
  const params = { ...spec.params };
  const changes: string[] = [];
  const labels = CATALOG[spec.aidType].params;

  const scale = (keys: string[], f: number) => {
    for (const k of keys) {
      if (!(k in params)) continue;
      const before = params[k];
      const def = labels[k];
      const after = Math.round(Math.min(def.max, Math.max(def.min, before * f)) * 10) / 10;
      if (after !== before) {
        params[k] = after;
        changes.push(`${def.label} ${before}→${after}mm`);
      }
    }
  };

  const lengthKeys = ["handleLength", "length"];
  const thickKeys = ["handleThickness", "outerDiameter"];

  if (/longer|extend|lengthen/.test(t)) scale(lengthKeys, 1.25);
  if (/shorter|shorten/.test(t)) scale(lengthKeys, 0.8);
  if (/thicker|wider|bigger|fatter/.test(t)) scale(thickKeys, 1.2);
  if (/thinner|narrower|smaller|slimmer/.test(t)) scale(thickKeys, 0.85);

  if ("gripGrooves" in params) {
    if (/no grooves|remove (the )?grooves|without grooves|smooth/.test(t) && params.gripGrooves !== 0) {
      params.gripGrooves = 0;
      changes.push("grooves off");
    } else if (/groove|grip/.test(t) && params.gripGrooves !== 1) {
      params.gripGrooves = 1;
      changes.push("grooves on");
    }
  }

  if (!changes.length) return null;
  return { spec: clampSpec({ ...spec, params }), changeSummary: changes.join(", ") };
}
