import type { SectionZone } from '../types/stadium';

export const ZONE_COLORS: Record<SectionZone, string> = {
  premium: '#E8B86D',
  general: '#4A90E2',
  terrace: '#6DB878',
  corporate: '#C96DD8',
};

export const ZONE_HOVER_COLORS: Record<SectionZone, string> = {
  premium: '#F5D08A',
  general: '#6AABF0',
  terrace: '#8DD49A',
  corporate: '#DC8FF0',
};

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}
