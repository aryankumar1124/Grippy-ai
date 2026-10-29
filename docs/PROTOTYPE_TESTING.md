# Prototype validation and team handoff

Inspection date: 2026-10-29. Baseline: `9430ffd`. Scope: Role D data validation and read-only source inspection. No runtime, physical, clinical, or participant tests are represented as completed.

## Observed results

| Check | Result and evidence |
|---|---|
| Ownership | Changes confined to `data/` and `docs/`; shared types/catalog and README unchanged |
| Data | JSON parsed; exact contract keys, positive finite prices, HTTPS URLs, four distinct statistics checked |
| Arithmetic | $20/kg = $0.02/g; 25 g = $0.50. Foam unit uses decimal half-up cent rounding: 1995 cents / 6 = 332.5 cents, rounded to 333 cents |
| Source references | Retail pages retrieved for key turner, single pen grip, and foam package. Filament price is indexed evidence with live verification limitation documented |
| UI integration | Pending: `app/page.tsx` is still the Next.js starter page at inspected baseline |
| CAD / STL | Pending: `lib/cad/` implementation absent at inspected baseline |
| Runtime API | Not run: local dependencies absent; AI credentials and service behavior not exercised |
| Fit / durability / usability | Not tested: no physical prototypes or user sessions |

A first arithmetic check using JavaScript `toFixed` rounded the binary floating-point result of 19.95 / 6 to 3.32. The documented financial convention is decimal half-up rounding; checking integer cents gives 3.33. Use explicit currency rounding for derived unit displays.

## Findings for owners (not externally sent)

- **A:** `lib/ai/fallback.ts` asserts several-fold leverage, pen stabilization, reduced force, and a general PETG strength advantage. These are not verified by Role D's research and depend on geometry, user, material, and print profile. Review wording as potential mechanisms rather than established outcomes. The AI must not be represented as a licensed therapist.
- **A:** Source inspection shows `/api/edit` returns the original spec with HTTP 200 when AI processing fails. Test that the UI clearly displays the unsuccessful-edit message; do not count this as successful modification.
- **C:** Retail figures are representative units, not market averages. The foam entry is a normalized full-tube price from a required six-pack. Link pricing notes, disclose units, and label the print figure as filament only.
- **B:** Validate key retention, slot fit, layer orientation, and strength; geometry export alone does not prove suitability.

## Integration acceptance checklist

Record commit, environment, input, actual output, and evidence for each run. Mark pass/fail/pending rather than assuming success from a screenshot.

| Scenario | Acceptance criterion | Current status / owner |
|---|---|---|
| “I have arthritis and can't turn my house key” | Key turner returned, rationale and safety notes visible, parameters within catalog | Pending / A, C |
| “My hand shakes when I write” | Pen grip selected; no claim of proven tremor treatment | Pending / A, C |
| “I can't grip my fork” | Utensil handle selected with relevant sizing | Pending / A, C |
| Small/large hands; low/medium grip | Valid bounded parameters; no unsupported custom-fit guarantee | Pending / A |
| “Make the handle longer and add finger grooves” | Supported fields change, others retained, preview and summary agree | Pending / A, B, C |
| Empty input / service unavailable | Helpful feedback; fallback status understood; failed edits not shown as applied | Pending / A, C |
| All three aids at min/default/max | Mesh finite and nonempty; STL opens in slicer at correct millimeter scale | Pending / B |
| Cost panel | JSON prices match; gram estimate distinguished from slicer mass; exclusions and units shown | Pending / C, D |
| Keyboard and screen reader | Inputs labeled, focus visible, results/loading/errors announced, download reachable | Pending / C, D |
| Mobile and zoom | No hidden controls or blocked workflow at narrow width and 200% zoom | Pending / C, D |
| Physical trial | Document print settings, mass, compatibility, retention, edges, comfort, repeated loading | Pending / B, D with reviewer |

For physical trials, obtain informed agreement, avoid collecting unnecessary health information, use low-risk tasks, and stop immediately for discomfort, slipping, or cracking. Seek occupational therapist review before making therapeutic claims. This checklist is a handoff for the merged prototype, not completed test results.
