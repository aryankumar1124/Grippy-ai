"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";
import type { MeshData } from "@/lib/types";

function Model({ mesh }: { mesh: MeshData }) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(mesh.positions, 3));
    g.setAttribute("normal", new THREE.BufferAttribute(mesh.normals, 3));
    g.computeBoundingSphere();
    return g;
  }, [mesh]);

  // CAD is z-up; three.js is y-up.
  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#4F7CAC" roughness={0.75} metalness={0.05} />
    </mesh>
  );
}

export default function Viewer3D({ mesh, label }: { mesh: MeshData | null; label: string }) {
  // Remount the stage when the geometry changes so the camera refits to the new size.
  const key = mesh ? `${mesh.positions.length}-${mesh.positions[0]}-${mesh.positions[mesh.positions.length - 1]}` : "empty";

  return (
    <div
      role="img"
      aria-label={label}
      className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white sm:h-[420px]"
    >
      {mesh ? (
        <Canvas shadows dpr={[1, 2]} camera={{ position: [120, 90, 160], fov: 40, near: 1, far: 5000 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[100, 200, 120]} intensity={1.6} castShadow />
          <directionalLight position={[-120, 60, -80]} intensity={0.4} />
          <Stage key={key} environment={null} intensity={0.4} shadows="contact" adjustCamera={1.3}>
            <Model mesh={mesh} />
          </Stage>
          <OrbitControls makeDefault autoRotate autoRotateSpeed={1.2} enablePan={false} />
        </Canvas>
      ) : (
        <div className="flex h-full items-center justify-center text-slate-500">Building your model…</div>
      )}
      <p className="pointer-events-none absolute bottom-3 left-4 text-sm text-slate-500">Drag to rotate · scroll to zoom</p>
    </div>
  );
}
