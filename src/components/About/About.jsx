import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, PieChart, BarChart2, Landmark, ShieldCheck, Coins, ArrowUpRight, Percent, Wallet } from 'lucide-react'
import Main from './Main.jsx'

export default function About() {

    const floatingIcons = [
        // center scattered — small and subtle
        { Icon: ShieldCheck,   top: '15%', left: '55%',  size: 20, delay: 1.2,  duration: 6.5, opacity: 0.12 },
        { Icon: Coins,         top: '80%', left: '50%',  size: 26, delay: 0.3,  duration: 7,   opacity: 0.11 },
        { Icon: ArrowUpRight,  top: '50%', left: '75%',  size: 22, delay: 0.7,  duration: 5,   opacity: 0.13 },
        { Icon: Percent,       top: '30%', left: '25%',  size: 18, delay: 1.8,  duration: 6,   opacity: 0.10 },
        { Icon: Wallet,        top: '55%', left: '35%',  size: 24, delay: 0.4,  duration: 7.5, opacity: 0.12 },
        { Icon: BarChart2,     top: '45%', left: '50%',  size: 18, delay: 0.6,  duration: 5.5, opacity: 0.08 },
        { Icon: DollarSign,    top: '5%',  left: '35%',  size: 16, delay: 2,    duration: 8,   opacity: 0.10 },

        // ✅ CORNERS — big and visible
        // top-left corner
        { Icon: TrendingUp,    top: '4%',  left: '2%',   size: 44, delay: 0,    duration: 5,   opacity: 0.55 },
        { Icon: BarChart2,     top: '18%', left: '3%',   size: 32, delay: 0.4,  duration: 6,   opacity: 0.35 },

        // top-right corner
        { Icon: DollarSign,    top: '4%',  left: '88%',  size: 46, delay: 0.6,  duration: 6,   opacity: 0.50 },
        { Icon: PieChart,      top: '20%', left: '84%',  size: 30, delay: 1,    duration: 7,   opacity: 0.30 },

        // bottom-left corner
        { Icon: Landmark,      top: '72%', left: '2%',   size: 44, delay: 0.8,  duration: 8,   opacity: 0.50 },
        { Icon: Coins,         top: '58%', left: '4%',   size: 28, delay: 1.5,  duration: 5.5, opacity: 0.30 },

        // bottom-right corner
        { Icon: Wallet,        top: '70%', left: '88%',  size: 44, delay: 0.3,  duration: 7,   opacity: 0.50 },
        { Icon: ArrowUpRight,  top: '55%', left: '86%',  size: 28, delay: 1.1,  duration: 6,   opacity: 0.30 },
    ]

    const polygonShapes = [
        "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
    ]

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center gap-10">

                {/* Hero */}
                <div
                    className="w-full h-[50vh] relative overflow-hidden"
                    style={{
                        backgroundImage: `url(./about_hero.webp)`,
                        backgroundSize: 'cover',
                        backgroundPosition: '10% 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 z-10 bg-gray-900/55" />

                    {/* Floating icons + shapes layer */}
                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">

                        {/* Icons */}
                        {floatingIcons.map(({ Icon, top, left, size, delay, duration, opacity }, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-white"
                                style={{ top, left, opacity }}
                                animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }}
                                transition={{
                                    duration,
                                    delay,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Icon size={size} strokeWidth={1.2} />
                            </motion.div>
                        ))}

                        {/* ✅ CORNER polygon shapes — big and visible */}

                        {/* Top-left — large rotating hexagon */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-10 -left-10 w-56 h-56 border-2 border-emerald-400/40 bg-emerald-400/5"
                            style={{ clipPath: polygonShapes[1] }}
                        />
                        {/* Top-left inner smaller */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-4 -left-4 w-32 h-32 border border-white/20"
                            style={{ clipPath: polygonShapes[2] }}
                        />

                        {/* Top-right — large rotating pentagon */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-10 -right-10 w-60 h-60 border-2 border-emerald-400/35 bg-emerald-400/5"
                            style={{ clipPath: polygonShapes[0] }}
                        />
                        {/* Top-right inner smaller */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-2 right-2 w-28 h-28 border border-white/15"
                            style={{ clipPath: polygonShapes[1] }}
                        />

                        {/* Bottom-left — large octagon */}
                        <motion.div
                            animate={{ rotate: 360, scale: [1, 1.04, 1] }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-10 -left-10 w-60 h-60 border-2 border-white/25 bg-white/[0.03]"
                            style={{ clipPath: polygonShapes[2] }}
                        />
                        {/* Bottom-left inner */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-0 left-0 w-32 h-32 border border-emerald-400/25"
                            style={{ clipPath: polygonShapes[0] }}
                        />

                        {/* Bottom-right — large hexagon */}
                        <motion.div
                            animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-10 -right-10 w-64 h-64 border-2 border-emerald-400/30 bg-emerald-400/[0.04]"
                            style={{ clipPath: polygonShapes[1] }}
                        />
                        {/* Bottom-right inner */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-2 right-2 w-36 h-36 border border-white/15"
                            style={{ clipPath: polygonShapes[2] }}
                        />

                        {/* Center subtle shapes — unchanged */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
                            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-4 left-[40%] w-20 h-20 border border-white/[0.06]"
                            style={{ clipPath: polygonShapes[1] }}
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/[0.04]"
                            style={{ clipPath: polygonShapes[2] }}
                        />
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[40%] left-[15%] w-8 h-8 bg-emerald-400/10"
                            style={{ clipPath: polygonShapes[0] }}
                        />

                    </div>

                    {/* Hero text content */}
                    <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-6 gap-4">

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-6 h-[1.5px] bg-emerald-400 rounded-full" />
                            <span className="text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase">
                                Who We Are
                            </span>
                            <div className="w-6 h-[1.5px] bg-emerald-400 rounded-full" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight heading"
                        >
                            About <span className="text-emerald-400">Us</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="text-white/60 text-sm md:text-base jost max-w-xl font-light leading-relaxed"
                        >
                            Building a smarter, safer, and more accessible investment future for everyone.
                        </motion.p>

                    </div>

                </div>

                <div className='w-full'>

                    <Main/>

                </div>

            </div>
        </>
    )
}