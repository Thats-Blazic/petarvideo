'use client'

import { Marquee } from '@/components/site/marquee'

type SectionBridgeProps = {
  phrases: string[]
  reverse?: boolean
  duration?: number
}

/** Thin kinetic band between existing sections — decorative only, no new content. */
export function SectionBridge({ phrases, reverse, duration }: SectionBridgeProps) {
  return <Marquee items={phrases} reverse={reverse} duration={duration} />
}
