"use client";

import { useState } from "react";
import { CATALOG } from "@/lib/catalog";
import type { AidSpec } from "@/lib/types";

const SUGGESTIONS: Record<AidSpec["aidType"], string[]> = {
  key_turner: ["Make the handle longer", "Add finger grooves"],
  pen_grip: ["Make it thicker", "Make it shorter"],
  utensil_handle: ["Make it thicker", "Make the handle longer"],
};

type Props = {
  spec: AidSpec;
  editing: boolean;
  changeSummary: string | null;
  offline: boolean;
  onEdit: (instruction: string) => void;
};

function formatValue(key: string, v: number) {
  if (key === "gripGrooves") return v ? "On" : "Off";
  return `${Math.round(v * 10) / 10} mm`;
}

export default function TherapistCard({ spec, editing, changeSummary, offline, onEdit }: Props) {
  const [instruction, setInstruction] = useState("");
  const labels = CATALOG[spec.aidType].params;

  const send = (text: string) => {
    if (!text.trim() || editing) return;
    onEdit(text.trim());
    setInstruction("");
  };

  return (
    <section aria-labelledby="ot-heading" className="card">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Thinks like an occupational therapist</p>
      <h2 id="ot-heading" className="mt-1 text-2xl font-bold text-slate-900">
        Recommended: {spec.title}
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-slate-700">{spec.rationale}</p>

      {spec.safetyNotes.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Safety notes">
          {spec.safetyNotes.map((n) => (
            <li key={n} className="rounded-full bg-amber-50 px-3 py-1.5 text-base text-amber-900 ring-1 ring-amber-200">
              ⚠️ {n}
            </li>
          ))}
        </ul>
      )}

      <table className="mt-5 w-full text-left text-base">
        <caption className="sr-only">Sized for you</caption>
        <thead>
          <tr className="border-b border-slate-200 text-sm uppercase tracking-wide text-slate-500">
            <th scope="col" className="py-2 font-semibold">Sized for you</th>
            <th scope="col" className="py-2 text-right font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(labels).map(([key, def]) => (
            <tr key={key} className="border-b border-slate-100 last:border-0">
              <th scope="row" className="py-2 font-normal text-slate-700">
                {def.label.replace(" (0/1)", "")}
              </th>
              <td className="py-2 text-right font-semibold tabular-nums text-slate-900">
                {formatValue(key, spec.params[key] ?? def.default)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          send(instruction);
        }}
      >
        <label htmlFor="edit" className="block text-lg font-semibold text-slate-900">
          Change anything
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="edit"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="e.g. make the handle longer"
            className="min-w-0 flex-1 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-lg focus:border-sky-600"
          />
          <button type="submit" disabled={!instruction.trim() || editing} className="btn-primary">
            {editing ? "Updating…" : "Update"}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS[spec.aidType].map((s) => (
            <button key={s} type="button" className="chip" disabled={editing} onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="mt-3 min-h-[1.5rem] text-base text-teal-800">
          {changeSummary && <>✓ {changeSummary}</>}
        </p>
      </form>

      {offline && (
        <p className="mt-2 text-sm text-slate-500">Running in offline mode. Add an API key for full AI reasoning.</p>
      )}
    </section>
  );
}
