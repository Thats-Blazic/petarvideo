'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'

import { BrandWatermark } from '@/components/site/brand-mark'
import { SectionHeader } from '@/components/site/section-header'
import { Spotlight } from '@/components/site/spotlight'
import { reveal } from '@/lib/motion'
import { projects, type Project } from '@/lib/site-data'

type WorkProps = {
  onSelectProject: (project: Project) => void
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(cardRef, { margin: '-15%', amount: 0.45 })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 220, damping: 22 })

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  function handleMouseEnter() {
    if (prefersReducedMotion || !videoRef.current) return
    videoRef.current.play().catch(() => undefined)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video || !project.videoSrc) return
    if (inView) {
      video.play().catch(() => undefined)
      return
    }
    video.pause()
    video.currentTime = 0
  }, [inView, project.videoSrc])

  return (
    <motion.button
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={reveal}
      transition={{ delay: index * 0.06 }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      onClick={onSelect}
      className="group w-full shrink-0 text-left md:snap-center md:min-w-[min(72vw,20rem)] lg:min-w-0"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ rotateX, rotateY, perspective: 1000, transformStyle: 'preserve-3d' }}
      >
        <Spotlight
          className={`relative aspect-square overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${project.tone} p-4 text-white transition duration-700 group-hover:scale-[1.01] sm:rounded-[2rem] sm:p-6`}
        >
          {project.videoSrc ? (
            <video
              ref={videoRef}
              src={project.videoSrc}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}

          {project.comingSoon ? (
            <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px]">
              <span className="text-[10px] font-semibold tracking-[.28em] text-white/90 sm:text-xs">COMING SOON</span>
            </div>
          ) : (
            <motion.span
              initial={false}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-black/55 to-transparent px-4 pb-5 pt-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:pb-6"
            >
              <span className="text-[10px] font-medium tracking-[.22em] text-white/90 sm:text-[11px]">
                [ CLICK TO EXPAND ]
              </span>
            </motion.span>
          )}

          <span className="absolute left-4 top-4 z-10 text-xs text-white/60 sm:left-6 sm:top-6">{project.label}</span>
          {!project.videoSrc && (
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  'radial-gradient(circle at 65% 30%, rgba(255,255,255,.7), transparent 22%), linear-gradient(135deg, transparent 40%, rgba(0,0,0,.4))',
              }}
            />
          )}
          {!project.comingSoon && (
            <span className="absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-white group-hover:text-black sm:bottom-6 sm:right-6 sm:h-12 sm:w-12">
              <Play className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
            </span>
          )}
        </Spotlight>
      </motion.div>
      <div className="mt-3 flex items-start justify-between sm:mt-4">
        <div>
          <h3 className="text-sm font-medium sm:text-lg">{project.title}</h3>
          <p className="mt-1 text-xs text-black/45 sm:text-sm">
            {project.comingSoon ? 'Coming soon' : project.type}
          </p>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-black/35 transition group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-5 sm:w-5" />
      </div>
    </motion.button>
  )
}

export function Work({ onSelectProject }: WorkProps) {
  return (
    <section id="work" className="snap-section relative overflow-hidden px-6 py-20 sm:px-10 sm:py-24 lg:py-36">
      <BrandWatermark className="right-4 top-10 rotate-3" size={170} />
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={reveal}>
          <SectionHeader title="Featured Work" />
        </motion.div>
        <div
          className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 md:flex md:overflow-x-auto md:pb-6 md:snap-x md:snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} onSelect={() => onSelectProject(project)} />
          ))}
        </div>
      </div>
    </section>
  )
}
