import { useEffect, useState } from "react";
import group_server from "../../server/Group_server";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight } from "lucide-react";

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.65, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }
    })
};

const groupImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80",
];

export default function Groups() {
    const [groups, setGroups]   = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        group_server().then((data) => {
            setGroups(data || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

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
                            Collaborative Investment
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
                        Investment<br />
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
                        Join forces with like-minded investors. Pool your resources, diversify your
                        risk, and access premium opportunities through our institutional-grade groups.
                    </motion.p>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: false, amount: 0.3 }}
                className="max-w-7xl mx-auto px-6 md:px-16 mb-16"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 border border-slate-100 rounded-2xl overflow-hidden">
                    {[
                        { num: groups.length,  label: "Active Groups",     suffix: "" },
                        { num: "৳0",           label: "Total Investment",  suffix: "k" },
                        { num: "12+",          label: "Total Members",     suffix: "" },
                        { num: "100%",         label: "Documented Deals",  suffix: "" },
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

            {/* ── CARDS GRID ── */}
            <section className="max-w-7xl mx-auto px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {groups.map((group, i) => {
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
                                {/* Image */}
                                <div className="relative h-52 overflow-hidden bg-slate-900">
                                    <img
                                        src={group.photo_url || groupImages[i % 3]}
                                        alt={group.name}
                                        className="w-full h-full object-cover opacity-60
                                                   transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                                    <div className="absolute bottom-14 left-6 flex gap-2">
                                        <span className="px-2.5 py-1 bg-green-500 text-white text-[9px]
                                                        font-black uppercase tracking-widest rounded-full">
                                            Active
                                        </span>
                                        <span className="px-2.5 py-1 bg-white/15 backdrop-blur text-white
                                                        text-[9px] font-black uppercase tracking-widest
                                                        rounded-full border border-white/20">
                                            Premium
                                        </span>
                                    </div>
                                    <h3 className="absolute bottom-5 left-6 right-6 text-white font-bold
                                                   text-xl leading-tight tracking-tight"
                                        style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {group.name}
                                    </h3>
                                </div>

                                {/* Body */}
                                <div className="p-7 flex-grow flex flex-col gap-6">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <DollarSign size={11} className="text-green-600" />
                                                <span className="text-[9px] font-black uppercase tracking-[.25em]">Investment</span>
                                            </div>
                                            <p className="text-lg font-bold text-slate-800">
                                                ৳{(group.total_investment / 1000).toFixed(1)}k
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <TrendingUp size={11} className="text-emerald-500" />
                                                <span className="text-[9px] font-black uppercase tracking-[.25em]">Profit</span>
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
                                                Return Efficiency
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

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                                        <div className="flex -space-x-2">
                                            {[10, 11, 12].map((n) => (
                                                <div key={n} className="w-8 h-8 rounded-full border-[2.5px]
                                                                         border-white bg-slate-200 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?img=${n + i * 3}`} alt="" />
                                                </div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full border-[2.5px] border-white
                                                            bg-slate-100 flex items-center justify-center
                                                            text-[8px] font-bold text-slate-500">
                                                +12
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-1.5 text-green-700
                                                          font-bold text-sm hover:gap-3 transition-all duration-200">
                                            Details
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Empty state */}
                {groups.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        className="py-24 text-center space-y-4"
                    >
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center
                                        justify-center mx-auto text-slate-300 text-4xl">
                            👥
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">No groups found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto">
                            No investment groups at the moment. Check back soon!
                        </p>
                    </motion.div>
                )}
            </section>

            {/* ── CTA ── */}
            <section className="max-w-7xl mx-auto px-6 md:px-16 mt-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="w-full bg-slate-900 rounded-[3rem] p-12 md:p-20
                               relative overflow-hidden flex flex-col md:flex-row
                               items-center justify-between gap-12"
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full
                                    bg-gradient-to-l from-green-900/20 to-transparent pointer-events-none" />
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-32 -right-32 w-[500px] h-[500px]
                                   bg-green-500 rounded-full blur-3xl opacity-15 pointer-events-none"
                    />

                    <div className="relative z-10 space-y-5 md:w-2/3">
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            Ready to lead your own<br />
                            <em className="text-green-400 not-italic italic">Investment Group?</em>
                        </h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed">
                            Become a Group Admin, invite your network, and manage collaborative
                            portfolios with our professional suite of tools.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#16a34a", color: "#fff" }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                        className="relative z-10 px-10 py-5 bg-white text-slate-900
                                   font-black rounded-2xl shadow-2xl whitespace-nowrap
                                   text-sm uppercase tracking-widest"
                    >
                        Create a Group
                    </motion.button>
                </motion.div>
            </section>

        </div>
    );
}