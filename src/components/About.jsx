import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2, Target, Users, TrendingUp, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  { icon: Target, label: 'Student-first design' },
  { icon: Users, label: 'Built for collaborating teams' },
  { icon: TrendingUp, label: 'Data-driven event insights' },
  { icon: CheckCircle2, label: 'Seamless registration flow' },
]

function AppCard() {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-white rounded-[2rem] border border-[#E2E8F0] shadow-premium p-6 lg:p-8 space-y-6 will-change-transform"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#0F172A] text-[0.9rem] font-black" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Event Overview</p>
          <p className="text-[#94A3B8] text-xs font-bold mt-1 uppercase tracking-wider">Dashboard · June 2025</p>
        </div>
        <div className="flex items-center gap-2 text-[0.65rem] font-black text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-3 py-1.5 rounded-xl uppercase tracking-widest">
           <Zap size={10} fill="#1E40AF" /> Live
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[['247','Reg.', '#EFF4FF'],['18','Teams', '#F0FDF4'],['94%','Rate', '#FFF7ED']].map(([v,l,c]) => (
          <div key={l} className="rounded-2xl p-3 text-center border border-[#E2E8F0] shadow-sm hover:border-[#BFD0F5] transition-colors" style={{ backgroundColor: '#fff' }}>
            <p className="text-xl font-black text-[#1E40AF]" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{v}</p>
            <p className="text-[#94A3B8] text-[0.6rem] font-bold uppercase mt-1 tracking-tighter">{l}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[0.7rem] font-black text-[#475569] uppercase tracking-wider">Registration Growth</span>
          <span className="text-[0.75rem] font-black text-[#1E40AF]">82% Full</span>
        </div>
        <div className="h-3 bg-[#EFF4FF] rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '82%' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true }}
            className="h-full bg-gradient-to-r from-[#1E40AF] to-[#3B60D4] rounded-full"
          />
        </div>
      </div>

      {/* Recent activity */}
      <div className="space-y-3">
        <p className="text-[0.65rem] font-black text-[#94A3B8] uppercase tracking-[0.15em]">Live Feed</p>
        {[
          { name: 'Priya N.', action: 'created Team Alpha', time: '2m ago' },
          { name: 'Rohan M.', action: 'locked submission', time: '14m ago' },
          { name: 'Sneha P.', action: 'verified email', time: '31m ago' },
        ].map(({ name, action, time }) => (
          <div key={name} className="flex items-center justify-between py-2 border-b border-[#F1F5FB] last:border-0 group/feed">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EFF4FF] flex items-center justify-center flex-shrink-0 group-hover/feed:bg-[#1E40AF] transition-colors group/icon">
                <span className="text-[#1E40AF] group-hover/feed:text-white text-[10px] font-black transition-colors">{name.split(' ').map(n=>n[0]).join('')}</span>
              </div>
              <div>
                <p className="text-[#0F172A] text-[0.75rem] font-extrabold">{name}</p>
                <p className="text-[#94A3B8] text-[0.65rem] font-medium">{action}</p>
              </div>
            </div>
            <span className="text-[#94A3B8] text-[0.6rem] font-bold">{time}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for left content children
      gsap.fromTo('.about-content > *',
        { opacity: 0, x: -36, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.75, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '#about', start: 'top 72%' }
        }
      )
      // Pillar cards stagger after text
      gsap.fromTo('.pillar-card',
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.pillars-grid', start: 'top 85%' }
        }
      )
      // Visual card
      gsap.fromTo('.about-visual',
        { opacity: 0, scale: 0.88, x: 40 },
        {
          opacity: 1, scale: 1, x: 0, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: '#about', start: 'top 72%' }
        }
      )
      // Parallax background blob
      gsap.to('.about-blob', {
        y: -50, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top', scrub: 1.5,
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-pad bg-gradient-to-b from-[#F8FAFF] to-[#EFF4FF] relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="about-blob absolute top-[-15%] left-[-8%] w-[44%] h-[50%] bg-[#3B60D4]/08 blur-[140px] rounded-full" />
        <div className="about-blob absolute bottom-[-10%] right-[-5%] w-[35%] h-[40%] bg-[#EFF4FF] blur-[100px] rounded-full opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* Left Content */}
        <div className="about-content">
          <span className="inline-block text-[0.7rem] font-black text-[#1E40AF] bg-white border border-[#BFD0F5] px-4 py-2 rounded-xl mb-6 tracking-[0.15em] uppercase shadow-sm">
            Origin Story
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] leading-[1.1] mb-8 tracking-tighter">
            Designed by students,<br />
            <span className="text-[#1E40AF]">Perfected for scale.</span>
          </h2>
          <p className="text-[#475569] leading-relaxed mb-5 text-lg font-medium">
            Evnity was born from the chaos of college tech fests — scattered spreadsheets,
            missed deadlines, and zero visibility. We built the platform we always wished we had.
          </p>
          <p className="text-[#475569] leading-relaxed mb-10 text-lg font-medium">
            Today, Evnity powers hundreds of events across campuses, giving organizers
            full control and participants a seamless experience — from signup to results.
          </p>

          <div className="pillars-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="pillar-card card-glow flex items-center gap-4 bg-white/70 backdrop-blur-sm rounded-[1.25rem] px-5 py-4 border border-[#E2E8F0] shadow-sm group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#1E40AF] transition-all duration-300">
                  <Icon size={18} className="text-[#1E40AF] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-[#0F172A] text-sm font-bold leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div className="about-visual perspective">
          <AppCard />
        </div>
      </div>
    </section>
  )
}
