'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

type MarqueeProps = {
  items: string[]
  className?: string
  /** Seconds for one full loop */
  duration?: number
  reverse?: boolean
}

export function Marquee({ items, className, duration = 32, reverse = false }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()
  const track = [...items, ...items]

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden
        className={cn('overflow-hidden border-y border-black/10 bg-white/40 py-3', className)}
      >
        <p className="truncate px-6 text-center text-sm text-black/25">{items.join(' · ')}</p>
      </div>
    )
  }

  return (
    <div aria-hidden className={cn('overflow-hidden border-y border-black/10 bg-white/40 py-4 sm:py-5', className)}>
      <motion.div
        className="flex w-max items-center gap-8 sm:gap-12"
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 text-[clamp(1.35rem,4vw,2.75rem)] font-medium tracking-[-.05em] text-black/[.12] sm:gap-12"
          >
            {item}
            <span className="text-black/[.06]">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
