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
