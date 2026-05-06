import { Sky } from '@react-three/drei';
import * as THREE from 'three';

export function SkyEnvironment() {
  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[100, 50, -80]}
        inclination={0.5}
        azimuth={0.25}
        turbidity={4}
        rayleigh={0.8}
      />
      <ambientLight intensity={0.6} color="#d4e8ff" />
      <directionalLight
        position={[80, 120, -60]}
        intensity={2.5}
        color="#fff8e7"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={400}
        shadow-camera-left={-120}
        shadow-camera-right={120}
        shadow-camera-top={120}
        shadow-camera-bottom={-120}
      />
      {/* Fill light from opposite side */}
      <directionalLight
        position={[-60, 40, 80]}
        intensity={0.6}
        color="#aac8ff"
      />
      <hemisphereLight
        args={['#87ceeb', '#2d5a1b', 0.4]}
      />
      <fog attach="fog" args={['#b8d4f0', 250, 500]} />
    </>
  );
}
