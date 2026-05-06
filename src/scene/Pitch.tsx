export function Pitch() {
  return (
    <group>
      {/* Cricket square — the ~12m×28m prepared area, clearly visible from bird's-eye */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[12, 28]} />
        <meshStandardMaterial color="#a8906a" roughness={0.95} metalness={0} />
      </mesh>

      {/* Pitch surface — raised clear of the inner circle to avoid z-fighting */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]} receiveShadow>
        <planeGeometry args={[3.05, 20.12]} />
        <meshStandardMaterial color="#d4b87c" roughness={0.8} metalness={0} />
      </mesh>

      {/* Bowling crease (south end) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.065, 8.38]}>
        <planeGeometry args={[3.65, 0.07]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      {/* Popping crease (south) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.065, 7.16]}>
        <planeGeometry args={[3.65, 0.07]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>

      {/* Bowling crease (north end) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.065, -8.38]}>
        <planeGeometry args={[3.65, 0.07]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      {/* Popping crease (north) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.065, -7.16]}>
        <planeGeometry args={[3.65, 0.07]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>

      {/* Return crease lines (south) */}
      {[-1.32, 1.32].map((x) => (
        <mesh key={`rc-s-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.065, 7.79]}>
          <planeGeometry args={[0.07, 2.5]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>
      ))}
      {/* Return crease lines (north) */}
      {[-1.32, 1.32].map((x) => (
        <mesh key={`rc-n-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.065, -7.79]}>
          <planeGeometry args={[0.07, 2.5]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>
      ))}

      {/* Stumps (south) — base embeds into pitch surface */}
      {[-0.11, 0, 0.11].map((x, i) => (
        <mesh key={`stump-s-${i}`} position={[x, 0.42, 8.38]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.72, 8]} />
          <meshStandardMaterial color="#f5f0e0" roughness={0.6} />
        </mesh>
      ))}
      {/* Stumps (north) */}
      {[-0.11, 0, 0.11].map((x, i) => (
        <mesh key={`stump-n-${i}`} position={[x, 0.42, -8.38]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.72, 8]} />
          <meshStandardMaterial color="#f5f0e0" roughness={0.6} />
        </mesh>
      ))}

      {/* Bails (south) */}
      {[-0.055, 0.055].map((x, i) => (
        <mesh key={`bail-s-${i}`} position={[x, 0.79, 8.38]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.12, 6]} />
          <meshStandardMaterial color="#f5f0e0" roughness={0.6} />
        </mesh>
      ))}
      {/* Bails (north) */}
      {[-0.055, 0.055].map((x, i) => (
        <mesh key={`bail-n-${i}`} position={[x, 0.79, -8.38]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.12, 6]} />
          <meshStandardMaterial color="#f5f0e0" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
