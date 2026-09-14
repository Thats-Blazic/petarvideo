'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'

import { Spotlight } from '@/components/site/spotlight'
import { reveal } from '@/lib/motion'
import { projects, type Project } from '@/lib/site-data'

type WorkProps = {
  onSelectProject: (project: Project) => void
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  const prefersReducedMotion = useReducedMotion()
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
  }

  return (
    <motion.button
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={reveal}
      transition={{ delay: index * 0.08 }}
      onClick={onSelect}
      className="group text-left"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1000, transformStyle: 'preserve-3d' }}
      >
        <Spotlight
          className={`relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${project.tone} p-4 text-white transition duration-700 group-hover:scale-[.99] sm:rounded-[2rem] sm:p-6`}
        >
          <span className="absolute left-4 top-4 text-xs text-white/60 sm:left-6 sm:top-6">{project.label}</span>
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 65% 30%, rgba(255,255,255,.7), transparent 22%), linear-gradient(135deg, transparent 40%, rgba(0,0,0,.4))',
            }}
          />
          <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-white group-hover:text-black sm:bottom-6 sm:right-6 sm:h-12 sm:w-12">
            <Play className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
          </span>
        </Spotlight>
      </motion.div>
      <div className="mt-3 flex items-start justify-between sm:mt-4">
        <div>
          <h3 className="text-sm font-medium sm:text-lg">{project.title}</h3>
          <p className="mt-1 text-xs text-black/45 sm:text-sm">{project.type}</p>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-black/35 transition group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-5 sm:w-5" />
      </div>
    </motion.button>
  )
}

export function Work({ onSelectProject }: WorkProps) {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24 lg:py-36">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={reveal}>
        <p className="mb-4 text-xs font-semibold tracking-[.28em] text-black/40">01 / SELECTED WORK</p>
        <h2 className="text-4xl font-medium tracking-[-.05em] sm:text-5xl md:text-7xl md:tracking-[-.06em]">
          Good stories
          <br />
          <span className="text-black/35">deserve a great cut.</span>
        </h2>
      </motion.div>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} onSelect={() => onSelectProject(project)} />
        ))}
      </div>
    </section>
  )
}
