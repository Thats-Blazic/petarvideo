'use client'

import { useState } from 'react'

import { BookingForm } from '@/components/site/booking-form'
import { Faq } from '@/components/site/faq'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/site/hero'
import { Navbar } from '@/components/site/navbar'
import { Pricing } from '@/components/site/pricing'
import { Process } from '@/components/site/process'
import { ProjectModal } from '@/components/site/project-modal'
import { ScrollProgress } from '@/components/site/scroll-progress'
import { Stats } from '@/components/site/stats'
import { Testimonials } from '@/components/site/testimonials'
import { Work } from '@/components/site/work'
import type { Project, Service } from '@/lib/site-data'

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [service, setService] = useState<Service>('SHORT FORM')
  const [requestId, setRequestId] = useState(0)

  function applyService(nextService: Service) {
    setService(nextService)
    setRequestId((id) => id + 1)
    document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-[#111]">
      <ScrollProgress />
      <Navbar />

      <Hero />
      <Work onSelectProject={setSelectedProject} />
      <Stats />
      <Process />
      <Pricing onChoosePackage={applyService} />
      <Testimonials />
      <BookingForm service={service} onServiceChange={setService} requestId={requestId} />
      <Faq />
      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelect={(project) => {
          setSelectedProject(null)
          applyService(project.service)
        }}
      />
    </main>
  )
}
