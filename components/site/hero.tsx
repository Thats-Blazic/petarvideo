'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Play, Star } from 'lucide-react'

import { BrandWatermark } from '@/components/site/brand-mark'
import { HeroRotatingTagline } from '@/components/site/hero-rotating-tagline'
import { Magnetic } from '@/components/site/magnetic'
import { easeOut } from '@/lib/motion'
import { projects } from '@/lib/site-data'

const showcaseLayout = [
  { rotate: -9, x: -34, y: 26, z: 10, delay: 0.5 },
  { rotate: 4, x: 18, y: -6, z: 20, delay: 0.62 },
  { rotate: -2, x: 58, y: 44, z: 30, delay: 0.74 },
]

const showcaseProjects = projects.filter((project) => project.videoSrc)

function HeroShowcase() {
  const prefersReducedMotion = useReducedMotion()

  const cards = showcaseLayout.map((layout, index) => {
    const project = showcaseProjects[index % showcaseProjects.length]
    return { ...layout, project }
  })

  return (
    <div className="relative hidden h-[380px] w-full max-w-md shrink-0 lg:ml-auto lg:block">
      {cards.map((card, i) => (
        <motion.a
          key={`${card.project.title}-${i}`}
          href="#work"
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
          className={`absolute left-1/2 top-1/2 aspect-square w-40 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.5rem] bg-gradient-to-br shadow-[0_30px_60px_rgba(0,0,0,.25)] ring-1 ring-white/10 transition hover:ring-white/25 sm:w-44 ${card.project.tone}`}
        >
          {card.project.videoSrc ? (
            <video
              src={card.project.videoSrc}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
          />
          <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm">
            {card.project.title}
          </span>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Play className="h-3 w-3 fill-white text-white" />
            </span>
          </div>
        </motion.a>
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
        <Star className="h-3.5 w-3.5 fill-[#007AFF] text-[#007AFF]" />
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
        180+ animations delivered
      </motion.div>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const textY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 120])
  const showcaseY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 32])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const orbOneY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -90])
  const orbTwoY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 70])

  return (
    <section
      id="top"
      ref={ref}
      className="snap-section relative mx-auto flex min-h-[700px] max-w-6xl flex-col justify-end overflow-hidden px-6 pb-16 pt-32 sm:min-h-[800px] sm:px-10 sm:pb-20 sm:pt-36 lg:min-h-[860px] lg:pb-28"
    >
      <BrandWatermark className="-left-16 bottom-0 -rotate-3" size={400} />
      <motion.div
        style={{ y: orbOneY }}
        aria-hidden
        className="pointer-events-none absolute -left-24 top-4 h-56 w-56 rounded-full bg-[#007AFF]/20 blur-[80px] sm:h-72 sm:w-72 sm:blur-[90px]"
      />
      <motion.div
        style={{ y: orbTwoY }}
        aria-hidden
        className="pointer-events-none absolute -right-10 top-36 h-64 w-64 rounded-full bg-black/10 blur-[90px] sm:h-96 sm:w-96 sm:blur-[110px]"
      />

      <motion.div
        style={{ opacity: sectionOpacity }}
        className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-10"
      >
        <motion.div style={{ y: textY }} className="min-w-0 w-full overflow-visible lg:max-w-none">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-xs font-semibold tracking-[.28em] text-black/45 sm:mb-7"
          >
            MOTION DESIGNER{' '}
            <motion.span
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#007AFF] align-middle"
            />
          </motion.p>

          <h1 className="w-full text-[clamp(2.75rem,12vw,9.4rem)] font-medium lg:text-[clamp(2.5rem,5.25vw,5.85rem)]">
            <span className="-my-[.09em] block overflow-x-visible overflow-y-hidden py-[.09em] leading-[.9] tracking-[-.06em] sm:leading-[.84] sm:tracking-[-.08em]">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
                className="block whitespace-nowrap"
              >
                Your idea.
              </motion.span>
            </span>
            <HeroRotatingTagline revealDelay={0.25} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 max-w-md text-base leading-relaxed text-black/55 sm:mt-10 sm:text-lg"
          >
            Bold motion graphics, kinetic typography and animated brand stories — priced simply at €7 per second,
            from a 10 second sting to a 2 minute film.
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
                className="inline-flex items-center rounded-full bg-[#007AFF] px-6 py-3 text-sm font-medium text-white transition hover:scale-[1.03] hover:bg-[#0066CC]"
              >
                View Work <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#book"
                className="inline-flex items-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:border-[#007AFF]/40 hover:bg-[#007AFF]/5 hover:text-[#007AFF]"
              >
                Book Now
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: showcaseY }} className="flex justify-center lg:justify-end">
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
