'use client'

import { motion } from 'framer-motion'

import { BrandWatermark } from '@/components/site/brand-mark'
import { SectionHeader } from '@/components/site/section-header'
import { Spotlight } from '@/components/site/spotlight'
import { formatDuration } from '@/lib/duration'
import { reveal } from '@/lib/motion'
import { pricingTiers } from '@/lib/site-data'

type PricingProps = {
  onChooseDuration: (seconds: number) => void
}

export function Pricing({ onChooseDuration }: PricingProps) {
  return (
    <section id="pricing" className="snap-section relative overflow-hidden border-y border-black/10 bg-white px-6 py-20 sm:px-10 sm:py-24 lg:py-36">
      <BrandWatermark className="-left-10 bottom-0 -rotate-3" size={420} />
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
          <SectionHeader
            title="Pricing"
            description={
              <>
                One flat rate — <span className="font-semibold text-[#007AFF]">€7 per second</span> of final animation.
                No hidden tiers, no surprises. The price is always determined by how long your finished piece is.
              </>
            }
          />
        </motion.div>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.seconds}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="relative"
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#007AFF] px-3 py-1 text-[10px] font-semibold tracking-[.15em] text-white">
                  MOST POPULAR
                </span>
              )}
              <Spotlight
                color="0,122,255"
                className={`flex h-full flex-col rounded-[1.75rem] border p-6 text-center transition-shadow duration-500 sm:p-7 ${
                  tier.popular ? 'border-[#007AFF]/30 shadow-[0_25px_60px_rgba(0,122,255,.1)]' : 'border-black/10'
                }`}
              >
                <p className="text-xs font-semibold tracking-[.2em] text-black/45">
                  {formatDuration(tier.seconds).toUpperCase()}
                </p>
                <div className="mt-8 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-medium tracking-[-.05em]">€{tier.price}</span>
                </div>
                <p className="mt-1 text-xs text-black/35">= €7 / second</p>
                <p className="mt-4 flex-1 text-sm text-black/50">{tier.tag}</p>
                <button
                  onClick={() => onChooseDuration(tier.seconds)}
                  className="mt-6 w-full rounded-full bg-[#007AFF] py-3 text-sm font-medium text-white transition hover:bg-[#0066CC]"
                >
                  Choose This Length
                </button>
              </Spotlight>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="mt-8 text-sm text-black/45"
        >
          Need something in between? Set an exact duration — in seconds or minutes — in the booking form below and
          watch the price update instantly.
        </motion.p>
      </div>
    </section>
  )
}
