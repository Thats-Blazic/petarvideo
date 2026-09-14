'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { Magnetic } from '@/components/site/magnetic'
import { easeOut } from '@/lib/motion'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-24px)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full border border-black/10 bg-white/75 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,.06)] backdrop-blur-xl sm:w-[calc(100%-32px)] sm:px-5 sm:py-3"
      >
        <a href="#top" className="text-sm font-semibold tracking-[.2em]">
          PETAR
        </a>
        <div className="hidden items-center gap-7 text-sm text-black/55 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-black">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-block">
            <a
              href="#book"
              className="rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition hover:scale-[1.03]"
            >
              Book a Project
            </a>
          </Magnetic>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 transition hover:bg-black/10 md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="fixed left-1/2 top-[74px] z-40 w-[calc(100%-24px)] max-w-5xl -translate-x-1/2 rounded-[1.75rem] border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col divide-y divide-black/5 text-sm">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3.5 text-black/70 transition hover:text-black"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="px-3 py-3.5 font-medium text-[#ff5d35]"
              >
                Book a Project →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
