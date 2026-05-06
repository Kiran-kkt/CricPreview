import { motion, AnimatePresence } from 'framer-motion';
import { useStadiumStore } from '../store/useStadiumStore';

export function TransitionScreen() {
  const { transitionPhase } = useStadiumStore();
  const active = transitionPhase === 'to-pov' || transitionPhase === 'to-overview';

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.5)', zIndex: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0] }}
          transition={{ duration: 2.2, times: [0, 0.35, 1], ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  );
}
