import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../store/CookieSlice';
import { group_server_your_group } from '../../server/Group_server';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Edit2, Trash2, ArrowRight } from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.65, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }
    })
};

export default function Your_group() {
    const user = useSelector(getUser);
    const [yourGroups, setYourGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        const fetchGroups = async () => {
            try {
                const data = await group_server_your_group(user.id);
                setYourGroups(Array.isArray(data) ? data : (data ? [data] : []));
            } catch (err) {
                console.log("Error fetching your groups:", err);
                setYourGroups([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [user?.id]);

    if (loading) return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#F9FAFB]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"
            />
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[#F9FAFB] pb-24">

            {/* ── HERO ── */}
            <section className="relative w-full pt-32 pb-20 px-6 md:px-16 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[20%] -right-[8%] w-[600px] h-[600px] bg-green-50 rounded-full blur-3xl opacity-50" />
                    <div className="absolute top-[40%] -left-[5%] w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-12 h-[2px] bg-green-700" />
                        <span className="text-green-700 font-black uppercase tracking-[0.4em] text-[10px]">
                            Your Portfolio
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="text-5xl md:text-7xl lg:text-[110px] font-black text-slate-900
                                   leading-[1.05] tracking-tight mb-8"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r
                                         from-green-700 to-emerald-500 italic font-serif font-bold">
                            Groups
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="text-slate-500 text-xl md:text-2xl max-w-2xl font-light leading-relaxed"
                    >
                        Manage and monitor all your investment groups in one place. Track performance,
                        invite members, and watch your portfolio grow.
                    </motion.p>
                </div>
            </section>

            {/* ── STATS ── */}
            {yourGroups.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="max-w-7xl mx-auto px-6 md:px-16 mb-16"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 border border-slate-100 rounded-2xl overflow-hidden">
                        {[
                            { num: yourGroups.length, label: "Total Groups", suffix: "" },
                            { num: yourGroups.reduce((acc, g) => acc + g.total_investment, 0) / 1000, label: "Total Invested", suffix: "k" },
                            { num: yourGroups.reduce((acc, g) => acc + g.total_profit, 0) / 1000, label: "Total Profit", suffix: "k" },
                            { 
                                num: yourGroups.length > 0 
                                    ? ((yourGroups.reduce((acc, g) => acc + g.total_profit, 0) / 
                                        yourGroups.reduce((acc, g) => acc + g.total_investment, 0)) * 100).toFixed(1)
                                    : 0,
                                label: "Avg Return", 
                                suffix: "%" 
                            },
                        ].map((s, i) => (
                            <div key={i} className="px-8 py-7 border-r border-b border-slate-100 last:border-r-0">
                                <p className="text-3xl font-black text-slate-900"
                                   style={{ fontFamily: "'Playfair Display', serif" }}>
                                    <span className="text-green-700">{s.num}</span>{s.suffix}
                                </p>
                                <p className="text-[10px] font-black uppercase tracking-[.25em] text-slate-400 mt-1">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── GROUPS CARDS ── */}
            <section className="max-w-7xl mx-auto px-6 md:px-16">
                {yourGroups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {yourGroups.map((group, i) => {
                            const efficiency = group.total_investment > 0
                                ? ((group.total_profit / group.total_investment) * 100).toFixed(1)
                                : 0;
                            return (
                                <motion.div
                                    key={group.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.15 }}
                                    whileHover={{ y: -12, transition: { duration: 0.3 } }}
                                    className="bg-white rounded-[28px] border border-slate-100
                                               shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)]
                                               overflow-hidden flex flex-col group"
                                >
                                    {/* Header */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-slate-100">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900"
                                                    style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {group.name}
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">
                                                    Group ID: {group.id}
                                                </p>
                                            </div>
                                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-black
                                                            uppercase tracking-widest rounded-full">
                                                Admin
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="p-6 flex-grow space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <DollarSign size={11} className="text-green-600" />
                                                    <span className="text-[9px] font-black uppercase tracking-[.25em]">
                                                        Investment
                                                    </span>
                                                </div>
                                                <p className="text-lg font-bold text-slate-800">
                                                    ৳{(group.total_investment / 1000).toFixed(1)}k
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <TrendingUp size={11} className="text-emerald-500" />
                                                    <span className="text-[9px] font-black uppercase tracking-[.25em]">
                                                        Profit
                                                    </span>
                                                </div>
                                                <p className="text-lg font-bold text-emerald-600">
                                                    +৳{(group.total_profit / 1000).toFixed(1)}k
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px] font-black uppercase tracking-[.25em] text-slate-400">
                                                    ROI
                                                </span>
                                                <span className="text-[11px] font-black text-green-700">
                                                    {efficiency}%
                                                </span>
                                            </div>
                                            <div className="w-full h-[4px] bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${Math.min(efficiency, 100)}%` }}
                                                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16,1,0.3,1] }}
                                                    viewport={{ once: false }}
                                                    className="h-full bg-gradient-to-r from-green-600 to-emerald-400 rounded-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5
                                                          bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg
                                                          font-semibold text-sm transition-colors"
                                            >
                                                <Users size={14} />
                                                Members
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center justify-center p-2.5
                                                          bg-slate-100 hover:bg-slate-200 text-slate-700
                                                          rounded-lg transition-colors"
                                            >
                                                <Edit2 size={14} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center justify-center p-2.5
                                                          bg-red-50 hover:bg-red-100 text-red-600
                                                          rounded-lg transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Footer CTA */}
                                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                                        <button className="w-full flex items-center justify-center gap-2
                                                         text-green-700 font-bold text-sm hover:gap-3
                                                         transition-all duration-200">
                                            View Full Details
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        className="py-24 text-center space-y-6"
                    >
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center
                                        justify-center mx-auto text-5xl">
                            📊
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">No Groups Yet</h3>
                            <p className="text-slate-500 mt-2 max-w-md mx-auto">
                                You haven't created any investment groups yet. Start building your portfolio
                                by creating your first group today!
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            className="inline-block px-10 py-4 bg-green-700 hover:bg-green-800
                                      text-white font-bold rounded-2xl shadow-lg transition-colors"
                        >
                            Create Your First Group
                        </motion.button>
                    </motion.div>
                )}
            </section>

        </div>
    );
}