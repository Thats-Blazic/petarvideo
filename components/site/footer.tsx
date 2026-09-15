'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { BrandAvatar, BrandWatermark } from '@/components/site/brand-mark'
import { BRAND_NAME } from '@/lib/brand'
import { Magnetic } from '@/components/site/magnetic'
import { reveal } from '@/lib/motion'

export function Footer() {
  return (
    <>
      <section id="contact" className="snap-section relative overflow-hidden border-t border-black/10 bg-[#f5f5f3] px-6 py-20 text-center sm:px-10 sm:py-28">
        <BrandWatermark className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-2" size={560} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={reveal}
          className="relative mx-auto max-w-3xl"
        >
          <h2 className="text-3xl font-medium tracking-[-.04em] sm:text-5xl sm:tracking-[-.05em] md:text-6xl">
            Got an idea worth animating?
            <br />
            <span className="text-black/35">Let&apos;s put it in motion.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <Magnetic>
              <a
                href="#book"
                className="inline-flex items-center rounded-full bg-[#007AFF] px-7 py-3.5 text-sm font-medium text-white transition hover:scale-[1.03] hover:bg-[#0066CC]"
              >
                Start a Project <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-5 border-t border-black/10 px-6 py-8 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span className="flex items-center gap-2 font-semibold tracking-tight text-black">
          <BrandAvatar size={22} />
          {BRAND_NAME}
        </span>
        <div className="flex gap-5">
          <a
            href="https://www.instagram.com/ptr.aep/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-black"
          >
            Instagram
          </a>
          <a href="mailto:pavlovicpetar194@gmail.com" className="transition hover:text-black">
            Email
          </a>
        </div>
        <span>© 2026</span>
      </footer>
    </>
  )
}
