import { primitives, extrusions } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";

export type Pt = [number, number]; // [radius, height] in mm

/** Collects profile points, skipping duplicates so the polygon has no zero-length edges. */
export class Profile {
  pts: Pt[] = [];
  add(r: number, z: number) {
    const last = this.pts[this.pts.length - 1];
    if (last && Math.hypot(last[0] - r, last[1] - z) < 1e-6) return this;
    this.pts.push([r, z]);
    return this;
  }
  /** Arc around (cr, cz) from angle a0 to a1 (radians), n steps, endpoints included. */
  arc(cr: number, cz: number, radius: number, a0: number, a1: number, n: number) {
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      this.add(cr + radius * Math.cos(a), cz + radius * Math.sin(a));
    }
    return this;
  }
}

/** Revolve a counter-clockwise (radius, height) profile around the z axis. Result has z-up, flat faces stay flat. */
export function revolve(points: Pt[], segments: number): Geom3 {
  const shape = primitives.polygon({ points });
  return extrusions.extrudeRotate({ segments }, shape);
}
