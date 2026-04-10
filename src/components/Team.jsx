import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Mail, Linkedin, Twitter } from 'lucide-react'
import Magnetic from './Magnetic'

// Image imports
import guideImg from '../assets/team/team_guide_kavitha_1775814363111.png'
import arjunImg from '../assets/team/team_member_arjun_1775814163242.png'
import priyaImg from '../assets/team/team_member_priya_1775814237484.png'
import rohanImg from '../assets/team/team_member_rohan_1775814255085.png'
import snehaImg from '../assets/team/team_member_sneha_1775814272613.png'

gsap.registerPlugin(ScrollTrigger)

const GUIDE = {
  name: 'Dr. Kavitha Menon',
  role: 'Associate Professor, Computer Science',
  image: guideImg,
  bio: 'With 14 years of experience in distributed systems and software engineering education, Dr. Menon guides our team with clarity, rigor, and a deep belief in student-led innovation.',
}

const MEMBERS = [
  { name: 'Arjun Sharma', role: 'Full Stack Developer', image: arjunImg },
  { name: 'Priya Nair', role: 'UI/UX Designer', image: priyaImg },
  { name: 'Rohan Mehta', role: 'Backend Engineer', image: rohanImg },
  { name: 'Sneha Patel', role: 'Mobile Developer', image: snehaImg },
]

function TiltCard({ children, className }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="perspective flex w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`w-full will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}

function MemberCard({ name, role, image }) {
  return (
    <TiltCard>
      <div className="bg-white rounded-[2rem] border border-[#E2E8F0] p-6 text-center shadow-md hover:shadow-premium transition-shadow group h-full flex flex-col justify-between overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative mb-5 transform transition-transform duration-500 group-hover:scale-[1.02]">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm relative">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="relative z-20">
          <p className="text-[#0F172A] font-extrabold text-[1.1rem] mb-1 group-hover:text-[#1E40AF] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {name}
          </p>
          <p className="text-[#94A3B8] text-[0.8rem] font-bold uppercase tracking-wider mb-4">{role}</p>
          
          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            {[Linkedin, Twitter, Mail].map((Icon, i) => (
              <Magnetic key={i} strength={0.2}>
                <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] flex items-center justify-center text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-colors cursor-pointer shadow-sm">
                  <Icon size={14} />
                </div>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

export default function Team() {
  const sectionRef = useRef(null)
  const guideRef   = useRef(null)
  const gridRef    = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // Header children stagger
      gsap.fromTo('.team-header > *',
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.team-header', start: 'top 84%' }
        }
      )

      // Guide card — scale up from slightly smaller
      gsap.fromTo(guideRef.current,
        { opacity: 0, scale: 0.92, y: 50 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: guideRef.current, start: 'top 82%' }
        }
      )

      // Member cards — staggered with both y and scale
      const cards = gridRef.current?.querySelectorAll('.member-card-wrapper')
      if (cards?.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: gridRef.current, start: 'top 84%' }
          }
        )
      }

      // Parallax blobs
      gsap.to('.team-blob', {
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
    <section id="team" ref={sectionRef} className="section-pad bg-[#F8FAFF] relative overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="team-blob absolute top-[10%] left-[-8%] w-80 h-80 bg-[#EFF4FF] rounded-full blur-[110px] opacity-60" />
        <div className="team-blob absolute bottom-[10%] right-[-6%] w-96 h-96 bg-[#3B60D4]/06 rounded-full blur-[130px] opacity-40" />
        {/* Rotating accent ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#BFD0F5]/20 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Heading */}
        <div className="team-header text-center mb-16 lg:mb-24">
          <span className="inline-block text-xs font-black text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-4 py-2 rounded-full mb-6 tracking-[0.2em] uppercase shadow-sm">
            Innovators
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tighter mb-6 leading-tight">
            The Visionaries Behind <span className="text-[#1E40AF]">Evnity</span>
          </h2>
          <p className="text-[#475569] max-w-xl mx-auto text-lg font-medium leading-relaxed">
            Meet the talented student team turning event management chaos into an elegant digital experience.
          </p>
        </div>

        {/* Guide card */}
        <div ref={guideRef} className="max-w-4xl mx-auto mb-16 lg:mb-20">
          <TiltCard>
            <div className="card-shine bg-white rounded-[2.5rem] border-2 border-[#BFD0F5] p-8 lg:p-10 flex flex-col md:flex-row items-center gap-8 lg:gap-12 shadow-premium relative overflow-hidden group">
              {/* Shimmer corner */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#EFF4FF] to-transparent rounded-bl-[5rem] opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-500">
                  <img src={GUIDE.image} alt={GUIDE.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-xl shadow-md z-10">
                  <Award size={20} className="text-[#1E40AF]" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left flex-1 relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#1E40AF] text-white text-[0.65rem] font-black px-3 py-1.5 rounded-lg mb-4 tracking-widest uppercase shadow-sm">
                  Project Mentor
                </div>
                <h3 className="text-[#0F172A] font-black text-2xl lg:text-3xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {GUIDE.name}
                </h3>
                <p className="text-[#1E40AF] text-sm lg:text-base font-bold mb-4 tracking-wide">{GUIDE.role}</p>
                <p className="text-[#475569] text-base lg:text-lg leading-relaxed font-medium">{GUIDE.bio}</p>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Member grid — 4 cards */}
        <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {MEMBERS.map((m) => (
            <div key={m.name} className="member-card-wrapper">
              <MemberCard {...m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
