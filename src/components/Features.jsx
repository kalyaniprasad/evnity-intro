import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarPlus, Bell, CalendarDays, ClipboardList, Users2, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    icon: CalendarPlus,
    title: 'Event Creation',
    description:
      'Build event pages in minutes. Set dates, capacity, registration deadlines, and publish with one tap.',
    color: '#EFF4FF',
    iconColor: '#1E40AF',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description:
      'Automated reminders, announcements, and last-minute alerts keep every participant informed.',
    color: '#F0FDF4',
    iconColor: '#16A34A',
  },
  {
    icon: CalendarDays,
    title: 'Calendar Integration',
    description:
      'Sync events to Google Calendar, iCal, or Outlook. Never double-book or miss a deadline again.',
    color: '#FFF7ED',
    iconColor: '#EA580C',
  },
  {
    icon: ClipboardList,
    title: 'Registration Tracking',
    description:
      'Real-time dashboards, waitlists, check-in QR codes, and exportable attendee reports.',
    color: '#EFF4FF',
    iconColor: '#1E40AF',
  },
  {
    icon: Users2,
    title: 'Team Collaboration',
    description:
      'Role-based access for co-organizers. Assign tasks, share notes, and manage everything together.',
    color: '#FDF4FF',
    iconColor: '#9333EA',
  },
  {
    icon: Zap,
    title: 'Real-time Alerts',
    description:
      'Instant push alerts for schedule changes, announcements, and result updates — no refresh needed.',
    color: '#FFFBEB',
    iconColor: '#D97706',
  },
]

function FeatureCard({ icon: Icon, title, description, color, iconColor, index }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(30,64,175,0.12)' }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-[0_2px_12px_rgba(30,64,175,0.05)] cursor-default group"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: color }}
      >
        <Icon size={20} style={{ color: iconColor }} strokeWidth={1.8} />
      </div>
      <h3 className="text-[#0F172A] font-bold text-base mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {title}
      </h3>
      <p className="text-[#475569] text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function Features() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' } }
      )

      const cards = gridRef.current.querySelectorAll('.feature-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="section-pad bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14" style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-semibold text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Everything you need to run<br className="hidden sm:block" />
            <span className="text-[#1E40AF]"> great events</span>
          </h2>
          <p className="text-[#475569] max-w-xl mx-auto text-base leading-relaxed">
            Powerful tools designed for modern student organizers who move fast and care about experience.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="feature-card" style={{ opacity: 0 }}>
              <FeatureCard {...f} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
