export type Service = 'SHORT FORM' | 'YOUTUBE' | 'PREMIUM'

export type Project = {
  title: string
  type: string
  description: string
  price: string
  tone: string
  label: string
  service: Service
}

export const projects: Project[] = [
  {
    title: 'YouTube Edit',
    type: 'Long form · 2026',
    description: 'A clean, considered edit built to hold attention from the first frame.',
    price: '€180',
    tone: 'from-zinc-800 via-zinc-700 to-zinc-500',
    label: '01',
    service: 'YOUTUBE',
  },
  {
    title: 'Social Media Pack',
    type: 'Reels / TikTok · 2026',
    description: 'Fast, vertical cuts with rhythm, clarity and a little more impact.',
    price: '€120',
    tone: 'from-neutral-900 via-stone-700 to-orange-200',
    label: '02',
    service: 'SHORT FORM',
  },
  {
    title: 'Cinematic Promo',
    type: 'Commercial · 2026',
    description: 'A cinematic brand story shaped around mood, motion and sound.',
    price: '€650',
    tone: 'from-slate-900 via-slate-700 to-sky-200',
    label: '03',
    service: 'PREMIUM',
  },
  {
    title: 'Founder Story',
    type: 'Brand film · 2026',
    description: 'Human, honest storytelling for people building something meaningful.',
    price: '€420',
    tone: 'from-stone-900 via-stone-600 to-amber-100',
    label: '04',
    service: 'PREMIUM',
  },
]

export type PackageDuration = {
  /** Duration already included in the base price, in seconds. */
  includedSeconds: number
  /** Extra cost per additional minute beyond the included duration. */
  perMinuteOver: number
  /** Sensible default duration for this package, in seconds. */
  defaultSeconds: number
}

export type Package = {
  name: Service
  price: number
  suffix: string
  detail: string
  features: string[]
  duration: PackageDuration
  popular?: boolean
}

export const packages: Package[] = [
  {
    name: 'SHORT FORM',
    price: 60,
    suffix: '/ video',
    detail: 'Reels · TikTok · Shorts',
    features: ['Vertical 9:16 format', 'Captions & sound design', '2 rounds of revisions'],
    duration: { includedSeconds: 30, perMinuteOver: 20, defaultSeconds: 30 },
  },
  {
    name: 'YOUTUBE',
    price: 180,
    suffix: '/ video',
    detail: 'Full YouTube editing',
    features: ['Full narrative pacing', 'Color grade & sound mix', '3 rounds of revisions'],
    duration: { includedSeconds: 480, perMinuteOver: 12, defaultSeconds: 480 },
    popular: true,
  },
  {
    name: 'PREMIUM',
    price: 650,
    suffix: '/ project',
    detail: 'Cinematic / commercial editing',
    features: ['Cinematic grade & VFX', 'Custom sound design', 'Unlimited revisions'],
    duration: { includedSeconds: 180, perMinuteOver: 45, defaultSeconds: 180 },
  },
]

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 180, suffix: '+', label: 'Videos edited' },
  { value: 60, suffix: '+', label: 'Happy clients' },
  { value: 4, suffix: 'y', label: 'Years editing' },
  { value: 24, suffix: 'h', label: 'Avg. turnaround' },
]

export const processSteps = [
  {
    number: '01',
    icon: 'upload' as const,
    title: 'Send your footage',
    description: 'Drop your raw clips and a short brief through a shared drive — no fancy setup required.',
  },
  {
    number: '02',
    icon: 'edit' as const,
    title: 'I craft the edit',
    description: 'Pacing, sound, color and story come together into a first cut built around your goal.',
  },
  {
    number: '03',
    icon: 'review' as const,
    title: 'You review & tweak',
    description: 'Leave timestamped notes. Revisions are fast, focused and included in every package.',
  },
  {
    number: '04',
    icon: 'deliver' as const,
    title: 'Final export, delivered',
    description: 'You get a polished, platform-ready file — exactly as long as you asked for.',
  },
]

export const testimonials = [
  {
    name: 'Ana K.',
    role: 'YouTuber · 220K subscribers',
    quote: 'Petar turned three hours of raw footage into an 8 minute video that actually kept people watching. Retention went up almost immediately.',
    rating: 5,
    initials: 'AK',
    tone: 'from-zinc-800 to-zinc-500',
  },
  {
    name: 'Marko S.',
    role: 'Founder, Northbeam',
    quote: 'We needed a 45 second brand story for launch day. It came back cinematic, on-brief and on time — no notes needed.',
    rating: 5,
    initials: 'MS',
    tone: 'from-slate-900 to-sky-400',
  },
  {
    name: 'Lena V.',
    role: 'Content creator',
    quote: 'The short form pack is unreal value. Fast turnaround, punchy captions, and the pacing just hits different.',
    rating: 5,
    initials: 'LV',
    tone: 'from-stone-800 to-amber-300',
  },
  {
    name: 'David P.',
    role: 'Agency creative director',
    quote: 'Communicated clearly, delivered early, and the cut felt more expensive than what we paid for it.',
    rating: 4,
    initials: 'DP',
    tone: 'from-neutral-900 to-orange-300',
  },
]

export const faqs = [
  {
    q: 'How long can my video be?',
    a: 'Anything from a 15 second Reel to a 20+ minute YouTube video. Pick your clip length in the booking form — seconds or minutes — and the price updates automatically.',
  },
  {
    q: 'What if my footage runs longer than the package includes?',
    a: 'No problem. Each package includes a base duration; anything beyond that is billed per extra minute at a clear, published rate shown right in the form.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Your raw footage (or a link to it), a short brief on tone and goal, and any reference videos you like. That is enough to produce a strong first cut.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Every package includes at least two rounds of revisions. Premium projects include unlimited rounds until you are happy with the result.',
  },
  {
    q: 'What is the typical turnaround time?',
    a: 'Short form content usually ships in 24–48 hours. YouTube and premium projects typically take 3–7 days depending on length and complexity.',
  },
]
