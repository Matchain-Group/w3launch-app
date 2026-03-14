import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const createPoints = (count, radius) => {
  const points = [];
  for (let i = 0; i < count; i += 1) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
};

const Globe = () => {
  const group = useRef();
  const points = useMemo(() => createPoints(180, 2.4), []);
  const connections = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < 42; i += 1) {
      const a = points[Math.floor(Math.random() * points.length)];
      const b = points[Math.floor(Math.random() * points.length)];
      pairs.push([a, b]);
    }
    return pairs;
  }, [points]);

  const positions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((point, index) => {
      arr[index * 3] = point.x;
      arr[index * 3 + 1] = point.y;
      arr[index * 3 + 2] = point.z;
    });
    return arr;
  }, [points]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.15;
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#00C2FF" size={0.03} opacity={0.8} transparent />
      </points>
      {connections.map((pair, index) => (
        <Line
          key={`line-${index}`}
          points={pair}
          color="#7B2FBE"
          lineWidth={0.5}
          transparent
          opacity={0.25}
        />
      ))}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#113"
          wireframe
          opacity={0.2}
          transparent
        />
      </mesh>
    </group>
  );
};

export default function GlobeCanvas() {
  return (
    <div className="absolute inset-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <Globe />
      </Canvas>
    </div>
  );
}
