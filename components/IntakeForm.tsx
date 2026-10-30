"use client";

import { useEffect, useState } from "react";
import type { IntakeInput } from "@/lib/types";

const EXAMPLES = [
  { label: "Turning a key", text: "My grandma has arthritis and can't turn her house key." },
  { label: "Holding a pen", text: "My hand shakes when I write and the pen keeps slipping." },
  { label: "Gripping a fork", text: "I can't grip my fork tightly enough to eat on my own." },
];

const LOADING = ["Understanding your needs…", "Sizing it to you…"];

type Props = { loading: boolean; onSubmit: (input: IntakeInput) => void };

function Toggle<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { value: T; label: string }[];
  value: T | undefined;
  onChange: (v: T | undefined) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-base font-semibold text-slate-800">{legend}</legend>
      <div className="flex gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? undefined : o.value)}
              className={`chip min-w-[3rem] ${active ? "chip-active" : ""}`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function IntakeForm({ loading, onSubmit }: Props) {
  const [problem, setProblem] = useState("");
  const [handSize, setHandSize] = useState<IntakeInput["handSize"]>();
  const [gripStrength, setGripStrength] = useState<IntakeInput["gripStrength"]>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!loading) return setStep(0);
    const id = setInterval(() => setStep((s) => Math.min(s + 1, LOADING.length - 1)), 1400);
    return () => clearInterval(id);
  }, [loading]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim() || loading) return;
    onSubmit({ problem: problem.trim(), handSize, gripStrength });
  };

  return (
    <form onSubmit={submit} className="card" aria-busy={loading}>
      <label htmlFor="problem" className="block text-xl font-semibold text-slate-900">
        What&apos;s hard for you?
      </label>
      <p id="problem-hint" className="mt-1 text-slate-600">
        Describe it in your own words. You can write for yourself or someone you care for.
      </p>
      <textarea
        id="problem"
        aria-describedby="problem-hint"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(e);
        }}
        rows={4}
        placeholder="e.g. My grandma has arthritis and can't turn her house key."
        className="mt-3 w-full resize-y rounded-xl border-2 border-slate-300 bg-white p-4 text-lg text-slate-900 placeholder:text-slate-400 focus:border-sky-600"
      />

      <div className="mt-3 flex flex-wrap gap-2" aria-label="Examples">
        {EXAMPLES.map((ex) => (
          <button key={ex.label} type="button" className="chip" onClick={() => setProblem(ex.text)}>
            {ex.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-8">
        <Toggle
          legend="Hand size"
          value={handSize}
          onChange={setHandSize}
          options={[
            { value: "S", label: "S" },
            { value: "M", label: "M" },
            { value: "L", label: "L" },
          ]}
        />
        <Toggle
          legend="Grip strength"
          value={gripStrength}
          onChange={setGripStrength}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
          ]}
        />
      </div>

      <button type="submit" disabled={!problem.trim() || loading} className="btn-primary mt-6 w-full text-lg sm:w-auto">
        {loading ? LOADING[step] : "Design my tool"}
      </button>
      <p className="sr-only" aria-live="polite">
        {loading ? LOADING[step] : ""}
      </p>
    </form>
  );
}
