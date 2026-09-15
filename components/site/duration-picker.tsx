'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Clock } from 'lucide-react'

import { formatDuration, type DurationUnit } from '@/lib/duration'

const secondsChips = [10, 15, 30, 45, 60, 90, 120]
const minutesChips = [1, 2, 3, 5, 8, 12, 20]

type DurationPickerProps = {
  unit: DurationUnit
  value: number
  onChange: (unit: DurationUnit, value: number) => void
  /** Shown top-right — used to surface the live computed price for this duration. */
  priceLabel?: string
}

export function DurationPicker({ unit, value, onChange, priceLabel }: DurationPickerProps) {
  const chips = unit === 'sec' ? secondsChips : minutesChips
  const min = unit === 'sec' ? 5 : 1
  const max = unit === 'sec' ? 180 : 30
  const step = unit === 'sec' ? 5 : 1
  const progress = ((value - min) / (max - min)) * 100
  const thumbSize = 22
  const fillWidth = `calc((100% - ${thumbSize}px) * ${progress / 100} + ${thumbSize / 2}px)`

  function switchUnit(nextUnit: DurationUnit) {
    if (nextUnit === unit) return
    onChange(nextUnit, nextUnit === 'sec' ? 30 : 1)
  }

  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-black/[.02] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-[.1em] text-black/50">
          <Clock className="h-3.5 w-3.5" /> ANIMATION DURATION
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
                  className="absolute inset-0 -z-10 rounded-full bg-[#007AFF]"
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
        {priceLabel && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={priceLabel}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="text-right text-sm font-semibold text-[#007AFF]"
            >
              {priceLabel}
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      <div className="relative mt-5 h-7 w-full">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-black/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-0 h-1.5 max-w-full -translate-y-1/2 rounded-full bg-[#007AFF] transition-[width] duration-150 ease-out"
          style={{ width: fillWidth }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(unit, Number(event.target.value))}
          aria-label="Animation duration"
          aria-valuetext={formatDuration(unit === 'sec' ? value : value * 60)}
          className="duration-slider absolute inset-0 z-10 w-full"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onChange(unit, chip)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              value === chip
                ? 'border-[#007AFF] bg-[#007AFF] text-white'
                : 'border-black/15 text-black/55 hover:border-black/30'
            }`}
          >
            {unit === 'sec' ? `${chip}s` : `${chip} min`}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-black/40">Priced simply: €7 per second of final animation.</p>
    </div>
  )
}
