'use client'

import { motion } from 'framer-motion'

import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/utils'

type LineRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'span' | 'div'
}

/** Scroll-triggered line mask reveal (creatoroly-style kinetic headlines). */
export function LineReveal({ children, className, delay = 0, as = 'span' }: LineRevealProps) {
  const Tag = as

  return (
    <Tag className={cn('-my-[.09em] block overflow-hidden py-[.09em]', className)}>
      <motion.span
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 0.9, ease: easeOut, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </Tag>
  )
}
