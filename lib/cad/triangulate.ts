import { geometries } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";

/** One triangle in print coordinates (mm, z-up): 3 vertices + unit face normal. */
export type Tri = { v: [number, number, number, number, number, number, number, number, number]; n: [number, number, number] };

/**
 * Fan-triangulate a Geom3 (its polygons are convex). Zero-area slivers left behind by boolean ops
 * are dropped so neither the viewer mesh nor the STL carry degenerate facets.
 */
export function triangulate(geom: Geom3): Tri[] {
  const tris: Tri[] = [];
  for (const poly of geometries.geom3.toPolygons(geom)) {
    const vs = poly.vertices;
    for (let i = 1; i < vs.length - 1; i++) {
      const a = vs[0], b = vs[i], c = vs[i + 1];
      const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      const wx = c[0] - a[0], wy = c[1] - a[1], wz = c[2] - a[2];
      const nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
      const len = Math.hypot(nx, ny, nz);
      if (len < 1e-9) continue; // area < ~5e-10 mm^2: degenerate
      tris.push({ v: [a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]], n: [nx / len, ny / len, nz / len] });
    }
  }
  return tris;
}
