import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CompassHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="flex flex-col items-center gap-1.5 select-none"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.4 }}
        >
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="15" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            {/* Arrow ring */}
            <motion.g
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ originX: '17px', originY: '17px' }}
            >
              <path
                d="M17 6 L20 13 L17 11 L14 13 Z"
                fill="rgba(255,255,255,0.7)"
              />
            </motion.g>
            <circle cx="17" cy="17" r="2" fill="rgba(255,255,255,0.5)" />
          </svg>
          <span className="text-white/50 text-xs">Drag to look around</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
