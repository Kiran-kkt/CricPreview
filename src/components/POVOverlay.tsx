import { motion } from 'framer-motion';
import { useStadiumStore } from '../store/useStadiumStore';
import { ZONE_COLORS, ZONE_LABELS } from '../data/stadiumConfig';
import { CompassHint } from './CompassHint';

export function POVOverlay() {
  const { selectedSeat, selectedSection, returnToOverview } = useStadiumStore();

  if (!selectedSeat || !selectedSection) return null;

  const zoneColor = ZONE_COLORS[selectedSection.zone as keyof typeof ZONE_COLORS];

  return (
    <>
      {/* Top-left wordmark */}
      <motion.div
        className="absolute top-5 left-6 flex items-center gap-2 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-white/60 text-base font-bold tracking-tight">
          Cric<span className="text-yellow-400">Preview</span>
        </span>
      </motion.div>

      {/* Bottom-left seat info */}
      <motion.div
        className="absolute bottom-6 left-6 glass rounded-xl px-4 py-3 select-none"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-2 mb-0.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: zoneColor }}
          />
          <span className="text-white/90 text-sm font-semibold">
            {selectedSection.label}
          </span>
        </div>
        <p className="text-white/45 text-xs font-mono">
          Row {selectedSeat.row} · Seat {selectedSeat.seatNumber}
        </p>
        <p className="text-white/30 text-xs mt-0.5">
          {ZONE_LABELS[selectedSection.zone as keyof typeof ZONE_LABELS]} ·{' '}
          {selectedSection.tier === 'upper' ? 'Upper Tier' : 'Lower Tier'}
        </p>
      </motion.div>

      {/* Bottom-center compass */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <CompassHint />
      </motion.div>

      {/* Bottom-right back button */}
      <motion.button
        className="absolute bottom-6 right-6 glass rounded-full px-5 py-2.5 text-white/80 text-sm font-medium hover:text-white hover:bg-white/10 transition-all active:scale-95 pointer-events-auto cursor-pointer"
        onClick={returnToOverview}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        ← Choose another seat
      </motion.button>
    </>
  );
}
