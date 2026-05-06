export type SectionZone = 'premium' | 'general' | 'terrace' | 'corporate';
export type AppView = 'landing' | 'section-select' | 'pov';
export type TransitionPhase = 'idle' | 'to-pov' | 'to-overview';

export interface StadiumSection {
  id: string;
  label: string;
  zone: SectionZone;
  angleStart: number;
  angleEnd: number;
  tier: 'lower' | 'upper';
  rows: number;
  seatsPerRow: number;
  innerRadius: number;
  riseAngle: number;
  color: string;
}

export interface SelectedSeat {
  sectionId: string;
  row: number;
  seatNumber: number;
  worldPosition: [number, number, number];
  lookAtTarget: [number, number, number];
}
