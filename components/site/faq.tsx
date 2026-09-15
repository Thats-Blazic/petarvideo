'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { SectionHeader } from '@/components/site/section-header'
import { reveal } from '@/lib/motion'
import { faqs } from '@/lib/site-data'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="snap-section mx-auto max-w-4xl px-6 py-20 sm:px-10 sm:py-24 lg:py-36">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={reveal}>
        <SectionHeader title="FAQ" />
      </motion.div>

      <div className="mt-10 divide-y divide-black/10 border-y border-black/10 sm:mt-14">
        {faqs.map((item, index) => {
          const isOpen = open === index
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left sm:py-6"
              >
                <span className="text-base font-medium tracking-[-.01em] sm:text-lg">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-6 text-sm leading-relaxed text-black/55 sm:text-base">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
