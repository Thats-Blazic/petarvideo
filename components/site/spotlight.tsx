'use client'

import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'

type SpotlightProps = {
  children: React.ReactNode
  className?: string
  color?: string
  size?: number
}

/** Cursor-tracked radial glow, revealed on hover — a subtle Apple/awwwards-style card detail. */
export function Spotlight({ children, className, color = '255,255,255', size = 320 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn('relative', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}% ${pos.y}%, rgba(${color},.22), transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}
