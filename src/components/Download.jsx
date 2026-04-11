import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Smartphone, Star } from 'lucide-react'
import Magnetic from './Magnetic'

gsap.registerPlugin(ScrollTrigger)

function AndroidIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24A10.14 10.14 0 0 0 12 8c-1.53 0-2.98.35-4.48.91L5.65 5.67a.664.664 0 0 0-.83-.22.657.657 0 0 0-.26.85L6.4 9.48A9.788 9.788 0 0 0 2 17h20a9.788 9.788 0 0 0-4.4-7.52zM7.55 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm8.9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.18 1.27-2.16 3.8.02 3.02 2.65 4.03 2.68 4.04l-.07.28M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

export default function Download() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for all content children
      gsap.fromTo('.dl-content > *',
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '#download', start: 'top 80%' }
        }
      )

      // Stars animate in one by one
      gsap.fromTo('.dl-star',
        { opacity: 0, scale: 0, rotate: -30 },
        {
          opacity: 1, scale: 1, rotate: 0,
          duration: 0.4, ease: 'back.out(2)', stagger: 0.07,
          scrollTrigger: { trigger: '.dl-stars', start: 'top 88%' }
        }
      )

      // Parallax background orb
      gsap.to('.dl-orb', {
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
    <section id="download" ref={sectionRef} className="section-pad bg-white relative overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dl-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#EFF4FF] rounded-full blur-[140px] opacity-50" />
        <div className="absolute top-0 right-0 w-[30%] h-[50%] bg-[#3B60D4]/05 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <div className="dl-content flex flex-col items-center">
          {/* Floating app icon */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-[2.2rem] bg-[#1E40AF] flex items-center justify-center mx-auto mb-8 shadow-premium"
            style={{ boxShadow: '0 20px 50px rgba(30,64,175,0.3)' }}
          >
            <Smartphone size={36} className="text-white" />
          </motion.div>

          <span className="inline-block text-[0.7rem] font-black text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-4 py-2 rounded-xl mb-6 tracking-[0.2em] uppercase shadow-sm">
            Availability
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-[#0F172A] tracking-tighter mb-6 leading-[1.08]">
            Ready to Amplify<br className="hidden sm:block" /> Your Events?
          </h2>

          <p className="text-[#475569] text-lg font-medium leading-relaxed mb-12 max-w-lg">
            Free to download and open for everyone. Available on Android and iOS. Join the elite group of student organizers today.
          </p>

          {/* Star rating */}
          <div className="dl-stars flex items-center justify-center gap-2 mb-12">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="dl-star text-[#FBBF24]" fill="#FBBF24" />
              ))}
            </div>
            <span className="text-[#0F172A] font-black text-xl ml-2">4.9</span>
            <span className="text-[#94A3B8] font-bold text-sm tracking-wide">/ 5.0 Rating</span>
          </div>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Magnetic strength={0.25}>
              <a
                href="./evnity.apk"
                download="evnity.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-4 bg-[#1E40AF] text-white px-9 py-5 rounded-[1.5rem] shadow-premium font-bold card-shine no-underline"
              >
                <AndroidIcon />
                <div className="text-left">
                  <p className="text-[0.6rem] text-white/70 font-black uppercase tracking-widest leading-none mb-1">Get it on</p>
                  <p className="text-lg font-black leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Google Play</p>
                </div>
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button
                className="btn-secondary inline-flex items-center gap-4 bg-white text-[#0F172A] border-2 border-[#E2E8F0] px-9 py-5 rounded-[1.5rem] font-bold card-shine"
              >
                <AppleIcon />
                <div className="text-left">
                  <p className="text-[0.6rem] text-[#94A3B8] font-black uppercase tracking-widest leading-none mb-1">Download on</p>
                  <p className="text-lg font-black leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>App Store</p>
                </div>
              </button>
            </Magnetic>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8">
            <p className="text-[#94A3B8] text-[0.7rem] font-bold uppercase tracking-widest">v1.2.0 Stable Build</p>
            <div className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]" />
            <p className="text-[#94A3B8] text-[0.7rem] font-bold uppercase tracking-widest">Beta Access Open</p>
          </div>
        </div>
      </div>
    </section>
  )
}
