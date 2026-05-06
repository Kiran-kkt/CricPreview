import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useStadiumStore } from '../store/useStadiumStore';
import { computeInitialYaw } from '../utils/seatGeometry';
import { STADIUM_SECTIONS } from '../data/stadiumConfig';

export function POVCamera() {
  const { gl, camera } = useThree();
  const { selectedSeat } = useStadiumStore();

  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  // Set initial look direction toward pitch when seat is selected
  useEffect(() => {
    if (!selectedSeat || initialized.current) return;
    const section = STADIUM_SECTIONS.find((s) => s.id === selectedSeat.sectionId);
    if (!section) return;

    const yaw = computeInitialYaw(section, selectedSeat.seatNumber);
    euler.current.y = yaw;

    // Compute downward tilt to aim at stumps (y=0.7) from actual eye position
    const [cx, cy, cz] = selectedSeat.worldPosition;
    const hDist = Math.sqrt(cx * cx + cz * cz);
    euler.current.x = Math.atan2(0.7 - cy, hDist);

    initialized.current = true;
  }, [selectedSeat]);

  // Reset on unmount
  useEffect(() => {
    return () => {
      initialized.current = false;
    };
  }, []);

  // Pointer / touch look-around
  useEffect(() => {
    const el = gl.domElement;

    const onDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };

      euler.current.y -= dx * 0.0035;
      euler.current.x -= dy * 0.0035;
      euler.current.x = THREE.MathUtils.clamp(
        euler.current.x,
        -Math.PI / 5,   // −36° down
        Math.PI / 2.5   // +72° up
      );
    };

    const onUp = () => {
      isDragging.current = false;
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [gl.domElement]);

  useFrame(() => {
    if (!selectedSeat) return;
    const [x, y, z] = selectedSeat.worldPosition; // already includes eye height
    camera.position.set(x, y, z);
    camera.quaternion.setFromEuler(euler.current);
  });

  return null;
}
