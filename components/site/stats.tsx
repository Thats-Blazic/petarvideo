'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

import { stats } from '@/lib/site-data'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }
    const duration = 1200
    const start = performance.now()
    let frame: number

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, prefersReducedMotion, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section id="stats" className="snap-section relative overflow-hidden border-y border-black/10 bg-black px-6 py-14 text-white sm:px-10 sm:py-16 lg:py-24">
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="text-center sm:text-left"
          >
            <div className="text-3xl font-medium tracking-[-.04em] sm:text-4xl md:text-5xl md:tracking-[-.05em]">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-xs text-white/45 sm:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
