export type AidType = "key_turner" | "pen_grip" | "utensil_handle";

export type AidSpec = {
  aidType: AidType;
  title: string;                    // "Key Turner Lever"
  rationale: string;                // 1–2 sentences
  params: Record<string, number>;   // keys MUST match CATALOG[aidType].params (mm)
  safetyNotes: string[];            // 1–2 short notes
  estGrams: number;                 // for cost panel
};

export type IntakeInput = { problem: string; handSize?: "S" | "M" | "L"; gripStrength?: "low" | "medium" };

export type MeshData = { positions: Float32Array; normals: Float32Array };
