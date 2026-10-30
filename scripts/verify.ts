import { CATALOG } from "../lib/catalog";
import type { AidSpec, AidType } from "../lib/types";
import { buildModel } from "../lib/cad";

const levels = ["min", "default", "max"] as const;
let failures = 0;

async function main() {
  for (const aid of Object.keys(CATALOG) as AidType[]) {
    const defs = CATALOG[aid].params;
    const combos: [string, Record<string, number>][] = [];
    for (const lvl of levels) {
      for (const g of [0, 1]) {
        const params = Object.fromEntries(Object.entries(defs).map(([k, d]) => [k, lvl === "min" ? d.min : lvl === "max" ? d.max : d.default]));
        if ("gripGrooves" in params) params.gripGrooves = g; else if (g === 1) continue;
        combos.push([`${lvl}${"gripGrooves" in params ? ` grooves=${g}` : ""}`, params]);
      }
    }
    // mixed extremes (stress the relational constraints)
    const mixed = Object.fromEntries(Object.entries(defs).map(([k, d], i) => [k, i % 2 ? d.max : d.min]));
    combos.push(["mixed A", mixed]);
    combos.push(["mixed B", Object.fromEntries(Object.entries(defs).map(([k, d], i) => [k, i % 2 ? d.min : d.max]))]);

    for (const [name, params] of combos) {
      const spec: AidSpec = { aidType: aid, title: "", rationale: "", params, safetyNotes: [], estGrams: 0 };
      const origErr = console.error; let fellBack = false;
      console.error = () => { fellBack = true; };
      const t0 = performance.now();
      const { mesh, stl } = buildModel(spec);
      const ms = Math.round(performance.now() - t0);
      console.error = origErr;
      const tris = mesh.positions.length / 9;
      const buf = new Uint8Array(await stl.arrayBuffer());
      const stlTris = new DataView(buf.buffer).getUint32(80, true);
      const finite = mesh.positions.every(Number.isFinite) && mesh.normals.every(Number.isFinite);
      // z-up bounds from STL; min z must be 0 (flat base)
      const why: string[] = []; const dv = new DataView(buf.buffer); let minZ = Infinity, maxZ = -Infinity;
      for (let i = 0; i < stlTris; i++) for (let v = 0; v < 3; v++) { const z = dv.getFloat32(84 + i * 50 + 12 + v * 12 + 8, true); minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z); }
       if(!(tris>100))why.push("tris"); if(stlTris!==tris)why.push(`stlTris ${stlTris}!=${tris}`); if(buf.length!==84+50*stlTris)why.push("len"); if(!finite)why.push("nonfinite"); if(fellBack)why.push("fellback"); if(!(Math.abs(minZ)<1e-3))why.push("minZ");
      // closed-surface sanity from the STL: signed volume > 0 and area-vector sum ~ 0 (a hole would break it)
      let vol = 0, ax = 0, ay = 0, az = 0, area = 0;
      for (let i = 0; i < stlTris; i++) {
        const b0 = 84 + i * 50 + 12; const f = (k: number) => dv.getFloat32(b0 + k * 4, true);
        const [x1,y1,z1,x2,y2,z2,x3,y3,z3] = [0,1,2,3,4,5,6,7,8].map(f);
        const cx = (y2-y1)*(z3-z1)-(z2-z1)*(y3-y1), cy = (z2-z1)*(x3-x1)-(x2-x1)*(z3-z1), cz = (x2-x1)*(y3-y1)-(y2-y1)*(x3-x1);
        vol += (x1*(y2*z3-z2*y3) - y1*(x2*z3-z2*x3) + z1*(x2*y3-y2*x3)) / 6;
        ax += cx/2; ay += cy/2; az += cz/2; area += Math.hypot(cx,cy,cz)/2;
      }
      if (!(vol > 0)) why.push(`vol ${vol.toFixed(0)}`);
      if (Math.hypot(ax,ay,az) > 1e-3 * area) why.push(`open? areaVec ${Math.hypot(ax,ay,az).toFixed(3)}`);
      const grams = (vol / 1000) * 1.24; // PLA ~1.24 g/cm3, solid
      const ok = why.length === 0;
      if (!ok) failures++;
      console.log(`${ok ? "PASS" : "FAIL"} ${aid.padEnd(15)} ${name.padEnd(18)} tris=${String(tris).padStart(6)} stl=${(buf.length / 1024).toFixed(0)}KB z=[${minZ.toFixed(2)},${maxZ.toFixed(1)}] ${ms}ms vol=${(vol/1000).toFixed(1)}cm3 ~${grams.toFixed(0)}g solid${why.length ? " WHY:" + why.join(",") : ""}`);
    }
  }
  // robustness: garbage in must not throw
  for (const bad of [
    { aidType: "key_turner", params: { handleLength: NaN, slotWidth: "x" as unknown as number } },
    { aidType: "pen_grip", params: { outerDiameter: 9999, penDiameter: -5 } },
    { aidType: "nope", params: {} },
    { aidType: "utensil_handle", params: undefined },
  ]) {
    try { const m = buildModel(bad as unknown as AidSpec); console.log(`PASS robust ${JSON.stringify(bad)} tris=${m.mesh.positions.length / 9}`); }
    catch (e) { failures++; console.log("FAIL robust threw", e); }
  }
  console.log(failures ? `\n${failures} FAILURE(S)` : "\nALL PASS");
  process.exit(failures ? 1 : 0);
}
main();
