import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import { triangulate } from "./triangulate";

/**
 * Binary STL (mm, z-up, flat base at z=0) as a Blob, ready for download.
 * Written directly from the cleaned triangle list (no zero-area facets).
 * Format: 80-byte header, uint32 count, then per triangle 12 float32 (normal + 3 vertices) + uint16 attr.
 */
export function toStlBlob(geom: Geom3): Blob {
  const tris = triangulate(geom);
  const buf = new ArrayBuffer(84 + 50 * tris.length);
  const dv = new DataView(buf);
  const header = "AdaptiveMake adaptive aid, units: mm";
  for (let i = 0; i < header.length; i++) dv.setUint8(i, header.charCodeAt(i));
  dv.setUint32(80, tris.length, true);
  let o = 84;
  for (const t of tris) {
    for (const x of t.n) { dv.setFloat32(o, x, true); o += 4; }
    for (const x of t.v) { dv.setFloat32(o, x, true); o += 4; }
    dv.setUint16(o, 0, true); o += 2;
  }
  return new Blob([buf], { type: "model/stl" });
}
