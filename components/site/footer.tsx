'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { Magnetic } from '@/components/site/magnetic'
import { reveal } from '@/lib/motion'

export function Footer() {
  return (
    <>
      <section className="border-t border-black/10 bg-[#f5f5f3] px-6 py-20 text-center sm:px-10 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={reveal}
          className="mx-auto max-w-3xl"
        >
          <h2 className="text-3xl font-medium tracking-[-.04em] sm:text-5xl sm:tracking-[-.05em] md:text-6xl">
            Got footage sitting on a drive?
            <br />
            <span className="text-black/35">Let&apos;s turn it into something.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <Magnetic>
              <a
                href="#book"
                className="inline-flex items-center rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition hover:scale-[1.03]"
              >
                Start a Project <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-5 border-t border-black/10 px-6 py-8 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span className="font-semibold tracking-[.2em] text-black">PETAR VIDEO EDITOR</span>
        <div className="flex gap-5">
          <a href="#" className="transition hover:text-black">
            Instagram
          </a>
          <a href="#" className="transition hover:text-black">
            YouTube
          </a>
          <a href="mailto:hello@petar.video" className="transition hover:text-black">
            Email
          </a>
        </div>
        <span>© 2026</span>
      </footer>
    </>
  )
}
