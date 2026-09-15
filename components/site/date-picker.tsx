'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/utils'

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

type DatePickerProps = {
  value: string
  onChange: (value: string) => void
  className?: string
}

function startOfDay(date: Date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

function toIsoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function formatDisplay(iso: string) {
  const date = new Date(`${iso}T12:00:00`)
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => startOfDay(new Date()))
  const rootRef = useRef<HTMLDivElement>(null)

  const today = startOfDay(new Date())
  const selected = value ? startOfDay(new Date(`${value}T12:00:00`)) : null

  useEffect(() => {
    if (selected) setView(selected)
  }, [value])

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  const year = view.getFullYear()
  const month = view.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7

  const cells = useMemo(() => {
    const items: (number | null)[] = []
    for (let i = 0; i < firstWeekday; i++) items.push(null)
    for (let day = 1; day <= daysInMonth; day++) items.push(day)
    return items
  }, [daysInMonth, firstWeekday])

  const monthLabel = view.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  function shiftMonth(delta: number) {
    setView((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1))
  }

  function pickDay(day: number) {
    const picked = startOfDay(new Date(year, month, day))
    if (picked < today) return
    onChange(toIsoDate(year, month, day))
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="mt-[0.65rem] flex w-full items-center justify-between border-0 border-b border-black/15 bg-transparent py-[0.7rem] text-left text-[0.95rem] outline-none transition focus:border-[#007AFF]"
      >
        <span className={value ? 'text-[#111]' : 'text-black/35'}>
          {value ? formatDisplay(value) : 'Pick a date'}
        </span>
        <Calendar className="h-4 w-4 shrink-0 text-black/35" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Choose deadline"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.24, ease: easeOut }}
            className="absolute left-0 z-50 mt-3 w-[min(100%,19rem)] rounded-[1.25rem] border border-black/10 bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,.14)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => shiftMonth(-1)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-black/50 transition hover:bg-black/5 hover:text-black"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-sm font-medium tracking-[-.02em]">{monthLabel}</p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => shiftMonth(1)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-black/50 transition hover:bg-black/5 hover:text-black"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] font-medium tracking-wide text-black/35">
              {WEEKDAYS.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, index) => {
                if (day === null) return <span key={`empty-${index}`} />

                const cellDate = startOfDay(new Date(year, month, day))
                const isPast = cellDate < today
                const isSelected =
                  selected &&
                  cellDate.getFullYear() === selected.getFullYear() &&
                  cellDate.getMonth() === selected.getMonth() &&
                  cellDate.getDate() === selected.getDate()
                const isToday = cellDate.getTime() === today.getTime()

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isPast}
                    onClick={() => pickDay(day)}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full text-sm transition',
                      isPast && 'cursor-not-allowed text-black/20',
                      !isPast && !isSelected && 'text-black/70 hover:bg-black/5',
                      isSelected && 'bg-[#007AFF] font-medium text-white',
                      isToday && !isSelected && 'ring-1 ring-[#007AFF]/35',
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
