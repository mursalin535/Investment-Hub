import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const companies = [
    {
        name: "Akij Group",
        logo: "/akij.webp",
        description: "A powerhouse in the Bangladeshi industrial sector, Akij Group stands as a testament to diverse excellence. Our partnership focuses on large-scale infrastructure and manufacturing investments that define the national economy.",
        sector: "Industrial Conglomerate",
        founded: "1940s",
        status: "Active Portfolio",
        marketCap: "$2.4B Est.",
        growth: "+12.5%"
    },
    {
        name: "Aarong",
        logo: "/arong.webp",
        description: "Redefining the lifestyle and retail landscape while empowering thousands of rural artisans. Aarong represents our commitment to social enterprise and sustainable consumer market growth.",
        sector: "Retail & Social Enterprise",
        founded: "1978",
        status: "Strategic Partner",
        marketCap: "$850M Est.",
        growth: "+8.2%"
    },
    {
        name: "Beximco",
        logo: "/beximco.webp",
        description: "A global leader in pharmaceuticals and textiles. Beximco's presence in our portfolio ensures exposure to cutting-edge innovation and international export markets.",
        sector: "Pharma & Textiles",
        founded: "1970",
        status: "Major Investment",
        marketCap: "$3.1B Est.",
        growth: "+15.7%"
    },
    {
        name: "Vanguard",
        logo: "/vanguard.webp",
        description: "Through our alliance with Vanguard, we bring institutional-grade investment management and world-class asset allocation strategies to the local market, ensuring global standards for our investors.",
        sector: "Investment Management",
        founded: "1975",
        status: "Global Alliance",
        marketCap: "$7.2T AUM",
        growth: "Global"
    },
    {
        name: "Robinhood",
        logo: "/robinhood.webp",
        description: "Leading the charge in fintech democratization. Our collaboration with Robinhood focuses on building the next generation of accessible financial platforms and digital trading ecosystems.",
        sector: "Financial Technology",
        founded: "2013",
        status: "Fintech Venture",
        marketCap: "$15.4B Cap",
        growth: "+22.1%"
    }
]

export default function TopCompanies() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = 6000
        const step = 100 / (interval / 100)

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % companies.length)
            setProgress(0)
        }, interval)

        const progressTimer = setInterval(() => {
            setProgress(prev => Math.min(prev + step, 100))
        }, 100)

        return () => {
            clearInterval(timer)
            clearInterval(progressTimer)
        }
    }, [activeIndex])

    return (
        <section className="w-full py-24 px-6 md:px-16 bg-[#F9FAFB] overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-12 h-[2px] bg-green-700"></div>
                        <span className="text-green-700 font-black uppercase tracking-[0.4em] text-[10px]">
                            Institutional Partners
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
                    >
                        Working with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 italic font-serif">
                            Top Companies
                        </span> and Entrepreneurs
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="mt-8 text-slate-500 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
                    >
                        Investment is on. We've built a robust ecosystem with industry leaders to ensure your capital is backed by excellence and proven track records.
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row gap-20 items-center">

                    {/* Left: Clustered Hexagons */}
                    <motion.div
                        className="w-full lg:w-1/2 flex justify-center items-center py-10"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="relative w-[320px] h-[360px] md:w-[480px] md:h-[540px]">

                            {/* Central Active Hexagon */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[220px] h-[240px] md:w-[320px] md:h-[350px]">
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full h-full bg-white shadow-[0_40px_80px_rgba(0,0,0,0.15)] hexagon-path p-1.5 relative"
                                    >
                                        <div className="w-full h-full bg-slate-50 hexagon-path overflow-hidden relative">
                                            <img
                                                src={companies[activeIndex].logo}
                                                alt={companies[activeIndex].name}
                                                className="w-full h-full object-cover select-none p-6 md:p-10 filter brightness-95"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-tr from-green-900/10 to-transparent pointer-events-none"></div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <svg className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] -z-10 opacity-20" viewBox="0 0 100 100">
                                    <motion.circle
                                        cx="50" cy="50" r="48"
                                        fill="none"
                                        stroke="url(#grad1)"
                                        strokeWidth="0.5"
                                        strokeDasharray="4 4"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                    />
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#15803d" />
                                            <stop offset="100%" stopColor="#10b981" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            {/* Surrounding Smaller Hexagons */}
                            {companies.map((company, idx) => {
                                const angles = [0, 72, 144, 216, 288]
                                const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 130 : 200
                                const angle = angles[idx] * (Math.PI / 180)
                                const x = Math.cos(angle) * radius
                                const y = Math.sin(angle) * radius

                                if (idx === activeIndex) return null;

                                return (
                                    <motion.div
                                        key={idx}
                                        onClick={() => {
                                            setActiveIndex(idx)
                                            setProgress(0)
                                        }}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                                        viewport={{ once: false, amount: 0.1 }}
                                        animate={{ x: `calc(50% + ${x}px - 50px)`, y: `calc(50% + ${y}px - 60px)` }}
                                        className="absolute w-24 h-28 md:w-32 md:h-36 cursor-pointer z-10 transition-all duration-700 hover:z-30 group"
                                        style={{ left: 0, top: 0 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.15 }}
                                            className="w-full h-full bg-white hexagon-path shadow-lg p-1 transition-all duration-300 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:shadow-2xl"
                                        >
                                            <div className="w-full h-full bg-white hexagon-path overflow-hidden p-3">
                                                <img
                                                    src={company.logo}
                                                    alt={company.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Right: Premium Institutional Info */}
                    <motion.div
                        className="w-full lg:w-1/2 lg:pl-10"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-12"
                            >
                                {/* Active Indicator & Name */}
                                <motion.div
                                    className="space-y-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-[1px] w-12 bg-slate-200"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                                            Portfolio Asset 0{activeIndex + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
                                        {companies[activeIndex].name}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-md border border-green-100">
                                            {companies[activeIndex].status}
                                        </span>
                                        <div className="h-4 w-[1px] bg-slate-200"></div>
                                        <span className="text-slate-500 text-xs font-bold">
                                            {companies[activeIndex].sector}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Description Card */}
                                <motion.div
                                    className="relative group"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                >
                                    <div className="absolute -inset-4 bg-white/50 border border-slate-100 rounded-2xl -z-10 transition-all duration-500 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-slate-200/50"></div>
                                    <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed pl-2 border-l-2 border-green-700/20">
                                        {companies[activeIndex].description}
                                    </p>
                                </motion.div>

                                {/* Metrics Grid */}
                                <motion.div
                                    className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                >
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Valuation</p>
                                        <p className="text-2xl font-bold text-slate-800 tracking-tight">
                                            {companies[activeIndex].marketCap}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Growth</p>
                                        <p className="text-2xl font-bold text-green-600 tracking-tight">
                                            {companies[activeIndex].growth}
                                        </p>
                                    </div>
                                    <div className="hidden md:block space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Since</p>
                                        <p className="text-2xl font-bold text-slate-800 tracking-tight">
                                            {companies[activeIndex].founded}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Auto-switch Progress */}
                                <motion.div
                                    className="pt-10 flex items-center gap-4"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                >
                                    <div className="w-24 h-[2px] bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-green-700"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                        Next Asset
                                    </span>
                                </motion.div>

                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>

            <style>{`
                .hexagon-path {
                    clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
                }
            `}</style>
        </section>
    )
}