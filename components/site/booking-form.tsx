'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'

import { BrandWatermark } from '@/components/site/brand-mark'
import { SectionHeader } from '@/components/site/section-header'
import { DatePicker } from '@/components/site/date-picker'
import { DurationPicker } from '@/components/site/duration-picker'
import { formatDuration, toSeconds, type DurationUnit } from '@/lib/duration'
import { reveal } from '@/lib/motion'
import { formatPrice, priceForSeconds } from '@/lib/pricing'

type BookingFormProps = {
  /** Duration (in seconds) to preload the picker with — set from a project card or pricing tier. */
  presetSeconds: number
  /** Bumped whenever presetSeconds should be re-applied, even if the value itself is unchanged. */
  requestId: number
}

function toUnitValue(seconds: number): { unit: DurationUnit; value: number } {
  if (seconds >= 60 && seconds % 60 === 0) return { unit: 'min', value: seconds / 60 }
  return { unit: 'sec', value: seconds }
}

export function BookingForm({ presetSeconds, requestId }: BookingFormProps) {
  const [{ unit, value: durationValue }, setDuration] = useState(() => toUnitValue(presetSeconds))
  const [quantity, setQuantity] = useState(1)
  const [budget, setBudget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Whenever a project card or pricing tier sets a new preset, reload the picker with it.
  useEffect(() => {
    setDuration(toUnitValue(presetSeconds))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId])

  const durationSeconds = toSeconds(durationValue, unit)
  const pricePerItem = priceForSeconds(durationSeconds)
  const total = pricePerItem * quantity

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)
    setSubmitting(true)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          quantity,
          durationSeconds,
          budget,
          deadline,
          details,
          estimatedTotal: total,
        }),
      })

      const data = (await response.json()) as { error?: string }
      if (!response.ok) {
        setSubmitError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      setSent(true)
    } catch {
      setSubmitError('Network error. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="book" className="snap-section relative overflow-hidden px-6 py-20 sm:px-10 sm:py-24 lg:py-36">
      <BrandWatermark className="-left-16 top-6 -rotate-3" size={190} />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
          <SectionHeader
            title="Booking"
            description={
              <>
                Tell me about your project — how long the final animation should be, your budget if you have one, and
                what you&apos;re trying to say. I&apos;ll get back to you shortly.
              </>
            }
          />
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
                A {formatDuration(durationSeconds)} motion design project — I&apos;ll get back to you shortly.
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
              onSubmit={handleSubmit}
              className="space-y-7 rounded-[1.75rem] border border-black/10 bg-white p-5 sm:space-y-8 sm:rounded-[2rem] sm:p-8 lg:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <label>
                  Number of animations
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
                  />
                </label>
                <label>
                  Your budget <span className="text-black/30">(optional)</span>
                  <input
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    placeholder="e.g. €300"
                  />
                </label>
              </div>

              <DurationPicker
                unit={unit}
                value={durationValue}
                onChange={(nextUnit, nextValue) => setDuration({ unit: nextUnit, value: nextValue })}
                priceLabel={`${formatPrice(durationSeconds)} for this length`}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <label>
                  Your name
                  <input
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Jane Smith"
                    autoComplete="name"
                  />
                </label>
                <label>
                  Email
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <label>
                  Preferred deadline
                  <DatePicker value={deadline} onChange={setDeadline} />
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
                  <p className="mt-1.5 text-xs text-black/35">
                    €7/sec × {formatDuration(durationSeconds)}
                    {quantity > 1 ? ` × ${quantity} animations` : ''}
                  </p>
                </label>
              </div>
              <label>
                Project details
                <textarea
                  required
                  rows={4}
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder="What are you working on?"
                  minLength={10}
                />
              </label>
              {submitError ? (
                <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700" role="alert">
                  {submitError}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-[#007AFF] py-4 text-sm font-medium text-white transition hover:bg-[#0066CC] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send Booking Request'} <span className="ml-2">→</span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
