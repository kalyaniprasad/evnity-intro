import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Send, CheckCircle2, Github, Linkedin, Instagram } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
]

function Field({ label, id, type = 'text', placeholder, value, onChange, isTextarea }) {
  const [focused, setFocused] = useState(false)
  const baseClass = `w-full bg-[#F8FAFF] border rounded-xl px-4 text-[#0F172A] text-sm placeholder-[#94A3B8] outline-none transition-all duration-150 font-medium`
  const borderClass = focused ? 'border-[#1E40AF] ring-3 ring-[#EFF4FF] shadow-sm' : 'border-[#E2E8F0]'
  const Tag = isTextarea ? 'textarea' : 'input'

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#0F172A] mb-1.5">
        {label}
      </label>
      <Tag
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={isTextarea ? 4 : undefined}
        className={`${baseClass} ${borderClass} ${isTextarea ? 'py-3 resize-none' : 'py-3 h-11'}`}
        required
      />
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      )
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="section-pad bg-[#F8FAFF]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-start">
        {/* Left */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-semibold text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Let's <span className="text-[#1E40AF]">connect</span>
          </h2>
          <p className="text-[#475569] leading-relaxed mb-8 text-base max-w-sm">
            Have questions, feedback, or want to bring Evnity to your campus? We'd love to hear from you.
          </p>

          {/* Email */}
          <a
            href="mailto:evnity.team@gmail.com"
            className="inline-flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-2xl px-5 py-4 mb-8 hover:border-[#BFD0F5] hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1E40AF] transition-colors">
              <Mail size={17} className="text-[#1E40AF] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-[#94A3B8] text-[10px] font-medium uppercase tracking-wide">Email us</p>
              <p className="text-[#1E40AF] text-sm font-semibold">evnity.team@gmail.com</p>
            </div>
          </a>

          {/* Socials */}
          <div>
            <p className="text-[#94A3B8] text-xs font-semibold uppercase tracking-wider mb-3">Follow us</p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:text-[#1E40AF] hover:border-[#BFD0F5] transition-colors shadow-sm"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Right – form */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_24px_rgba(30,64,175,0.07)] p-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#EFF4FF] flex items-center justify-center mb-4">
                    <CheckCircle2 size={26} className="text-[#1E40AF]" />
                  </div>
                  <h3 className="text-[#0F172A] font-bold text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Message sent!
                  </h3>
                  <p className="text-[#475569] text-sm">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <Field label="Full Name" id="name" placeholder="Arjun Sharma"
                    value={form.name} onChange={handleChange('name')} />
                  <Field label="Email Address" id="email" type="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange('email')} />
                  <Field label="Message" id="message" placeholder="Tell us about your event or question…"
                    value={form.message} onChange={handleChange('message')} isTextarea />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, backgroundColor: '#1A3697' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#1E40AF] text-white font-semibold text-sm py-3.5 rounded-xl shadow-[0_4px_16px_rgba(30,64,175,0.2)] transition-colors"
                  >
                    Send Message <Send size={15} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
