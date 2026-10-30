# Prototype validation and integration handoff

Updated 2026-10-29. Role D branch includes shared baseline `637caf5` (real CAD) plus research changes. UI review used `c-ui` at `29ba3e0` in an isolated temporary checkout with Role D JSON files. No teammate implementation files were edited on `arjun`.

## Tests actually run

| Check | Result |
|---|---|
| `node docs/check-data.cjs` | Pass: exact JSON keys/types, five unique claims, URL syntax, currency arithmetic, local links |
| `npm run check` after synchronizing main | Pass: ESLint, TypeScript, CAD verification |
| `npm run verify:cad` through check | Pass: 21 valid geometry combinations and four malformed-spec cases. Checks finite mesh data, STL triangle/byte consistency, base position, positive volume and surface-area-vector balance; not proof of manifoldness or printability |
| `npm run build` on arjun | Pass, including latest shared CAD baseline |
| UI branch build with research data | Pass before CAD integration and again with current main CAD in isolated checkout |
| HTTP offline assessment | Pass: all three task examples across S/M/L and low/medium grip (18 responses), correct aid, fallback flag, positive estimated mass |
| Catalog bounds | Pass: 18 fallback specs within ranges; six out-of-range specs clamped and unknown parameter discarded |
| HTTP no-key editing | Three calls returned unchanged parameters and an explicit unsuccessful-edit message; this is expected fallback behavior, not a successful AI edit |
| Local UI edit function | Three length edits changed parameters and mock mesh coordinates |
| Real CAD customization | All three length edits changed both mesh coordinates and binary STL bytes |
| Mock file checks before CAD landed | Nine min/default/max meshes and binary STL byte structures passed. These are superseded by real CAD tests, not functional print evidence |
| Missing inputs | Empty assessment and missing edit data returned HTTP 400 |
| Browser preview / click-to-download | Not tested: computer-use stopped because Chrome URL could not be verified. No further browser attempts |
| Live AI, slicer, physical prints, user testing | Not tested: credentials/service not exercised; no slicer or physical trial |

Default backend estimates observed: key turner 15 g, pen grip 12 g, utensil handle 28 g. These are heuristic outputs, not measured print consumption. CAD verification's approximate solid-mass estimates are different again and are not infill-aware slicer weights.

The initial malformed-input probe expected a JSON error body but received an empty HTTP 500, causing the probe to stop while parsing it. A corrected probe retained raw responses and confirmed the bug. An exploratory mock-parameter assertion also failed because key slot width changes head width even though no functional slot is created; it was not treated as a product test failure. Final real-CAD checks passed.

## Confirmed issues and exact owner actions

1. **Aryan: fallback selection.** POST `/api/assess` with `{"problem":"I have trouble eating because my hand tremor makes holding my fork difficult"}` returns `pen_grip` in offline mode. Writing/tremor keywords take priority over the fork task. Make selection task-aware and retest mixed-condition examples.
2. **Aryan: request validation.** POST `/api/assess` with `{"problem":123}` returns HTTP 500 with no JSON error body. Validate input type before calling `.trim()` and return a useful HTTP 400. Invalid JSON and broader hostile-input coverage remain pending.
3. **Aryaman: integrate prices and statistics.** `components/model.ts` loads `data/prices.json`; a production bundle built with Role D files contains all three selected prices. Once D and C are merged, prices should be available without changing the schema. No `stats.json` import/consumer exists in the inspected UI. Add a sourced impact statement using `claim`, `number`, and `source_url`, preserving dates and population qualifiers.
4. **Aryaman: correct cost wording.** `CostPanel.tsx` says “Print it” and “Save X%” while comparing retail with estimated filament only. Label it “Estimated filament cost”, list exclusions, and remove total-savings implications. For utensils disclose “$6.78 per handle; $27.10 pack of 4”. Keep the documented $0.02/g assumption; do not add the optional `plaUSDPerGram` property to D's fixed JSON contract.
5. **Aryaman and Jonty: coordinate frame.** Current real `lib/cad/mesh.ts` returns y-up coordinates, documented in `docs/ARCHITECTURE.md`; `Viewer3D.tsx` still rotates the mesh by -90 degrees around X under a z-up assumption. Align the viewer with the real mesh convention, then visually verify orientation for all three aids. This is a source-identified mismatch, not an observed browser failure.
6. **Aryan: merge C carefully.** Merging latest main into the isolated C checkout produced one conflict in `app/layout.tsx`, restricted to title/description metadata. A temporary test retained main's layout verbatim and the combined build passed. No conflict resolution was pushed to C or main. Resolve this when integrating C.
7. **Aryan and Aryaman: qualify claims.** Review several-fold leverage, pen stabilization, general PETG strength statements, “AI Occupational Therapist”, and “custom fit ... for cents”. Role D did not establish those outcomes. The local edit fallback is keyword-based, not evidence of a working AI service.
8. **Jonty: supply slicer evidence.** Provide final STLs and print profile, grams including supports/waste, time, and compatibility/strength trial results. Binary STL checks do not establish safe daily use.

## Remaining acceptance checks

After integration, test three complete browser workflows: task input, recommendation, dimensions, preview, edit, updated preview, retail source and cost display, download, and opening the downloaded STL in a slicer. Verify holes, slots, grooves, retention, and millimeter scale. Exercise keyboard focus, screen-reader announcements, 200% zoom, mobile layout, errors, and fallback disclosure. Obtain physical fit/durability evidence and occupational therapist/user feedback before claiming benefit.

No deployed website URL was supplied or tested. Main's page remains the starter UI; a successful temporary combined build is not deployment or end-to-end validation.
