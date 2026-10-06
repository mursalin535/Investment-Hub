import { yourCompany } from '../../server/Company_server';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/CookieSlice';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Building2, DollarSign, TrendingUp, Briefcase,
    BadgeCheck, Users, Edit2, Trash2, ArrowRight,
    BarChart3, Crown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BASE = 'http://localhost:5009/uploads/';

export default function Your_company() {
    const user    = useSelector(getUser);
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompany = async () => {
            if (!user?.id) return;
            try {
                const data = await yourCompany(user.id);
                if (data?.success && data?.data) setCompany(data.data);
                else setCompany(null);
            } catch (err) {
                console.log('error frontend:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCompany();
    }, [user?.id]);

    /* ── Loading ── */
    if (loading) return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#F8F7F4]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
            />
        </div>
    );

    /* ── No company (investor / unlinked) ── */
    if (!company) return <NoCompanyFallback />;

    const roiPct = company.valuation > 0
        ? ((company.total_profit / company.valuation) * 100).toFixed(1)
        : '0.0';

    const isAdmin = company.admin_id === user?.id;

    return (
        <div className="w-full min-h-screen bg-[#F8F7F4] pb-28"
             style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* ── HERO ── */}
            <section className="relative w-full pt-36 pb-20 px-6 md:px-16 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[15%] -right-[8%] w-[650px] h-[650px]
                                    bg-amber-100/40 rounded-full blur-[130px]" />
                    <div className="absolute bottom-[5%] -left-[5%] w-[450px] h-[450px]
                                    bg-orange-50/50 rounded-full blur-[100px]" />
                    <div className="absolute top-[25%] right-[18%] w-px h-56
                                    bg-gradient-to-b from-transparent via-amber-300/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center
                                        shadow-lg shadow-amber-500/30">
                            <Building2 size={15} className="text-white" />
                        </div>
                        <div className="w-14 h-px bg-amber-400/50" />
                        <span className="text-amber-700 font-bold uppercase tracking-[0.4em] text-[10px]">
                            Your Venture
                        </span>
                        {isAdmin && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-amber-100
                                            text-amber-700 text-[9px] font-black uppercase
                                            tracking-widest rounded-full border border-amber-200">
                                <Crown size={9} /> Admin
                            </span>
                        )}
                    </motion.div>

                    {/* Company identity row */}
                    <div className="flex flex-col lg:flex-row lg:items-end gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="flex-1 space-y-6"
                        >
                            <div className="flex items-center gap-6">
                                {/* Logo */}
                                <div className="w-20 h-20 rounded-3xl bg-white border border-amber-100
                                                shadow-xl shadow-amber-100/50 overflow-hidden flex-shrink-0
                                                flex items-center justify-center">
                                    {company.photo_url
                                        ? <img src={`${BASE}${company.photo_url}`} alt="logo"
                                               className="w-full h-full object-cover" />
                                        : <Building2 size={32} className="text-amber-300" />
                                    }
                                </div>
                                <div>
                                    <h1 className="text-5xl md:text-7xl font-black text-slate-900
                                                   leading-[1] tracking-tighter"
                                        style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {company.name}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-slate-400 text-xs font-semibold
                                                        uppercase tracking-widest">
                                            ID #{company.id}
                                        </span>
                                        {company.admin_id && (
                                            <span className="flex items-center gap-1 text-[10px]
                                                            text-amber-600 font-bold">
                                                <BadgeCheck size={12} /> Verified
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-500 text-lg font-light leading-relaxed max-w-2xl">
                                Your company's performance dashboard. Track valuation growth,
                                monitor deal flow, and manage your team all in one place.
                            </p>
                        </motion.div>

                        {/* Valuation pill */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white border border-amber-100 rounded-3xl px-10 py-7
                                       shadow-xl shadow-amber-100/40 text-right flex-shrink-0"
                        >
                            <p className="text-[10px] font-black uppercase tracking-[.3em] text-slate-300 mb-1">
                                Current Valuation
                            </p>
                            <p className="text-5xl font-black text-slate-900"
                               style={{ fontFamily: "'Playfair Display', serif" }}>
                                <span className="text-amber-500">
                                    ৳{(company.valuation / 1000000).toFixed(2)}
                                </span>
                                <span className="text-2xl text-slate-400 ml-1">M</span>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── STATS STRIP ── */}
            <motion.section
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="max-w-7xl mx-auto px-6 md:px-16 mb-14"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 bg-white border border-amber-50
                                rounded-3xl overflow-hidden shadow-sm">
                    {[
                        {
                            icon: <DollarSign size={14} className="text-amber-500" />,
                            label: 'Valuation',
                            value: `৳${(company.valuation / 1000000).toFixed(2)}M`,
                            color: 'text-slate-800'
                        },
                        {
                            icon: <Briefcase size={14} className="text-orange-400" />,
                            label: 'Total Deals',
                            value: company.total_deals ?? 0,
                            color: 'text-slate-800'
                        },
                        {
                            icon: <TrendingUp size={14} className="text-emerald-500" />,
                            label: 'Total Profit',
                            value: `+৳${((company.total_profit ?? 0) / 1000).toFixed(1)}k`,
                            color: 'text-emerald-600'
                        },
                        {
                            icon: <BarChart3 size={14} className="text-blue-400" />,
                            label: 'ROI',
                            value: `${roiPct}%`,
                            color: 'text-blue-600'
                        },
                    ].map((s, i) => (
                        <div key={i} className="px-8 py-7 border-r border-b border-amber-50 last:border-r-0">
                            <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                                {s.icon}
                                <span className="text-[9px] font-black uppercase tracking-[.25em]">
                                    {s.label}
                                </span>
                            </div>
                            <p className={`text-2xl font-black ${s.color}`}
                               style={{ fontFamily: "'Playfair Display', serif" }}>
                                {s.value}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ── LEFT: Company Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-[2.5rem] border border-amber-50
                               shadow-sm overflow-hidden"
                >
                    {/* Cover image */}
                    <div className="relative h-52 bg-slate-900 overflow-hidden">
                        <img
                            src={company.photo_url
                                ? `${BASE}${company.photo_url}`
                                : 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80'}
                            alt={company.name}
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t
                                        from-slate-900/80 via-transparent to-transparent" />
                        <div className="absolute bottom-5 left-7 right-7 flex items-end justify-between">
                            <h2 className="text-2xl font-bold text-white"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                {company.name}
                            </h2>
                            <span className="px-3 py-1.5 bg-amber-500 rounded-full text-[10px]
                                            font-black text-white uppercase tracking-wider">
                                ৳{(company.valuation / 1000000).toFixed(1)}M
                            </span>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 space-y-8">
                        {/* Growth index */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-[.3em] text-slate-300">
                                    Growth Index
                                </span>
                                <span className="text-sm font-black text-amber-600">{roiPct}%</span>
                            </div>
                            <div className="w-full h-2 bg-amber-50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(roiPct, 100)}%` }}
                                    transition={{ duration: 1.4, delay: 0.6, ease: [0.16,1,0.3,1] }}
                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Detail rows */}
                        <div className="divide-y divide-slate-50">
                            {[
                                { label: 'Company ID',    value: `#${company.id}` },
                                { label: 'Total Deals',   value: company.total_deals ?? 0 },
                                { label: 'Total Profit',  value: `৳${((company.total_profit ?? 0)/1000).toFixed(1)}k` },
                                { label: 'Valuation',     value: `৳${(company.valuation/1000000).toFixed(2)}M` },
                            ].map((row, i) => (
                                <div key={i} className="flex items-center justify-between py-4">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                                        {row.label}
                                    </span>
                                    <span className="text-sm font-bold text-slate-800">{row.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Admin actions */}
                        {isAdmin && (
                            <div className="flex gap-3 pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    className="flex-1 flex items-center justify-center gap-2 py-3.5
                                               bg-amber-500 hover:bg-amber-600 text-white rounded-2xl
                                               font-black text-xs uppercase tracking-widest transition-all
                                               shadow-lg shadow-amber-500/20"
                                >
                                    <Edit2 size={14} /> Edit Company
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    className="flex items-center justify-center gap-2 px-5 py-3.5
                                               bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl
                                               font-black text-xs uppercase tracking-widest transition-all
                                               border border-red-100"
                                >
                                    <Trash2 size={14} /> Delete
                                </motion.button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* ── RIGHT: Members + CTA ── */}
                <div className="space-y-6">

                    {/* Members card */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-white rounded-[2.5rem] border border-amber-50 shadow-sm p-7"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Users size={15} className="text-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-[.3em] text-slate-400">
                                    Team
                                </span>
                            </div>
                            <motion.button
                                whileHover={{ x: 3 }}
                                onClick={() => navigate(`/companies/${company.id}/members`)}
                                className="flex items-center gap-1 text-[10px] font-black
                                           uppercase tracking-widest text-amber-600 hover:text-amber-700"
                            >
                                View All <ArrowRight size={11} />
                            </motion.button>
                        </div>

                        {/* Placeholder avatars — replace with real members API */}
                        <div className="space-y-3">
                            {[1,2,3].map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br
                                                    from-amber-300 to-orange-400 overflow-hidden flex-shrink-0">
                                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="member" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Member {i+1}</p>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                                            Businessman
                                        </p>
                                    </div>
                                    {i === 0 && isAdmin && (
                                        <span className="ml-auto px-2 py-0.5 bg-amber-100 text-amber-700
                                                        text-[9px] font-black rounded-full uppercase tracking-wider">
                                            You
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-white rounded-[2.5rem] border border-amber-50 shadow-sm p-7 space-y-3"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[.3em] text-slate-400 mb-4">
                            Quick Actions
                        </p>
                        {[
                            { label: 'View on Market',   icon: <Building2 size={14} />,   action: () => navigate('/companies') },
                            { label: 'See Deals',        icon: <Briefcase size={14} />,   action: () => navigate('/deals')     },
                            { label: 'Analytics',        icon: <BarChart3 size={14} />,   action: () => {}                    },
                        ].map((btn, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ x: 4 }}
                                onClick={btn.action}
                                className="w-full flex items-center gap-3 px-5 py-3.5
                                           bg-amber-50 hover:bg-amber-100 text-amber-800
                                           rounded-2xl font-bold text-sm transition-all
                                           border border-amber-100"
                            >
                                <span className="text-amber-500">{btn.icon}</span>
                                {btn.label}
                                <ArrowRight size={13} className="ml-auto text-amber-400" />
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

/* ── No company fallback ── */
function NoCompanyFallback() {
    return (
        <div className="w-full min-h-screen bg-[#F8F7F4] flex items-center justify-center px-6">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-[10%] right-[5%] w-[500px] h-[500px]
                                bg-amber-100/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] -left-[5%] w-[400px] h-[400px]
                                bg-orange-50/40 rounded-full blur-[100px]" />
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
                className="relative z-10 text-center space-y-6 max-w-md"
            >
                <div className="w-28 h-28 bg-white border border-amber-100 shadow-xl
                                rounded-3xl flex items-center justify-center mx-auto">
                    <Building2 size={42} className="text-amber-300" />
                </div>
                <div>
                    <h2 className="text-4xl font-black text-slate-900"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        No Company Found
                    </h2>
                    <p className="text-slate-400 mt-3 text-lg font-light leading-relaxed">
                        You're not linked to any company. Companies are created during
                        signup as a businessman.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        onClick={() => window.location.href = '/companies'}
                        className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white
                                   font-black rounded-2xl shadow-lg shadow-amber-500/20
                                   transition-colors text-sm uppercase tracking-widest"
                    >
                        Browse Companies
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}