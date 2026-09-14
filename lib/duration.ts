import type { Package } from '@/lib/site-data'

export type DurationUnit = 'sec' | 'min'

/** Formats a duration given in seconds into a short human label, e.g. "45s" or "3 min". */
export function formatDuration(totalSeconds: number) {
  if (totalSeconds < 60) return `${Math.round(totalSeconds)}s`
  const minutes = totalSeconds / 60
  const rounded = Number.isInteger(minutes) ? minutes : Math.round(minutes * 10) / 10
  return `${rounded} min`
}

/** Converts a value + unit pair (as shown in the duration picker) into total seconds. */
export function toSeconds(value: number, unit: DurationUnit) {
  return unit === 'sec' ? value : value * 60
}

/** Extra cost, in euros, for exceeding a package's included duration. */
export function computeDurationSurcharge(totalSeconds: number, pkg: Package) {
  const overSeconds = Math.max(0, totalSeconds - pkg.duration.includedSeconds)
  if (overSeconds <= 0) return 0
  const overMinutes = Math.ceil(overSeconds / 60)
  return overMinutes * pkg.duration.perMinuteOver
}
