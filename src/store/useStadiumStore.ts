import { create } from 'zustand';
import type { AppView, SelectedSeat, StadiumSection, TransitionPhase } from '../types/stadium';
import {
  computeSeatEyePosition,
  computeSeatLookAt,
} from '../utils/seatGeometry';
import { STADIUM_SECTIONS } from '../data/stadiumConfig';

interface StadiumState {
  view: AppView;
  transitionPhase: TransitionPhase;
  hoveredSectionId: string | null;
  selectedSection: StadiumSection | null;
  selectedSeat: SelectedSeat | null;

  setView: (v: AppView) => void;
  setTransitionPhase: (p: TransitionPhase) => void;
  setHoveredSectionId: (id: string | null) => void;
  setSelectedSection: (s: StadiumSection | null) => void;

  // Compound actions
  selectSection: (section: StadiumSection) => void;
  confirmSeat: (row: number, seatNumber: number) => void;
  returnToOverview: () => void;
  _finishReturn: () => void;
}

export const useStadiumStore = create<StadiumState>((set, get) => ({
  view: 'landing',
  transitionPhase: 'idle',
  hoveredSectionId: null,
  selectedSection: null,
  selectedSeat: null,

  setView: (v) => set({ view: v }),
  setTransitionPhase: (p) => set({ transitionPhase: p }),
  setHoveredSectionId: (id) => set({ hoveredSectionId: id }),
  setSelectedSection: (s) => set({ selectedSection: s }),

  selectSection: (section) => {
    document.body.style.cursor = 'default';
    set({ selectedSection: section, view: 'section-select' });
  },

  confirmSeat: (row, seatNumber) => {
    const { selectedSection } = get();
    if (!selectedSection) return;

    const worldPosition = computeSeatEyePosition(selectedSection, row, seatNumber);
    const lookAtTarget = computeSeatLookAt();

    const seat: SelectedSeat = {
      sectionId: selectedSection.id,
      row,
      seatNumber,
      worldPosition,
      lookAtTarget,
    };

    set({ selectedSeat: seat, view: 'pov', transitionPhase: 'to-pov' });
  },

  returnToOverview: () => {
    set({ transitionPhase: 'to-overview' });
  },

  // Called by the camera transition hook when the return animation finishes
  _finishReturn: () => {
    set({
      view: 'landing',
      transitionPhase: 'idle',
      selectedSection: null,
      selectedSeat: null,
      hoveredSectionId: null,
    });
  },
}));

// Selector helpers
export const getSectionById = (id: string) =>
  STADIUM_SECTIONS.find((s) => s.id === id);
