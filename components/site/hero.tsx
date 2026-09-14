'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Play, Star } from 'lucide-react'

import { Magnetic } from '@/components/site/magnetic'
import { easeOut } from '@/lib/motion'

const showcaseCards = [
  { tone: 'from-slate-900 via-slate-700 to-sky-300', rotate: -9, x: -34, y: 26, z: 10, delay: 0.5 },
  { tone: 'from-zinc-900 via-zinc-700 to-zinc-400', rotate: 4, x: 18, y: -6, z: 20, delay: 0.62 },
  { tone: 'from-stone-900 via-stone-600 to-amber-200', rotate: -2, x: 58, y: 44, z: 30, delay: 0.74 },
]

function HeroShowcase() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative mx-auto hidden h-[360px] w-full max-w-sm lg:block">
      {showcaseCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8, rotate: card.rotate, x: card.x, y: card.y + 40 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: card.rotate,
            x: card.x,
            y: prefersReducedMotion ? card.y : [card.y, card.y - 10, card.y],
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0.8, delay: card.delay, ease: easeOut }
              : {
                  opacity: { duration: 0.8, delay: card.delay, ease: easeOut },
                  scale: { duration: 0.8, delay: card.delay, ease: easeOut },
                  y: { duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: card.delay + 0.8 },
                }
          }
          style={{ zIndex: card.z }}
          className={`absolute left-1/2 top-1/2 aspect-[9/16] w-40 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.5rem] bg-gradient-to-br shadow-[0_30px_60px_rgba(0,0,0,.25)] ring-1 ring-white/10 sm:w-44 ${card.tone}`}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(255,255,255,.55), transparent 30%), linear-gradient(160deg, transparent 45%, rgba(0,0,0,.45))',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
            <div className="flex items-end gap-[3px]">
              {[6, 12, 8, 16, 10].map((h, barIndex) => (
                <span
                  key={barIndex}
                  className="w-[3px] rounded-full bg-white/70"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Play className="h-3 w-3 fill-white text-white" />
            </span>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: prefersReducedMotion ? 0 : [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.1 },
          scale: { duration: 0.6, delay: 1.1, ease: easeOut },
          y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 },
        }}
        style={{ zIndex: 40 }}
        className="absolute right-0 top-4 flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3.5 py-2 text-xs font-medium shadow-[0_12px_30px_rgba(0,0,0,.12)] backdrop-blur-xl"
      >
        <Star className="h-3.5 w-3.5 fill-[#ff5d35] text-[#ff5d35]" />
        4.9 average rating
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: prefersReducedMotion ? 0 : [0, 6, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.25 },
          scale: { duration: 0.6, delay: 1.25, ease: easeOut },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
        }}
        style={{ zIndex: 40 }}
        className="absolute bottom-2 left-0 flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3.5 py-2 text-xs font-medium shadow-[0_12px_30px_rgba(0,0,0,.12)] backdrop-blur-xl"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        180+ videos delivered
      </motion.div>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const textY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 120])
  const showcaseY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 60])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const orbOneY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -90])
  const orbTwoY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 70])

  return (
    <section
      id="top"
      ref={ref}
      className="relative mx-auto flex min-h-[700px] max-w-6xl flex-col justify-end overflow-hidden px-6 pb-16 pt-32 sm:min-h-[800px] sm:px-10 sm:pb-20 sm:pt-36 lg:min-h-[860px] lg:pb-28"
    >
      <motion.div
        style={{ y: orbOneY }}
        aria-hidden
        className="pointer-events-none absolute -left-24 top-4 h-56 w-56 rounded-full bg-[#ff5d35]/25 blur-[80px] sm:h-72 sm:w-72 sm:blur-[90px]"
      />
      <motion.div
        style={{ y: orbTwoY }}
        aria-hidden
        className="pointer-events-none absolute -right-10 top-36 h-64 w-64 rounded-full bg-black/10 blur-[90px] sm:h-96 sm:w-96 sm:blur-[110px]"
      />

      <motion.div
        style={{ opacity: sectionOpacity }}
        className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-4"
      >
        <motion.div style={{ y: textY }} className="max-w-4xl lg:max-w-none">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-xs font-semibold tracking-[.28em] text-black/45 sm:mb-7"
          >
            VIDEO EDITOR{' '}
            <motion.span
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ff5d35] align-middle"
            />
          </motion.p>

          <h1 className="max-w-4xl text-[clamp(3rem,13vw,9.4rem)] font-medium tracking-[-.06em] sm:tracking-[-.08em]">
            <span className="-my-[.09em] block overflow-hidden py-[.09em] leading-[.9] sm:leading-[.84]">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
                className="block"
              >
                Your footage.
              </motion.span>
            </span>
            <span className="-my-[.09em] block overflow-hidden py-[.09em] leading-[.9] text-black/35 sm:leading-[.84]">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.25 }}
                className="block"
              >
                My edit.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 max-w-md text-base leading-relaxed text-black/55 sm:mt-10 sm:text-lg"
          >
            Cinematic edits, social content and videos made to stand out — any length you need, from a 15 second
            reel to a 20 minute story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex flex-wrap gap-3 sm:mt-9"
          >
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:scale-[1.03]"
              >
                View Work <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#book"
                className="inline-flex items-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-black/5"
              >
                Book Now
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: showcaseY }}>
          <HeroShowcase />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative mt-16 flex items-center justify-between border-t border-black/10 pt-4 text-xs text-black/40 sm:mt-24"
      >
        <span>Based in Europe · working worldwide</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden items-center gap-1 sm:flex"
        >
          Scroll to explore <ArrowDown className="h-3 w-3" />
        </motion.span>
      </motion.div>
    </section>
  )
}
