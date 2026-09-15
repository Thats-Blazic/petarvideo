'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'

import { formatDuration } from '@/lib/duration'
import type { Project } from '@/lib/site-data'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(6px)' }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md rounded-[1.75rem] bg-[#f5f5f3] p-3 sm:max-w-lg sm:rounded-[2rem] sm:p-5"
          >
            <button
              aria-label="Close project"
              onClick={onClose}
              className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 transition hover:scale-105 sm:right-8 sm:top-8"
            >
              <X className="h-4 w-4" />
            </button>
            <div
              className={`relative mx-auto flex aspect-square w-full max-h-[min(70vh,90vw)] max-w-[min(70vh,90vw)] items-center justify-center overflow-hidden rounded-[1.25rem] bg-gradient-to-br sm:rounded-[1.5rem] ${project.tone}`}
            >
              {project.videoSrc ? (
                <video
                  src={project.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : project.comingSoon ? (
                <div className="flex flex-col items-center gap-2 px-6 text-center">
                  <p className="text-xs font-semibold tracking-[.28em] text-white/70">COMING SOON</p>
                  <p className="text-sm text-white/55">This piece is on the way — check back shortly.</p>
                </div>
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Play className="h-10 w-10 fill-white text-white sm:h-12 sm:w-12" />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col gap-4 px-2 pb-2 pt-5">
              <div>
                <p className="text-xs text-black/40">
                  {project.comingSoon ? 'Coming soon' : project.type} · {formatDuration(project.seconds)}
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-[-.04em] sm:text-3xl sm:tracking-[-.05em]">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-black/50">{project.description}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
