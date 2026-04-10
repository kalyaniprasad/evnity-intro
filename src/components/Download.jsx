import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Smartphone, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function AndroidIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24A10.14 10.14 0 0 0 12 8c-1.53 0-2.98.35-4.48.91L5.65 5.67a.664.664 0 0 0-.83-.22.657.657 0 0 0-.26.85L6.4 9.48A9.788 9.788 0 0 0 2 17h20a9.788 9.788 0 0 0-4.4-7.52zM7.55 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm8.9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.18 1.27-2.16 3.8.02 3.02 2.65 4.03 2.68 4.04l-.07.28M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

export default function Download() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 78%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="download" ref={sectionRef} className="section-pad bg-[#EFF4FF]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center" ref={contentRef} style={{ opacity: 0 }}>
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#1E40AF] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_24px_rgba(30,64,175,0.25)]">
          <Smartphone size={28} className="text-white" />
        </div>

        <span className="inline-block text-xs font-semibold text-[#1E40AF] bg-white border border-[#BFD0F5] px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase">
          Download
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
          Get Evnity on your device
        </h2>
        <p className="text-[#475569] text-base leading-relaxed mb-10 max-w-md mx-auto">
          Free to download. Available on Android and iOS. Join thousands of students already using Evnity.
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-[#FBBF24]" fill="#FBBF24" />
          ))}
          <span className="text-[#0F172A] font-semibold text-sm ml-1">4.9</span>
          <span className="text-[#94A3B8] text-sm">· 2,400+ ratings</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 12px_32px rgba(30,64,175,0.2)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3.5 bg-[#1E40AF] hover:bg-[#1A3697] text-white px-7 py-4 rounded-2xl shadow-[0_4px_16px_rgba(30,64,175,0.25)] transition-colors font-semibold"
          >
            <AndroidIcon />
            <div className="text-left">
              <p className="text-[10px] text-white/70 font-medium uppercase tracking-wide leading-none mb-0.5">Get it on</p>
              <p className="text-base font-bold leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Google Play</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3.5 bg-white hover:bg-[#F8FAFF] text-[#0F172A] border border-[#E2E8F0] px-7 py-4 rounded-2xl shadow-[0_2px_12px_rgba(30,64,175,0.08)] transition-colors font-semibold"
          >
            <AppleIcon />
            <div className="text-left">
              <p className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wide leading-none mb-0.5">Download on the</p>
              <p className="text-base font-bold leading-none text-[#0F172A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>App Store</p>
            </div>
          </motion.button>
        </div>

        <p className="text-[#94A3B8] text-xs mt-8">Coming soon to both platforms · Sign up to be notified</p>
      </div>
    </section>
  )
}
