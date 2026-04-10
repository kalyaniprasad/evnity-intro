import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarPlus, Bell, CalendarDays, ClipboardList, Users2, Zap, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    step: '01',
    icon: CalendarPlus,
    title: 'Instant Event Creation',
    description: 'Build professional event pages in minutes. Set dates, capacity, registration deadlines, and publish with one tap.',
    tags: ['Fast', 'Simple', 'Powerful'],
    color: '#EFF4FF',
    iconColor: '#1E40AF',
  },
  {
    step: '02',
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Automated reminders, announcements, and last-minute alerts keep every participant informed without lifting a finger.',
    tags: ['Automated', 'Real-time', 'Reliable'],
    color: '#F0FDF4',
    iconColor: '#16A34A',
  },
  {
    step: '03',
    icon: CalendarDays,
    title: 'Universal Integration',
    description: 'Seamlessly sync events to Google Calendar, iCal, or Outlook. Never double-book or miss a deadline again.',
    tags: ['Google', 'iCal', 'Outlook'],
    color: '#FFF7ED',
    iconColor: '#EA580C',
  },
  {
    step: '04',
    icon: ClipboardList,
    title: 'Elite Tracking',
    description: 'Real-time dashboards, waitlists, check-in QR codes, and exportable attendee reports for complete control.',
    tags: ['Dashboard', 'QR Codes', 'Reports'],
    color: '#EFF4FF',
    iconColor: '#1E40AF',
  },
  {
    step: '05',
    icon: Users2,
    title: 'Team Collaboration',
    description: 'Role-based access for co-organizers. Assign tasks, share notes, and manage every detail together in real-time.',
    tags: ['Roles', 'Tasks', 'Shared'],
    color: '#FDF4FF',
    iconColor: '#9333EA',
  },
  {
    step: '06',
    icon: Zap,
    title: 'Real-time Live Updates',
    description: 'Instant push alerts for schedule changes and result updates. Your users stay connected, always.',
    tags: ['Push', 'Live', 'Instant'],
    color: '#FFFBEB',
    iconColor: '#D97706',
  },
]

// Individual 3D-tilt feature card
function FeatureCard({ icon: Icon, title, description, tags, color, iconColor, step, index }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 250, damping: 20 })
  const ySpring = useSpring(y, { stiffness: 250, damping: 20 })
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-5deg', '5deg'])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  const isEven = index % 2 === 0

  return (
    <div className={`feature-step relative flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-24 md:mb-40 last:mb-0 ${isEven ? '' : 'md:flex-row-reverse'}`}>
      {/* Content column */}
      <div className={`flex-1 w-full text-center md:text-left ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-[0.65rem] font-black text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-3 py-1.5 rounded-xl mb-5 tracking-[0.2em] uppercase shadow-sm">
            Step {step}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-4 leading-tight tracking-tight">
            {title}
          </h3>
          <p className="text-[#475569] text-base leading-relaxed font-medium max-w-md mx-auto md:mx-0 mb-6">
            {description}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {tags.map(tag => (
              <div key={tag} className="flex items-center gap-1.5 text-[0.75rem] font-bold text-[#475569] bg-[#F8FAFF] border border-[#E2E8F0] px-3 py-1.5 rounded-lg">
                <Check size={11} className="text-[#1E40AF]" /> {tag}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Visual card column */}
      <div className="flex-1 w-full flex justify-center perspective">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, scale: 0.88, y: 36 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="feature-step-card card-shine relative w-full max-w-[420px] h-[280px] bg-white rounded-[2rem] border border-[#E2E8F0] shadow-premium p-8 group overflow-hidden will-change-transform cursor-default"
        >
          {/* Ambient color bleed */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25 transition-opacity duration-500 group-hover:opacity-40"
            style={{ backgroundColor: iconColor }}
          />

          {/* Icon */}
          <div
            className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{ backgroundColor: color }}
          >
            <Icon size={28} style={{ color: iconColor }} strokeWidth={2} />
          </div>

          {/* Skeleton lines — UI hint */}
          <div className="relative z-10 space-y-2.5">
            <div className="h-2 w-3/4 rounded-full" style={{ backgroundColor: color }} />
            <div className="h-2 w-1/2 bg-[#F1F5FB] rounded-full" />
            <div className="h-2 w-2/3 bg-[#F8FAFF] rounded-full" />
          </div>

          {/* Step badge */}
          <div className="absolute top-6 right-6 z-10 text-[0.6rem] font-black uppercase tracking-widest text-[#94A3B8]">
            {step} / 06
          </div>

          {/* Watermark icon */}
          <div className="absolute bottom-5 right-6 opacity-[0.06] group-hover:opacity-[0.14] transition-opacity duration-500 z-0">
            <Icon size={90} style={{ color: iconColor }} strokeWidth={0.8} />
          </div>

          {/* Hover glow border */}
          <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-[#BFD0F5] transition-colors duration-400 pointer-events-none" />
        </motion.div>
      </div>

      {/* Center connector dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex z-20 pointer-events-none">
        <motion.div
          whileInView={{ scale: [0, 1.3, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="w-5 h-5 rounded-full bg-white border-[3px] border-[#1E40AF] shadow-md"
        />
      </div>
    </div>
  )
}

export default function Features() {
  const sectionRef = useRef(null)
  const pathRef    = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return

    const ctx = gsap.context(() => {
      // ── Header reveal ──────────────────────────────────────────────
      gsap.fromTo('.features-header > *',
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.features-header', start: 'top 82%' }
        }
      )

      // ── SVG path draw with dynamic length ─────────────────────────
      const len = pathRef.current.getTotalLength()
      gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'bottom 92%',
          scrub: 0.6,
        }
      })

      // ── Per-step card activation ───────────────────────────────────
      const steps = sectionRef.current.querySelectorAll('.feature-step')
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => step.querySelector('.feature-step-card')?.classList.add('is-active'),
          onLeave: () => step.querySelector('.feature-step-card')?.classList.remove('is-active'),
          onEnterBack: () => step.querySelector('.feature-step-card')?.classList.add('is-active'),
          onLeaveBack: () => step.querySelector('.feature-step-card')?.classList.remove('is-active'),
        })
      })

      // ── Section background parallax ────────────────────────────────
      gsap.to('.features-bg-blob', {
        y: -60, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top', scrub: 1.5,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="section-pad bg-white relative overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="features-bg-blob absolute top-0 right-0 w-[45%] h-[50%] bg-[#EFF4FF]/30 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[35%] h-[35%] bg-[#3B60D4]/08 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section header */}
        <div className="features-header text-center mb-24 lg:mb-36">
          <span className="inline-block text-[0.7rem] font-black text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-4 py-2 rounded-full mb-6 tracking-[0.2em] uppercase shadow-sm">
            The Experience
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black text-[#0F172A] tracking-tighter mb-6 leading-[1.08]">
            How Evnity <span className="text-[#1E40AF]">Redefines</span><br className="hidden sm:block" />
            Event Management
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            We've simplified every step of the journey, making it a joy for organizers and an effortless experience for students.
          </p>
        </div>

        {/* SVG timeline connector (desktop) */}
        <div className="absolute left-1/2 -translate-x-[2px] hidden md:block z-0 pointer-events-none"
          style={{ top: 'calc(460px)', bottom: '140px' }}>
          <svg width="4" height="100%" className="h-full" preserveAspectRatio="none">
            {/* Grey ghost line */}
            <line x1="2" y1="0" x2="2" y2="100%"
              stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 8" />
            {/* Animated blue line */}
            <line
              ref={pathRef}
              x1="2" y1="0" x2="2" y2="100%"
              stroke="#1E40AF" strokeWidth="2.5"
              style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
            />
          </svg>
        </div>

        {/* Feature steps */}
        <div className="relative space-y-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
