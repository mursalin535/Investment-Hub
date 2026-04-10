import { motion } from 'framer-motion'
import { Users, TrendingUp, ShieldCheck, PieChart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Unite() {

    const benefits = [
        {
            icon: Users,
            step: "01",
            problem: "Don't have enough money to invest alone?",
            solution: "Join a Group",
            description: "Pool your money with other investors. Even with just 10,000 TK you can be part of a big investment.",
            color: "bg-emerald-500"
        },
        {
            icon: ShieldCheck,
            step: "02",
            problem: "Worried about safety and trust?",
            solution: "Safe & Documented",
            description: "Every group investment is legally bound with proper documentation. Your money is always protected.",
            color: "bg-blue-500"
        },
        {
            icon: PieChart,
            step: "03",
            problem: "How do I get my share of profit?",
            solution: "Earn Proportionally",
            description: "Profits are split fairly based on how much you invested. More you put in, more you earn.",
            color: "bg-violet-500"
        },
        {
            icon: TrendingUp,
            step: "04",
            problem: "Can small investors access big opportunities?",
            solution: "Grow Together",
            description: "Combined capital unlocks high-yield opportunities normally available only to large investors.",
            color: "bg-amber-500"
        }
    ]

    return (
        <section className="w-full py-20 px-4 md:px-10 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">

                {/* ✅ Minimal Professional Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="w-full flex flex-col items-center text-center gap-6"
                >
                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                        <span className="text-emerald-600 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
                            Group Investment
                        </span>
                        <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                    </motion.div>

                    {/* Main heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-800 tracking-tight leading-tight heading"
                    >
                        Invest Together.
                        <br />
                        <span className="text-emerald-500">Grow Together.</span>
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed font-light"
                    >
                        Starting from just{" "}
                        <span className="text-emerald-600 font-bold">10,000 BDT</span>
                        {" "}— join a group, pool resources, and share profits proportionally.
                    </motion.p>
                </motion.div>

                {/* Concept Section */}
                <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src="/grp_united.webp"
                                alt="Group Investment"
                                className="w-full h-[400px] md:h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent" />
                            <div className="absolute bottom-8 left-8 text-white">
                                <p className="text-4xl md:text-5xl font-black mb-2">Invest Unitely</p>
                                <p className="text-5xl md:text-6xl font-black text-emerald-400">Grow Together</p>
                            </div>
                        </div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-60 -z-10" />
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-emerald-100 rounded-full blur-3xl opacity-60 -z-10" />
                    </motion.div>

                    {/* Right Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="w-full lg:w-1/2 flex flex-col gap-8"
                    >
                        <motion.div
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <h3 className="text-3xl md:text-5xl font-bold text-gray-800 heading">
                                Can't Invest Alone? <br />
                                <span className="text-emerald-600">Join the Group.</span>
                            </h3>
                            <div className="h-1.5 w-24 bg-emerald-500 rounded-full" />
                        </motion.div>

                        <motion.p
                            className="text-gray-600 text-lg md:text-xl leading-relaxed jost-light"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            Many high-yield investment opportunities require significant capital that can be out of reach for an individual. Our{" "}
                            <span className="font-bold text-emerald-700 underline decoration-emerald-300 underline-offset-4">
                                Group Investment Model
                            </span>{" "}
                            solves this.
                        </motion.p>

                        <motion.p
                            className="text-gray-600 text-lg md:text-xl leading-relaxed jost-light"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            We bring together people just like you. Together, we pool resources to meet the investment requirements of top-tier businesses. Everyone shares the profits fairly, based on their individual contribution percentage.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 mt-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 transition-colors flex items-center gap-2"
                            >
                                Learn More <ArrowRight size={20} />
                            </motion.button>
                            
                        </motion.div>
                    </motion.div>
                </div>

                {/* ✅ Benefits — Problem → Solution cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex flex-col gap-8"
                >
                    {/* Section label */}
                   

                    {/* ✅ Learn More Button */}
                   
                </motion.div>

            </div>
        </section>
    )
}