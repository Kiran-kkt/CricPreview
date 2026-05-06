import { motion } from 'framer-motion';
import { ZONE_COLORS } from '../data/stadiumConfig';

const ZONES = [
  { key: 'premium', label: 'Premium' },
  { key: 'general', label: 'General' },
  { key: 'terrace', label: 'Terrace' },
  { key: 'corporate', label: 'Corporate' },
] as const;

export function LandingOverlay() {
  return (
    <>
      {/* Top-left wordmark */}
      <motion.div
        className="absolute top-5 left-6 flex items-center gap-2.5 select-none"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <CricketBallIcon />
        <span className="text-white text-xl font-bold tracking-tight">
          Cric<span className="text-yellow-400">Preview</span>
        </span>
      </motion.div>

      {/* Top-right zone legend */}
      <motion.div
        className="absolute top-5 right-6 glass rounded-xl px-4 py-3 flex flex-col gap-2 select-none"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      >
        {ZONES.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: ZONE_COLORS[key] }}
            />
            <span className="text-white/70 text-xs font-medium">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Bottom-center prompt */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <motion.div
          className="glass rounded-full px-6 py-3 flex items-center gap-2.5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-yellow-400 text-lg">●</span>
          </motion.div>
          <span className="text-white/90 text-sm font-medium">
            Click any stand to preview your seat view
          </span>
        </motion.div>
      </div>
    </>
  );
}

function CricketBallIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="10" fill="#cc2200" stroke="#ff4422" strokeWidth="0.5" />
      <path
        d="M4.5 8 Q8 11 4.5 14"
        stroke="white"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17.5 8 Q14 11 17.5 14"
        stroke="white"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 5 Q11 9 16 5"
        stroke="white"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 17 Q11 13 16 17"
        stroke="white"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
