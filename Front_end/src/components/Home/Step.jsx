import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const steps = [
    {
        title: "Deep Market Analysis",
        description: "We don't just invest; we investigate. Our team performs rigorous due diligence and quantitative analysis to identify high-growth opportunities before they hit the mainstream.",
        image: "/analyze.webp",
        tag: "Step 01",
        color: "bg-green-50 text-green-700"
    },
    {
        title: "Strategic Asset Allocation",
        description: "Diversification is our shield. We strategically distribute capital across vetted industries and entrepreneurs to maximize returns while maintaining a strict risk-to-reward ratio.",
        image: "/funding.webp",
        tag: "Step 02",
        color: "bg-blue-50 text-blue-700"
    },
    {
        title: "Legal & Secure Documentation",
        description: "Transparency is non-negotiable. Every investment is backed by rock-solid legal frameworks and digital records, ensuring your assets are protected and fully documented.",
        image: "/legal_and_documented.webp",
        tag: "Step 03",
        color: "bg-slate-50 text-slate-700"
    },
    {
        title: "Continuous Growth Monitoring",
        description: "Investment is a journey, not a destination. We provide real-time updates and active management to ensure your portfolio stays on the path to exponential growth.",
        image: "/financial_records_history.webp",
        tag: "Step 04",
        color: "bg-emerald-50 text-emerald-700"
    }
]

export default function Step() {
    return (
        <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <div className="w-8 h-px bg-green-700"></div>
                        <span className="text-green-700 font-black uppercase tracking-[0.4em] text-[10px]">
                            Our Process
                        </span>
                        <div className="w-8 h-px bg-green-700"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none"
                    >
                        "Every Step, <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 italic font-serif font-light">
                            Thought Through.
                        </span>"
                    </motion.h2>
                </div>

                {/* Steps Container */}
                <div className="flex flex-col gap-20 md:gap-32 lg:gap-40">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 lg:gap-24`}
                        >
                            {/* Image Side */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="w-full md:w-1/2 flex justify-center"
                            >
                                <div className="relative group">
                                    {/* Circular Frame */}
                                    <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[420px] lg:h-[420px] xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden border-[6px] md:border-[8px] border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] relative z-10">
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-green-900/10 to-transparent"></div>
                                    </div>

                                    {/* Decorative rotating dashed circle */}
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-3 md:-inset-4 border border-dashed border-slate-200 rounded-full -z-10"
                                    />

                                    {/* Color blob */}
                                    <div className={`absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 rounded-full ${step.color.split(' ')[0]} opacity-50 blur-2xl -z-10`}></div>
                                </div>
                            </motion.div>

                            {/* Text Side */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="w-full md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left"
                            >
                                <div className="space-y-3 md:space-y-4">
                                    <span className={`inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] ${step.color} shadow-sm`}>
                                        {step.tag}
                                    </span>
                                    <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                                        {step.title}
                                    </h3>
                                </div>

                                <p className="text-base sm:text-lg md:text-lg lg:text-xl text-slate-500 font-light leading-relaxed max-w-xl mx-auto md:mx-0">
                                    {step.description}
                                </p>

                                {/* Animated underline bar */}
                                <div className="pt-4 md:pt-6">
                                    <div className="w-12 h-1 bg-green-700/20 rounded-full mx-auto md:mx-0">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            viewport={{ once: false, amount: 0.3 }}
                                            className="h-full bg-green-700 rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Learn More Button */}
                                <div className="pt-2 flex justify-center md:justify-start">
                                    <Link to="/about">
                                        <motion.button
                                            whileHover={{ scale: 1.05, x: 4 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-green-700 hover:bg-green-800 text-white text-xs md:text-sm font-black uppercase tracking-widest rounded-full shadow-md transition-colors duration-300"
                                        >
                                            Learn More
                                            <span className="text-base">→</span>
                                        </motion.button>
                                    </Link>
                                </div>

                            </motion.div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}