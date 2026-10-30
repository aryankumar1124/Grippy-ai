import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { AidSpec, MeshData } from "@/lib/types";

/** Mock spec used when you want to style the results without calling the API. */
export const MOCK_SPEC: AidSpec = {
  aidType: "key_turner",
  title: "Key Turner Lever",
  rationale:
    "A lever over the key gives about four times more leverage, so you can turn it with your palm instead of pinching.",
  params: { handleLength: 110, handleThickness: 22, slotWidth: 26, gripGrooves: 1 },
  safetyNotes: ["Check the fit on your key before daily use.", "PETG prints stronger than PLA for parts you twist."],
  estGrams: 18,
};

/** Rough stand-in shapes (mm, z-up, base at z=0) so the viewer and STL download work before lib/cad lands. */
function mockGeometry(spec: AidSpec): THREE.BufferGeometry {
  const p = spec.params;
  const parts: THREE.BufferGeometry[] = [];

  if (spec.aidType === "key_turner") {
    const L = p.handleLength ?? 90;
    const T = p.handleThickness ?? 18;
    const W = (p.slotWidth ?? 26) + 12;
    const handle = new THREE.BoxGeometry(L, T, 22);
    handle.translate(L / 2, 0, 11);
    const head = new THREE.CylinderGeometry(W / 2, W / 2, 22, 48);
    head.rotateX(Math.PI / 2);
    head.translate(0, 0, 11);
    parts.push(handle, head);
  } else {
    const D = p.outerDiameter ?? 26;
    const L = p.length ?? 60;
    const body = new THREE.CylinderGeometry(D / 2, D / 2, L, 48);
    body.rotateZ(Math.PI / 2); // lie along x
    body.translate(0, 0, D / 2);
    parts.push(body);
  }

  const clean = parts.map((g) => g.toNonIndexed());
  const merged = mergeGeometries(clean) ?? clean[0];
  merged.computeVertexNormals();
  return merged;
}

function toBinaryStl(positions: Float32Array, normals: Float32Array): Blob {
  const triangles = positions.length / 9;
  const buffer = new ArrayBuffer(84 + triangles * 50);
  const view = new DataView(buffer);
  view.setUint32(80, triangles, true);
  let o = 84;
  for (let t = 0; t < triangles; t++) {
    const i = t * 9;
    view.setFloat32(o, normals[i], true);
    view.setFloat32(o + 4, normals[i + 1], true);
    view.setFloat32(o + 8, normals[i + 2], true);
    o += 12;
    for (let v = 0; v < 9; v++) {
      view.setFloat32(o, positions[i + v], true);
      o += 4;
    }
    o += 2;
  }
  return new Blob([buffer], { type: "model/stl" });
}

export function mockBuildModel(spec: AidSpec): { mesh: MeshData; stl: Blob } {
  const geom = mockGeometry(spec);
  const positions = new Float32Array(geom.getAttribute("position").array as ArrayLike<number>);
  const normals = new Float32Array(geom.getAttribute("normal").array as ArrayLike<number>);
  return { mesh: { positions, normals }, stl: toBinaryStl(positions, normals) };
}
