import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import Team from '../components/Team'
import Download from '../components/Download'
import Contact from '../components/Contact'
import ScrollProgress from '../components/ScrollProgress'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const footerRef = useRef(null)
  
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

    const anchors = document.querySelectorAll('a[href*="#"], button')
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (href?.includes('#')) {
        const hash = href.split('#')[1]
        const target = document.getElementById(hash)
        if (target) {
          e.preventDefault()
          lenis.scrollTo(target, { offset: -80 })
        }
      }
    }
    anchors.forEach((a) => a.addEventListener('click', handleClick))

    // Handle initial hash on mount
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash)
        if (target) lenis.scrollTo(target, { offset: -80 })
      }, 500)
    }

    return () => {
      lenis.destroy()
      anchors.forEach((a) => a.removeEventListener('click', handleClick))
    }
  }, [])

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
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Features />
        <Team />
        <Download />
        <Contact />
      </main>
    </>
  )
}
