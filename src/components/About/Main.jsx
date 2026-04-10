import React from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp, ShieldCheck, Users, FileText,
    Scale, Bell, ArrowUpRight, Eye,
    UserCheck, CheckCircle2, Briefcase,
    Landmark, DollarSign, Coins, Building2,
    ArrowRight, Wallet
} from 'lucide-react'

export default function About() {

    const features = [
        {
            icon: Scale,
            title: "Legal Contracts & Documentation",
            description: "Every investment deal is backed by a legally binding contract signed by both parties. Our appointed lawyers ensure every agreement is airtight. If any party violates the terms, immediate legal action is taken — no exceptions.",
            image: "/about_legal.webp",
            tag: "Security"
        },
        {
            icon: Eye,
            title: "Full Transparency & Track Records",
            description: "Every investor and business has a public profile with their complete history. Previous deals, performance records, and even red marks are all visible. You can fully analyze any party before committing a single taka.",
            image: "/about_transparency.webp",
            tag: "Trust"
        },
        {
            icon: Users,
            title: "Group Investment Model",
            description: "Don't have enough capital to invest alone? Join a group. Pool resources with other investors to access high-yield opportunities together. Profits are distributed proportionally and fairly based on each member's contribution.",
            image: "/about_group.webp",
            tag: "Accessibility"
        },
        {
            icon: Bell,
            title: "Latest Investment News & Market Insights",
            description: "Stay ahead of the market with real-time investment news, sector analysis, and opportunity alerts. Make informed decisions backed by current data — not guesswork.",
            image: "/about_news.webp",
            tag: "Knowledge"
        },
        {
            icon: Briefcase,
            title: "A Platform for Both Sides",
            description: "Whether you are an investor looking for returns or a small entrepreneur genuinely needing funding — both are welcome. Businesses get verified funding, investors get genuine opportunities. A true two-sided ecosystem.",
            image: "/about_platform.webp",
            tag: "Ecosystem"
        },
    ]

    const howItWorks = [
        {
            step: "01",
            icon: UserCheck,
            title: "Create Your Verified Profile",
            description: "Sign up and complete identity verification. Your profile becomes your public track record."
        },
        {
            step: "02",
            icon: Eye,
            title: "Browse & Analyze",
            description: "Explore opportunities, review full histories, ratings, and red marks before deciding."
        },
        {
            step: "03",
            icon: FileText,
            title: "Sign Legal Contract",
            description: "A legally binding contract is generated with both signatures, reviewed by our lawyers."
        },
        {
            step: "04",
            icon: TrendingUp,
            title: "Invest & Track",
            description: "Funds transfer and monitoring begins. Track every milestone under our supervision."
        },
        {
            step: "05",
            icon: CheckCircle2,
            title: "Receive Returns",
            description: "Profits are distributed proportionally and documented. Your credibility record updates."
        },
    ]

    const tradingStats = [
        { value: "৳2Cr+",  label: "Total Capital Invested",   icon: Wallet,    color: "text-emerald-500" },
        { value: "৳48L+",  label: "Profits Distributed",      icon: TrendingUp, color: "text-blue-500" },
        { value: "500+",   label: "Active Investors",          icon: Users,     color: "text-violet-500" },
        { value: "200+",   label: "Verified Businesses",       icon: Building2, color: "text-amber-500" },
        { value: "98%",    label: "Successful Deals",          icon: CheckCircle2, color: "text-emerald-500" },
        { value: "৳0",     label: "Scam Incidents",            icon: ShieldCheck, color: "text-red-400" },
    ]

    const surroundingTexts = [
        { angle: 0,   text: "Fear of Scams",         sub: "stops most investors" },
        { angle: 60,  text: "No Track Records",       sub: "who to trust?" },
        { angle: 120, text: "Complex Process",        sub: "too long, too hard" },
        { angle: 180, text: "Capital Barrier",        sub: "not enough money" },
        { angle: 240, text: "No Trusted Platform",    sub: "where to go?" },
        { angle: 300, text: "Funding Gap",            sub: "businesses struggle" },
    ]

    const polygonShapes = [
        "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
    ]

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">

                {/* ── SECTION 1: The Problem — Circular Design ── */}
                <section className="w-full py-20 md:py-32 px-4 md:px-16 bg-white relative overflow-hidden">

                    <div className="absolute inset-0 pointer-events-none z-0">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-20 -right-20 w-80 h-80 border border-emerald-100/60"
                            style={{ clipPath: polygonShapes[1] }}
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-20 -left-20 w-72 h-72 border border-slate-100"
                            style={{ clipPath: polygonShapes[2] }}
                        />
                    </div>

                    <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

                        {/* Heading */}
                        <motion.div
                            className="flex flex-col items-center text-center gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                                <span className="text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase">The Reality</span>
                                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight heading">
                                Investment Is Powerful.
                                <br />
                                <span className="text-emerald-500">But Not Easy.</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg max-w-2xl font-light leading-relaxed">
                                With the rapid growth of industry, investment has become the most powerful wealth vehicle — yet so many walls stand between you and success.
                            </p>
                        </motion.div>

                        {/* ✅ Circular image in center with surrounding problem texts */}
                        <div className="relative flex justify-center items-center" style={{ minHeight: '520px' }}>

                            {/* Rotating dashed orbit ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[420px] h-[420px] md:w-[500px] md:h-[500px] rounded-full border border-dashed border-slate-200 pointer-events-none"
                            />
                            {/* Second orbit ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px] rounded-full border border-dashed border-emerald-100 pointer-events-none"
                            />

                            {/* Center circular image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="relative z-20 w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl shrink-0"
                            >
                                <img
                                    src="/about_problem.webp"
                                    alt="Investment challenges"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                                    <span className="text-white text-xs md:text-sm font-black uppercase tracking-widest leading-tight drop-shadow-lg">
                                        Investment<br />Challenges
                                    </span>
                                </div>
                            </motion.div>

                            {/* Surrounding problem texts — positioned around the circle */}
                            {surroundingTexts.map((item, i) => {
                                const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 190 : 230
                                const angleRad = (item.angle - 90) * (Math.PI / 180)
                                const x = Math.cos(angleRad) * radius
                                const y = Math.sin(angleRad) * radius

                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        viewport={{ once: false, amount: 0.2 }}
                                        className="absolute z-10 flex flex-col items-center text-center"
                                        style={{
                                            transform: `translate(${x}px, ${y}px)`,
                                            width: '110px'
                                        }}
                                    >
                                        {/* Dot on orbit */}
                                        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-md mb-2 border-2 border-white" />
                                        <span className="text-slate-700 text-[11px] md:text-xs font-black leading-tight">{item.text}</span>
                                        <span className="text-slate-400 text-[9px] md:text-[10px] font-medium mt-0.5">{item.sub}</span>
                                    </motion.div>
                                )
                            })}

                            {/* Lines from center to each surrounding text — SVG */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                                style={{ overflow: 'visible' }}
                            >
                                {surroundingTexts.map((item, i) => {
                                    const radius = 230
                                    const angleRad = (item.angle - 90) * (Math.PI / 180)
                                    const x = Math.cos(angleRad) * radius
                                    const y = Math.sin(angleRad) * radius
                                    return (
                                        <motion.line
                                            key={i}
                                            x1="50%"
                                            y1="50%"
                                            x2={`calc(50% + ${x}px)`}
                                            y2={`calc(50% + ${y}px)`}
                                            stroke="#e2e8f0"
                                            strokeWidth="1"
                                            strokeDasharray="4 4"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            whileInView={{ pathLength: 1, opacity: 1 }}
                                            transition={{ delay: i * 0.1, duration: 0.8 }}
                                            viewport={{ once: false }}
                                        />
                                    )
                                })}
                            </svg>

                        </div>

                        {/* Bottom text */}
                        <motion.div
                            className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                                Fear of scams, lack of transparency, no track records, unclear documentation, capital barriers — these are the walls that stop most people from ever starting.
                            </p>
                            <p className="text-slate-700 text-lg md:text-xl font-bold">
                                We built this platform to tear down every single one of those walls.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── SECTION 2: What We Offer ── */}
                <section className="w-full py-20 md:py-28 px-4 md:px-16 bg-[#F9FAFB]">
                    <div className="max-w-7xl mx-auto flex flex-col gap-16">

                        <motion.div
                            className="flex flex-col items-center text-center gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                                <span className="text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase">What We Provide</span>
                                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight heading">
                                Every Problem.
                                <br />
                                <span className="text-emerald-500">One Solution.</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg max-w-2xl font-light leading-relaxed">
                                A complete ecosystem that addresses every barrier standing between you and successful investment.
                            </p>
                        </motion.div>

                        <div className="flex flex-col gap-20 md:gap-28">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20`}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                >
                                    <motion.div
                                        className="w-full md:w-1/2 relative group"
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1 }}
                                        viewport={{ once: false, amount: 0.2 }}
                                    >
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                                            <img
                                                src={feature.image}
                                                alt={feature.title}
                                                className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent rounded-2xl md:rounded-3xl" />
                                        </div>
                                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-60 -z-10" />
                                    </motion.div>

                                    <motion.div
                                        className="w-full md:w-1/2 flex flex-col gap-6"
                                        initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        viewport={{ once: false, amount: 0.2 }}
                                    >
                                        <span className="inline-flex items-center gap-2 w-fit px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                                            <feature.icon size={12} />
                                            {feature.tag}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight heading">
                                            {feature.title}
                                        </h3>
                                        <div className="h-1 w-16 bg-emerald-500 rounded-full" />
                                        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SECTION 3: How It Works — Tree Design ── */}
                <section className="w-full py-20 md:py-28 px-4 md:px-16 bg-white relative overflow-hidden">

                    <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

                        <motion.div
                            className="flex flex-col items-center text-center gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                                <span className="text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase">The Process</span>
                                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight heading">
                                How It <span className="text-emerald-500">Works</span>
                            </h2>
                        </motion.div>

                        {/* ✅ Tree design */}
                        <div className="flex flex-col items-center gap-0 relative">

                            {/* Root node — trunk top */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="relative z-10 flex flex-col items-center"
                            >
                                <div className="w-20 h-20 bg-emerald-500 rounded-full flex justify-center items-center shadow-xl border-4 border-white">
                                    <Coins size={32} className="text-white" />
                                </div>
                                <div className="mt-2 px-5 py-2 bg-emerald-500 rounded-full">
                                    <span className="text-white text-xs font-black uppercase tracking-widest">Start Here</span>
                                </div>
                            </motion.div>

                            {/* Trunk line going down */}
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '60px' }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: false }}
                                className="w-[2px] bg-gradient-to-b from-emerald-400 to-emerald-200"
                                style={{ borderRight: '2px dashed #6ee7b7' }}
                            />

                            {/* Step 01 — center branch */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                viewport={{ once: false, amount: 0.2 }}
                                className="relative z-10 w-full max-w-md"
                            >
                                <div className="group flex items-center gap-5 p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-xl rounded-3xl transition-all duration-500">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex justify-center items-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                        {React.createElement(howItWorks[0].icon, { size: 20, className: "text-white" })}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-emerald-500 text-xs font-black uppercase tracking-widest">Step 01</span>
                                        </div>
                                        <h4 className="text-base md:text-lg font-black text-slate-800 heading leading-tight">{howItWorks[0].title}</h4>
                                        <p className="text-slate-400 text-xs md:text-sm font-light mt-1">{howItWorks[0].description}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Trunk continues + splits */}
                            <div className="relative flex flex-col items-center w-full">

                                {/* Trunk */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: '50px' }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                    viewport={{ once: false }}
                                    className="w-[2px]"
                                    style={{ borderRight: '2px dashed #6ee7b7' }}
                                />

                                {/* Branch split — step 02 and 03 side by side */}
                                <div className="relative w-full flex flex-col md:flex-row justify-center items-start md:items-start gap-0 md:gap-0">

                                    {/* Horizontal branch line */}
                                    <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-[2px]"
                                        style={{ borderTop: '2px dashed #6ee7b7' }}
                                    />

                                    {/* Left branch going down */}
                                    <div className="hidden md:flex flex-col items-center w-1/2">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: '40px' }}
                                            transition={{ duration: 0.4, delay: 0.6 }}
                                            viewport={{ once: false }}
                                            className="w-[2px]"
                                            style={{ borderRight: '2px dashed #6ee7b7' }}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7, duration: 0.6 }}
                                            viewport={{ once: false, amount: 0.2 }}
                                            className="w-full max-w-xs px-4"
                                        >
                                            <div className="group flex items-start gap-4 p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-xl rounded-3xl transition-all duration-500">
                                                <div className="w-10 h-10 bg-blue-500 rounded-xl flex justify-center items-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                                    {React.createElement(howItWorks[1].icon, { size: 18, className: "text-white" })}
                                                </div>
                                                <div>
                                                    <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Step 02</span>
                                                    <h4 className="text-sm md:text-base font-black text-slate-800 heading leading-tight">{howItWorks[1].title}</h4>
                                                    <p className="text-slate-400 text-xs font-light mt-1">{howItWorks[1].description}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Right branch going down */}
                                    <div className="hidden md:flex flex-col items-center w-1/2">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: '40px' }}
                                            transition={{ duration: 0.4, delay: 0.6 }}
                                            viewport={{ once: false }}
                                            className="w-[2px]"
                                            style={{ borderRight: '2px dashed #6ee7b7' }}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, x: 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7, duration: 0.6 }}
                                            viewport={{ once: false, amount: 0.2 }}
                                            className="w-full max-w-xs px-4"
                                        >
                                            <div className="group flex items-start gap-4 p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-xl rounded-3xl transition-all duration-500">
                                                <div className="w-10 h-10 bg-violet-500 rounded-xl flex justify-center items-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                                    {React.createElement(howItWorks[2].icon, { size: 18, className: "text-white" })}
                                                </div>
                                                <div>
                                                    <span className="text-violet-500 text-[10px] font-black uppercase tracking-widest">Step 03</span>
                                                    <h4 className="text-sm md:text-base font-black text-slate-800 heading leading-tight">{howItWorks[2].title}</h4>
                                                    <p className="text-slate-400 text-xs font-light mt-1">{howItWorks[2].description}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Mobile fallback — stacked */}
                                    <div className="flex md:hidden flex-col items-center gap-4 w-full">
                                        {[howItWorks[1], howItWorks[2]].map((item, i) => (
                                            <div key={i} className="w-full max-w-md group flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-3xl">
                                                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex justify-center items-center shrink-0">
                                                    <item.icon size={18} className="text-white" />
                                                </div>
                                                <div>
                                                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Step 0{i + 2}</span>
                                                    <h4 className="text-sm font-black text-slate-800 heading">{item.title}</h4>
                                                    <p className="text-slate-400 text-xs mt-1">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Branches converge back */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: '50px' }}
                                    transition={{ duration: 0.4, delay: 0.8 }}
                                    viewport={{ once: false }}
                                    className="hidden md:block w-[2px]"
                                    style={{ borderRight: '2px dashed #6ee7b7' }}
                                />

                                {/* Step 04 — center again */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.6 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    className="relative z-10 w-full max-w-md"
                                >
                                    <div className="group flex items-center gap-5 p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-xl rounded-3xl transition-all duration-500">
                                        <div className="w-12 h-12 bg-amber-500 rounded-2xl flex justify-center items-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                            {React.createElement(howItWorks[3].icon, { size: 20, className: "text-white" })}
                                        </div>
                                        <div>
                                            <span className="text-amber-500 text-xs font-black uppercase tracking-widest">Step 04</span>
                                            <h4 className="text-base md:text-lg font-black text-slate-800 heading leading-tight">{howItWorks[3].title}</h4>
                                            <p className="text-slate-400 text-xs md:text-sm font-light mt-1">{howItWorks[3].description}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Final trunk */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: '50px' }}
                                    transition={{ duration: 0.4, delay: 1 }}
                                    viewport={{ once: false }}
                                    className="w-[2px]"
                                    style={{ borderRight: '2px dashed #6ee7b7' }}
                                />

                                {/* Step 05 — leaf/fruit node */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1, duration: 0.6 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    className="relative z-10 w-full max-w-md"
                                >
                                    <div className="group flex items-center gap-5 p-6 bg-emerald-500 border border-emerald-400 shadow-xl rounded-3xl">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex justify-center items-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <Coins size={28} className="text-white" />
                                        </div>
                                        <div>
                                            <span className="text-emerald-200 text-xs font-black uppercase tracking-widest">Step 05 — The Fruit 🍃</span>
                                            <h4 className="text-base md:text-xl font-black text-white heading leading-tight">{howItWorks[4].title}</h4>
                                            <p className="text-white/70 text-xs md:text-sm font-light mt-1">{howItWorks[4].description}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Coin fruits falling */}
                                {['-left-8', 'left-4', '-right-8', 'right-4'].map((pos, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, 20, 0], rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                                        className={`absolute bottom-0 ${pos} z-20`}
                                    >
                                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex justify-center items-center shadow-lg border-2 border-yellow-300">
                                            <span className="text-yellow-800 text-[10px] font-black">৳</span>
                                        </div>
                                    </motion.div>
                                ))}

                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SECTION 4: Mission — Investor meets Business ── */}
                <section className="w-full py-20 md:py-28 px-4 md:px-16 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #eff6ff 100%)' }}
                >
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-20 -left-20 w-80 h-80 border border-emerald-100"
                            style={{ clipPath: polygonShapes[1] }}
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-20 -right-20 w-96 h-96 border border-blue-100"
                            style={{ clipPath: polygonShapes[0] }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.05)_0%,_transparent_70%)]" />
                    </div>

                    <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

                        <motion.div
                            className="flex flex-col items-center text-center gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                                <span className="text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase">Our Mission</span>
                                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-800 tracking-tight leading-tight heading">
                                Where Investors
                                <br />
                                <span className="text-emerald-500">Meet Opportunity.</span>
                            </h2>
                            <p className="text-slate-500 text-base md:text-lg max-w-2xl font-light leading-relaxed">
                                We are the bridge between those who want to grow wealth and businesses that need genuine funding — all under one transparent, legally secured roof.
                            </p>
                        </motion.div>

                        {/* ✅ Investor ↔ Platform ↔ Business visual */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0">

                            {/* Investor side */}
                            <motion.div
                                initial={{ opacity: 0, x: -60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="flex flex-col items-center gap-6 w-full md:w-[30%] p-8 bg-white rounded-3xl shadow-lg border border-slate-100"
                            >
                                <div className="w-20 h-20 bg-emerald-500 rounded-full flex justify-center items-center shadow-xl">
                                    <Wallet size={36} className="text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-800 heading text-center">Investor</h3>
                                <div className="flex flex-col gap-3 w-full">
                                    {[
                                        "Has capital to invest",
                                        "Wants safe returns",
                                        "Needs verified partners",
                                        "Wants transparency",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                            <span className="text-slate-500 text-sm font-light">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Arrow + Platform center */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="flex flex-col md:flex-row items-center justify-center z-10 py-6 md:py-0 md:px-4 gap-3 md:gap-2"
                            >
                                {/* Left arrow */}
                                <div className="hidden md:flex flex-col items-center gap-1">
                                    <ArrowRight size={20} className="text-emerald-400" />
                                    <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Invests</span>
                                </div>

                                {/* Center platform badge */}
                                <div className="flex flex-col items-center gap-3 px-6 py-8 bg-emerald-500 rounded-3xl shadow-2xl">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex justify-center items-center">
                                        <Landmark size={30} className="text-white" />
                                    </div>
                                    <span className="text-white font-black text-sm uppercase tracking-widest text-center leading-tight">
                                        Investment<br />Hub
                                    </span>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {["Legal Security", "Full Monitoring", "Zero Scam"].map((t, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <ShieldCheck size={10} className="text-emerald-200" />
                                                <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider">{t}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right arrow */}
                                <div className="hidden md:flex flex-col items-center gap-1">
                                    <ArrowRight size={20} className="text-blue-400" />
                                    <span className="text-[9px] text-blue-500 font-black uppercase tracking-widest">Funds</span>
                                </div>

                                {/* Mobile arrows */}
                                <div className="flex md:hidden gap-4">
                                    <span className="text-emerald-500 text-xs font-black">↑ Invests</span>
                                    <span className="text-blue-500 text-xs font-black">Funds ↓</span>
                                </div>
                            </motion.div>

                            {/* Business side */}
                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="flex flex-col items-center gap-6 w-full md:w-[30%] p-8 bg-white rounded-3xl shadow-lg border border-slate-100"
                            >
                                <div className="w-20 h-20 bg-blue-500 rounded-full flex justify-center items-center shadow-xl">
                                    <Building2 size={36} className="text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-800 heading text-center">Business</h3>
                                <div className="flex flex-col gap-3 w-full">
                                    {[
                                        "Needs genuine funding",
                                        "Wants verified investors",
                                        "Needs legal protection",
                                        "Wants to grow fast",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                                            <span className="text-slate-500 text-sm font-light">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                        </div>

                        {/* Harmony tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="flex flex-col items-center gap-3 text-center"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-[1px] bg-emerald-300" />
                                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Both sides win. Always.</span>
                                <div className="w-8 h-[1px] bg-emerald-300" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── SECTION 5: CTA ── */}
                <section className="w-full py-20 md:py-28 px-4 md:px-16 bg-white">

                    <div className="max-w-7xl mx-auto flex flex-col gap-16">

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="flex flex-col items-center text-center gap-6 pt-10"
                        >
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-800 heading tracking-tight leading-tight">
                                What Are You
                                <br />
                                <span className="text-emerald-500">Waiting For?</span>
                            </h3>
                            <p className="text-slate-500 text-base md:text-lg max-w-xl font-light leading-relaxed">
                                Hundreds of investors are already growing their wealth right now. Every day you wait is a return you are missing. Join us — it takes less than 5 minutes.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mt-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-full font-black text-base md:text-lg shadow-xl transition-colors duration-300"
                                >
                                    Start Investing Now <ArrowRight size={20} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 font-black text-sm rounded-full transition-all duration-300"
                                >
                                    Browse Opportunities
                                </motion.button>
                            </div>

                            {/* Trust row */}
                            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mt-4">
                                {[
                                    { icon: ShieldCheck, label: "100% Legal" },
                                    { icon: Users,       label: "500+ Investors" },
                                    { icon: TrendingUp,  label: "98% Success Rate" },
                                    { icon: Scale,       label: "Lawyer Protected" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <item.icon size={14} className="text-emerald-500" />
                                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </section>

            </div>
        </>
    )
}