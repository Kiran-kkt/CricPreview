import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useStadiumStore } from '../store/useStadiumStore';
import { computeSeatWorldPosition } from '../utils/seatGeometry';

const SEAT_W = 0.42;
const SEAT_H = 0.08;
const SEAT_D = 0.42;

export function SeatGrid() {
  const { selectedSection, selectedSeat } = useStadiumStore();
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current || !selectedSection) return;

    const dummy = new THREE.Object3D();
    const towardOrigin = new THREE.Vector3();
    const defaultFwd = new THREE.Vector3(0, 0, 1);
    let idx = 0;

    for (let row = 1; row <= selectedSection.rows; row++) {
      for (let seat = 1; seat <= selectedSection.seatsPerRow; seat++) {
        const [x, y, z] = computeSeatWorldPosition(selectedSection, row, seat);
        dummy.position.set(x, y, z);

        // Face inward toward pitch center
        towardOrigin.set(-x, 0, -z).normalize();
        dummy.quaternion.setFromUnitVectors(defaultFwd, towardOrigin);
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(idx, dummy.matrix);

        // Highlight selected seat
        const isSelected =
          selectedSeat?.row === row && selectedSeat?.seatNumber === seat;
        meshRef.current.setColorAt(
          idx,
          new THREE.Color(isSelected ? '#ffffff' : selectedSection.color)
        );
        idx++;
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [selectedSection, selectedSeat]);

  if (!selectedSection) return null;

  const count = selectedSection.rows * selectedSection.seatsPerRow;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[SEAT_W, SEAT_H, SEAT_D]} />
      <meshStandardMaterial
        color={selectedSection.color}
        roughness={0.6}
        metalness={0.1}
        vertexColors
      />
    </instancedMesh>
  );
}
