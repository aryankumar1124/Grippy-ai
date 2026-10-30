import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { CATALOG } from "../lib/catalog";
import type { AidSpec, AidType } from "../lib/types";
import { buildModel } from "../lib/cad";

// Writes print-ready binary STLs (mm, flat base) to disk, e.g. to open in a slicer.
//   npm run export:stl                         -> the three aids at default size
//   npm run export:stl -- --out ./my-stls      -> choose the output folder (default ./stl-out)
//   npm run export:stl -- --spec spec.json     -> export one design (an AidSpec, or the /api/assess response)

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}

function defaultSpec(aidType: AidType): AidSpec {
  const params = Object.fromEntries(Object.entries(CATALOG[aidType].params).map(([k, d]) => [k, d.default]));
  return { aidType, title: CATALOG[aidType].name, rationale: "", params, safetyNotes: [], estGrams: 0 };
}

function loadSpec(file: string): AidSpec {
  const json = JSON.parse(readFileSync(resolve(file), "utf8"));
  return json.spec ?? json;
}

async function main() {
  const outDir = resolve(arg("out") ?? "stl-out");
  mkdirSync(outDir, { recursive: true });
  // keep generated files out of git without touching the repo's .gitignore
  const ignore = join(outDir, ".gitignore");
  if (!existsSync(ignore)) writeFileSync(ignore, "*\n");

  const specFile = arg("spec");
  const specs = specFile ? [loadSpec(specFile)] : (Object.keys(CATALOG) as AidType[]).map(defaultSpec);

  for (const spec of specs) {
    const { stl } = buildModel(spec);
    const buf = Buffer.from(await stl.arrayBuffer());
    const file = join(outDir, `${spec.aidType}.stl`);
    writeFileSync(file, buf);
    console.log(`wrote ${file} (${(buf.length / 1024).toFixed(0)} KB, ${(buf.length - 84) / 50} triangles)`);
  }
}
main();
