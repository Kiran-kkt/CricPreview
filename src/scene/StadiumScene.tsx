import { OrbitControls } from '@react-three/drei';
import { useStadiumStore } from '../store/useStadiumStore';
import { useCameraTransition } from '../hooks/useCameraTransition';
import { SkyEnvironment } from './SkyEnvironment';
import { OutfieldGround } from './OutfieldGround';
import { Pitch } from './Pitch';
import { Stands } from './Stands';
import { SeatGrid } from './SeatGrid';
import { Floodlights } from './Floodlights';
import { Scoreboard } from './Scoreboard';
import { POVCamera } from './POVCamera';

function CameraController() {
  useCameraTransition();
  return null;
}

export function StadiumScene() {
  const { view, transitionPhase } = useStadiumStore();

  const orbitEnabled =
    transitionPhase === 'idle' && view !== 'pov';

  const showSeatGrid = view === 'pov' || view === 'section-select';
  const showPOVCamera = view === 'pov' && transitionPhase === 'idle';

  return (
    <>
      <SkyEnvironment />
      <OutfieldGround />
      <Pitch />
      <Stands />
      <Floodlights />
      <Scoreboard />

      {showSeatGrid && <SeatGrid />}
      {showPOVCamera && <POVCamera />}

      <CameraController />

      <OrbitControls
        makeDefault
        enabled={orbitEnabled}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.8}
        minDistance={80}
        maxDistance={230}
        enablePan={false}
        target={[0, 0, 0]}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}
