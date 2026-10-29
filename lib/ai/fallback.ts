import { CATALOG } from "@/lib/catalog";
import type { AidSpec, AidType, IntakeInput } from "@/lib/types";
import { clampSpec } from "./validate";

/** Offline backup so the demo never dead-ends if the API is down or the key is missing. */
export function fallbackAssess(input: IntakeInput): AidSpec {
  const t = input.problem.toLowerCase();
  const aidType: AidType = /pen|pencil|write|writing|shake|tremor/.test(t)
    ? "pen_grip"
    : /fork|spoon|utensil|eat|knife/.test(t)
      ? "utensil_handle"
      : "key_turner";
  const base = Object.fromEntries(Object.entries(CATALOG[aidType].params).map(([k, p]) => [k, p.default]));
  const thicker = input.gripStrength === "low" ? 1.25 : 1;
  const size = input.handSize === "L" ? 1.15 : input.handSize === "S" ? 0.9 : 1;
  for (const k of Object.keys(base)) {
    if (/Thickness$|outerDiameter/.test(k) && k !== "slotThickness") base[k] *= thicker;
    if (/Length$|^length$/.test(k)) base[k] *= size;
  }
  if ("gripGrooves" in base && input.gripStrength === "low") base.gripGrooves = 1;
  const rationale: Record<AidType, string> = {
    key_turner: "A lever over the key gives several times more leverage, so you can turn it with your palm instead of pinching.",
    pen_grip: "A thicker, grooved grip spreads pressure across your fingers and steadies the pen, so writing takes less force.",
    utensil_handle: "A built-up handle is easier to hold with a relaxed grip, so eating takes less squeezing and strain.",
  };
  return clampSpec({
    aidType,
    title: CATALOG[aidType].name,
    rationale: rationale[aidType],
    params: base,
    safetyNotes: ["Check the fit before daily use.", "PETG prints stronger than PLA for parts you twist or squeeze."],
  });
}
