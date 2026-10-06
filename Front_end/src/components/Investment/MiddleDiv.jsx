import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'

const items = [
  {
    label: 'Funding',
    img: '/funding_investment_section.webp',
    description: 'Access diversified capital pools for your next major venture. We connect you with top-tier investors and institutional funding sources.',
    color: 'bg-emerald-500'
  },
  {
    label: 'Assurance',
    img: '/assurance.webp',
    description: 'Verified deal structures ensuring maximum security and transparency. Every investment is backed by rigorous legal and financial audits.',
    color: 'bg-blue-500'
  },
  {
    label: 'Growth',
    img: '/growth_investment_section.webp',
    description: 'Scale your portfolio with data-driven market insights. Our advanced analytics help you identify high-yield opportunities before they go mainstream.',
    color: 'bg-indigo-500'
  },
]

export default function MiddleDiv() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [active])

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4 md:px-10 overflow-hidden relative">

      {/* Background Decorative Text */}
      <div className="absolute top-20 left-10 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[15vw] font-black heading leading-none uppercase">Strategic</h2>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-20">

        {/* Left: Rotated Image Showcase */}
        <div className="relative order-2 lg:order-1 flex justify-center items-center py-10">
          <div className="absolute w-[120%] aspect-square bg-emerald-100/40 rounded-full blur-3xl" />

          {/* Background Square (Opposite Rotation) */}
          <motion.div
            className="absolute w-full max-w-[480px] aspect-square bg-slate-200/40 rounded-[4rem] -rotate-[16deg] border border-slate-300/30 shadow-inner"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-[420px] aspect-[4/5] rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] border-[14px] border-white bg-white overflow-hidden"
            initial={{ rotate: 16, opacity: 0, scale: 0.9 }}
            whileInView={{ rotate: 16, opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="w-full h-full relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.img
                  src={items[active].img}
                  alt={items[active].label}
                  className="w-[100%] h-[90%] object-contain rounded-4xl border-4 border-green-400 origin-center scale-[1.1] -rotate-[20deg]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${active}`}
              className="absolute bottom-4 right-[5%] lg:right-0 z-30 bg-white/90 backdrop-blur-md px-8 py-6 rounded-3xl shadow-2xl border border-slate-100 flex flex-col gap-1 min-w-[200px]"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${items[active].color}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 jost-light">Focus Area</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-2xl font-black text-slate-900 heading">{items[active].label}</h4>
                <TrendingUp size={24} className="text-emerald-500" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Interactive Stepper */}
        <div className="order-1 lg:order-2 flex flex-col gap-8 lg:pl-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="h-[2px] w-12 bg-emerald-500 rounded-full" />
              <p className='text-xs md:text-sm uppercase tracking-[0.4em] text-emerald-600 font-bold jost-light'>
                Our Advantage
              </p>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 heading leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Smart Capital <br/> <span className="text-emerald-500">Infrastructure</span>
            </motion.h2>
          </div>

          <div className="relative mt-4 space-y-4">
            <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-slate-200" />

            {items.map((item, i) => {
              const isActive = active === i
              return (
                <div
                  key={item.label}
                  onClick={() => setActive(i)}
                  className="group relative flex gap-8 cursor-pointer pl-2"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        isActive
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : 'bg-white border-slate-200 text-slate-400 group-hover:border-emerald-200'
                      }`}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                    >
                      <span className="text-sm font-bold">{i + 1}</span>
                    </motion.div>
                  </div>

                  <div className="flex flex-col pt-1 pb-6 border-b border-slate-100 w-full transition-all duration-300">
                    <h3 className={`text-2xl font-bold transition-colors duration-300 heading ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {item.label}
                    </h3>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "circOut" }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-slate-600 leading-relaxed max-w-md jost-light text-base md:text-lg">
                            {item.description}
                          </p>

                          <motion.div
                            className="mt-4 h-1 bg-emerald-100 rounded-full overflow-hidden w-full max-w-[200px]"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                          >
                            <motion.div
                              className="h-full bg-emerald-500"
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 5, ease: 'linear' }}
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}