import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Premium scroll progress indicator — a thin blue line at the top of the viewport.
 * Driven by GSAP ScrollTrigger scrub for buttery smoothness.
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    if (!barRef.current) return

    gsap.set(barRef.current, { scaleX: 0 })

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, { scaleX: self.progress })
        }
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          background: 'linear-gradient(90deg, #1E40AF 0%, #3B60D4 60%, #93AEED 100%)',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  )
}
