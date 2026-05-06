import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useStadiumStore } from '../store/useStadiumStore';
import { ROW_DEPTH, sectionBaseHeight } from '../utils/seatGeometry';
import type { StadiumSection } from '../types/stadium';

interface Props {
  section: StadiumSection;
}

export function StandSection({ section }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { hoveredSectionId, setHoveredSectionId, selectSection, view, transitionPhase } =
    useStadiumStore();
  const isHovered = hoveredSectionId === section.id;
  const isInteractive = view === 'landing' && transitionPhase === 'idle';

  const risePerRow =
    ROW_DEPTH * Math.tan(THREE.MathUtils.degToRad(section.riseAngle));
  const totalRise = section.rows * risePerRow;
  const outerRadius = section.innerRadius + section.rows * ROW_DEPTH;
  const thetaLength = section.angleEnd - section.angleStart;
  const segments = Math.max(12, Math.ceil(Math.abs(thetaLength) * 20));
  const baseH = sectionBaseHeight(section.tier);

  // Three.js CylinderGeometry uses sin/cos (angle 0 → +Z), but the project uses
  // cos/sin (angle 0 → +X). Convert: thetaStart = π/2 − angleEnd so the geometry
  // aligns with seat positions computed in seatGeometry.ts.
  const cylinderThetaStart = Math.PI / 2 - section.angleEnd;

  // Main raked surface: tapered cylinder (inner edge at bottom, outer at top)
  const bowlGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(
      outerRadius,
      section.innerRadius,
      totalRise + 1,
      segments,
      1,
      true,
      cylinderThetaStart,
      thetaLength
    );
    return geo;
  }, [outerRadius, section.innerRadius, totalRise, segments, cylinderThetaStart, thetaLength]);

  // Back wall: vertical outer cylinder
  const wallGeometry = useMemo(() => {
    const wallH = totalRise + 4;
    const geo = new THREE.CylinderGeometry(
      outerRadius + 0.5,
      outerRadius + 0.5,
      wallH,
      segments,
      1,
      true,
      cylinderThetaStart,
      thetaLength
    );
    return geo;
  }, [outerRadius, totalRise, segments, cylinderThetaStart, thetaLength]);

  const bowlMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: section.color,
        roughness: 0.75,
        metalness: 0,
        side: THREE.DoubleSide,
        emissive: new THREE.Color(section.color),
        emissiveIntensity: isHovered ? 0.35 : 0.05,
      }),
    [section.color, isHovered]
  );

  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2c2c2c',
        roughness: 0.9,
        metalness: 0.1,
        side: THREE.BackSide,
      }),
    []
  );

  const bowlY = baseH + (totalRise + 1) / 2;
  const wallY = baseH + (totalRise + 4) / 2;

  return (
    <group
      onPointerEnter={(e) => {
        e.stopPropagation();
        if (isInteractive) {
          setHoveredSectionId(section.id);
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerLeave={() => {
        if (isInteractive) {
          setHoveredSectionId(null);
          document.body.style.cursor = 'default';
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (isInteractive) selectSection(section);
      }}
    >
      <mesh ref={meshRef} geometry={bowlGeometry} material={bowlMaterial} position={[0, bowlY, 0]} />
      <mesh geometry={wallGeometry} material={wallMaterial} position={[0, wallY, 0]} />
    </group>
  );
}
