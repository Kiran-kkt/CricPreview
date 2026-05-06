import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStadiumStore } from '../store/useStadiumStore';

const DURATION = 2.2;
const BIRDSEYE_POS = new THREE.Vector3(0, 150, 70);
const BIRDSEYE_TARGET = new THREE.Vector3(0, 0, 0);

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function quadraticBezier(
  t: number,
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  out: THREE.Vector3
): THREE.Vector3 {
  const mt = 1 - t;
  out.x = mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x;
  out.y = mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y;
  out.z = mt * mt * p0.z + 2 * mt * t * p1.z + t * t * p2.z;
  return out;
}

export function useCameraTransition() {
  const tRef = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const controlPt = useRef(new THREE.Vector3());
  const endPos = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const endTarget = useRef(new THREE.Vector3());
  const prevPhase = useRef<string>('idle');
  const scratchPos = useRef(new THREE.Vector3());
  const scratchTarget = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const store = useStadiumStore.getState();
    const { transitionPhase, selectedSeat, setTransitionPhase, _finishReturn } = store;

    // Detect new transition start
    if (transitionPhase !== prevPhase.current) {
      if (transitionPhase === 'to-pov' && selectedSeat) {
        // Capture current camera as start
        startPos.current.copy(state.camera.position);
        startTarget.current.copy(BIRDSEYE_TARGET);

        // Target = eye position at seat
        const [x, y, z] = selectedSeat.worldPosition;
        endPos.current.set(x, y, z);

        // Look-at target = stumps
        const [lx, ly, lz] = selectedSeat.lookAtTarget;
        endTarget.current.set(lx, ly, lz);

        // Bezier control point: midpoint elevated by 40m
        controlPt.current.addVectors(startPos.current, endPos.current).multiplyScalar(0.5);
        controlPt.current.y += 40;

        tRef.current = 0;
      } else if (transitionPhase === 'to-overview') {
        // Capture current camera as start (POV position)
        startPos.current.copy(state.camera.position);
        if (selectedSeat) {
          const [lx, ly, lz] = selectedSeat.lookAtTarget;
          startTarget.current.set(lx, ly, lz);
        } else {
          startTarget.current.set(0, 0, 0);
        }

        endPos.current.copy(BIRDSEYE_POS);
        endTarget.current.copy(BIRDSEYE_TARGET);

        // Bezier control: elevated arc above the stadium
        controlPt.current.addVectors(startPos.current, endPos.current).multiplyScalar(0.5);
        controlPt.current.y += 35;

        tRef.current = 0;
      }
      prevPhase.current = transitionPhase;
    }

    if (transitionPhase !== 'to-pov' && transitionPhase !== 'to-overview') return;

    tRef.current = Math.min(tRef.current + delta / DURATION, 1);
    const ease = easeInOutCubic(tRef.current);

    // Animate camera along bezier arc
    quadraticBezier(
      ease,
      startPos.current,
      controlPt.current,
      endPos.current,
      scratchPos.current
    );
    state.camera.position.copy(scratchPos.current);

    // Lerp lookAt target
    scratchTarget.current.lerpVectors(startTarget.current, endTarget.current, ease);
    state.camera.lookAt(scratchTarget.current);

    if (tRef.current >= 1) {
      if (transitionPhase === 'to-pov') {
        setTransitionPhase('idle');
      } else if (transitionPhase === 'to-overview') {
        _finishReturn();
      }
    }
  });
}
