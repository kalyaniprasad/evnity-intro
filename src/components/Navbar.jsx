import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import Magnetic from './Magnetic'

const NAV_LINKS = ['Home', 'About', 'Features', 'Team', 'Download', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeSection, setActive]    = useState('home')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = []
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.toLowerCase())
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(link.toLowerCase()) },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <motion.header
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-[#E2E8F0] py-0'
          : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Magnetic strength={0.2}>
          <a
            href="#home"
            className="flex items-center gap-2.5 focus-visible:outline-none group relative z-[110]"
          >
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-8 h-8 rounded-lg bg-[#1E40AF] flex items-center justify-center shadow-md group-hover:shadow-[0_0_15px_rgba(30,64,175,0.4)] transition-shadow"
            >
              <Zap size={16} className="text-white" fill="white" />
            </motion.div>
            <span
              className="text-[#0F172A] font-bold text-lg tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Evnity
            </span>
          </a>
        </Magnetic>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.toLowerCase()
            return (
              <Magnetic key={link} strength={0.2}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={`relative px-3.5 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg
                    ${isActive ? 'text-[#1E40AF]' : 'text-[#475569] hover:text-[#1E40AF] hover:bg-[#EFF4FF]/60'}`}
                >
                  {link}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-bar"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1E40AF] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1E40AF] origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  )}
                </a>
              </Magnetic>
            )
          })}
          <Magnetic strength={0.3}>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: '#1A3697', y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#download"
              className="ml-4 px-6 py-2.5 bg-[#1E40AF] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Get the App
            </motion.a>
          </Magnetic>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-[#0F172A] hover:bg-[#EFF4FF] transition-colors relative z-[110]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop to close menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 bg-white/60 backdrop-blur-sm md:hidden z-[90]"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden absolute top-full left-5 right-5 mt-4 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-premium overflow-hidden border border-[#E2E8F0] z-[100]"
            >
              <div className="p-4 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={closeMobile}
                    className="text-left px-5 py-4 text-[1rem] font-bold text-[#475569] hover:text-[#1E40AF] hover:bg-[#EFF4FF] rounded-2xl transition-all active:scale-[0.98]"
                  >
                    {link}
                  </a>
                ))}
                <a
                  href="#download"
                  onClick={closeMobile}
                  className="mt-4 px-5 py-5 bg-[#1E40AF] text-white text-[1rem] font-black rounded-2xl shadow-lg active:scale-[0.98] transition-transform text-center"
                >
                  Get the App
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>

  )
}
