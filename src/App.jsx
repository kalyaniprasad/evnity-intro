import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Team from './components/Team'
import Download from './components/Download'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const footerRef = useRef(null)
  
  // ── Lenis smooth scroll ──────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const anchors = document.querySelectorAll('a[href^="#"], button')
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (href?.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) lenis.scrollTo(target, { offset: -80 })
      }
    }
    anchors.forEach((a) => a.addEventListener('click', handleClick))

    return () => {
      lenis.destroy()
      anchors.forEach((a) => a.removeEventListener('click', handleClick))
    }
  }, [])

  // ── Section Storytelling Transitions ─────────────────────────────
  useEffect(() => {
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      gsap.fromTo(section, 
        { scale: 0.98, opacity: 0.8 },
        { 
          scale: 1, 
          opacity: 1, 
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          }
        }
      )
    })
  }, [])

  return (
    <div className="relative min-h-screen bg-[#F8FAFF]">
      <ScrollProgress />
      <Loader />
      <CustomCursor />
      <Navbar />
      
      {/* Main Content with Reveal Layering */}
      <div className="relative z-10 bg-[#F8FAFF] shadow-[0_-1px_100px_rgba(0,0,0,0.05)] mb-[400px]">
        <main>
          <Hero />
          <About />
          <Features />
          <Team />
          <Download />
          <Contact />
        </main>
      </div>

      {/* Sticky Footer */}
      <div 
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full z-0"
        style={{ height: '400px' }}
      >
        <Footer />
      </div>
    </div>
  )
}

