import { useEffect, useState } from "react";
import { getCompany } from "../../server/Company_server";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, TrendingUp, DollarSign, ArrowRight,
    Search, LayoutGrid, List, BadgeCheck, Briefcase, BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../lib/slugify";

// ── ANIMATION VARIANTS ──
const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
};

const companyImages = [
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
];

export default function Companies() {
    const [companies, setCompanies]     = useState([]);
    const [loading, setLoading]         = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode]       = useState("grid");
    const navigate = useNavigate();

    useEffect(() => {
        getCompany()
            .then((data) => {
                if (data?.success && data?.data) setCompanies(data.data);
                else setCompanies([]);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching companies:", err);
                setLoading(false);
            });
    }, []);

    const filteredCompanies = companies.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ── LOADING STATE ──
    if (loading) return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#F8F7F4]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
            />
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[#F8F7F4] pb-32"
             style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* ── HERO ── */}
            <section className="relative w-full pt-40 pb-24 px-6 md:px-16 overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-[15%] right-[5%] w-[700px] h-[700px]
                                    bg-amber-100/40 rounded-full blur-[140px]" />
                    <div className="absolute bottom-[5%] -left-[5%] w-[500px] h-[500px]
                                    bg-orange-50/50 rounded-full blur-[100px]" />
                    {/* Geometric accent */}
                    <div className="absolute top-[20%] right-[15%] w-px h-64 bg-gradient-to-b
                                    from-transparent via-amber-300/40 to-transparent" />
                    <div className="absolute top-[30%] right-[20%] w-px h-40 bg-gradient-to-b
                                    from-transparent via-amber-200/30 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="space-y-8 max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center
                                                justify-center shadow-lg shadow-amber-500/30">
                                    <Building2 size={16} className="text-white" />
                                </div>
                                <div className="w-16 h-px bg-amber-400/50" />
                                <span className="text-amber-700 font-bold uppercase tracking-[0.4em] text-[10px]">
                                    Registered Ventures
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-6xl md:text-8xl lg:text-[110px] font-black
                                           text-slate-900 leading-[0.9] tracking-tighter"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Market<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r
                                                 from-amber-600 to-orange-400 italic font-serif pr-4">
                                    Ventures
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-slate-500 text-xl md:text-2xl font-light
                                           leading-relaxed max-w-2xl"
                            >
                                Discover high-potential businesses seeking capital. Browse valuations,
                                track deal flow, and connect with founders shaping tomorrow's economy.
                            </motion.p>
                        </div>

                        {/* Side stat pill */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="hidden lg:flex flex-col items-end gap-3"
                        >
                            <div className="bg-white border border-amber-100 rounded-3xl px-8 py-6
                                            shadow-xl shadow-amber-100/50 text-right">
                                <p className="text-5xl font-black text-slate-900"
                                   style={{ fontFamily: "'Playfair Display', serif" }}>
                                    <span className="text-amber-500">{companies.length}</span>
                                </p>
                                <p className="text-[10px] font-black uppercase tracking-[.3em]
                                              text-slate-400 mt-1">
                                    Listed Ventures
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── TOOLBAR ── */}
            <section className="px-6 md:px-16 mb-16 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white/90 backdrop-blur-xl border border-amber-100/60
                                   rounded-[3rem] shadow-2xl shadow-amber-100/30
                                   flex flex-col lg:flex-row items-center justify-between gap-6"
                    >
                        {/* Search */}
                        <div className="relative w-full lg:max-w-md flex items-center pl-6
                                        bg-amber-50/60 rounded-[2rem] border border-amber-100
                                        focus-within:border-amber-400/50 focus-within:bg-white
                                        focus-within:shadow-md transition-all">
                            <Search size={18} className="text-amber-400 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search ventures..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent py-5 pl-3 pr-6 text-sm font-medium
                                           text-slate-800 placeholder-amber-300/80 focus:outline-none"
                            />
                        </div>

                        {/* View toggle + buttons */}
                        <div className="flex flex-wrap items-center justify-end gap-4 w-full lg:w-auto">
                            <div className="flex bg-amber-50/50 p-2 rounded-2xl border border-amber-100">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-3 rounded-xl transition-all ${
                                        viewMode === "grid"
                                            ? "bg-white shadow-md text-amber-600"
                                            : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    <LayoutGrid size={22} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-3 rounded-xl transition-all ${
                                        viewMode === "list"
                                            ? "bg-white shadow-md text-amber-600"
                                            : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    <List size={22} />
                                </button>
                            </div>

                            {/* Total valuation badge */}
                            <div className="flex items-center gap-2 px-6 py-4 bg-amber-50 border
                                            border-amber-200 rounded-[2rem]">
                                <BarChart3 size={16} className="text-amber-600" />
                                <span className="text-xs font-black uppercase tracking-widest text-amber-700">
                                    ৳{(companies.reduce((a, c) => a + (c.valuation || 0), 0) / 1000000).toFixed(1)}M
                                </span>
                                <span className="text-[10px] text-amber-400 font-semibold">Total Valuation</span>
                            </div>

                            {/* Your Company button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/your-company")}
                                className="flex items-center gap-3 px-8 py-5 bg-amber-500
                                           hover:bg-amber-600 text-white rounded-[2rem] font-black
                                           text-sm uppercase tracking-widest transition-all
                                           shadow-xl shadow-amber-500/20"
                            >
                                <Building2 size={18} />
                                <span>Your Company</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── COMPANIES GRID / LIST ── */}
            <section className="px-6 md:px-16 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={viewMode + searchQuery}
                        variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
                        initial="hidden"
                        animate="visible"
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                : "flex flex-col gap-5"
                        }
                    >
                        {filteredCompanies.map((company, index) => {
                            const roiPct = company.total_deals > 0
                                ? ((company.total_profit / company.valuation) * 100).toFixed(1)
                                : 0;

                            return (
                                <motion.div
                                    key={company.id}
                                    custom={index}
                                    variants={cardVariants}
                                    whileHover={{ y: viewMode === "grid" ? -10 : -4 }}
                                    className={`group bg-white border border-amber-50
                                               hover:border-amber-200 transition-all duration-500
                                               hover:shadow-[0_30px_60px_-15px_rgba(245,158,11,0.12)]
                                               ${viewMode === "grid"
                                                   ? "rounded-[2.5rem] overflow-hidden flex flex-col"
                                                   : "rounded-[2rem] p-7 flex flex-row items-center gap-8"
                                               }`}
                                >
                                    {/* ── GRID: Image header ── */}
                                    {viewMode === "grid" && (
                                        <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                                            <img
                                                src={company.photo_url
                                                    ? `http://localhost:5009/uploads/${company.photo_url}`
                                                    : companyImages[index % companyImages.length]}
                                                alt={company.name}
                                                className="w-full h-full object-cover opacity-60
                                                           transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t
                                                            from-slate-900/90 via-slate-900/20 to-transparent" />

                                            {/* Company logo overlay */}
                                            <div className="absolute top-5 left-5 w-12 h-12 rounded-2xl
                                                            bg-white/10 backdrop-blur-md border border-white/20
                                                            flex items-center justify-center overflow-hidden">
                                                {company.photo_url
                                                    ? <img src={`http://localhost:5009/uploads/${company.photo_url}`}
                                                           alt="logo" className="w-full h-full object-cover" />
                                                    : <Building2 size={20} className="text-white/70" />
                                                }
                                            </div>

                                            {/* Valuation badge */}
                                            <div className="absolute top-5 right-5 px-3 py-1.5
                                                            bg-amber-500 rounded-full">
                                                <span className="text-[10px] font-black text-white uppercase tracking-wider">
                                                    ৳{(company.valuation / 1000000).toFixed(1)}M
                                                </span>
                                            </div>

                                            <div className="absolute bottom-5 left-6">
                                                <h3 className="text-2xl font-bold text-white tracking-tight"
                                                    style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {company.name}
                                                </h3>
                                                <p className="text-white/50 text-[10px] font-semibold
                                                              uppercase tracking-widest mt-1">
                                                    ID #{company.id}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── LIST: Logo thumbnail ── */}
                                    {viewMode === "list" && (
                                        <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-100
                                                        flex-shrink-0 overflow-hidden flex items-center justify-center">
                                            {company.photo_url
                                                ? <img src={`http://localhost:5009/uploads/${company.photo_url}`}
                                                       alt={company.name}
                                                       className="w-full h-full object-cover" />
                                                : <Building2 size={28} className="text-amber-300" />
                                            }
                                        </div>
                                    )}

                                    {/* ── CARD BODY ── */}
                                    <div className={`flex-grow ${
                                        viewMode === "grid"
                                            ? "p-8 space-y-6"
                                            : "flex flex-row items-center justify-between"
                                    }`}>

                                        {/* LIST: identity */}
                                        {viewMode === "list" && (
                                            <div className="space-y-1.5 min-w-0">
                                                <h3 className="text-xl font-black text-slate-900 truncate"
                                                    style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {company.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-amber-50 text-amber-700
                                                                    text-[10px] font-black uppercase tracking-widest
                                                                    rounded-md border border-amber-100">
                                                        Venture
                                                    </span>
                                                    {company.admin_id && (
                                                        <span className="flex items-center gap-1 text-[10px]
                                                                        text-slate-400 font-semibold">
                                                            <BadgeCheck size={11} className="text-amber-500" />
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* GRID: stats */}
                                        {viewMode === "grid" && (
                                            <>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-1.5 text-slate-400">
                                                            <DollarSign size={12} className="text-amber-500" />
                                                            <span className="text-[9px] font-black uppercase tracking-[.2em]">
                                                                Valuation
                                                            </span>
                                                        </div>
                                                        <p className="text-xl font-bold text-slate-800">
                                                            ৳{(company.valuation / 1000000).toFixed(2)}M
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-1.5 text-slate-400">
                                                            <Briefcase size={12} className="text-orange-400" />
                                                            <span className="text-[9px] font-black uppercase tracking-[.2em]">
                                                                Total Deals
                                                            </span>
                                                        </div>
                                                        <p className="text-xl font-bold text-slate-800">
                                                            {company.total_deals ?? 0}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-1.5 text-slate-400">
                                                            <TrendingUp size={12} className="text-emerald-500" />
                                                            <span className="text-[9px] font-black uppercase tracking-[.2em]">
                                                                Total Profit
                                                            </span>
                                                        </div>
                                                        <p className="text-xl font-bold text-emerald-600">
                                                            +৳{((company.total_profit ?? 0) / 1000).toFixed(1)}k
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-1.5 text-slate-400">
                                                            <BarChart3 size={12} className="text-blue-400" />
                                                            <span className="text-[9px] font-black uppercase tracking-[.2em]">
                                                                ROI
                                                            </span>
                                                        </div>
                                                        <p className="text-xl font-bold text-blue-600">
                                                            {roiPct}%
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Progress bar */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[9px] font-black text-slate-300
                                                                        uppercase tracking-widest">
                                                            Growth Index
                                                        </span>
                                                        <span className="text-[10px] font-black text-amber-600">
                                                            {roiPct}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-amber-50 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${Math.min(roiPct, 100)}%` }}
                                                            transition={{ duration: 1.4, delay: 0.4, ease: [0.16,1,0.3,1] }}
                                                            viewport={{ once: false }}
                                                            className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Footer CTA */}
                                                <div className="pt-6 border-t border-amber-50 flex items-center justify-between">
                                                    {company.admin_id && (
                                                        <span className="flex items-center gap-1.5 text-[10px]
                                                                        text-slate-400 font-semibold">
                                                            <BadgeCheck size={13} className="text-amber-500" />
                                                            Verified Venture
                                                        </span>
                                                    )}
                                                    <motion.button
                                                        whileHover={{ x: 4 }}
                                                        onClick={() => navigate(`/companies/${slugify(company.name)}`)}
                                                        className="ml-auto flex items-center gap-2 px-5 py-2.5
                                                                   bg-amber-500 hover:bg-amber-600 text-white
                                                                   font-black text-xs uppercase tracking-wider
                                                                   rounded-xl transition-all shadow-md
                                                                   shadow-amber-500/25"
                                                    >
                                                        <span>View</span>
                                                        <ArrowRight size={13} />
                                                    </motion.button>
                                                </div>
                                            </>
                                        )}

                                        {/* LIST: right side stats + CTA */}
                                        {viewMode === "list" && (
                                            <div className="flex items-center gap-10">
                                                <div className="text-right hidden md:block">
                                                    <p className="text-[9px] font-black uppercase tracking-widest
                                                                  text-slate-300">Valuation</p>
                                                    <p className="text-lg font-bold text-slate-800">
                                                        ৳{(company.valuation / 1000000).toFixed(2)}M
                                                    </p>
                                                </div>
                                                <div className="text-right hidden md:block">
                                                    <p className="text-[9px] font-black uppercase tracking-widest
                                                                  text-slate-300">Profit</p>
                                                    <p className="text-lg font-bold text-emerald-600">
                                                        +৳{((company.total_profit ?? 0) / 1000).toFixed(1)}k
                                                    </p>
                                                </div>
                                                <div className="text-right hidden lg:block">
                                                    <p className="text-[9px] font-black uppercase tracking-widest
                                                                  text-slate-300">Deals</p>
                                                    <p className="text-lg font-bold text-slate-800">
                                                        {company.total_deals ?? 0}
                                                    </p>
                                                </div>
                                                <motion.button
                                                    whileHover={{ x: 3 }}
                                                    onClick={() => navigate(`/companies/${slugify(company.name)}`)}
                                                    className="flex items-center gap-2 px-6 py-4 bg-amber-500
                                                               hover:bg-amber-600 text-white font-black text-xs
                                                               uppercase tracking-widest rounded-2xl transition-all
                                                               shadow-lg shadow-amber-500/20 flex-shrink-0"
                                                >
                                                    <span>View Profile</span>
                                                    <ArrowRight size={14} />
                                                </motion.button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* ── EMPTY STATE ── */}
                {filteredCompanies.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="py-40 flex flex-col items-center justify-center text-center space-y-8"
                    >
                        <div className="w-32 h-32 bg-amber-50 border border-amber-100
                                        rounded-[2.5rem] flex items-center justify-center shadow-inner">
                            <Building2 size={48} className="text-amber-200" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl font-black text-slate-800 tracking-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                No ventures found
                            </h3>
                            <p className="text-slate-400 max-w-sm font-light text-lg">
                                No companies matched your search. Try a different keyword.
                            </p>
                        </div>
                    </motion.div>
                )}
            </section>
        </div>
    );
}