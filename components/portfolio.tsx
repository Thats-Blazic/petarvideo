'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { BookingForm } from '@/components/site/booking-form'
import { SectionBridge } from '@/components/site/section-bridge'
import { Faq } from '@/components/site/faq'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/site/hero'
import { Navbar } from '@/components/site/navbar'
import { Process } from '@/components/site/process'
import { ProjectModal } from '@/components/site/project-modal'
import { ScrollProgress } from '@/components/site/scroll-progress'
import { SmoothScrollProvider } from '@/components/site/smooth-scroll'
import { Stats } from '@/components/site/stats'
import { Work } from '@/components/site/work'
import {
  bookMarqueePhrases,
  heroMarqueePhrases,
  processMarqueePhrases,
  workMarqueePhrases,
} from '@/lib/marquee-phrases'
import { easeOut } from '@/lib/motion'
import type { Project } from '@/lib/site-data'

function PortfolioContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-[#111]"
    >
      <ScrollProgress />
      <Navbar />

      <Hero />
      <SectionBridge phrases={heroMarqueePhrases} duration={36} />
      <Work onSelectProject={setSelectedProject} />
      <SectionBridge phrases={workMarqueePhrases} reverse duration={40} />
      <Stats />
      <SectionBridge phrases={processMarqueePhrases} duration={34} />
      <Process />
      <SectionBridge phrases={bookMarqueePhrases} reverse duration={38} />
      <BookingForm presetSeconds={15} requestId={0} />
      <Faq />
      <Footer />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </motion.main>
  )
}

export default function Portfolio() {
  return (
    <SmoothScrollProvider>
      <PortfolioContent />
    </SmoothScrollProvider>
  )
}
