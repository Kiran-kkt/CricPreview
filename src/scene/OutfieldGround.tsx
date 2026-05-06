import * as THREE from 'three';

export function OutfieldGround() {
  return (
    <group>
      {/* Main grass oval */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[200, 128]} />
        <meshStandardMaterial
          color="#2e6b2e"
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      {/* Playing surface - lighter green */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[50, 96]} />
        <meshStandardMaterial
          color="#3a8a3a"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Inner circle (30-yard circle) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[27.43, 27.93, 128]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Boundary rope */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[47.5, 48.5, 128]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.6}
          emissive={new THREE.Color('#ffffff')}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Ground plane extending to horizon */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#1a3d1a" roughness={1} />
      </mesh>
    </group>
  );
}
