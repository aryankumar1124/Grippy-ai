# lib/cad (Role B)

`buildModel(spec: AidSpec) => { mesh: MeshData; stl: Blob }` (sync, never throws).

- `mesh` is **y-up** (three.js coords) with smooth normals, non-indexed: positions/normals are Float32Array, 9 floats per triangle.
- `stl` is binary STL in **mm, z-up, flat base at z=0** (print orientation).
- Params are clamped to CATALOG ranges, missing/NaN -> defaults. Template error -> default model for that aid. Last resort -> plain block.
- Pen grip and utensil handle are revolved profiles (fast, ~10-50ms). Key turner uses booleans (~100-350ms).
- Fixed print constants live at the top of each template (key slot 3mm, pen hole +0.3mm clearance, min wall 2mm).

Verify: `npx tsx scripts/verify.ts` (needs `tsx`).
