"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MOUSE = { x: 0, y: 0 };

function useMouseTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      MOUSE.x = (e.clientX / window.innerWidth) * 2 - 1;
      MOUSE.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
}

interface Node {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  base: THREE.Vector3;
}

function LineNetwork({ nodeCount = 60, maxDist = 2.2 }) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const { viewport } = useThree();

  const smoothMouse = useRef({ x: 0, y: 0 });

  const nodes = useMemo<Node[]>(() => {
    const arr: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5
      );
      arr.push({
        pos: pos.clone(),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.002
        ),
        base: pos.clone(),
      });
    }
    return arr;
  }, [nodeCount]);

  const pointPositions = useMemo(
    () => new Float32Array(nodeCount * 3),
    [nodeCount]
  );

  const linePositions = useMemo(
    () => new Float32Array(nodeCount * nodeCount * 6),
    [nodeCount]
  );
  const lineColors = useMemo(
    () => new Float32Array(nodeCount * nodeCount * 6),
    [nodeCount]
  );

  useFrame(() => {
    smoothMouse.current.x += (MOUSE.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (MOUSE.y - smoothMouse.current.y) * 0.05;

    const mx = smoothMouse.current.x * viewport.width * 0.3;
    const my = smoothMouse.current.y * viewport.height * 0.3;

    for (let i = 0; i < nodeCount; i++) {
      const n = nodes[i];
      n.pos.add(n.vel);

      // drift back toward base
      n.pos.x += (n.base.x - n.pos.x) * 0.001;
      n.pos.y += (n.base.y - n.pos.y) * 0.001;
      n.pos.z += (n.base.z - n.pos.z) * 0.001;

      pointPositions[i * 3] = n.pos.x + mx;
      pointPositions[i * 3 + 1] = n.pos.y + my;
      pointPositions[i * 3 + 2] = n.pos.z;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }

    // build lines
    let lineIdx = 0;
    const color = new THREE.Color("#6366f1");

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const ax = pointPositions[i * 3];
        const ay = pointPositions[i * 3 + 1];
        const az = pointPositions[i * 3 + 2];
        const bx = pointPositions[j * 3];
        const by = pointPositions[j * 3 + 1];
        const bz = pointPositions[j * 3 + 2];

        const dx = ax - bx;
        const dy = ay - by;
        const dz = az - bz;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          const alpha = 1 - dist / maxDist;

          linePositions[lineIdx * 6] = ax;
          linePositions[lineIdx * 6 + 1] = ay;
          linePositions[lineIdx * 6 + 2] = az;
          linePositions[lineIdx * 6 + 3] = bx;
          linePositions[lineIdx * 6 + 4] = by;
          linePositions[lineIdx * 6 + 5] = bz;

          lineColors[lineIdx * 6] = color.r * alpha;
          lineColors[lineIdx * 6 + 1] = color.g * alpha;
          lineColors[lineIdx * 6 + 2] = color.b * alpha;
          lineColors[lineIdx * 6 + 3] = color.r * alpha;
          lineColors[lineIdx * 6 + 4] = color.g * alpha;
          lineColors[lineIdx * 6 + 5] = color.b * alpha;

          lineIdx++;
        }
      }
    }

    if (linesRef.current) {
      const geo = linesRef.current.geometry;
      geo.setDrawRange(0, lineIdx * 2);
      (geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate =
        true;
      (geo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#6366f1"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

function Scene() {
  useMouseTracker();
  return <LineNetwork />;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
