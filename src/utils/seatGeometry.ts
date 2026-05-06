import * as THREE from 'three';
import type { StadiumSection } from '../types/stadium';

export const ROW_DEPTH = 0.85;
export const STAND_BASE_HEIGHT = 2.0;
export const TIER_LIFT = 15.0;
export const EYE_HEIGHT = 1.2;

export function sectionBaseHeight(tier: 'lower' | 'upper'): number {
  return tier === 'upper' ? STAND_BASE_HEIGHT + TIER_LIFT : STAND_BASE_HEIGHT;
}

export function computeSeatWorldPosition(
  section: StadiumSection,
  row: number,
  seatNumber: number
): [number, number, number] {
  const arcFraction = (seatNumber - 0.5) / section.seatsPerRow;
  const azimuth =
    section.angleStart + arcFraction * (section.angleEnd - section.angleStart);

  const radius = section.innerRadius + (row - 1) * ROW_DEPTH;
  const risePerRow =
    ROW_DEPTH * Math.tan(THREE.MathUtils.degToRad(section.riseAngle));
  const base = sectionBaseHeight(section.tier);
  const y = base + (row - 1) * risePerRow;

  return [radius * Math.cos(azimuth), y, radius * Math.sin(azimuth)];
}

export function computeSeatEyePosition(
  section: StadiumSection,
  row: number,
  seatNumber: number
): [number, number, number] {
  const [x, y, z] = computeSeatWorldPosition(section, row, seatNumber);
  return [x, y + EYE_HEIGHT, z];
}

export function computeSeatLookAt(): [number, number, number] {
  return [0, 0.7, 0];
}

// Initial yaw so POV camera faces toward the pitch on entry
export function computeInitialYaw(
  section: StadiumSection,
  seatNumber: number
): number {
  const arcFraction = (seatNumber - 0.5) / section.seatsPerRow;
  const azimuth =
    section.angleStart + arcFraction * (section.angleEnd - section.angleStart);
  // In Three.js Euler YXZ, camera forward = (-sin(y), 0, -cos(y)).
  // To face origin from seat at azimuth: forward must equal (-cos(azimuth), 0, -sin(azimuth))
  // → sin(y) = cos(azimuth), cos(y) = sin(azimuth) → y = π/2 - azimuth
  return Math.PI / 2 - azimuth;
}
