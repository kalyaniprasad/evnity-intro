import { motion } from 'framer-motion'
import { Zap, Mail, Github, Linkedin, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Features', id: 'features' },
  { name: 'Team', id: 'team' },
  { name: 'Download', id: 'download' },
  { name: 'Contact', id: 'contact' }
]

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Github, label: 'GitHub' },
  { icon: Instagram, label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] relative overflow-hidden min-h-[400px] lg:h-[400px] flex flex-col justify-between">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E40AF" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        {/* Main footer content */}
        <div className="py-12 lg:py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start relative z-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/#home" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-[#1E40AF] flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
                <Zap size={20} className="text-white" fill="white" />
              </div>
              <span className="text-[#0F172A] font-black text-2xl tracking-tighter" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Evnity
              </span>
            </Link>
            <p className="text-[#475569] text-base leading-relaxed max-w-xs mb-6 font-medium">
              Manage events effortlessly. The student-first event platform designed for modern campus life.
            </p>
            <motion.a
              whileHover={{ x: 5 }}
              href="mailto:evnity.team@gmail.com"
              className="inline-flex items-center gap-2.5 text-[#1E40AF] text-[0.95rem] font-bold hover:underline"
            >
              <Mail size={16} /> evnity.team@gmail.com
            </motion.a>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[#0F172A] font-black text-[0.85rem] mb-6 uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Quick Links
            </p>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={`/#${link.id}`}
                    className="text-[#475569] hover:text-[#1E40AF] text-[0.95rem] transition-colors font-bold flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0] group-hover:bg-[#1E40AF] transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence */}
          <div>
            <p className="text-[#0F172A] font-black text-[0.85rem] mb-6 uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Social Presence
            </p>
            <div className="flex gap-4">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: '#1E40AF', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-[#F8FAFF] border border-[#E2E8F0] flex items-center justify-center text-[#475569] shadow-sm transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <p className="text-[#94A3B8] text-[0.8rem] font-bold mt-10 leading-relaxed uppercase tracking-tighter">
              Join our community of over 10K+ students.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E2E8F0] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-[#94A3B8] text-[0.8rem] font-bold tracking-tight">
            © {new Date().getFullYear()} Evnity Platform.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-[#94A3B8] text-[0.8rem] font-bold hover:text-[#1E40AF] transition-colors">Privacy Policy</Link>
            <p className="text-[#94A3B8] text-[0.8rem] font-bold hover:text-[#1E40AF] cursor-pointer transition-colors">Terms</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
