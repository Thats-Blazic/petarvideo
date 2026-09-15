'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { easeOut } from '@/lib/motion'

const WORDS = ['motion', 'art', 'edit', 'touch'] as const
const LONGEST_LABEL = 'motion.'
const CYCLE_MS = 2800

type HeroRotatingTaglineProps = {
  revealDelay?: number
}

export function HeroRotatingTagline({ revealDelay = 0.25 }: HeroRotatingTaglineProps) {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion])

  const word = WORDS[prefersReducedMotion ? 0 : index]

  return (
    <span className="block tracking-[-0.025em] text-black/35 sm:tracking-[-0.03em]">
      <motion.span
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, ease: easeOut, delay: revealDelay }}
        className="block overflow-hidden pb-[0.14em] pt-[0.06em]"
      >
        <span className="block whitespace-nowrap leading-[1.08]">
          My{' '}
          <span className="relative inline-block align-baseline leading-[1.08]">
            <span className="invisible whitespace-nowrap leading-[1.08] pb-[0.1em]" aria-hidden={true}>
              {LONGEST_LABEL}
            </span>
            <span className="absolute inset-0 overflow-hidden pb-[0.1em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={word}
                  initial={{ y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-105%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="block whitespace-nowrap leading-[1.08]"
                >
                  {word}.
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </span>
      </motion.span>
    </span>
  )
}
