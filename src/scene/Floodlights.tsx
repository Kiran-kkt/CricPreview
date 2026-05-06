import * as THREE from 'three';

const TOWER_POSITIONS: [number, number][] = [
  [68, -10],
  [40, 56],
  [-40, 56],
  [-68, -10],
  [-40, -60],
  [40, -60],
];

function FloodlightTower({ x, z }: { x: number; z: number }) {
  const lampAngle = Math.atan2(-z, -x); // face toward origin

  return (
    <group position={[x, 0, z]}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.8, 1, 8]} />
        <meshStandardMaterial color="#555" roughness={0.8} />
      </mesh>

      {/* Main pole */}
      <mesh position={[0, 22, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.8, 42, 8]} />
        <meshStandardMaterial color="#666" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Lamp arm */}
      <group position={[0, 43, 0]} rotation={[0, lampAngle, 0]}>
        <mesh position={[0, 0, -2]}>
          <boxGeometry args={[0.3, 0.3, 4]} />
          <meshStandardMaterial color="#555" roughness={0.7} />
        </mesh>
        {/* Lamp head */}
        <group position={[0, 0, -4]}>
          {/* Frame */}
          <mesh>
            <boxGeometry args={[7, 0.4, 4]} />
            <meshStandardMaterial color="#333" roughness={0.8} />
          </mesh>
          {/* Individual lights */}
          {[-2.4, -0.8, 0.8, 2.4].map((lx) =>
            [-0.8, 0.8].map((lz) => (
              <mesh key={`${lx}-${lz}`} position={[lx, 0.3, lz]}>
                <boxGeometry args={[1.2, 0.2, 1.2]} />
                <meshStandardMaterial
                  color="#fffee0"
                  emissive={new THREE.Color('#fffee0')}
                  emissiveIntensity={2}
                />
              </mesh>
            ))
          )}
          {/* Point light — illuminates the field below */}
          <pointLight
            position={[0, 2, 0]}
            intensity={600}
            distance={200}
            color="#fffee0"
            decay={1.5}
          />
        </group>
      </group>
    </group>
  );
}

export function Floodlights() {
  return (
    <>
      {TOWER_POSITIONS.map(([x, z]) => (
        <FloodlightTower key={`${x}-${z}`} x={x} z={z} />
      ))}
    </>
  );
}
