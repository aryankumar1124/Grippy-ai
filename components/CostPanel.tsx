"use client";

import type { AidSpec } from "@/lib/types";
import { getPlaUsdPerGram, getRetail } from "./model";

export default function CostPanel({ spec, stl }: { spec: AidSpec; stl: Blob | null }) {
  const retail = getRetail(spec.aidType);
  const print = Math.max(0.05, spec.estGrams * getPlaUsdPerGram());
  const ratio = Math.max(1, Math.round(retail.usd / print));

  const download = () => {
    if (!stl) return;
    const url = URL.createObjectURL(stl);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grippy-${spec.aidType.replace(/_/g, "-")}.stl`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section aria-labelledby="cost-heading" className="card mt-4">
      <h3 id="cost-heading" className="sr-only">Cost comparison</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Typical retail price</p>
            <p className="text-2xl font-semibold text-slate-500 line-through decoration-slate-400">
              ~${retail.usd.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-teal-700">Estimated filament cost</p>
            <p className="text-3xl font-bold text-teal-800">~${print.toFixed(2)}</p>
          </div>
        </div>
        <span className="rounded-full bg-teal-100 px-4 py-2 text-base font-semibold text-teal-900">
          ~{ratio}× less in material
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        About {spec.estGrams}g of filament at $0.02/g. Excludes printer time, electricity, failed prints and shipping, so this is not a total savings figure.
        {retail.sourceUrl && (
          <>
            {" "}
            <a href={retail.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
              Retail source
            </a>
          </>
        )}
      </p>
      <button type="button" onClick={download} disabled={!stl} className="btn-primary mt-4 w-full text-lg">
        Download STL
      </button>
    </section>
  );
}
