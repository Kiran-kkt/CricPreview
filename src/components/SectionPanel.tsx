import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStadiumStore } from '../store/useStadiumStore';
import { ZONE_COLORS, ZONE_LABELS } from '../data/stadiumConfig';
import type { SectionZone } from '../types/stadium';

export function SectionPanel() {
  const { selectedSection, confirmSeat, setView, setSelectedSection } = useStadiumStore();
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedSeatNum, setSelectedSeatNum] = useState<number | null>(null);

  if (!selectedSection) return null;

  const zoneColor = ZONE_COLORS[selectedSection.zone as keyof typeof ZONE_COLORS];
  const zoneLabel = ZONE_LABELS[selectedSection.zone];
  const capacity = selectedSection.rows * selectedSection.seatsPerRow;

  const handleBack = () => {
    setSelectedRow(null);
    setSelectedSeatNum(null);
    setSelectedSection(null);
    setView('landing');
  };

  const handleConfirm = () => {
    if (selectedRow && selectedSeatNum) {
      setSelectedRow(null);
      setSelectedSeatNum(null);
      confirmSeat(selectedRow, selectedSeatNum);
    }
  };

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 glass rounded-t-2xl pointer-events-auto"
      style={{ maxHeight: '55vh', overflowY: 'auto' }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 280 }}
    >
      <div className="px-5 pt-4 pb-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white text-lg font-semibold">
                {selectedSection.label}
              </span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full text-black"
                style={{ backgroundColor: zoneColor }}
              >
                {zoneLabel}
              </span>
            </div>
            <p className="text-white/45 text-xs font-mono">
              {capacity.toLocaleString()} seats · {selectedSection.rows} rows ·{' '}
              {selectedSection.seatsPerRow} per row
            </p>
          </div>
          <button
            onClick={handleBack}
            className="text-white/40 hover:text-white/80 text-xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-4">
          <StepBadge
            num={1}
            label="Row"
            active={!selectedRow}
            done={!!selectedRow}
            color={zoneColor}
          />
          <div className="h-px w-4 bg-white/20" />
          <StepBadge
            num={2}
            label="Seat"
            active={!!selectedRow && !selectedSeatNum}
            done={!!selectedSeatNum}
            color={zoneColor}
          />
        </div>

        {/* Row grid */}
        <div>
          <p className="text-white/50 text-xs mb-2 font-medium uppercase tracking-wider">
            {selectedRow ? `Row ${selectedRow} — pick a seat` : 'Select a row'}
          </p>
          {!selectedRow ? (
            <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))' }}>
              {Array.from({ length: selectedSection.rows }, (_, i) => i + 1).map((row) => (
                <button
                  key={row}
                  onClick={() => {
                    setSelectedRow(row);
                    setSelectedSeatNum(null);
                  }}
                  className="h-9 rounded-lg text-sm font-semibold transition-all border border-white/10 hover:border-white/30"
                  style={{
                    backgroundColor:
                      selectedRow === row ? zoneColor : 'rgba(255,255,255,0.07)',
                    color: selectedRow === row ? '#000' : '#fff',
                  }}
                >
                  {row}
                </button>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid gap-1.5 mb-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))' }}>
                {Array.from({ length: selectedSection.seatsPerRow }, (_, i) => i + 1).map((seat) => (
                  <button
                    key={seat}
                    onClick={() => setSelectedSeatNum(seat)}
                    className="h-9 rounded-lg text-sm font-semibold transition-all border border-white/10 hover:border-white/30"
                    style={{
                      backgroundColor:
                        selectedSeatNum === seat ? zoneColor : 'rgba(255,255,255,0.07)',
                      color: selectedSeatNum === seat ? '#000' : '#fff',
                    }}
                  >
                    {seat}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedRow(null);
                  setSelectedSeatNum(null);
                }}
                className="text-white/40 hover:text-white/70 text-xs transition-colors mb-3 flex items-center gap-1"
              >
                ← Change row
              </button>

              {selectedRow && selectedSeatNum && (
                <motion.button
                  onClick={handleConfirm}
                  className="w-full py-3.5 rounded-xl text-black text-sm font-bold tracking-wide transition-opacity hover:opacity-90 active:opacity-75"
                  style={{ backgroundColor: zoneColor }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Preview from Row {selectedRow}, Seat {selectedSeatNum} →
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StepBadge({
  num,
  label,
  active,
  done,
  color,
}: {
  num: number;
  label: string;
  active: boolean;
  done: boolean;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          backgroundColor: done || active ? color : 'rgba(255,255,255,0.12)',
          color: done || active ? '#000' : '#fff',
        }}
      >
        {done ? '✓' : num}
      </div>
      <span
        className="text-xs font-medium"
        style={{ color: active || done ? '#fff' : 'rgba(255,255,255,0.35)' }}
      >
        {label}
      </span>
    </div>
  );
}
