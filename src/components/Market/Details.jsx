import { motion } from 'framer-motion'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectApprovedInvestmentAds } from '../../redux/slices/investmentSlice'
import { selectAllUsers } from '../../redux/slices/userSlice'
import { selectAllCompanies } from '../../redux/slices/companySlice'
import { 
  ArrowLeft, DollarSign, TrendingUp, ShieldCheck, 
  Briefcase, MapPin, Globe, Zap, BarChart3, 
  PieChart, Users, Target, ArrowRight, ChevronRight,
  Activity, Award, CheckCircle2, Clock, Layers,
  Lightbulb, Rocket, User
} from 'lucide-react'
import { slugify } from '../../lib/slugify'

// animation variants
const fadeUp   = { hidden: { opacity: 0, y: 30  }, show: { opacity: 1, y: 0  } }
const fadeIn   = { hidden: { opacity: 0         }, show: { opacity: 1        } }
const fadeLeft = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }

const vp = { once: false }   // viewport — reanimates on scroll

export default function Details() {
    const { addId } = useParams()
    const navigate  = useNavigate()

    const allAds       = useSelector(selectApprovedInvestmentAds)
    const allUsers     = useSelector(selectAllUsers)
    const allCompanies = useSelector(selectAllCompanies)

    const ad      = allAds.find(a => a.id === parseInt(addId))
    const owner   = allUsers?.find(u => u.name?.toLowerCase().trim() === ad?.name?.toLowerCase().trim())
    const company = allCompanies?.find(c => c.name?.toLowerCase().trim() === ad?.businessName?.toLowerCase().trim())

    if (!ad) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <h2 className="text-3xl font-black text-slate-900 heading mb-4">Venture Not Found</h2>
            <button onClick={() => navigate('/market')} className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">
                Return to Market
            </button>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-32">

            {/* ── Nav ── */}
            <motion.nav
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.4 }}
                className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-8 py-5"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/market')}
                        className="group flex items-center gap-3 text-slate-500 hover:text-emerald-600 transition-all font-black text-[10px] uppercase tracking-[0.2em]"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to ventures
                    </button>
                    <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                            Listing HUB-{ad.id.toString().padStart(4, '0')}
                        </span>
                    </div>
                </div>
            </motion.nav>

            <div className="max-w-7xl mx-auto px-6 pt-12">

                {/* ── Hero Header ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={vp}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
                >
                    <div className="space-y-4">
                        <motion.div
                            variants={fadeLeft}
                            initial="hidden"
                            whileInView="show"
                            viewport={vp}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-wrap items-center gap-3"
                        >
                            <span className="px-4 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                {company?.category || 'Strategic Venture'}
                            </span>
                            <span className="px-4 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                                Investment Ready
                            </span>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 heading tracking-tighter leading-[0.9]">
                            {ad.businessName}
                        </h1>
                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="show"
                            viewport={vp}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-6 pt-2"
                        >
                            <div className="flex items-center gap-2 text-slate-500">
                                <MapPin size={16} />
                                <span className="text-xs font-black uppercase tracking-widest">{owner?.location || 'Bangladesh'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                                <Layers size={16} />
                                <span className="text-xs font-black uppercase tracking-widest">{ad.totalSales} Growth Units</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={vp}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-10 bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50"
                    >
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Asking Capital</p>
                            <p className="text-4xl font-black text-emerald-500 heading tracking-tighter">{ad.askingAmount}</p>
                        </div>
                        <div className="h-12 w-[1px] bg-slate-100" />
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expected Yield</p>
                            <p className="text-4xl font-black text-slate-900 heading tracking-tighter">24.5%</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ── Hero Image ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={vp}
                    transition={{ duration: 0.7 }}
                    className="relative mb-20"
                >
                    <div className="w-full h-[70vh] rounded-[4rem] overflow-hidden shadow-2xl relative group">
                        <img
                            src={ad.thumbnail}
                            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={vp}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="absolute bottom-10 left-10 right-10 flex flex-wrap gap-4"
                        >
                            <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                                <p className="text-[9px] font-black uppercase opacity-60">Revenue (LY)</p>
                                <p className="text-xl font-black heading">{ad.lastYearRevenue}</p>
                            </div>
                            <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                                <p className="text-[9px] font-black uppercase opacity-60">Monthly Rev</p>
                                <p className="text-xl font-black heading">{ad.lastMonthRevenue}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── Content Grid ── */}
                <div className="grid grid-cols-12 gap-16">

                    {/* ── LEFT COLUMN ── */}
                    <div className="col-span-12 lg:col-span-8 space-y-24">

                        {/* Venture Narrative */}
                        <motion.section
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={vp}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                                    <Lightbulb size={28} />
                                </div>
                                <div className="h-[2px] flex-1 bg-slate-100 rounded-full" />
                                <h2 className="text-2xl font-black text-slate-900 heading uppercase tracking-widest whitespace-nowrap">Venture Narrative</h2>
                            </div>
                            <p className="text-2xl text-slate-600 leading-relaxed font-medium mb-12">{ad.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { title: "Market Problem", desc: "Current supply chain models are outdated and high-cost.", icon: Target },
                                    { title: "Our Solution",   desc: "Next-gen automation combined with local expertise.",   icon: Zap   }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={vp}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100"
                                    >
                                        <item.icon className="text-emerald-500 mb-4" size={24} />
                                        <h5 className="font-black text-slate-900 heading mb-2">{item.title}</h5>
                                        <p className="text-sm text-slate-500 leading-relaxed font-bold">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Strategic Financials */}
                        <motion.section
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={vp}
                            transition={{ duration: 0.6 }}
                            className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black heading mb-12 flex items-center gap-3">
                                    <Activity className="text-emerald-400" />
                                    Strategic Financials
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                                    {[
                                        { label: "Gross Revenue", value: ad.lastYearRevenue, sub: "High Growth",  subColor: "text-emerald-500/60", valColor: "text-emerald-400" },
                                        { label: "Burn Rate",     value: "৳3.8L",             sub: "Sustainable", subColor: "text-slate-500",      valColor: "text-white" },
                                        { label: "Valuation",     value: "৳2.8Cr",            sub: "Estimated",   subColor: "text-slate-500",      valColor: "text-white" },
                                    ].map((f, i) => (
                                        <motion.div
                                            key={i}
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="show"
                                            viewport={vp}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="space-y-2"
                                        >
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{f.label}</p>
                                            <p className={`text-4xl font-black heading ${f.valColor}`}>{f.value}</p>
                                            <p className={`text-[10px] font-bold uppercase ${f.subColor}`}>{f.sub}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>

                        {/* Use of Capital */}
                        <motion.section
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={vp}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                                    <PieChart size={28} />
                                </div>
                                <div className="h-[2px] flex-1 bg-slate-100 rounded-full" />
                                <h2 className="text-2xl font-black text-slate-900 heading uppercase tracking-widest whitespace-nowrap">Use of Capital</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-8">
                                    {[
                                        { label: "Infrastructure", p: "45%", c: "bg-emerald-500" },
                                        { label: "Operations",     p: "35%", c: "bg-slate-900"   },
                                        { label: "Marketing",      p: "20%", c: "bg-slate-300"   }
                                    ].map((fund, i) => (
                                        <motion.div
                                            key={i}
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="show"
                                            viewport={vp}
                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                            className="space-y-3"
                                        >
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-slate-500">{fund.label}</span>
                                                <span className="text-slate-900">{fund.p}</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: fund.p }}
                                                    viewport={vp}
                                                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                                                    className={`h-full ${fund.c}`}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={vp}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 text-center"
                                >
                                    <Users className="text-emerald-500 mx-auto mb-4" size={48} />
                                    <h6 className="font-black text-slate-900 heading text-lg mb-2">Team Expansion</h6>
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed">
                                        Funds will also support the recruitment of 12 senior technical specialists.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.section>
                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div className="col-span-12 lg:col-span-4 space-y-10">
                        <div className="sticky top-32 space-y-8">

                            {/* Investment Request Card */}
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={vp}
                                transition={{ duration: 0.6 }}
                                className="p-10 bg-white rounded-[4rem] border-2 border-slate-900 shadow-2xl shadow-slate-200/60 relative overflow-hidden group"
                            >
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500 opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-1000" />

                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                                        <Award size={18} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Capital Portal</span>
                                </div>

                                <h3 className="text-3xl font-black text-slate-900 heading mb-8 leading-tight">
                                    Send Request <br /> for Investment
                                </h3>

                                <div className="space-y-6 mb-10">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-500 transition-colors"
                                    >
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Proposed Amount</p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-black text-slate-900">৳</span>
                                            <input
                                                type="text"
                                                placeholder="Enter amount..."
                                                className="bg-transparent border-none focus:ring-0 text-xl font-black heading w-full p-0"
                                            />
                                        </div>
                                    </motion.div>
                                    <div className="px-2 space-y-4">
                                        {[
                                            "Formal process with due diligence",
                                            "Secure legal framework"
                                        ].map((text, i) => (
                                            <motion.div
                                                key={i}
                                                variants={fadeLeft}
                                                initial="hidden"
                                                whileInView="show"
                                                viewport={vp}
                                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                                className="flex items-center gap-3"
                                            >
                                                <CheckCircle2 size={16} className="text-emerald-500" />
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{text}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 group"
                                >
                                    Submit Application
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </motion.button>

                                <p className="mt-8 text-[9px] text-center text-slate-400 font-bold leading-relaxed uppercase px-4 border-t border-slate-50 pt-6">
                                    Venture founder will be notified to review your credentials.
                                </p>
                            </motion.div>

                            {/* Founder Card */}
                            {owner ? (
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={vp}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center"
                                >
                                    <div className="relative mb-6">
                                        <motion.img
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={vp}
                                            transition={{ duration: 0.4 }}
                                            src={owner.avatar}
                                            className="w-24 h-24 rounded-[2rem] object-cover shadow-2xl border-4 border-white"
                                            alt=""
                                        />
                                        <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 text-white rounded-xl shadow-lg border-2 border-white">
                                            <ShieldCheck size={18} />
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 heading mb-1">{owner.name}</h4>
                                    <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">Verified Founder</p>

                                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                        {[
                                            { label: "Track Record", value: "Elite" },
                                            { label: "Integrity",    value: "99%"   }
                                        ].map((m, i) => (
                                            <motion.div
                                                key={i}
                                                variants={fadeUp}
                                                initial="hidden"
                                                whileInView="show"
                                                viewport={vp}
                                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                                className="bg-white p-3 rounded-2xl border border-slate-100"
                                            >
                                                <p className="text-[8px] font-black text-slate-400 uppercase">{m.label}</p>
                                                <p className="text-xs font-black text-slate-900">{m.value}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => navigate(`/profile/${owner.id}`)}
                                        className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                    >
                                        Explore Profile
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    variants={fadeIn}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={vp}
                                    className="p-10 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 text-center"
                                >
                                    <User className="text-slate-200 mx-auto mb-4" size={40} />
                                    <p className="text-xs font-bold text-slate-400 uppercase italic leading-relaxed">
                                        Resolving Founder <br /> Credentials...
                                    </p>
                                </motion.div>
                            )}

                            {/* Company Link */}
                            {company && (
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={vp}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <Link
                                        to={`/newsfeed/companies/${slugify(company.name)}`}
                                        className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2.5rem] group hover:border-emerald-500 transition-all shadow-lg shadow-slate-100/50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                                                <Briefcase size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Entity Data</p>
                                                <p className="text-sm font-black text-slate-900 heading">{company.name}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}