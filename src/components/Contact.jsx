import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Send, CheckCircle2, Github, Linkedin, Instagram } from 'lucide-react'
import Magnetic from './Magnetic'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
]

function Field({ label, id, type = 'text', placeholder, value, onChange, isTextarea }) {
  const [focused, setFocused] = useState(false)
  const baseClass = `w-full bg-[#fcfdfe] border rounded-2xl px-5 text-[#0F172A] text-[0.95rem] placeholder-[#94A3B8] outline-none transition-all duration-300 font-bold`
  const borderClass = focused 
    ? 'border-[#1E40AF] ring-4 ring-[#EFF4FF] shadow-md' 
    : 'border-[#E2E8F0] hover:border-[#BFD0F5]'
  const Tag = isTextarea ? 'textarea' : 'input'

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[0.8rem] font-black text-[#0F172A] uppercase tracking-widest ml-1">
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
        rows={isTextarea ? 5 : undefined}
        className={`${baseClass} ${borderClass} ${isTextarea ? 'py-4 resize-none' : 'py-4 h-14'}`}
        required
      />
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
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
      // Left column children stagger
      gsap.fromTo('.contact-left > *',
        { opacity: 0, x: -36, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.75, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '#contact', start: 'top 78%' }
        }
      )
      // Right form panel
      gsap.fromTo('.contact-right',
        { opacity: 0, scale: 0.93, x: 36 },
        {
          opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: '#contact', start: 'top 78%' }
        }
      )
      // Social icons stagger
      gsap.fromTo('.social-icon',
        { opacity: 0, y: 16, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5, ease: 'back.out(1.8)', stagger: 0.1,
          scrollTrigger: { trigger: '.social-icons', start: 'top 88%' }
        }
      )
      // Parallax background blob
      gsap.to('.contact-blob', {
        y: -45, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top', scrub: 1.5,
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])


  return (
    <section id="contact" ref={sectionRef} className="section-pad bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[#EFF4FF]/20 blur-[120px] rounded-full" />
      
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* Left */}
        <div className="contact-left text-center lg:text-left">
          <span className="inline-block text-[0.7rem] font-black text-[#1E40AF] bg-[#EFF4FF] border border-[#BFD0F5] px-4 py-2 rounded-xl mb-6 tracking-[0.2em] uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tighter mb-6 leading-tight">
            Let's <span className="text-[#1E40AF]">Connect</span>
          </h2>
          <p className="text-[#475569] leading-relaxed mb-10 text-lg font-medium max-w-md mx-auto lg:mx-0">
            Have questions, feedback, or want to bring Evnity to your campus? We'd love to hear from you.
          </p>

          {/* Email Card */}
          <Magnetic strength={0.2}>
            <motion.a
              href="mailto:evnity.team@gmail.com"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(30,64,175,0.1)' }}
              className="inline-flex items-center gap-5 bg-white border border-[#E2E8F0] rounded-[2rem] px-8 py-6 mb-12 shadow-md transition-all group lg:text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#EFF4FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1E40AF] transition-colors duration-500">
                <Mail size={24} className="text-[#1E40AF] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-[#94A3B8] text-[0.7rem] font-black uppercase tracking-widest mb-1">Email our team</p>
                <p className="text-[#1E40AF] text-lg font-black group-hover:underline transition-all">evnity.team@gmail.com</p>
              </div>
            </motion.a>
          </Magnetic>

          {/* Socials */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-[#94A3B8] text-[0.7rem] font-black uppercase tracking-[0.2em] mb-4">Follow the journey</p>
            <div className="flex gap-4">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <Magnetic key={label} strength={0.2}>
                  <motion.a
                    href={href}
                    aria-label={label}
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: '#1E40AF', color: '#fff' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#475569] shadow-sm transition-all"
                  >
                    <Icon size={20} />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* Right – form */}
        <div className="contact-right perspective">
          <div className="bg-white rounded-[2.5rem] border border-[#E2E8F0] shadow-premium p-8 lg:p-12 relative overflow-hidden group">
            {/* Form decorative corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#EFF4FF] rounded-bl-[4rem] -mr-6 -mt-6 transition-all duration-500 group-hover:w-32 group-hover:h-32" />
            
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center relative z-10"
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-[#EFF4FF] flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle2 size={40} className="text-[#1E40AF]" />
                  </div>
                  <h3 className="text-[#0F172A] font-black text-2xl mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Message Received!
                  </h3>
                  <p className="text-[#475569] font-bold text-base max-w-[200px]">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <Field label="Full Name" id="name" placeholder="Arjun Sharma"
                    value={form.name} onChange={handleChange('name')} />
                  <Field label="Email Address" id="email" type="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange('email')} />
                  <Field label="How can we help?" id="message" placeholder="Tell us about your event..."
                    value={form.message} onChange={handleChange('message')} isTextarea />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2, backgroundColor: '#1A3697' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-[#1E40AF] text-white font-black text-[1rem] py-5 rounded-2xl shadow-lg transition-all"
                  >
                    Send message <Send size={18} />
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
