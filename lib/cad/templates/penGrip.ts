import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import { Profile, revolve } from "../revolve";

const SEGMENTS = 48;
const PEN_CLEARANCE = 0.3; // mm added to the hole diameter so a pen actually slides in when printed
const MIN_WALL = 2; // mm
const GROOVE_TUBE_R = 2.5; // mm, radius of each ring groove

export type PenGripParams = {
  outerDiameter: number;
  length: number;
  penDiameter: number;
  gripGrooves: number;
};

/**
 * Pen grip sleeve. Axis along z, flat base at z=0, filleted outer edges. mm.
 * Built as ONE revolved wall profile (hole + ring grooves included), so no boolean ops: fast and always valid.
 */
export function penGrip(p: PenGripParams): Geom3 {
  const { outerDiameter, length, gripGrooves } = p;
  const R = outerDiameter / 2;
  const holeD = Math.min(p.penDiameter + PEN_CLEARANCE, outerDiameter - 2 * MIN_WALL);
  const rh = holeD / 2;
  const wall = R - rh;
  const rr = Math.max(0.5, Math.min(3, wall - 0.5, length / 2 - 0.5)); // edge fillet radius

  const prof = new Profile();
  prof.add(rh, 0).add(R - rr, 0).arc(R - rr, rr, rr, -Math.PI / 2, 0, 8); // base + bottom fillet -> (R, rr)

  if (gripGrooves >= 0.5) {
    const depth = Math.min(2, wall * 0.4);
    const cr = R + GROOVE_TUBE_R - depth; // groove circle centre sits outside the wall
    const a0 = Math.acos((GROOVE_TUBE_R - depth) / GROOVE_TUBE_R);
    for (const f of [0.25, 0.5, 0.75]) {
      const zc = length * f;
      for (let i = 0; i <= 12; i++) {
        const a = -a0 + (2 * a0 * i) / 12;
        prof.add(cr - GROOVE_TUBE_R * Math.cos(a), zc + GROOVE_TUBE_R * Math.sin(a));
      }
    }
  }

  prof.add(R, length - rr).arc(R - rr, length - rr, rr, 0, Math.PI / 2, 8).add(rh, length); // top fillet -> hole edge
  return revolve(prof.pts, SEGMENTS);
}
