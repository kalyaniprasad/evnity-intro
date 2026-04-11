import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Download, Calendar, Clock, MapPin, Users, Bell, Star } from 'lucide-react'
import Magnetic from './Magnetic'

gsap.registerPlugin(ScrollTrigger)

// ── Phone mockup: Event Detail ───────────────────────────────────────────────
function EventMockup() {
  return (
    <div className="w-52 rounded-[2.5rem] border border-[#E2E8F0] bg-white shadow-premium overflow-hidden will-change-transform card-shine">
      <div className="bg-[#1E40AF] px-5 pt-4 pb-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/80 text-[10px] font-bold">9:41</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => <div key={i} className="w-1 bg-white/60 rounded-sm" style={{ height: `${7 + i * 3}px` }} />)}
            <div className="w-3.5 h-3 rounded-sm border border-white/60 ml-0.5"><div className="h-full w-2/3 bg-white/60 rounded-sm" /></div>
          </div>
        </div>
        <h3 className="text-white text-[0.85rem] font-extrabold leading-tight">HackFest 2025</h3>
        <p className="text-white/70 text-[9px] mt-0.5 font-medium tracking-wide uppercase">National Hackathon</p>
      </div>
      <div className="p-4 space-y-3">
        <div className="bg-[#EFF4FF] rounded-2xl p-3">
          <p className="text-[#1E40AF] text-[8px] font-bold mb-2.5 uppercase tracking-widest">Event Details</p>
          {[
            { icon: Calendar, label: 'Date', val: 'June 14, 2025' },
            { icon: Clock, label: 'Time', val: '9:00 AM – 6:00 PM' },
            { icon: MapPin, label: 'Venue', val: 'PCCOE Auditorium' },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="flex items-center gap-3 py-1.5 border-b border-[#BFD0F5]/50 last:border-0">
              <div className="w-6 h-6 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Icon size={10} className="text-[#1E40AF]" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-[7px] font-bold uppercase tracking-tighter">{label}</p>
                <p className="text-[#0F172A] text-[9px] font-bold leading-tight">{val}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {['#3B60D4', '#1E40AF', '#93AEED', '#6366F1'].map((c, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-white bg-white flex items-center justify-center shadow-sm">
              <span className="text-[7px] text-[#475569] font-bold">+12</span>
            </div>
          </div>
          <span className="text-[#475569] text-[8px] font-semibold">247 registered</span>
        </div>
        <button className="w-full bg-[#1E40AF] text-white text-[10px] font-bold py-2.5 rounded-xl shadow-md active:scale-[0.98] transition-transform">
          Register Now →
        </button>
      </div>
    </div>
  )
}

// ── Phone mockup: Profile ────────────────────────────────────────────────────
function ProfileMockup() {
  return (
    <div className="w-48 rounded-[2.5rem] border border-[#E2E8F0] bg-white shadow-lg overflow-hidden will-change-transform card-shine">
      <div className="bg-gradient-to-b from-[#EFF4FF] to-white px-4 pt-6 pb-4">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#1E40AF] flex items-center justify-center mb-3 shadow-[0_8px_20px_rgba(30,64,175,0.2)]">
              <span className="text-white font-extrabold text-xl" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>AS</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
          </div>
          <p className="text-[#0F172A] text-[11px] font-extrabold">Arjun Sharma</p>
          <p className="text-[#93AEED] text-[8px] font-bold mt-0.5">Computer Science · Year 3</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[['12', 'Events'], ['4', 'Teams'], ['98%', 'Rate']].map(([v, l]) => (
            <div key={l} className="bg-white rounded-xl py-2 px-1 text-center border border-[#E2E8F0] shadow-sm">
              <p className="text-[#1E40AF] text-[11px] font-black">{v}</p>
              <p className="text-[#94A3B8] text-[7px] font-bold uppercase">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 pb-4 space-y-2">
        <p className="text-[#475569] text-[8px] font-bold uppercase tracking-widest">Upcoming</p>
        {[
          { name: 'HackFest 2025', color: '#1E40AF' },
          { name: 'Design Sprint', color: '#3B60D4' },
          { name: 'Tech Talk', color: '#93AEED' }
        ].map((e) => (
          <div key={e.name} className="flex items-center justify-between bg-[#F8FAFF] rounded-xl px-3 py-2.5 border border-[#E2E8F0] hover:border-[#BFD0F5] transition-colors group/item cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }} />
              <span className="text-[#0F172A] text-[9px] font-bold group-hover/item:text-[#1E40AF] transition-colors">{e.name}</span>
            </div>
            <Bell size={9} className="text-[#94A3B8] group-hover/item:text-[#3B60D4] transition-colors" />
          </div>
        ))}
      </div>
    </div>
  )
}



// ── Animated SVG Illustration ────────────────────────────────────────────────
function FloatingOrb() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B60D4" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orbGrad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EFF4FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#EFF4FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Large ambient orb */}
      <circle cx="250" cy="250" r="200" fill="url(#orbGrad)">
        <animateTransform attributeName="transform" type="scale"
          values="1;1.05;1" dur="6s" repeatCount="indefinite" additive="sum" />
      </circle>
      {/* Small accent orbs */}
      <circle cx="150" cy="180" r="50" fill="url(#orbGrad2)">
        <animate attributeName="cx" values="150;165;150" dur="8s" repeatCount="indefinite" />
        <animate attributeName="cy" values="180;165;180" dur="7s" repeatCount="indefinite" />
      </circle>
      <circle cx="360" cy="320" r="35" fill="url(#orbGrad2)">
        <animate attributeName="cx" values="360;345;360" dur="10s" repeatCount="indefinite" />
        <animate attributeName="cy" values="320;310;320" dur="9s" repeatCount="indefinite" />
      </circle>
      {/* Rotating ring */}
      <circle cx="250" cy="250" r="180" fill="none" stroke="#BFD0F5" strokeWidth="0.5" strokeDasharray="8 16" opacity="0.4">
        <animateTransform attributeName="transform" type="rotate"
          from="0 250 250" to="360 250 250" dur="30s" repeatCount="indefinite" />
      </circle>
      <circle cx="250" cy="250" r="130" fill="none" stroke="#BFD0F5" strokeWidth="0.5" strokeDasharray="4 12" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate"
          from="360 250 250" to="0 250 250" dur="20s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, (duration * 1000) / steps)
    return () => clearInterval(interval)
  }, [started, target, duration])

  return (
    <span ref={ref}>
      {target % 1 !== 0 ? count.toFixed(1) : count.toLocaleString()}{suffix}
    </span>
  )
}

// ────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const badgeRef = useRef(null)
  const statsRef = useRef(null)
  const mockupsWrapperRef = useRef(null)

  // Mouse tilt for mockup cluster
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 18 })
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMouseMove = (e) => {
    const rect = mockupsWrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Word-by-word heading reveal ────────────────────────────────
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        gsap.fromTo(words,
          { opacity: 0, y: 40, rotateX: -20, transformOrigin: 'top center' },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.7, ease: 'power3.out',
            stagger: 0.08, delay: 0.3,
          }
        )
      }

      // ── Staggered reveal for badge, sub, cta, stats ───────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 24, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 }, 0)
        .fromTo(subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 }, 0.65)
        .fromTo(ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 }, 0.85)
        .fromTo(statsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 }, 1.0)

      // ── Mockup cluster entrance ────────────────────────────────────
      gsap.fromTo(mockupsWrapperRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power4.out', delay: 0.4 }
      )

      // ── Parallax blobs on scroll ───────────────────────────────────
      gsap.to('.hero-blob-top', {
        y: -70, ease: 'none',
        scrollTrigger: {
          trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.5,
        }
      })
      gsap.to('.hero-blob-bottom', {
        y: 50, ease: 'none',
        scrollTrigger: {
          trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.5,
        }
      })

      // ── Hero fade out on exit ──────────────────────────────────────
      gsap.to('.hero-content', {
        opacity: 0.4, y: -30, ease: 'none',
        scrollTrigger: {
          trigger: '#home', start: 'center top', end: 'bottom top', scrub: 1,
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden animated-gradient"
      style={{ paddingTop: '5rem' }}
    >
      {/* ── Layered background ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated SVG orbs — background layer */}
        <FloatingOrb />

        {/* Radial blobs - parallax */}
        <div
          className="hero-blob-top absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,96,212,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="hero-blob-bottom absolute bottom-0 -left-24 w-[480px] h-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(239,244,255,0.7) 0%, transparent 70%)' }}
        />

        {/* Subtle dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#1E40AF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — text */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div ref={badgeRef} style={{ opacity: 0 }} className="inline-flex items-center gap-2 bg-white border border-[#BFD0F5] text-[#1E40AF] text-[0.8rem] font-bold px-4 py-2 rounded-full mb-8 shadow-sm">
            <Star size={13} fill="#1E40AF" className="animate-pulse" />
            Student-Focused Event Platform
          </div>

          {/* Heading with word-by-word reveal */}
          <h1
            ref={headingRef}
            className="text-[1.85rem] leading-[1.2] sm:text-5xl lg:text-[4.2rem] font-black text-[#0F172A] tracking-tight mb-6 px-1"
            style={{ perspective: '800px' }}
          >
            {'Manage Events'.split(' ').map((w, i) => (
              <span key={i} className="word inline-block mr-[0.3em]" style={{ display: 'inline-block' }}>{w}</span>
            ))}
            <span className="block text-shimmer">
              {'Effortlessly.'.split('').map((ch, i) => (
                <span key={i} className="word" style={{ display: 'inline-block' }}>{ch === ' ' ? '\u00A0' : ch}</span>
              ))}
            </span>
          </h1>

          <p
            ref={subRef}
            style={{ opacity: 0 }}
            className="text-[0.95rem] sm:text-xl text-[#475569] leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 font-medium px-4 sm:px-0"
          >
            Evnity helps students organize, track, and participate in events
            seamlessly — from registration to real-time updates, all in one place.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Magnetic strength={0.2}>
              <button
                className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 bg-[#1E40AF] text-white text-[1rem] font-bold rounded-2xl shadow-lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Features <ArrowRight size={20} />
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button
                className="btn-secondary inline-flex items-center gap-2.5 px-8 py-4 bg-white border border-[#BFD0F5] text-[#1E40AF] text-[1rem] font-bold rounded-2xl shadow-sm"
                onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Download size={18} /> Download App
              </button>
            </Magnetic>
          </div>

          {/* Proof strip */}
          <div ref={statsRef} style={{ opacity: 0 }} className="mt-14 grid grid-cols-2 xs:flex items-center justify-center lg:justify-start gap-8 sm:gap-10 flex-wrap">
            {[
              { target: 100, suffix: '+', label: 'Active users' },
              { target: 15, suffix: '+', label: 'Events hosted' },
              { target: 5.0, suffix: '★', label: 'App rating' },
            ].map(({ target, suffix, label }) => (
              <div key={label} className="text-center lg:text-left group">
                <p className="text-xl sm:text-2xl font-black text-[#0F172A] group-hover:text-[#1E40AF] transition-colors duration-300">
                  <AnimatedCounter target={target} suffix={suffix} duration={1.8} />
                </p>
                <p className="text-[0.65rem] sm:text-[0.7rem] font-bold text-[#94A3B8] uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — mockup cluster */}
        <div
          ref={mockupsWrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex flex-col sm:flex-row justify-center items-center lg:items-end gap-10 sm:gap-6 relative perspective h-auto lg:h-[520px] py-10 lg:py-0"
          style={{ opacity: 0 }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="flex justify-center items-end gap-6 relative w-full h-full"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] bg-[#3B60D4]/10 rounded-full blur-[80px] sm:blur-[120px]" />
            </div>

            {/* Mockup Stack */}
            <div className="flex flex-col sm:flex-row justify-center items-center lg:items-end gap-12 sm:gap-6 relative z-10 w-full sm:w-auto">
              {/* Profile card */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="relative z-10 will-change-transform scale-[0.8] xs:scale-90 sm:scale-100 origin-bottom transition-transform"
                style={{ translateZ: '50px' }}
              >
                <ProfileMockup />
              </motion.div>

              {/* Event card — main */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-20 will-change-transform scale-90 sm:scale-100 origin-bottom transition-transform"
                style={{ translateZ: '100px' }}
              >
                <EventMockup />
              </motion.div>
            </div>

            {/* Floating badge: Registered */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-2 lg:-right-8 top-12 lg:top-20 glass rounded-2xl p-2 lg:p-3 flex items-center gap-3 z-40 shadow-premium scale-[0.6] lg:scale-100 origin-right transition-transform"
              style={{ translateZ: '150px' }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#EFF4FF] flex items-center justify-center shadow-sm">
                <Users size={16} className="text-[#1E40AF]" />
              </div>
              <div>
                <p className="text-[#0F172A] text-[10px] font-black">247 Registered</p>
                <p className="text-[#94A3B8] text-[8px] font-bold uppercase tracking-tight">HackFest 2025</p>
              </div>
            </motion.div>

            {/* Floating badge: Live */}
            <motion.div
              animate={{ y: [0, -12, 0], x: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -left-2 lg:-left-6 bottom-20 lg:bottom-24 glass rounded-2xl p-2 lg:p-3 z-40 shadow-premium scale-[0.6] lg:scale-100 origin-left transition-transform"
              style={{ translateZ: '130px' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shadow-inner flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <p className="text-[#0F172A] text-[10px] font-extrabold uppercase tracking-wide">Live Updates</p>
              </div>
            </motion.div>

            {/* Depth rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute top-[15%] left-0 w-20 h-20 border border-[#1E40AF]/10 rounded-[2rem] -z-10 hidden sm:block"
              style={{ translateZ: '-20px' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-[20%] right-0 w-16 h-16 border border-[#3B60D4]/10 rounded-full -z-10 hidden sm:block"
              style={{ translateZ: '-40px' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
