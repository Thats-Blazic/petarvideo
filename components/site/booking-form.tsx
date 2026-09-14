'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'

import { CustomSelect } from '@/components/site/custom-select'
import { DurationPicker } from '@/components/site/duration-picker'
import { computeDurationSurcharge, formatDuration, toSeconds, type DurationUnit } from '@/lib/duration'
import { reveal } from '@/lib/motion'
import { packages, type Service } from '@/lib/site-data'

type BookingFormProps = {
  service: Service
  onServiceChange: (service: Service) => void
  requestId: number
}

export function BookingForm({ service, onServiceChange, requestId }: BookingFormProps) {
  const activePackage = useMemo(() => packages.find((item) => item.name === service) ?? packages[0], [service])

  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState<DurationUnit>(activePackage.duration.includedSeconds < 60 ? 'sec' : 'min')
  const [durationValue, setDurationValue] = useState(
    unit === 'sec' ? activePackage.duration.defaultSeconds : Math.round(activePackage.duration.defaultSeconds / 60),
  )
  const [sent, setSent] = useState(false)

  // Whenever the selected package changes (from a project card, pricing card, or the select below),
  // reset the duration picker to a sensible default for that package.
  useEffect(() => {
    const nextUnit: DurationUnit = activePackage.duration.defaultSeconds < 60 ? 'sec' : 'min'
    setUnit(nextUnit)
    setDurationValue(
      nextUnit === 'sec' ? activePackage.duration.defaultSeconds : Math.round(activePackage.duration.defaultSeconds / 60),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId, activePackage.name])

  const durationSeconds = toSeconds(durationValue, unit)
  const surcharge = computeDurationSurcharge(durationSeconds, activePackage)
  const total = (activePackage.price + surcharge) * quantity

  return (
    <section id="book" className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
          <p className="mb-4 text-xs font-semibold tracking-[.28em] text-black/40">03 / BOOKING</p>
          <h2 className="text-4xl font-medium tracking-[-.05em] sm:text-5xl md:text-7xl md:tracking-[-.06em]">
            Let&apos;s make
            <br />
            <span className="text-black/35">something.</span>
          </h2>
          <p className="mt-7 max-w-xs text-black/50">
            Tell me a little about your project — including how long the final clip should be — and I&apos;ll get back
            to you shortly.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[420px] flex-col justify-center rounded-[2rem] bg-black p-8 text-white sm:p-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
              >
                <Check />
              </motion.div>
              <h3 className="text-3xl font-medium tracking-[-.04em] sm:text-4xl sm:tracking-[-.05em]">
                Request received.
              </h3>
              <p className="mt-3 text-white/55">
                A {formatDuration(durationSeconds)} {activePackage.name.toLowerCase()} project — I&apos;ll get back to
                you shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-10 w-fit text-sm text-white/60 underline underline-offset-4"
              >
                Send another request
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={(event) => {
                event.preventDefault()
                setSent(true)
              }}
              className="space-y-7 rounded-[1.75rem] border border-black/10 bg-white p-5 sm:space-y-8 sm:rounded-[2rem] sm:p-8 lg:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <label>
                  Choose a service
                  <CustomSelect
                    value={service}
                    onChange={(next) => onServiceChange(next)}
                    options={packages.map((item) => ({ value: item.name, label: item.name }))}
                  />
                </label>
                <label>
                  Number of videos
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
                  />
                </label>
              </div>

              <DurationPicker
                unit={unit}
                value={durationValue}
                onChange={(nextUnit, nextValue) => {
                  setUnit(nextUnit)
                  setDurationValue(nextValue)
                }}
                includedLabel={`${activePackage.name} includes up to ${formatDuration(activePackage.duration.includedSeconds)}`}
                surchargeLabel={surcharge > 0 ? `+€${surcharge} for the extra length beyond what's included` : undefined}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <label>
                  Your name
                  <input required placeholder="Jane Smith" />
                </label>
                <label>
                  Email
                  <input required type="email" placeholder="you@example.com" />
                </label>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <label>
                  Preferred deadline
                  <input type="date" />
                </label>
                <label>
                  Estimated price
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={total}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="price"
                    >
                      €{total}
                    </motion.div>
                  </AnimatePresence>
                </label>
              </div>
              <label>
                Project details
                <textarea required rows={4} placeholder="What are you working on?" />
              </label>
              <button className="w-full rounded-full bg-black py-4 text-sm font-medium text-white transition hover:bg-[#ff5d35]">
                Send Booking Request <span className="ml-2">→</span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
