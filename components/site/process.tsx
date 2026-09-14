'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { MessageSquare, Send, UploadCloud, Wand2 } from 'lucide-react'

import { reveal } from '@/lib/motion'
import { processSteps } from '@/lib/site-data'

const stepIcons = {
  upload: UploadCloud,
  edit: Wand2,
  review: MessageSquare,
  deliver: Send,
} as const

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.35', 'end 0.65'] })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(processSteps.length - 1, Math.max(0, Math.floor(latest * processSteps.length)))
    setActive(index)
  })

  const ActiveIcon = stepIcons[processSteps[active].icon]

  return (
    <section id="process" ref={ref} className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24 lg:py-36">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={reveal}>
        <p className="mb-4 text-xs font-semibold tracking-[.28em] text-black/40">HOW IT WORKS</p>
        <h2 className="text-4xl font-medium tracking-[-.05em] sm:text-5xl md:text-7xl md:tracking-[-.06em]">
          From raw clips
          <br />
          <span className="text-black/35">to final cut.</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-32 flex aspect-square flex-col justify-between rounded-[2rem] bg-black p-8 text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">
                {processSteps[active].number} / {String(processSteps.length).padStart(2, '0')}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`icon-${active}`}
                  initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
                  transition={{ duration: 0.35 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
                >
                  <ActiveIcon className="h-5 w-5 text-[#ff5d35]" />
                </motion.span>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl font-medium tracking-[-.04em]">{processSteps[active].title}</h3>
                <p className="mt-3 text-white/55">{processSteps[active].description}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-1.5">
              {processSteps.map((step, index) => (
                <span
                  key={step.number}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    index === active ? 'bg-[#ff5d35]' : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {processSteps.map((step, index) => {
            const StepIcon = stepIcons[step.icon]
            const isActive = active === index
            const isLast = index === processSteps.length - 1
            return (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={reveal}
                transition={{ delay: index * 0.06 }}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      backgroundColor: isActive ? '#111111' : 'rgba(0,0,0,0)',
                      borderColor: isActive ? '#111111' : 'rgba(0,0,0,.15)',
                      scale: isActive ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2"
                  >
                    <StepIcon className={`h-4 w-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-black/40'}`} />
                  </motion.div>
                  {!isLast && (
                    <div className="relative my-1 w-px flex-1 bg-black/10">
                      <motion.div
                        className="absolute inset-x-0 top-0 w-px bg-black"
                        initial={{ height: 0 }}
                        animate={{ height: active > index ? '100%' : '0%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`mb-5 flex-1 rounded-[1.5rem] border p-6 transition-colors duration-500 sm:rounded-[1.75rem] sm:p-7 lg:p-8 ${
                    isActive ? 'border-black/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,.08)]' : 'border-black/10'
                  }`}
                >
                  <span className="text-xs text-black/40">{step.number}</span>
                  <h3 className="mt-3 text-xl font-medium tracking-[-.03em] sm:text-2xl">{step.title}</h3>
                  <p className="mt-2 text-sm text-black/50 sm:text-base">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
