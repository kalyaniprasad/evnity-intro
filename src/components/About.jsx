import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2, Target, Users, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  { icon: Target, label: 'Student-first design' },
  { icon: Users, label: 'Built for collaborating teams' },
  { icon: TrendingUp, label: 'Data-driven event insights' },
  { icon: CheckCircle2, label: 'Seamless registration flow' },
]

function AppCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_8px_32px_rgba(30,64,175,0.08)] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#0F172A] text-sm font-bold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Event Overview</p>
          <p className="text-[#94A3B8] text-xs mt-0.5">June 2025</p>
        </div>
        <span className="text-xs font-semibold text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-2.5 py-1 rounded-lg">Live</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[['247','Registered'],['18','Teams'],['94%','Approval']].map(([v,l]) => (
          <div key={l} className="bg-[#F8FAFF] rounded-xl p-3 border border-[#E2E8F0] text-center">
            <p className="text-lg font-extrabold text-[#1E40AF]" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{v}</p>
            <p className="text-[#94A3B8] text-[10px] mt-0.5">{l}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-[#475569]">Registration Progress</span>
          <span className="text-xs font-semibold text-[#1E40AF]">82%</span>
        </div>
        <div className="h-2 bg-[#EFF4FF] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '82%' }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true }}
            className="h-full bg-[#1E40AF] rounded-full"
          />
        </div>
      </div>

      {/* Recent activity */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Recent Activity</p>
        {[
          { name: 'Priya N.', action: 'joined Team Alpha', time: '2m ago' },
          { name: 'Rohan M.', action: 'submitted project', time: '14m ago' },
          { name: 'Sneha P.', action: 'registered for event', time: '31m ago' },
        ].map(({ name, action, time }) => (
          <div key={name} className="flex items-center justify-between py-2 border-b border-[#F1F5FB] last:border-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#EFF4FF] flex items-center justify-center flex-shrink-0">
                <span className="text-[#1E40AF] text-[9px] font-bold">{name.split(' ').map(n=>n[0]).join('')}</span>
              </div>
              <div>
                <p className="text-[#0F172A] text-[11px] font-semibold">{name}</p>
                <p className="text-[#94A3B8] text-[10px]">{action}</p>
              </div>
            </div>
            <span className="text-[#94A3B8] text-[10px]">{time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-pad bg-[#EFF4FF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-semibold text-[#1E40AF] bg-white border border-[#BFD0F5] px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            About Evnity
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mb-5 tracking-tight">
            Built by students,<br />
            <span className="text-[#1E40AF]">for students.</span>
          </h2>
          <p className="text-[#475569] leading-relaxed mb-4 text-base">
            Evnity was born from the chaos of college tech fests — scattered spreadsheets,
            missed deadlines, and zero visibility. We built the platform we always wished existed.
          </p>
          <p className="text-[#475569] leading-relaxed mb-8 text-base">
            Today, Evnity powers hundreds of events across campuses, giving organizers
            full control and participants a seamless experience — from signup to results.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {PILLARS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#E2E8F0] shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-[#1E40AF]" />
                </div>
                <span className="text-[#0F172A] text-sm font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <AppCard />
        </div>
      </div>
    </section>
  )
}
