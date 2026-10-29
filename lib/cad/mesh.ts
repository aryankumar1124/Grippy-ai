import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import type { MeshData } from "../types";
import { triangulate } from "./triangulate";

const CREASE_COS = Math.cos((40 * Math.PI) / 180); // smooth across < 40° edges, keep sharper edges crisp
const KEY_SCALE = 1e4;

/**
 * Convert a jscad Geom3 to non-indexed triangles with smooth-ish per-vertex normals.
 * yUp=true (default) rotates print coords (z-up) into three.js coords (y-up): (x,y,z) -> (x,z,-y).
 * The STL is NOT affected, it always stays z-up with the base at z=0.
 */
export function toMeshData(geom: Geom3, yUp = true): MeshData {
  const tris = triangulate(geom);

  // group face normals by welded vertex position
  const key = (x: number, y: number, z: number) =>
    `${Math.round(x * KEY_SCALE)},${Math.round(y * KEY_SCALE)},${Math.round(z * KEY_SCALE)}`;
  const buckets = new Map<string, [number, number, number][]>();
  for (const t of tris) {
    for (let k = 0; k < 3; k++) {
      const kk = key(t.v[k * 3], t.v[k * 3 + 1], t.v[k * 3 + 2]);
      const arr = buckets.get(kk);
      if (arr) arr.push(t.n); else buckets.set(kk, [t.n]);
    }
  }

  const positions = new Float32Array(tris.length * 9);
  const normals = new Float32Array(tris.length * 9);

  tris.forEach((t, ti) => {
    for (let k = 0; k < 3; k++) {
      const x = t.v[k * 3], y = t.v[k * 3 + 1], z = t.v[k * 3 + 2];
      let sx = 0, sy = 0, sz = 0;
      for (const n of buckets.get(key(x, y, z))!) {
        if (n[0] * t.n[0] + n[1] * t.n[1] + n[2] * t.n[2] >= CREASE_COS) { sx += n[0]; sy += n[1]; sz += n[2]; }
      }
      const l = Math.hypot(sx, sy, sz) || 1;
      sx /= l; sy /= l; sz /= l;
      const o = ti * 9 + k * 3;
      if (yUp) {
        positions[o] = x; positions[o + 1] = z; positions[o + 2] = -y;
        normals[o] = sx; normals[o + 1] = sz; normals[o + 2] = -sy;
      } else {
        positions[o] = x; positions[o + 1] = y; positions[o + 2] = z;
        normals[o] = sx; normals[o + 1] = sy; normals[o + 2] = sz;
      }
    }
  });

  return { positions, normals };
}
