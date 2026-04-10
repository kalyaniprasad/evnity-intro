import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 })
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, [role="button"]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        backgroundColor: isHovering ? 'rgba(30, 64, 175, 0.25)' : 'rgba(30, 64, 175, 0.4)',
        border: isHovering ? '2.5px solid rgba(30, 64, 175, 0.5)' : '1px solid rgba(30, 64, 175, 0.2)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        translateX: '-50%',
        translateY: '-50%',
        x: mouseX,
        y: mouseY,
        backdropFilter: isHovering ? 'blur(4px)' : 'none',
        transition: 'background-color 0.3s, border 0.3s, backdrop-filter 0.3s',
      }}
      className="hidden lg:block pointer-events-none"
    />
  )
}
