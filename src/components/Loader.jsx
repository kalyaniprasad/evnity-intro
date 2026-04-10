import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + 5
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          {/* Animated Background Logo Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            className="absolute pointer-events-none"
          >
             <Zap size={600} fill="#1E40AF" className="text-[#1E40AF]" />
          </motion.div>

          {/* Logo container */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-20 h-20 rounded-[2rem] bg-[#1E40AF] flex items-center justify-center shadow-premium mb-8"
            >
              <Zap size={40} className="text-white fill-white" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-[#0F172A] text-2xl font-black tracking-tighter mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                EVNITY
              </h2>
              <div className="flex items-center gap-4 text-[#94A3B8] text-[0.6rem] font-black uppercase tracking-[0.3em] overflow-hidden">
                <p>Establishing Connection</p>
                <div className="w-8 h-[1px] bg-[#E2E8F0]" />
                <p>{percent}%</p>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="mt-8 w-64 h-1 bg-[#EFF4FF] rounded-full overflow-hidden shadow-inner">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${percent}%` }}
                 className="h-full bg-gradient-to-r from-[#1E40AF] to-[#3B60D4] rounded-full shadow-lg"
               />
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
             <p className="text-[#94A3B8] text-[0.55rem] font-bold uppercase tracking-[0.4em]">Optimizing Experience</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
