'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star } from 'lucide-react'

import { easeOut, reveal } from '@/lib/motion'
import { testimonials } from '@/lib/site-data'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.06, duration: 0.3, ease: easeOut }}
        >
          <Star
            className="h-4 w-4"
            strokeWidth={0}
            fill={i < rating ? '#ff5d35' : 'rgba(0,0,0,.12)'}
          />
        </motion.span>
      ))}
    </div>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setIndex((current) => (current + 1) % testimonials.length), 5500)
    return () => clearInterval(timer)
  }, [paused])

  function goTo(next: number) {
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24 lg:py-36">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={reveal}>
        <p className="mb-4 text-xs font-semibold tracking-[.28em] text-black/40">WHAT CLIENTS SAY</p>
        <h2 className="text-4xl font-medium tracking-[-.05em] sm:text-5xl md:text-7xl md:tracking-[-.06em]">
          Loved by creators
          <br />
          <span className="text-black/35">and brands alike.</span>
        </h2>
      </motion.div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-black/10 bg-white sm:mt-16 sm:rounded-[2rem]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) goTo(index + 1)
              else if (info.offset.x > 60) goTo(index - 1)
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="cursor-grab p-8 active:cursor-grabbing sm:p-14"
          >
            <StarRating rating={current.rating} />
            <p className="mt-6 max-w-2xl text-xl leading-relaxed tracking-[-.01em] sm:text-2xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${current.tone}`}
              >
                {current.initials}
              </span>
              <div>
                <p className="text-sm font-medium">{current.name}</p>
                <p className="text-sm text-black/45">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2 pb-8">
          {testimonials.map((_, dotIndex) => (
            <button
              key={dotIndex}
              aria-label={`Go to testimonial ${dotIndex + 1}`}
              onClick={() => goTo(dotIndex)}
              className="p-1.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ${
                  dotIndex === index ? 'w-6 bg-black' : 'w-1.5 bg-black/15'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
