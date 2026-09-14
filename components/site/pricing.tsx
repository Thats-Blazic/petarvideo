'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import { Spotlight } from '@/components/site/spotlight'
import { formatDuration } from '@/lib/duration'
import { reveal } from '@/lib/motion'
import { packages, type Service } from '@/lib/site-data'

type PricingProps = {
  onChoosePackage: (service: Service) => void
}

export function Pricing({ onChoosePackage }: PricingProps) {
  return (
    <section id="pricing" className="border-y border-black/10 bg-white px-6 py-20 sm:px-10 sm:py-24 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
          <p className="mb-4 text-xs font-semibold tracking-[.28em] text-black/40">02 / PRICING</p>
          <h2 className="text-4xl font-medium tracking-[-.05em] sm:text-5xl md:text-7xl md:tracking-[-.06em]">
            Simple pricing.
          </h2>
          <p className="mt-4 max-w-md text-black/50">
            Every package includes a base duration. Need more? Set the exact clip length in the booking form and the
            price updates instantly.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3">
          {packages.map((item, index) => (
            <motion.div
              key={item.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {item.popular && (
                <span className="absolute -top-3 left-6 z-10 rounded-full bg-[#ff5d35] px-3 py-1 text-[10px] font-semibold tracking-[.15em] text-white">
                  MOST POPULAR
                </span>
              )}
              <Spotlight
                color="0,0,0"
                className={`h-full rounded-[1.75rem] border p-6 transition-shadow duration-500 sm:p-7 ${
                  item.popular ? 'border-black/25 shadow-[0_25px_60px_rgba(0,0,0,.08)]' : 'border-black/10'
                }`}
              >
                <p className="text-xs font-semibold tracking-[.2em] text-black/45">{item.name}</p>
                <div className="mt-14 flex items-baseline gap-2 sm:mt-16">
                  <span className="text-4xl font-medium tracking-[-.05em] sm:text-4xl">€{item.price}</span>
                  <span className="text-sm text-black/40">{item.suffix}</span>
                </div>
                <p className="mt-3 text-sm text-black/50">{item.detail}</p>
                <p className="mt-1 text-xs text-black/35">
                  Includes up to {formatDuration(item.duration.includedSeconds)} · +€{item.duration.perMinuteOver}/min after
                </p>
                <ul className="mt-6 space-y-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-black/60">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff5d35]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onChoosePackage(item.name)}
                  className="mt-8 w-full rounded-full bg-black py-3 text-sm font-medium text-white transition hover:bg-[#ff5d35]"
                >
                  Choose Package
                </button>
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
