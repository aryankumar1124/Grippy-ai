"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import IntakeForm from "@/components/IntakeForm";
import TherapistCard from "@/components/TherapistCard";
import CostPanel from "@/components/CostPanel";
import { buildModel } from "@/components/model";
import { localEdit } from "@/components/localEdit";
import type { AidSpec, IntakeInput, MeshData } from "@/lib/types";

const Viewer3D = dynamic(() => import("@/components/Viewer3D"), {
  ssr: false,
  loading: () => <div className="h-[340px] w-full animate-pulse rounded-2xl bg-sky-50 sm:h-[420px]" />,
});

async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Something went wrong.");
  return data as T;
}

export default function Home() {
  const [spec, setSpec] = useState<AidSpec | null>(null);
  const [mesh, setMesh] = useState<MeshData | null>(null);
  const [stl, setStl] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changeSummary, setChangeSummary] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Rebuild the 3D model whenever the spec changes.
  useEffect(() => {
    if (!spec) return;
    let cancelled = false;
    buildModel(spec).then(({ mesh, stl }) => {
      if (cancelled) return;
      setMesh(mesh);
      setStl(stl);
    });
    return () => {
      cancelled = true;
    };
  }, [spec]);

  const assess = async (input: IntakeInput) => {
    setLoading(true);
    setError(null);
    setChangeSummary(null);
    try {
      const data = await postJSON<{ spec: AidSpec; fallback?: boolean }>("/api/assess", input);
      setOffline(!!data.fallback);
      setSpec(data.spec);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const edit = async (instruction: string) => {
    if (!spec) return;
    setEditing(true);
    try {
      const data = await postJSON<{ spec: AidSpec; changeSummary: string }>("/api/edit", { spec, instruction });
      const unchanged = JSON.stringify(data.spec.params) === JSON.stringify(spec.params);
      const local = unchanged ? localEdit(spec, instruction) : null;
      if (local) {
        setSpec(local.spec);
        setChangeSummary(local.changeSummary);
      } else {
        setSpec(data.spec);
        setChangeSummary(data.changeSummary);
      }
    } catch {
      const local = localEdit(spec, instruction);
      if (local) {
        setSpec(local.spec);
        setChangeSummary(local.changeSummary);
      } else {
        setChangeSummary("Couldn't apply that change. Try something like “make it longer”.");
      }
    } finally {
      setEditing(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-16">
      <header className="mb-8 max-w-3xl">
        <p className="mb-3 inline-block rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-900">Grippy</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Tell us what&apos;s hard. We&apos;ll design the tool.
        </h1>
        <p className="mt-4 text-xl text-slate-600">
          AI designed adaptive aids, custom fit and 3D printable for cents.
        </p>
      </header>

      <IntakeForm loading={loading} onSubmit={assess} />

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-red-900 ring-1 ring-red-200">
          {error}
        </p>
      )}

      {spec && (
        <div ref={resultsRef} className="mt-10 grid scroll-mt-6 gap-6 lg:grid-cols-2">
          <TherapistCard spec={spec} editing={editing} changeSummary={changeSummary} offline={offline} onEdit={edit} />
          <div>
            <Viewer3D mesh={mesh} label={`3D model of your ${spec.title}`} />
            <CostPanel spec={spec} stl={stl} />
          </div>
        </div>
      )}

      <footer className="mt-16 text-center text-sm text-slate-500">
        Built at the Nittany AI Vibeathon. Always check fit and strength before daily use.
      </footer>
    </main>
  );
}
