'use client'

import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useRef } from 'react'

const NAV_OFFSET = -88

type SmoothScrollContextValue = {
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
      autoRaf: true,
      allowNestedScroll: true,
      anchors: {
        offset: NAV_OFFSET,
      },
    })

    lenisRef.current = lenis
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    return () => {
      lenis.destroy()
      lenisRef.current = null
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])

  const scrollTo = useCallback(
    (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => {
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? NAV_OFFSET,
          duration: options?.duration ?? 1.2,
        })
        return
      }

      if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [],
  )

  return <SmoothScrollContext.Provider value={{ scrollTo }}>{children}</SmoothScrollContext.Provider>
}
