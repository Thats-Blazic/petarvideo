'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Option<T extends string> = { value: T; label: string }

type CustomSelectProps<T extends string> = {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  className?: string
}

/** A fully custom, Apple-style dropdown — replaces the native <select> whose option list can't be themed. */
export function CustomSelect<T extends string>({ value, options, onChange, className }: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn('relative mt-[0.65rem]', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between border-0 border-b border-black/15 bg-transparent py-[0.7rem] text-left text-[0.95rem] text-[#111] outline-none transition-colors hover:border-black/35"
      >
        <span>{selected?.label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: easeOut }}>
          <ChevronDown className="h-4 w-4 text-black/40" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: easeOut }}
            className="absolute left-0 top-[calc(100%+8px)] z-30 w-full min-w-[190px] overflow-hidden rounded-2xl border border-black/10 bg-white/95 p-1.5 shadow-[0_20px_45px_rgba(0,0,0,.16)] backdrop-blur-xl"
          >
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors',
                    !isSelected && 'hover:bg-black/[.04]',
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="custom-select-highlight"
                      className="absolute inset-0 rounded-xl bg-black"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className={cn('relative z-10', isSelected ? 'font-medium text-white' : 'text-black/70')}>
                    {option.label}
                  </span>
                  {isSelected && <Check className="relative z-10 h-3.5 w-3.5 text-white" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
