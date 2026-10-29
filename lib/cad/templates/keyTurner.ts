import { primitives, booleans, transforms } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";

const { roundedCuboid, cuboid, cylinder } = primitives;
const { union, subtract } = booleans;
const { rotateX } = transforms;

const SEGMENTS = 32;
const HEIGHT = 22; // lever height (z), mm
const KEY_SLOT_THICKNESS = 3; // mm, thickness of the key bow slot
const SLOT_DEPTH = 16; // mm, pocket depth from the top face
const HEAD_MARGIN = 14; // mm, extra head length beyond slotWidth (7mm wall each side)

export type KeyTurnerParams = {
  handleLength: number;
  handleThickness: number;
  slotWidth: number;
  gripGrooves: number;
};

/**
 * Key turner lever. Flat base at z=0. Head centred on x=0 holds a slot (opens on the top face)
 * for the key bow; the handle extends along +x. mm.
 */
export function keyTurner(p: KeyTurnerParams): Geom3 {
  const { handleLength, handleThickness, slotWidth, gripGrooves } = p;

  const headL = slotWidth + HEAD_MARGIN;
  const headW = handleThickness + 8;
  const r = (minDim: number) => Math.max(0.5, Math.min(4, minDim / 2 - 0.6));

  const head = roundedCuboid({
    center: [0, 0, HEIGHT / 2],
    size: [headL, headW, HEIGHT],
    roundRadius: r(Math.min(headL, headW, HEIGHT)),
    segments: SEGMENTS,
  });

  // handle runs from inside the head out to handleLength past the slot centre
  const hStart = 0;
  const hLen = handleLength - hStart;
  const handle = roundedCuboid({
    center: [hStart + hLen / 2, 0, HEIGHT / 2],
    size: [hLen, handleThickness, HEIGHT],
    roundRadius: r(Math.min(hLen, handleThickness, HEIGHT)),
    segments: SEGMENTS,
  });

  let body = union(head, handle);

  // key slot: slotWidth along x, KEY_SLOT_THICKNESS along y, open at the top
  const slot = cuboid({
    center: [0, 0, HEIGHT - SLOT_DEPTH / 2 + 1],
    size: [slotWidth, KEY_SLOT_THICKNESS, SLOT_DEPTH + 2],
  });
  body = subtract(body, slot);

  if (gripGrooves >= 0.5) {
    // scallops across the top of the handle (cylinders along y)
    const spacing = 18;
    const grooveR = 8;
    const depth = 3;
    const regionStart = headL / 2 + 6;
    const regionEnd = handleLength - 8;
    const n = Math.max(1, Math.min(4, Math.floor((regionEnd - regionStart) / spacing) + 1));
    const total = (n - 1) * spacing;
    const mid = (regionStart + regionEnd) / 2;
    const cutters: Geom3[] = [];
    for (let i = 0; i < n; i++) {
      const x = mid - total / 2 + i * spacing;
      const c = rotateX(Math.PI / 2, cylinder({
        center: [0, 0, 0],
        height: handleThickness + 20,
        radius: grooveR,
        segments: 32,
      }));
      cutters.push(transforms.translate([x, 0, HEIGHT + grooveR - depth], c) as Geom3);
    }
    body = subtract(body, ...cutters);
  }

  return body;
}
