import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Download, Calendar, Clock, MapPin, Users, Bell, Star } from 'lucide-react'

// ── Phone mockup: Event Detail ───────────────────────────────────────────────
function EventMockup() {
  return (
    <div className="w-52 rounded-[2rem] border border-[#E2E8F0] bg-white shadow-[0_20px_60px_rgba(30,64,175,0.12)] overflow-hidden">
      {/* status bar */}
      <div className="bg-[#1E40AF] px-4 pt-3 pb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/70 text-[9px] font-medium">9:41</span>
          <div className="flex gap-1">
            {[1,2,3].map(i=><div key={i} className="w-1 h-2.5 bg-white/60 rounded-sm" style={{height: `${6+i*3}px`}} />)}
            <div className="w-3 h-2.5 rounded-sm border border-white/60 ml-0.5"><div className="h-full w-2/3 bg-white/60 rounded-sm" /></div>
          </div>
        </div>
        <h3 className="text-white text-xs font-bold leading-tight">HackFest 2025</h3>
        <p className="text-white/70 text-[9px] mt-0.5">National Hackathon</p>
      </div>
      <div className="p-3 space-y-2">
        <div className="bg-[#EFF4FF] rounded-xl p-2.5">
          <p className="text-[#1E40AF] text-[8px] font-semibold mb-2 uppercase tracking-wide">Event Details</p>
          {[
            { icon: Calendar, label: 'Date', val: 'June 14, 2025' },
            { icon: Clock, label: 'Time', val: '9:00 AM – 6:00 PM' },
            { icon: MapPin, label: 'Venue', val: 'MIT Auditorium' },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="flex items-center gap-2 py-1 border-b border-[#BFD0F5] last:border-0">
              <div className="w-5 h-5 rounded-md bg-[#1E40AF]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={9} className="text-[#1E40AF]" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-[7px]">{label}</p>
                <p className="text-[#0F172A] text-[8px] font-medium">{val}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-1.5">
            {['#3B60D4','#1E40AF','#93AEED'].map((c,i) => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{backgroundColor: c}} />
            ))}
            <div className="w-5 h-5 rounded-full border-2 border-white bg-[#F1F5FB] flex items-center justify-center">
              <span className="text-[6px] text-[#475569] font-bold">+8</span>
            </div>
          </div>
          <span className="text-[#475569] text-[7px]">247 registered</span>
        </div>
        <button className="w-full bg-[#1E40AF] text-white text-[9px] font-bold py-2 rounded-xl">
          Register Now →
        </button>
      </div>
    </div>
  )
}

// ── Phone mockup: Profile ────────────────────────────────────────────────────
function ProfileMockup() {
  return (
    <div className="w-48 rounded-[2rem] border border-[#E2E8F0] bg-white shadow-[0_20px_60px_rgba(30,64,175,0.10)] overflow-hidden">
      <div className="bg-gradient-to-b from-[#EFF4FF] to-white px-3 pt-5 pb-3">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1E40AF] flex items-center justify-center mb-2 shadow-md">
            <span className="text-white font-bold text-lg" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>AS</span>
          </div>
          <p className="text-[#0F172A] text-[10px] font-bold">Arjun Sharma</p>
          <p className="text-[#93AEED] text-[8px] mt-0.5">Computer Science · Year 3</p>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-3">
          {[['12','Events'],['4','Teams'],['98%','Rate']].map(([v,l]) => (
            <div key={l} className="bg-white rounded-xl p-2 text-center border border-[#E2E8F0]">
              <p className="text-[#1E40AF] text-[11px] font-bold">{v}</p>
              <p className="text-[#94A3B8] text-[7px]">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 pb-3 space-y-1.5">
        <p className="text-[#475569] text-[8px] font-semibold uppercase tracking-wide">Upcoming</p>
        {['HackFest 2025','Design Sprint','Tech Talk'].map((e,i) => (
          <div key={e} className="flex items-center justify-between bg-[#F8FAFF] rounded-xl px-2.5 py-2 border border-[#E2E8F0]">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: ['#1E40AF','#3B60D4','#93AEED'][i]}} />
              <span className="text-[#0F172A] text-[8px] font-medium">{e}</span>
            </div>
            <Bell size={8} className="text-[#94A3B8]" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(badgeRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 })
      .fromTo(headingRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
      .fromTo(ctaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#F8FAFF]"
      style={{ paddingTop: '5rem' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, #EFF4FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, #EFF4FF 0%, transparent 70%)' }}
        />
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E40AF" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left – text */}
        <div>
          <div ref={badgeRef} className="inline-flex items-center gap-2 bg-[#EFF4FF] border border-[#BFD0F5] text-[#1E40AF] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
            <Star size={12} fill="#1E40AF" />
            Student-Focused Event Platform
          </div>

          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-[#0F172A] leading-[1.1] tracking-tight mb-5"
          >
            Manage Events
            <span className="block text-[#1E40AF]">Effortlessly.</span>
          </h1>

          <p
            ref={subRef}
            className="text-base sm:text-lg text-[#475569] leading-relaxed mb-8 max-w-md"
          >
            Evnity helps students organize, track, and participate in events
            seamlessly — from registration to real-time updates, all in one place.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: '#1A3697' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1E40AF] text-white text-sm font-semibold rounded-xl shadow-[0_4px_16px_rgba(30,64,175,0.25)] transition-colors"
            >
              Explore Features <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: '#EFF4FF' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-[#BFD0F5] text-[#1E40AF] text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Download size={15} /> Download App
            </motion.button>
          </div>

          {/* Proof strip */}
          <div className="mt-10 flex items-center gap-6 flex-wrap">
            {[['10K+', 'Active users'], ['500+', 'Events hosted'], ['4.9★', 'App rating']].map(([v, l]) => (
              <div key={l}>
                <p className="text-lg font-bold text-[#0F172A]" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{v}</p>
                <p className="text-xs text-[#94A3B8]">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right – mockups */}
        <div className="flex justify-center items-end gap-5 relative">
          {/* Glow behind */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 bg-[#EFF4FF] rounded-full blur-3xl" />
          </div>

          {/* Profile card – offset up */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="relative z-10 mt-10"
          >
            <ProfileMockup />
          </motion.div>

          {/* Event card – main */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-20"
          >
            <EventMockup />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -right-4 top-16 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_8px_24px_rgba(30,64,175,0.10)] px-3 py-2 flex items-center gap-2 z-30"
          >
            <div className="w-7 h-7 rounded-xl bg-[#EFF4FF] flex items-center justify-center">
              <Users size={12} className="text-[#1E40AF]" />
            </div>
            <div>
              <p className="text-[#0F172A] text-[9px] font-bold">247 Registered</p>
              <p className="text-[#94A3B8] text-[8px]">HackFest 2025</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute -left-2 bottom-20 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_8px_24px_rgba(30,64,175,0.08)] px-3 py-2 z-30"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-green-50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <p className="text-[#0F172A] text-[9px] font-semibold">Registration Open</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
