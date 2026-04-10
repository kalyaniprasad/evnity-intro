import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const GUIDE = {
  name: 'Dr. Kavitha Menon',
  role: 'Associate Professor, Computer Science',
  initials: 'KM',
  bio: 'With 14 years of experience in distributed systems and software engineering education, Dr. Menon guides our team with clarity, rigor, and a deep belief in student-led innovation.',
}

const MEMBERS = [
  { name: 'Arjun Sharma', role: 'Full Stack Developer', initials: 'AS', color: '#EFF4FF' },
  { name: 'Priya Nair', role: 'UI/UX Designer', initials: 'PN', color: '#FDF4FF' },
  { name: 'Rohan Mehta', role: 'Backend Engineer', initials: 'RM', color: '#F0FDF4' },
  { name: 'Sneha Patel', role: 'Mobile Developer', initials: 'SP', color: '#FFF7ED' },
  { name: 'Vikram Rao', role: 'DevOps Engineer', initials: 'VR', color: '#FFFBEB' },
  { name: 'Ananya Iyer', role: 'Product Manager', initials: 'AI', color: '#EFF4FF' },
]

const ICON_COLORS = ['#1E40AF','#9333EA','#16A34A','#EA580C','#D97706','#1E40AF']

function MemberCard({ name, role, initials, color, iconColor }) {
  return (
    <motion.div
      whileHover={{ y: -5, borderColor: '#BFD0F5', boxShadow: '0 12px 32px rgba(30,64,175,0.10)' }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#E2E8F0] p-5 text-center shadow-[0_2px_8px_rgba(30,64,175,0.05)] cursor-default"
    >
      <div
        className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className="font-bold text-base" style={{ color: iconColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {initials}
        </span>
      </div>
      <p className="text-[#0F172A] font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{name}</p>
      <p className="text-[#94A3B8] text-xs mt-1">{role}</p>
    </motion.div>
  )
}

export default function Team() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const guideRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' } }
      )
      gsap.fromTo(guideRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: guideRef.current, start: 'top 80%' } }
      )
      const cards = gridRef.current.querySelectorAll('.member-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="team" ref={sectionRef} className="section-pad bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12" style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-semibold text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            The people behind <span className="text-[#1E40AF]">Evnity</span>
          </h2>
          <p className="text-[#475569] max-w-md mx-auto text-base">
            A passionate student team turning event chaos into clarity.
          </p>
        </div>

        {/* Guide card */}
        <div ref={guideRef} className="max-w-2xl mx-auto mb-10" style={{ opacity: 0 }}>
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(30,64,175,0.12)' }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border-2 border-[#BFD0F5] p-7 flex flex-col sm:flex-row items-center gap-6 shadow-[0_4px_20px_rgba(30,64,175,0.08)]"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#EFF4FF] border-2 border-[#BFD0F5] flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-[#1E40AF] text-xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {GUIDE.initials}
              </span>
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 bg-[#EFF4FF] border border-[#BFD0F5] text-[#1E40AF] text-[10px] font-bold px-2.5 py-1 rounded-full mb-2.5">
                <Award size={10} /> Guide & Mentor
              </div>
              <h3 className="text-[#0F172A] font-extrabold text-lg mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {GUIDE.name}
              </h3>
              <p className="text-[#1E40AF] text-sm font-semibold mb-2">{GUIDE.role}</p>
              <p className="text-[#475569] text-sm leading-relaxed">{GUIDE.bio}</p>
            </div>
          </motion.div>
        </div>

        {/* Members grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MEMBERS.map((m, i) => (
            <div key={m.name} className="member-card" style={{ opacity: 0 }}>
              <MemberCard {...m} iconColor={ICON_COLORS[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
