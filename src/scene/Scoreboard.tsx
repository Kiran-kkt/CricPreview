import * as THREE from 'three';

function ScoreboardUnit({ position, rotation }: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Structure */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[18, 10, 1.2]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>

      {/* Screen face */}
      <mesh position={[0, 0.5, 0.65]}>
        <boxGeometry args={[15.5, 7.5, 0.05]} />
        <meshStandardMaterial
          color="#111111"
          roughness={0.6}
          emissive={new THREE.Color('#0a1a0a')}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Score digits placeholders */}
      {[-4, -1.3, 1.3, 4].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0.7]}>
          <boxGeometry args={[2, 4, 0.02]} />
          <meshStandardMaterial
            color="#003300"
            emissive={new THREE.Color('#003300')}
            emissiveIntensity={1}
          />
        </mesh>
      ))}

      {/* Support legs */}
      {[-7, 7].map((x, i) => (
        <mesh key={i} position={[x, -8, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.6, 6, 8]} />
          <meshStandardMaterial color="#333" roughness={0.8} />
        </mesh>
      ))}

      {/* Sponsor banner strip */}
      <mesh position={[0, -4, 0.65]}>
        <boxGeometry args={[15.5, 1.2, 0.05]} />
        <meshStandardMaterial
          color="#c8a030"
          roughness={0.5}
          emissive={new THREE.Color('#c8a030')}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

export function Scoreboard() {
  return (
    <>
      {/* North end scoreboard */}
      <ScoreboardUnit
        position={[0, 13, -52]}
        rotation={[0, 0, 0]}
      />
      {/* South end scoreboard */}
      <ScoreboardUnit
        position={[0, 13, 52]}
        rotation={[0, Math.PI, 0]}
      />
    </>
  );
}
