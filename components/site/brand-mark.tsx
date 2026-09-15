import { BRAND_NAME } from '@/lib/brand'
import { cn } from '@/lib/utils'

type BrandAvatarProps = {
  size?: number
  className?: string
}

/** Small circular brand avatar — used next to the wordmark in the nav and footer. */
export function BrandAvatar({ size = 28, className }: BrandAvatarProps) {
  return (
    <span
      className={cn('inline-flex shrink-0 overflow-hidden rounded-full bg-black/5 ring-1 ring-black/10', className)}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/petar-avatar.jpg" alt={BRAND_NAME} className="h-full w-full object-cover" />
    </span>
  )
}

type BrandWatermarkProps = {
  className?: string
  /** Logo image size, in pixels. The wordmark beneath scales proportionally. */
  size?: number
  /** Set true on dark backgrounds (e.g. the Stats section) to keep the mark visible. */
  invert?: boolean
}

/** Big, faint logo + wordmark lockup used as a discreet premium watermark behind section content. */
export function BrandWatermark({ className, size = 320, invert = false }: BrandWatermarkProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute z-0 flex select-none flex-col items-center gap-[0.06em]',
        invert ? 'opacity-[0.08]' : 'opacity-[0.07]',
        className,
      )}
      style={{ width: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/petar-avatar.jpg"
        alt=""
        className={cn('rounded-full grayscale', invert && 'invert')}
        style={{ width: size, height: size, objectFit: 'cover' }}
      />
      <span
        className={cn('font-semibold leading-none tracking-[-.06em]', invert ? 'text-white' : 'text-black')}
        style={{ fontSize: size * 0.16 }}
      >
        {BRAND_NAME}
      </span>
    </span>
  )
}
