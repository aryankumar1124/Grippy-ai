import { primitives, booleans } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import { Profile, revolve } from "../revolve";

const { cuboid } = primitives;
const { subtract } = booleans;

const SEGMENTS = 48;
const MIN_WALL = 2; // mm

export type UtensilHandleParams = {
  outerDiameter: number;
  length: number;
  slotWidth: number;
  slotThickness: number;
};

/** Built-up utensil handle. Axis along z, flat base at z=0, filleted ends; slot opens on the top end and runs 70% of the length. mm. */
export function utensilHandle(p: UtensilHandleParams): Geom3 {
  const { outerDiameter, length, slotThickness } = p;
  const R = outerDiameter / 2;
  const rr = Math.max(0.5, Math.min(4, R - 0.5, length / 2 - 0.5));

  // keep the slot's diagonal inside the cylinder with MIN_WALL on every side
  const maxDiag = outerDiameter - 2 * MIN_WALL;
  const slotWidth = Math.min(p.slotWidth, Math.sqrt(Math.max(1, maxDiag * maxDiag - slotThickness * slotThickness)));

  const prof = new Profile();
  prof.add(0, 0).add(R - rr, 0).arc(R - rr, rr, rr, -Math.PI / 2, 0, 8);
  prof.add(R, length - rr).arc(R - rr, length - rr, rr, 0, Math.PI / 2, 8).add(0, length);
  const body = revolve(prof.pts, SEGMENTS);

  const slotDepth = length * 0.7;
  const slot = cuboid({
    center: [0, 0, length - slotDepth / 2 + 1],
    size: [slotWidth, slotThickness, slotDepth + 2],
  });
  return subtract(body, slot);
}
