import { motion } from 'framer-motion'
import { TypingAnimation } from "../ui/typing-animation"
import { ShieldCheck, Users, Globe, BarChart3, TrendingUp, DollarSign, Handshake, PieChart, Wallet, ArrowUpRight, Percent, BadgeDollarSign } from 'lucide-react'

export default function Hero() {
    const floatingCards = [
        { icon: <DollarSign size={20} />, label: "Total Funded", value: "$128M+", color: "emerald", top: "10%", right: "22%" },
        { icon: <Handshake size={20} />, label: "Deals Closed", value: "4,200+", color: "blue", top: "30%", right: "18%" },
    
        { icon: <Wallet size={20} />, label: "Active Portfolios", value: "3,500+", color: "pink", top: "70%", right: "19%" },
     
      
        { icon: <ArrowUpRight size={20} />, label: "New This Week", value: "130 Deals", color: "amber", top: "42%", right: "34%" },
    ]

    const colorMap = {
        emerald: { bg: "bg-emerald-500", border: "border-emerald-100", text: "text-emerald-600" },
        blue: { bg: "bg-blue-500", border: "border-blue-100", text: "text-blue-600" },
        amber: { bg: "bg-amber-500", border: "border-amber-100", text: "text-amber-600" },
        pink: { bg: "bg-pink-500", border: "border-pink-100", text: "text-pink-600" },
    }

    return (
        <div className="w-full px-4 md:px-10 py-6 bg-gray-200">
            <motion.div
                className='w-full min-h-[85vh] md:h-[85vh] relative flex flex-col justify-center items-center overflow-hidden bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-xl border border-slate-100'
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Background Design Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-emerald-50/50 to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-50/40 to-transparent opacity-60" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
                            backgroundSize: '30px 30px'
                        }}
                    />

                    {/* Decorative Shapes */}
                    <motion.div
                        className="absolute top-[8%] right-[6%] w-16 h-16 rounded-full border-4 border-emerald-200 opacity-40"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute top-[15%] right-[12%] w-8 h-8 rounded-full border-2 border-amber-300 opacity-30"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-[15%] right-[8%] w-12 h-12 border-4 border-blue-200 opacity-30 rounded-lg"
                        animate={{ rotate: [0, 45, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-[45%] right-[5%] w-6 h-6 bg-emerald-100 opacity-60 rounded-full"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-[75%] right-[14%] w-10 h-10 border-2 border-emerald-300 opacity-25 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                    <motion.div
                        className="absolute top-[30%] right-[5%] w-5 h-5 bg-amber-200 opacity-40 rounded-sm"
                        animate={{ rotate: [0, 90, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Big Coin Illustration — Right Side */}
                <div className="absolute right-[2%] top-[50%] -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10 pointer-events-none">

                    {/* Coin 1 */}
                    <motion.div
                        className="relative w-28 h-28"
                        animate={{ y: [0, -14, 0], rotate: [0, 3, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Coin shadow */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-15 h-3 bg-emerald-900/10 rounded-full blur-sm" />
                        {/* Coin body */}
                        <div className="w-28 h-28 rounded-full bg-emerald-500 border-4 border-emerald-400 flex items-center justify-center shadow-xl relative overflow-hidden">
                            {/* shine */}
                            <div className="absolute top-2 left-4 w-8 h-8 bg-white/20 rounded-full blur-md" />
                            <div className="absolute inset-[6px] rounded-full border-2 border-emerald-400/40" />
                            <DollarSign size={44} className="text-yellow-300 drop-shadow-lg z-10" strokeWidth={2.5} />
                        </div>
                    </motion.div>


                    {/* Coin 3 — smallest, peeking */}
                    <motion.div
                        className="relative w-16 h-16 -mt-2 -ml-4"
                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-emerald-900/10 rounded-full blur-sm" />
                        <div className="w-16 h-16 rounded-full bg-emerald-400 border-4 border-emerald-300 flex items-center justify-center shadow-lg relative overflow-hidden">
                            <div className="absolute top-1 left-2 w-4 h-4 bg-white/20 rounded-full blur-sm" />
                            <div className="absolute inset-[4px] rounded-full border-2 border-emerald-300/40" />
                            <BadgeDollarSign size={24} className="text-yellow-200 z-10" strokeWidth={2.5} />
                        </div>
                    </motion.div>
                </div>

                {/* Floating Stat Cards */}
                {floatingCards.map((card, i) => {
                    const c = colorMap[card.color]
                    return (
                        <motion.div
                            key={i}
                            className="absolute hidden lg:block z-20"
                            style={{ top: card.top, right: card.right }}
                            animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0] }}
                            transition={{
                                duration: 3.5 + i * 0.7,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                            }}
                        >
                            <motion.div
                                className={`bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border ${c.border} flex items-center gap-3`}
                                style={{ rotate: i % 2 === 0 ? 1.5 : -1.5 }}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                            >
                                <div className={`w-9 h-9 ${c.bg} rounded-xl flex justify-center items-center text-white`}>
                                    {card.icon}
                                </div>
                                <div>
                                    <p className={`text-[10px] font-bold uppercase tracking-tighter ${c.text}`}>{card.label}</p>
                                    <p className="text-base font-bold text-slate-800 heading">{card.value}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                })}

                {/* Content Section */}
                <div className="w-full h-full relative z-10 flex flex-col justify-between p-8 md:p-20">

                    {/* Top Section */}
                    <div className="flex flex-col gap-6 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3"
                        >
                            <div className="h-[2px] w-12 bg-emerald-500 rounded-full" />
                            <p className='text-sm md:text-base uppercase tracking-[0.6em] text-emerald-600 font-bold jost-light'>
                                Capital Meets Opportunity
                            </p>
                        </motion.div>

                        <div className="flex flex-col">
                            <motion.h1
                                className='text-[8vw] md:text-[6.5vw] heading text-slate-800 leading-[0.9] tracking-tighter'
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                <TypingAnimation className="text-slate-800">Your Next Deal</TypingAnimation>
                            </motion.h1>
                            <motion.h1
                                className='text-[8vw] md:text-[6.5vw] heading text-green-700 leading-[0.9] tracking-tighter'
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                Starts Here.
                            </motion.h1>
                        </div>

                        <motion.p
                            className="text-lg md:text-xl text-slate-500 max-w-xl font-light leading-relaxed jost"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Generate Funding For your Business Models. Utilize, earn and grow together.
                        </motion.p>
                    </div>

                    {/* Bottom Stats & Trust Bar */}
                    <motion.div
                        className="mt-20 pt-10 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                    >
                     

                        <div className="flex items-center gap-6 bg-slate-50/80 px-8 py-4 rounded-3xl border border-slate-100">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-emerald-500" size={20} />
                                <span className="text-sm font-bold text-slate-600">Verified Platform</span>
                            </div>
                            <div className="w-[1px] h-6 bg-slate-200" />
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-slate-${i + 2}00`} />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-slate-600">Trusted by 10k+</span>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </motion.div>
        </div>
    )
}