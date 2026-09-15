'use client'

import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  title: string
  description?: React.ReactNode
  className?: string
}

/** Large bold section title — Featured Work / Apple editorial style. */
export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-5xl', className)}>
      <h2 className="text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-.045em] text-black sm:tracking-[-.055em]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-black/50 sm:mt-6 sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
