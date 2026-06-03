import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    TrendingUp, DollarSign, Users, ArrowRight, ShieldCheck, 
    LogOut, ChevronDown, ChevronUp, ExternalLink, UserPlus 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../lib/slugify';

/**
 * ── ANIMATION CONFIGURATION ──
 * Variants for card entry and subtle scaling effects
 */
const cardVariants = {
    hidden:  { opacity: 0, y: 20, scale: 0.98 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
};

export default function Your_group_member({ groups }) {
    const navigate = useNavigate();
    const [expandedMembers, setExpandedMembers] = useState({});

    /**
     * ── LOGIC: PORTFOLIO CALCULATIONS ──
     * Aggregates data for the member's overview stats
     */
    const totalInvested = groups.reduce((a, g) => a + g.total_investment, 0);
    const totalProfit   = groups.reduce((a, g) => a + g.total_profit, 0);
    const avgROI = totalInvested > 0
        ? ((totalProfit / totalInvested) * 100).toFixed(1)
        : "0.0";

    /**
     * ── LOGIC: UI HELPERS ──
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

            {/* ── SECTION: HERO / WELCOME ── 
                Branded area for the member portfolio view
            */}
            <section className="relative w-full pt-28 pb-16 px-6 md:px-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-40" />
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2.5 bg-white px-4 py-2 rounded-full border border-blue-100 shadow-sm mb-6"
                    >
                        <ShieldCheck size={14} className="text-blue-600" />
                        <span className="text-xs font-black uppercase tracking-widest text-blue-600">Investor Portfolio</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500 italic pr-2">Investments</span>
                    </h1>

                    <p className="text-slate-500 text-xl max-w-2xl font-light leading-relaxed">
                        Monitor your capital distribution, track collective performance, and collaborate with your group partners.
                    </p>
                </div>
            </section>

            {/* ── SECTION: PORTFOLIO METRICS ── 
                Quick glance at the member's aggregate involvement
            */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: <ShieldCheck size={18} />, label: "Groups Joined", value: groups.length, suffix: "" },
                        { icon: <DollarSign size={18} />, label: "Total Invested", value: (totalInvested / 1000).toFixed(1), suffix: "k" },
                        { icon: <TrendingUp size={18} />, label: "Your Returns", value: (totalProfit / 1000).toFixed(1), suffix: "k" },
                        { icon: <Users size={18} />, label: "Avg Yield", value: avgROI, suffix: "%" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40"
                        >
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                {stat.icon}
                            </div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {stat.value}<span className="text-lg text-blue-600 font-serif ml-0.5">{stat.suffix}</span>
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── SECTION: JOINED GROUPS LIST ── 
                Detailed breakdown of each group the user is a part of
            */}
            <section className="max-w-7xl mx-auto px-6 md:px-16">
                <div className="space-y-10">
                    {groups.map((group, i) => {
                        const efficiency = group.total_investment > 0
                            ? ((group.total_profit / group.total_investment) * 100).toFixed(1)
                            : 0;
                        const isExpanded = expandedMembers[group.id];
                        const members = group.members || [];
                        const admin = group.admin || null;

                        return (
                            <motion.div
                                key={group.id}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/30 overflow-hidden"
                            >
                                {/* Group Main Content */}
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
                                        {/* Group Brand */}
                                        <div className="relative">
                                            {group.photo_url ? (
                                                <img src={group.photo_url} className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] object-cover shadow-2xl border border-slate-100" alt="" />
                                            ) : (
                                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-4xl shadow-2xl">
                                                    {getGroupInitial(group.name)}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-3">
                                                <h3 className="text-4xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {group.name}
                                                </h3>
                                                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                    Active Partner
                                                </span>
                                            </div>
                                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Network Registry: {group.id}</p>
                                        </div>

                                        {/* ACTION BUTTONS: VISIT / JOIN / EXIT */}
                                        <div className="flex flex-wrap gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => navigate(`/groups/${slugify(group.name)}`)}
                                                className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:bg-blue-700 transition-all"
                                            >
                                                <ExternalLink size={16} />
                                                <span>Visit Workspace</span>
                                            </motion.button>
                                            
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-blue-600 transition-all"
                                            >
                                                <UserPlus size={16} />
                                                <span>Join Again</span>
                                            </motion.button>

                                            <button className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-100 transition-all">
                                                <LogOut size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Group performance indicators */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                                        <StatItem label="Pooled Capital" value={`৳${(group.total_investment / 1000).toFixed(1)}k`} icon={<DollarSign size={14} className="text-blue-600" />} />
                                        <StatItem label="Net Returns" value={`+৳${(group.total_profit / 1000).toFixed(1)}k`} icon={<TrendingUp size={14} className="text-indigo-600" />} valueClass="text-indigo-600" />
                                        <StatItem label="Total Partners" value={members.length} icon={<Users size={14} className="text-indigo-600" />} />
                                        <StatItem label="Pool Efficiency" value={`${efficiency}%`} valueClass="text-blue-600" />
                                    </div>
                                </div>

                                {/* Administration & Collaboration Drawer */}
                                <div className="grid md:grid-cols-2 bg-slate-50/50 border-t border-slate-100">
                                    {/* Admin Information */}
                                    {admin && (
                                        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-100">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Principal Administrator</p>
                                            <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100">
                                                    {admin.photo_url ? <img src={admin.photo_url} className="w-full h-full object-cover" alt="" /> : <span className="text-blue-600 font-black">{admin.name.charAt(0)}</span>}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900">{admin.name}</p>
                                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{admin.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Partner List Toggle */}
                                    <div className="p-8 md:p-12">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Active Collaboration</p>
                                        <motion.button
                                            onClick={() => toggleMembers(group.id)}
                                            className="w-full flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all shadow-sm"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                    <Users size={20} />
                                                </div>
                                                <span className="font-black text-slate-900 tracking-tight">Partners ({members.length})</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>
                                        </motion.button>

                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="mt-6 space-y-3"
                                            >
                                                {members.map((member) => (
                                                    <div key={member.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-50">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400">
                                                                {member.name.charAt(0)}
                                                            </div>
                                                            <p className="font-black text-xs text-slate-700">{member.name}</p>
                                                        </div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase">৳{(member.total_investment / 1000).toFixed(1)}k</p>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>
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
 * Reusable layout for performance metrics
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