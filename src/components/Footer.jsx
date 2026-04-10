import { motion } from 'framer-motion'
import { Zap, Mail, Github, Linkedin, Instagram } from 'lucide-react'

const NAV_LINKS = ['Home', 'About', 'Features', 'Team', 'Download', 'Contact']
const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Github, label: 'GitHub' },
  { icon: Instagram, label: 'Instagram' },
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main footer */}
        <div className="py-12 grid sm:grid-cols-3 gap-10 items-start">
          {/* Brand */}
          <div>
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#1E40AF] flex items-center justify-center shadow-sm">
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="text-[#0F172A] font-bold text-lg tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Evnity
              </span>
            </button>
            <p className="text-[#475569] text-sm leading-relaxed max-w-xs mb-4">
              Manage events effortlessly. The student-first event platform.
            </p>
            <a href="mailto:evnity.team@gmail.com" className="inline-flex items-center gap-2 text-[#1E40AF] text-sm font-medium hover:underline">
              <Mail size={14} /> evnity.team@gmail.com
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[#0F172A] font-semibold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Navigation
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-[#475569] hover:text-[#1E40AF] text-sm transition-colors font-medium"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[#0F172A] font-semibold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Follow us
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-[#F8FAFF] border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:text-[#1E40AF] hover:border-[#BFD0F5] transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E2E8F0] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#94A3B8] text-xs">
            © {new Date().getFullYear()} Evnity. Built with care by students.
          </p>
          <p className="text-[#94A3B8] text-xs">
            Made for campus events everywhere 🎓
          </p>
        </div>
      </div>
    </footer>
  )
}
