import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Mail, Info, Lock, Eye, Trash2, Smartphone, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  const [activeNav, setActiveNav] = useState('introduction')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: <Info size={20} />,
      content: (
        <div className="space-y-4">
          <p>Evnity is a campus event platform built to simplify event discovery, registration, and management for students and organizers.</p>
          <p>We value your privacy and are committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and the choices you have regarding your information when using the Evnity mobile application.</p>
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-blue-900 font-medium">
            By using the app, you agree to the practices described in this policy.
          </div>
        </div>
      )
    },
    {
      id: 'collection',
      title: '2. Information We Collect',
      icon: <Eye size={20} />,
      content: (
        <div className="space-y-6">
          <div className="group">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">A</span>
              Personal Information
            </h4>
            <p className="text-gray-600 mb-4 pl-10">When you create an account or use the app, we may collect:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-10">
              {['Name', 'Email address', 'Profile alias/bio', 'Branch & Year', 'Profile photo'].map(item => (
                <div key={item} className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="group">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">B</span>
              Event Registration Information
            </h4>
            <p className="text-gray-600 mb-4 pl-10">Additional info required for specific events:</p>
            <div className="space-y-2 pl-10">
              {['Phone number', 'Custom responses (preferences, teams)', 'Files or documents'].map(item => (
                <div key={item} className="flex items-center gap-2 text-gray-600">
                  <ChevronRight size={14} className="text-blue-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'usage',
      title: '3. How We Use Your Information',
      icon: <Lock size={20} />,
      content: (
        <div className="grid grid-cols-1 gap-4">
          {[
            'Operate and maintain the Evnity platform',
            'Manage event registrations and attendance',
            'Send event updates and notifications',
            'Improve app functionality and user experience',
            'Enable organizers to manage and coordinate events'
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <div className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-gray-600 font-medium">{item}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'sharing',
      title: '4. Data Sharing',
      icon: <Shield size={20} />,
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-gray-900 px-2">We do not sell your personal data.</p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { title: 'Event Organizers', text: 'Details shared for event coordination (name, email, phone).', theme: 'blue' },
              { title: 'Firebase (Google)', text: 'Secure storage on Google Cloud infrastructure.', theme: 'orange' },
              { title: 'Google Sign-In', text: 'Basic profile info used to manage your account.', theme: 'gray' }
            ].map(item => (
              <div key={item.title} className={`p-5 rounded-[2rem] border transition-all hover:shadow-md
                ${item.theme === 'blue' ? 'bg-blue-50/50 border-blue-100' : 
                  item.theme === 'orange' ? 'bg-orange-50/50 border-orange-100' : 
                  'bg-gray-50/50 border-gray-100'}`}>
                <h4 className="font-bold mb-1 text-gray-900">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'permissions',
      title: '5. Permissions Used',
      icon: <Smartphone size={20} />,
      content: (
        <div className="space-y-3">
          {[
            { label: 'Internet', desc: 'Syncing data and authentication' },
            { label: 'Notifications', desc: 'Event updates and reminders' },
            { label: 'Storage', desc: 'Uploading images and documents' },
            { label: 'Alarms', desc: 'Upcoming event notifications' }
          ].map(p => (
            <div key={p.label} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <span className="font-bold text-gray-800">{p.label}</span>
              <span className="text-sm text-gray-500 font-medium">{p.desc}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'deletion',
      title: '6. Data Deletion',
      icon: <Trash2 size={20} />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">You have the right to delete your personal data at any time.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="https://evnitypccoe.vercel.app" className="block group p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl text-white shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform">
              <h4 className="font-bold mb-1">Online Request</h4>
              <p className="text-blue-100 text-sm">Submit via our website</p>
            </a>
            <a href="mailto:evnity.team@gmail.com" className="block group p-6 bg-white border-2 border-blue-100 rounded-3xl hover:border-blue-600 transition-colors">
              <h4 className="font-bold text-gray-900 mb-1">By Email</h4>
              <p className="text-gray-500 text-sm">evnity.team@gmail.com</p>
            </a>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      title: '7. Contact Us',
      icon: <Mail size={20} />,
      content: (
        <div className="p-8 bg-[#0F172A] rounded-[2.5rem] text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors" />
          <h4 className="text-xl font-bold mb-4 relative z-10">Have questions?</h4>
          <p className="text-gray-400 mb-6 text-sm relative z-10">Our team is here to help with any privacy-related inquiries.</p>
          <a href="mailto:evnity.team@gmail.com" className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 rounded-xl font-black hover:bg-blue-500 transition-colors relative z-10">
            <Mail size={18} />
            Email Us
          </a>
        </div>
      )
    }
  ]

  const scrollTo = (id) => {
    setActiveNav(id)
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
           <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[100px]" />
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors border border-gray-100 shadow-sm mb-8">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-[#0F172A] tracking-tighter mb-6 leading-tight">
              Privacy <br /><span className="text-blue-600">Policy.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Last updated: May 8, 2026. We've updated our policy to be more transparent about how we protect your campus life data.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-5 pb-32">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-32 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 pl-4">On this page</p>
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left
                    ${activeNav === s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-white hover:text-blue-600'}`}
                >
                  <span className={activeNav === s.id ? 'text-white' : 'text-blue-500 opacity-60'}>{s.icon}</span>
                  {s.title.split('. ')[1]}
                </button>
              ))}
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 space-y-16">
            {sections.map((section) => (
              <motion.section
                id={section.id}
                key={section.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      {section.icon}
                   </div>
                   <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">{section.title}</h2>
                </div>
                <div className="text-gray-600 text-lg leading-relaxed">
                  {section.content}
                </div>
              </motion.section>
            ))}
            
            <div className="pt-8 text-center text-gray-400 font-medium text-sm">
              Envity Platform • PCCOE Campus • {new Date().getFullYear()}
            </div>
          </main>

        </div>
      </div>
    </div>
  )
}
