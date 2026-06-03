import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, DollarSign, Users, Edit2, Trash2,
    ArrowRight, Crown, Settings, ChevronDown, ChevronUp, ExternalLink, UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../lib/slugify';

/**
 * ── ANIMATION CONFIGURATION ──
 * Variants for card entry and hover effects
 */
const cardVariants = {
    hidden:  { opacity: 0, y: 20, scale: 0.98 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
};

export default function Your_group_admin({ groups, onRefetch }) {
    const navigate = useNavigate();
    const [expandedMembers, setExpandedMembers] = useState({});

    /**
     * ── LOGIC: GLOBAL METRICS CALCULATION ──
     * Calculates totals across all managed groups for the header stats
     */
    const totalInvested = groups.reduce((a, g) => a + g.total_investment, 0);
    const totalProfit   = groups.reduce((a, g) => a + g.total_profit, 0);
    const avgROI = totalInvested > 0
        ? ((totalProfit / totalInvested) * 100).toFixed(1)
        : "0.0";

    /**
     * ── LOGIC: UI INTERACTORS ──
     */
    const toggleMembers = (groupId) => {
        setExpandedMembers(prev => ({
            ...prev,
            [groupId]: !prev[groupId]
        }));
    };

    const getGroupInitial = (name) => name ? name.charAt(0).toUpperCase() : "G";

    return (
        <div className="w-full min-h-screen bg-[#FDFDFD] pb-24">

            {/* ── SECTION: HERO / HEADER ── 
                Branded area with page title and admin badge
            */}
            <section className="relative w-full pt-28 pb-16 px-6 md:px-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-50 rounded-full blur-3xl opacity-40" />
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2.5 bg-white px-4 py-2 rounded-full border border-green-100 shadow-sm mb-6"
                    >
                        <Crown size={14} className="text-green-700" />
                        <span className="text-xs font-black uppercase tracking-widest text-green-700">Admin Command Center</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Group <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 italic pr-2">Control</span>
                    </h1>

                    <p className="text-slate-500 text-xl max-w-2xl font-light leading-relaxed">
                        Manage your investment ecosystem, track real-time returns, and oversee member capital performance.
                    </p>
                </div>
            </section>

            {/* ── SECTION: AGGREGATE STATS ── 
                High-level overview of all managed groups
            */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: <Crown size={18} />, label: "Active Pools", value: groups.length, suffix: "" },
                        { icon: <DollarSign size={18} />, label: "Total Capital", value: (totalInvested / 1000).toFixed(1), suffix: "k" },
                        { icon: <TrendingUp size={18} />, label: "Net Profits", value: (totalProfit / 1000).toFixed(1), suffix: "k" },
                        { icon: <Users size={18} />, label: "Avg Return", value: avgROI, suffix: "%" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40"
                        >
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-700 mb-4">
                                {stat.icon}
                            </div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {stat.value}<span className="text-lg text-green-700 font-serif ml-0.5">{stat.suffix}</span>
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── SECTION: MANAGED GROUPS LIST ── 
                Detailed cards for each group under administration
            */}
            <section className="max-w-7xl mx-auto px-6 md:px-16">
                <div className="space-y-10">
                    {groups.map((group, i) => {
                        const efficiency = group.total_investment > 0
                            ? ((group.total_profit / group.total_investment) * 100).toFixed(1)
                            : 0;
                        const isExpanded = expandedMembers[group.id];
                        const members = group.members || [];

                        return (
                            <motion.div
                                key={group.id}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/30 overflow-hidden"
                            >
                                {/* Group Main Info */}
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
                                        {/* Group Visual */}
                                        <div className="relative group">
                                            {group.photo_url ? (
                                                <img src={group.photo_url} className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] object-cover shadow-2xl border border-slate-100" alt="" />
                                            ) : (
                                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-white font-black text-4xl shadow-2xl">
                                                    {getGroupInitial(group.name)}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-3">
                                                <h3 className="text-4xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {group.name}
                                                </h3>
                                                <span className="px-4 py-1.5 bg-green-700 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                                    Admin
                                                </span>
                                            </div>
                                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Institutional ID: {group.id}</p>
                                        </div>

                                        {/* ACTION BUTTONS: VISIT / JOIN / SETTINGS */}
                                        <div className="flex flex-wrap gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => navigate(`/groups/${slugify(group.name)}`)}
                                                className="flex items-center gap-3 px-8 py-4 bg-green-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-green-900/10 hover:bg-green-800 transition-all"
                                            >
                                                <ExternalLink size={16} />
                                                <span>Visit Workspace</span>
                                            </motion.button>
                                            
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-green-700 transition-all"
                                            >
                                                <UserPlus size={16} />
                                                <span>Join Group</span>
                                            </motion.button>

                                            <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-slate-600 transition-all">
                                                <Settings size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Financial Performance Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                                        <StatItem label="Capital Pooled" value={`৳${(group.total_investment / 1000).toFixed(1)}k`} icon={<DollarSign size={14} className="text-green-600" />} />
                                        <StatItem label="ROI Generated" value={`+৳${(group.total_profit / 1000).toFixed(1)}k`} icon={<TrendingUp size={14} className="text-emerald-600" />} valueClass="text-emerald-600" />
                                        <StatItem label="Active Members" value={members.length} icon={<Users size={14} className="text-blue-600" />} />
                                        <StatItem label="Efficiency" value={`${efficiency}%`} valueClass="text-green-700" />
                                    </div>
                                </div>

                                {/* Members Management Drawer */}
                                <div className="bg-slate-50/50 border-t border-slate-100 p-8 md:p-12">
                                    <motion.button
                                        onClick={() => toggleMembers(group.id)}
                                        className="w-full flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-green-200 transition-all shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-700">
                                                <Users size={20} />
                                            </div>
                                            <span className="font-black text-slate-900 tracking-tight">Managing Members ({members.length})</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </div>
                                    </motion.button>

                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="mt-8 space-y-4"
                                        >
                                            {members.length === 0 ? (
                                                <div className="py-12 text-center bg-white rounded-[2rem] border border-dashed border-slate-200">
                                                    <p className="text-slate-400 font-light italic">No members currently enrolled</p>
                                                </div>
                                            ) : (
                                                members.map((member) => (
                                                    <div key={member.id} className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 hover:shadow-lg transition-all group">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
                                                                {member.photo_url ? <img src={member.photo_url} className="w-full h-full object-cover" alt="" /> : <span className="text-slate-400 font-black">{member.name.charAt(0)}</span>}
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-slate-900">{member.name}</p>
                                                                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{member.email}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-black text-slate-900">৳{(member.total_investment / 1000).toFixed(1)}k</p>
                                                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Returns Active</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

/**
 * ── COMPONENT: StatItem ──
 * Reusable layout for financial metrics
 */
function StatItem({ icon, label, value, valueClass = "text-slate-900" }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <span className="opacity-40">{icon}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</span>
            </div>
            <p className={`text-3xl font-black tracking-tight ${valueClass}`}>{value}</p>
        </div>
    );
}