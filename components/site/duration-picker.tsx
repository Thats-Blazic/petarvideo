'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Clock } from 'lucide-react'

import { formatDuration, type DurationUnit } from '@/lib/duration'

const secondsChips = [15, 30, 45, 60, 90, 120]
const minutesChips = [1, 2, 3, 5, 8, 12, 20]

type DurationPickerProps = {
  unit: DurationUnit
  value: number
  onChange: (unit: DurationUnit, value: number) => void
  includedLabel?: string
  surchargeLabel?: string
}

export function DurationPicker({ unit, value, onChange, includedLabel, surchargeLabel }: DurationPickerProps) {
  const chips = unit === 'sec' ? secondsChips : minutesChips
  const min = unit === 'sec' ? 5 : 1
  const max = unit === 'sec' ? 180 : 30
  const step = unit === 'sec' ? 5 : 1
  const progress = ((value - min) / (max - min)) * 100

  function switchUnit(nextUnit: DurationUnit) {
    if (nextUnit === unit) return
    onChange(nextUnit, nextUnit === 'sec' ? 30 : 1)
  }

  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-black/[.02] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-[.1em] text-black/50">
          <Clock className="h-3.5 w-3.5" /> CLIP DURATION
        </span>
        <div className="relative flex rounded-full bg-black/5 p-1 text-xs font-medium">
          {(['sec', 'min'] as DurationUnit[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => switchUnit(option)}
              className="relative z-10 rounded-full px-3.5 py-1.5 transition-colors"
              style={{ color: unit === option ? '#fff' : 'rgba(0,0,0,.55)' }}
            >
              {unit === option && (
                <motion.span
                  layoutId="duration-unit-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-black"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              {option === 'sec' ? 'Seconds' : 'Minutes'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${unit}-${value}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="text-4xl font-medium tracking-[-.04em] sm:text-5xl"
            >
              {formatDuration(unit === 'sec' ? value : value * 60)}
            </motion.span>
          </AnimatePresence>
        </div>
        {includedLabel && (
          <p className="max-w-[11rem] text-right text-xs leading-snug text-black/40">{includedLabel}</p>
        )}
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(unit, Number(event.target.value))}
        aria-label="Clip duration"
        className="duration-slider mt-5 w-full"
        style={{ '--progress': `${progress}%` } as React.CSSProperties}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onChange(unit, chip)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              value === chip ? 'border-black bg-black text-white' : 'border-black/15 text-black/55 hover:border-black/30'
            }`}
          >
            {unit === 'sec' ? `${chip}s` : `${chip} min`}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {surchargeLabel && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="text-xs font-medium text-[#ff5d35]"
          >
            {surchargeLabel}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
