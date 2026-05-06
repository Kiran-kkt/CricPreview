import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import { StadiumScene } from './scene/StadiumScene';
import { LandingOverlay } from './components/LandingOverlay';
import { SectionPanel } from './components/SectionPanel';
import { POVOverlay } from './components/POVOverlay';
import { TransitionScreen } from './components/TransitionScreen';
import { useStadiumStore } from './store/useStadiumStore';

export default function App() {
  const { view, transitionPhase } = useStadiumStore();

  const showLanding = view === 'landing' && transitionPhase === 'idle';
  const showSectionPanel = view === 'section-select' && transitionPhase === 'idle';
  const showPOVOverlay = view === 'pov' && transitionPhase === 'idle';

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      {/* Single persistent 3D canvas */}
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 150, 70], fov: 55, near: 0.5, far: 800 }}
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a14');
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = 1; // PCFSoftShadowMap
        }}
      >
        <Suspense fallback={null}>
          <StadiumScene />
        </Suspense>
      </Canvas>

      {/* DOM overlay layer — pointer-events: none by default so canvas stays interactive.
          Individual interactive elements restore pointer-events as needed. */}
      <div className="absolute inset-0 pointer-events-none">

        <AnimatePresence>
          {showLanding && (
            // LandingOverlay has pointer-events-auto on its interactive elements internally
            <div className="absolute inset-0">
              <LandingOverlay />
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSectionPanel && <SectionPanel />}
        </AnimatePresence>

        <AnimatePresence>
          {showPOVOverlay && (
            // POVOverlay buttons need pointer events; canvas drag still works
            // because POVCamera listens on gl.domElement (the canvas), not the overlay
            <div className="absolute inset-0 pointer-events-none">
              <POVOverlay />
            </div>
          )}
        </AnimatePresence>

        <TransitionScreen />

        {/* Loading fallback is shown via Suspense inside Canvas */}
      </div>

      {/* Standalone loading screen shown before scene mounts */}
      <LoadingScreen />
    </div>
  );
}

function LoadingScreen() {
  // This is behind the Canvas; Canvas hides it once rendered
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-zinc-950 -z-10"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
        <span className="text-white/35 text-sm">Loading stadium…</span>
      </div>
    </div>
  );
}
