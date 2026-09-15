export type Project = {
  title: string
  type: string
  description: string
  /** Length of this piece, in seconds — price is derived from this via lib/pricing.ts. */
  seconds: number
  tone: string
  label: string
  /** Public path to preview video, e.g. `/work/sequence-03.mp4` */
  videoSrc?: string
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    title: 'X Concept',
    type: 'Product Concept · Motion Design · 2026',
    description:
      'A speculative motion piece for X — bold typography, tight rhythm and UI motion that feels native to the feed: fast cuts, clear hierarchy and just enough attitude to stop the scroll.',
    seconds: 20,
    tone: 'from-zinc-800 via-zinc-700 to-zinc-500',
    label: '01',
    videoSrc: '/work/sequence-03.mp4',
  },
  {
    title: 'iCloud Concept',
    type: 'Product Concept · Motion Design · 2026',
    description:
      'An iCloud-forward concept animation — soft depth, calm transitions and cloud-sync metaphors rendered with Apple-level restraint: light, space and motion that sell trust without shouting.',
    seconds: 15,
    tone: 'from-neutral-900 via-stone-700 to-orange-200',
    label: '02',
    videoSrc: '/work/sequence-03-2.mp4',
  },
  {
    title: 'Cinematic Promo',
    type: 'Commercial · 2026',
    description: 'A cinematic animated brand story shaped around mood, motion and sound.',
    seconds: 45,
    tone: 'from-slate-900 via-slate-700 to-sky-200',
    label: '03',
    comingSoon: true,
  },
  {
    title: 'Founder Story',
    type: 'Brand Animation · 2026',
    description: 'Human, honest animated storytelling for people building something meaningful.',
    seconds: 90,
    tone: 'from-stone-900 via-stone-600 to-amber-100',
    label: '04',
    comingSoon: true,
  },
]

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 180, suffix: '+', label: 'Animations delivered' },
  { value: 60, suffix: '+', label: 'Happy clients' },
  { value: 4, suffix: 'y', label: 'Years in motion design' },
  { value: 7, suffix: 'Days', label: 'Avg. turnaround' },
]

export const processSteps = [
  {
    number: '01',
    icon: 'upload' as const,
    title: 'Share your brief',
    description: 'Send your script, brand assets and references — no raw footage required.',
  },
  {
    number: '02',
    icon: 'edit' as const,
    title: 'I craft the animation',
    description: 'Storyboard, motion, sound and color come together into a first draft built around your goal.',
  },
  {
    number: '03',
    icon: 'review' as const,
    title: 'You review & tweak',
    description: 'Leave timestamped notes. Revisions are fast, focused and included in every project.',
  },
  {
    number: '04',
    icon: 'deliver' as const,
    title: 'Final export, delivered',
    description: 'You get a polished, platform-ready animation — exactly as long as you asked for.',
  },
]

export const faqs = [
  {
    q: 'How long can my animation be?',
    a: 'Anything from a 10 second sting to a 2+ minute brand film. Pick the exact length in the booking form — seconds or minutes — and the price updates instantly.',
  },
  {
    q: 'How is the price calculated?',
    a: 'Every project is billed at a flat €7 per second of final animation — no hidden tiers, no surprise fees. Choose your duration and see the total before you send your request.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Your brief, brand assets (logo, colors, fonts) and any reference videos or animations you like. That is enough to produce a strong first draft.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Every project includes at least two rounds of revisions, with additional rounds available for longer pieces.',
  },
  {
    q: 'What is the typical turnaround time?',
    a: 'Short animations (under 30 seconds) usually ship in 2–4 days. Longer, more complex pieces take 1–2 weeks depending on length and complexity.',
  },
]
