import { primitives } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import { CATALOG } from "../catalog";
import type { AidSpec, AidType, MeshData } from "../types";
import { keyTurner, type KeyTurnerParams } from "./templates/keyTurner";
import { penGrip, type PenGripParams } from "./templates/penGrip";
import { utensilHandle, type UtensilHandleParams } from "./templates/utensilHandle";
import { toMeshData } from "./mesh";
import { toStlBlob } from "./stl";

export type BuiltModel = { mesh: MeshData; stl: Blob };

/** Clamp to CATALOG ranges, fill defaults, drop unknown keys. Bad numbers (NaN, strings) fall back to default. */
function resolveParams(aidType: AidType, raw: Record<string, number> | undefined): Record<string, number> {
  const def = CATALOG[aidType].params;
  const out: Record<string, number> = {};
  for (const [k, d] of Object.entries(def)) {
    const v = Number(raw?.[k]);
    out[k] = Number.isFinite(v) ? Math.min(d.max, Math.max(d.min, v)) : d.default;
  }
  return out;
}

function defaultParams(aidType: AidType): Record<string, number> {
  return Object.fromEntries(Object.entries(CATALOG[aidType].params).map(([k, d]) => [k, d.default]));
}

function makeGeom(aidType: AidType, p: Record<string, number>): Geom3 {
  switch (aidType) {
    case "key_turner": return keyTurner(p as KeyTurnerParams);
    case "pen_grip": return penGrip(p as PenGripParams);
    case "utensil_handle": return utensilHandle(p as UtensilHandleParams);
    default: throw new Error(`unknown aid type: ${String(aidType)}`);
  }
}

function finish(geom: Geom3): BuiltModel {
  return { mesh: toMeshData(geom), stl: toStlBlob(geom) };
}

/**
 * Build the 3D model for a spec. NEVER throws:
 * bad params -> clamped; template error -> default model for that aid; anything else -> a plain block.
 */
export function buildModel(spec: AidSpec): BuiltModel {
  const aidType: AidType = spec && spec.aidType in CATALOG ? spec.aidType : "key_turner";
  try {
    return finish(makeGeom(aidType, resolveParams(aidType, spec?.params)));
  } catch (e) {
    console.error("[cad] build failed, using default model", e);
    try {
      return finish(makeGeom(aidType, defaultParams(aidType)));
    } catch (e2) {
      console.error("[cad] default model failed, using fallback block", e2);
      return finish(primitives.cuboid({ center: [0, 0, 10], size: [60, 20, 20] }));
    }
  }
}
