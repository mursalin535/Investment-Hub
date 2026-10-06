import { getInvestmentAdds } from '../../server/Investment_server';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DollarSign, TrendingUp, BarChart3, Briefcase,
    ArrowRight, Search, LayoutGrid, List, Zap,
    Building2, User, BadgeCheck, ClipboardList, Download,
    Users, UserCheck, X, Eye
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../store/CookieSlice';
import { SendingReq, GetReqStatus } from '../../server/Deal_server';
import { generateContract } from './generateContract';
import { group_server_your_group } from '../../server/Group_server';
import { GetParticipants } from '../../server/group_investment_server';
import CountdownTimer from './CountdownTimer';
import { getFeedbackByAd } from '../../server/deal_feedback_server';

const BASE = 'http://localhost:5009/uploads/';

const cardVariants = {
    hidden:  { opacity: 0, y: 30, scale: 0.96 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
};

// ── small reusables ────────────────────────────────────────────────────────

function Stat({ icon, label, value }) {
    return (
        <div className="bg-slate-50 rounded-2xl px-4 py-3 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
                {icon}
                <span className="text-[9px] font-black uppercase tracking-[.2em]">{label}</span>
            </div>
            <p className="text-sm font-bold text-slate-800">{value}</p>
        </div>
    );
}

function Avatar({ src, name, size = 8 }) {
    return (
        <div className={`w-${size} h-${size} rounded-full overflow-hidden bg-slate-700 flex-shrink-0 flex items-center justify-center`}>
            {src
                ? <img src={`${BASE}${src}`} alt={name} className="w-full h-full object-cover" />
                : <User size={size * 1.8} className="text-white" />
            }
        </div>
    );
}

function StatusBadge({ status, dark = false }) {
    const isOpen = status === 'open' || !status;
    return (
        <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full
            ${isOpen
                ? dark ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700'
                : dark ? 'bg-slate-600 text-slate-200' : 'bg-slate-100 text-slate-500'
            }`}>
            {status ?? 'open'}
        </span>
    );
}

const statusColors = { yellow: 'bg-yellow-500', green: 'bg-green-500', red: 'bg-red-500' };

function FeedbackDetailsButton({ adId, base, motionBase }) {
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOpen = async () => {
        setOpen(true);
        if (!feedback) {
            setLoading(true);
            try {
                const data = await getFeedbackByAd(adId);
                setFeedback(data);
            } catch (e) { console.error(e); }
            setLoading(false);
        }
    };

    return (
        <>
            <motion.button whileHover={{ x: 3 }}
                onClick={handleOpen}
                className={`${motionBase} bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 ${base}`}
            >
                <Eye size={13} /> Details
            </motion.button>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={() => setOpen(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-black text-slate-900">Businessman Feedback</h3>
                            <button onClick={() => setOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl">
                                <X size={18} />
                            </button>
                        </div>
                        {loading ? (
                            <div className="py-12 text-center">
                                <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                            </div>
                        ) : feedback ? (
                            <div className="space-y-4">
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Outcome Report</p>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{feedback.feedback_text}</p>
                                </div>
                                <p className="text-[10px] text-slate-400 text-right">
                                    Submitted: {new Date(feedback.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-slate-400 font-bold">No feedback submitted yet</p>
                                <p className="text-sm text-slate-300 mt-1">The businessman hasn't submitted the outcome report yet.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </>
    );
}

function CardCta({ ad, user, reqStatus, requestInfo, onOpenModal, navigate, list = false }) {
    const base = list
        ? 'px-6 py-4 font-black text-xs uppercase rounded-2xl flex-shrink-0'
        : 'w-full py-3.5 font-black text-xs uppercase rounded-2xl';

    const motionBase = `flex items-center gap-2 justify-center tracking-widest transition-all`;

    // ── Businessman: only their own ad ───────────────────────────────────
    if (user.role === 'businessman') {
        if (ad.businessman_id != user.id) return null;
        return (
            <motion.button whileHover={{ x: list ? 3 : 4 }}
                className={`${motionBase} bg-slate-900 hover:bg-slate-700 text-white
                            shadow-lg shadow-slate-900/20 ${base}`}
                onClick={() => navigate(`/requestlist/${ad.ad_id}`)}
            >
                <ClipboardList size={13} />
                {list ? 'See Requests' : 'See Request List'}
            </motion.button>
        );
    }

    // ── Investor ─────────────────────────────────────────────────────────
    if (reqStatus === 'pending') {
        return <button disabled className={`${base} ${statusColors.yellow} text-white`}>Pending Request</button>;
    }

    if (reqStatus === 'rejected') {
        return <button disabled className={`${base} ${statusColors.red} text-white`}>Rejected</button>;
    }

    if (reqStatus === 'accepted') {
        return (
            <div className={`flex ${list ? 'flex-row gap-3 items-center' : 'flex-col gap-2'}`}>
                <button disabled className={`${base} ${statusColors.green} text-white`}>
                    Accepted
                </button>
                {ad.profit_deadline && (
                    <div className={`${base} bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center`}>
                        <CountdownTimer deadline={ad.profit_deadline} compact />
                    </div>
                )}
                <motion.button whileHover={{ x: list ? 3 : 4 }}
                    onClick={async () => {
                        let participants = null;
                        let investmentType = requestInfo?.investment_type || 'individual';
                        if (investmentType === 'group' && requestInfo?.request_id) {
                            try {
                                participants = await GetParticipants(requestInfo.request_id);
                            } catch (e) { console.error(e); }
                        }
                        const ok = generateContract({
                            ad,
                            businessman: {
                                name:  ad.businessman_name,
                                email: ad.businessman_email,
                                phone: ad.businessman_phone,
                            },
                            investor: {
                                name:             user.name,
                                email:            user.email,
                                phone:            user.phone,
                                total_investment: user.total_investment,
                                total_profit:     user.total_profit,
                            },
                            participants,
                            investmentType,
                        });
                        if (!ok) alert('Failed to generate contract. Check console for details.');
                    }}
                    className={`${motionBase} bg-slate-900 hover:bg-slate-700 text-white
                                shadow-lg shadow-slate-900/20 ${base}`}
                >
                    <Download size={13} /> Contract
                </motion.button>
                <FeedbackDetailsButton adId={ad.ad_id} base={base} motionBase={motionBase} />
            </div>
        );
    }

    // default: no request yet
    return (
        <motion.button whileHover={{ x: list ? 3 : 4 }}
            className={`${motionBase} bg-emerald-500 hover:bg-emerald-600 text-white
                        shadow-md shadow-emerald-500/20 ${base}`}
            onClick={(e) => { e.stopPropagation(); onOpenModal(ad.ad_id); }}
        >
            Send Request <ArrowRight size={13} />
        </motion.button>
    );
}

// ── main component ─────────────────────────────────────────────────────────

export default function Deals() {
    const [ads, setAds]           = useState([]);
    const [loading, setLoading]   = useState(true);
    const [search, setSearch]     = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [requests, setRequests] = useState([]);
    const [groups, setGroups]     = useState([]);
    const user     = useSelector(getUser);
    const navigate = useNavigate();

    // Modal state
    const [modalOpen, setModalOpen]       = useState(false);
    const [modalAdId, setModalAdId]       = useState(null);
    const [investType, setInvestType]     = useState('individual');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [sending, setSending]           = useState(false);

    useEffect(() => {
        getInvestmentAdds()
            .then((data) => {
                setAds(data?.success ? data.data : []);
            })
            .catch(console.log)
            .finally(() => setLoading(false));

        GetReqStatus(user.id, user.role)
            .then((data) => { if (data?.success) setRequests(data.data); })
            .catch(console.log);

        if (user.role === 'investor') {
            group_server_your_group(user.id)
                .then((data) => { if (data?.success) setGroups(data.data || []); })
                .catch(console.log);
        }
    }, []);

    function openModal(adId) {
        setModalAdId(adId);
        setInvestType('individual');
        setSelectedGroup('');
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setModalAdId(null);
    }

    async function handleSendingReq() {
        if (!modalAdId) return;
        setSending(true);
        try {
            const payload = {
                id: user.id,
                ad_id: modalAdId,
                role: user.role,
                investment_type: investType,
                group_id: investType === 'group' ? selectedGroup : null,
            };
            const res = await SendingReq(payload);
            if (res.success) {
                setRequests(prev => [...prev, { add_id: modalAdId, status: 'pending' }]);
                closeModal();
            }
        } catch (err) { console.log(err); }
        finally { setSending(false); }
    }

    const filtered = ads.filter(ad =>
        [ad.pitch, ad.company_name, ad.businessman_name]
            .some(f => f?.toLowerCase().includes(search.toLowerCase()))
    );

    const requestMap = Object.fromEntries(requests.map(r => [r.add_id, r.status]));
    const requestInfoMap = Object.fromEntries(requests.map(r => [r.add_id, r]));

    if (loading) return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#F9FAFB]">
            <motion.div animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
            />
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[#F9FAFB] pb-28">

            {/* ── HERO ── */}
            <section className="relative w-full pt-36 pb-20 px-6 md:px-16 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[20%] -right-[8%] w-[600px] h-[600px] bg-emerald-50/60 rounded-full blur-[120px]" />
                    <div className="absolute top-[40%] -left-[5%] w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px]" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }} viewport={{ once: false }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <Zap size={15} className="text-white" />
                        </div>
                        <div className="w-12 h-px bg-emerald-400/50" />
                        <span className="text-emerald-700 font-bold uppercase tracking-[0.4em] text-[10px]">Live Opportunities</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: false }}
                        className="text-6xl md:text-8xl lg:text-[110px] font-black text-slate-900 leading-[0.9] tracking-tighter mb-8"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Investment<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400 italic font-serif pr-4">
                            Deals
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: false }}
                        className="text-slate-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl"
                    >
                        Browse verified investment opportunities from businesses actively
                        seeking capital. Analyse metrics and make informed decisions.
                    </motion.p>
                </div>
            </section>

            {/* ── TOOLBAR ── */}
            <section className="px-6 md:px-16 mb-14 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="p-4 bg-white/90 backdrop-blur-xl border border-slate-100 rounded-[3rem]
                                   shadow-xl shadow-slate-200/40 flex flex-col lg:flex-row items-center justify-between gap-5"
                    >
                        <div className="relative w-full lg:max-w-md flex items-center pl-6 bg-slate-50 rounded-[2rem]
                                        border border-slate-100 focus-within:border-emerald-400/50
                                        focus-within:bg-white focus-within:shadow-md transition-all">
                            <Search size={17} className="text-slate-400 flex-shrink-0" />
                            <input type="text" placeholder="Search by pitch, company or businessman..."
                                value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full bg-transparent py-5 pl-3 pr-6 text-sm text-slate-800 placeholder-slate-300 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
                            <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                {['grid', 'list'].map(mode => (
                                    <button key={mode} onClick={() => setViewMode(mode)}
                                        className={`p-3 rounded-xl transition-all ${viewMode === mode ? 'bg-white shadow-md text-emerald-600' : 'text-slate-400'}`}>
                                        {mode === 'grid' ? <LayoutGrid size={20} /> : <List size={20} />}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 px-6 py-4 bg-emerald-50 border border-emerald-200 rounded-[2rem]">
                                <BarChart3 size={15} className="text-emerald-600" />
                                <span className="text-xs font-black uppercase tracking-widest text-emerald-700">
                                    {ads.length} Active Deals
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CARDS ── */}
            <section className="px-6 md:px-16 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div key={viewMode + search}
                        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                        initial="hidden" animate="visible"
                        className={viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'
                            : 'flex flex-col gap-5'}
                    >
                        {filtered.map((ad, i) => {
                            const reqStatus = requestMap[ad.ad_id];
                            const requestInfo = requestInfoMap[ad.ad_id];
                            const isGrid    = viewMode === 'grid';
                            const ctaProps  = { ad, user, reqStatus, requestInfo, onOpenModal: openModal, navigate };

                            return (
                                <motion.div key={ad.ad_id} custom={i} variants={cardVariants}
                                    whileHover={{ y: isGrid ? -10 : -3 }}
                                    className={`group bg-white border border-slate-100 hover:border-emerald-200
                                               transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.12)]
                                               ${isGrid ? 'rounded-[2.5rem] overflow-hidden flex flex-col'
                                                        : 'rounded-[2rem] p-7 flex flex-row items-center gap-7'}`}
                                >
                                    {/* thumbnail */}
                                    {isGrid ? (
                                        <div className="relative h-52 bg-slate-900 overflow-hidden">
                                            <img src={ad.thumbnail_url ? `${BASE}${ad.thumbnail_url}` : 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80'}
                                                alt="deal" className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                                            <div className="absolute top-5 left-5"><StatusBadge status={ad.status} dark /></div>
                                            <div className="absolute top-5 right-5 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                                                <span className="text-[10px] font-black text-white">৳{Number(ad.amount_needed).toLocaleString()}</span>
                                            </div>
                                            <div className="absolute bottom-5 left-5 flex items-center gap-3">
                                                <Avatar src={ad.businessman_photo} name={ad.businessman_name} size={9} />
                                                <div>
                                                    <p className="text-white font-bold text-sm leading-tight">{ad.businessman_name}</p>
                                                    <p className="text-white/50 text-[10px] uppercase tracking-wider">{ad.company_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 rounded-2xl bg-slate-100 flex-shrink-0 overflow-hidden">
                                            <img src={ad.thumbnail_url ? `${BASE}${ad.thumbnail_url}` : 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80'}
                                                alt="deal" className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    {/* body */}
                                    <div className={`flex-grow ${isGrid ? 'p-7 space-y-5' : 'flex flex-row items-center justify-between'}`}>
                                        {isGrid ? (
                                            <>
                                                <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                                                    <div className="w-10 h-10 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0 flex items-center justify-center">
                                                        {ad.company_photo
                                                            ? <img src={`${BASE}${ad.company_photo}`} alt={ad.company_name} className="w-full h-full object-cover" />
                                                            : <Building2 size={16} className="text-slate-400" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-slate-800 text-sm truncate">{ad.company_name}</p>
                                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                                                            Valuation: ৳{Number(ad.company_valuation).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    {ad.company_name && <BadgeCheck size={14} className="text-emerald-500 ml-auto flex-shrink-0" />}
                                                </div>

                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{ad.pitch}</p>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <Stat icon={<DollarSign size={11} className="text-emerald-500" />} label="Asking"      value={`৳${Number(ad.amount_needed).toLocaleString()}`} />
                                                    <Stat icon={<BarChart3   size={11} className="text-blue-400"    />} label="Last Month"  value={`৳${Number(ad.last_month_sale).toLocaleString()}`} />
                                                    <Stat icon={<TrendingUp  size={11} className="text-orange-400"  />} label="Last Year"   value={`৳${Number(ad.last_year_sale).toLocaleString()}`} />
                                                    <Stat icon={<Briefcase   size={11} className="text-purple-400"  />} label="Total Sales" value={`৳${Number(ad.total_sale).toLocaleString()}`} />
                                                </div>

                                                <div className="pt-4 border-t border-slate-50">
                                                    <CardCta {...ctaProps} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="space-y-2 flex-1 min-w-0">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={ad.businessman_photo} name={ad.businessman_name} size={8} />
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-800">{ad.businessman_name}</p>
                                                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">{ad.company_name}</p>
                                                        </div>
                                                        <StatusBadge status={ad.status} />
                                                    </div>
                                                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{ad.pitch}</p>
                                                </div>

                                                <div className="flex items-center gap-8 flex-shrink-0 ml-6">
                                                    <div className="text-right hidden md:block">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Asking</p>
                                                        <p className="text-lg font-bold text-slate-800">৳{Number(ad.amount_needed).toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-right hidden md:block">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Last Year</p>
                                                        <p className="text-lg font-bold text-emerald-600">৳{Number(ad.last_year_sale).toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-right hidden lg:block">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Company</p>
                                                        <p className="text-sm font-bold text-slate-800">{ad.company_name}</p>
                                                    </div>
                                                    <CardCta {...ctaProps} list />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="py-40 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-28 h-28 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] flex items-center justify-center shadow-inner">
                            <Search size={44} className="text-emerald-200" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                                No deals found
                            </h3>
                            <p className="text-slate-400 mt-2 text-lg font-light">Try adjusting your search or check back later.</p>
                        </div>
                    </motion.div>
                )}
            </section>

            {/* ── INVESTMENT TYPE MODAL ── */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="relative bg-slate-900 px-8 py-6">
                                <button onClick={closeModal}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                    <X size={16} className="text-white" />
                                </button>
                                <h3 className="text-xl font-black text-white">Investment Type</h3>
                                <p className="text-slate-400 text-sm mt-1">Choose how you want to invest in this opportunity</p>
                            </div>

                            {/* Options */}
                            <div className="p-8 space-y-4">
                                {/* Individual */}
                                <button
                                    onClick={() => { setInvestType('individual'); setSelectedGroup(''); }}
                                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left
                                        ${investType === 'individual'
                                            ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-500/10'
                                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
                                        ${investType === 'individual' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        <UserCheck size={22} />
                                    </div>
                                    <div>
                                        <p className={`font-bold text-sm ${investType === 'individual' ? 'text-emerald-700' : 'text-slate-800'}`}>
                                            Invest Individually
                                        </p>
                                        <p className="text-slate-400 text-xs mt-0.5">
                                            Invest on your own behalf, no group involvement
                                        </p>
                                    </div>
                                    <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                        ${investType === 'individual' ? 'border-emerald-500' : 'border-slate-300'}`}>
                                        {investType === 'individual' && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                        )}
                                    </div>
                                </button>

                                {/* Group */}
                                <button
                                    onClick={() => setInvestType('group')}
                                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left
                                        ${investType === 'group'
                                            ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10'
                                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
                                        ${investType === 'group' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        <Users size={22} />
                                    </div>
                                    <div>
                                        <p className={`font-bold text-sm ${investType === 'group' ? 'text-blue-700' : 'text-slate-800'}`}>
                                            Invest as Group
                                        </p>
                                        <p className="text-slate-400 text-xs mt-0.5">
                                            Invest through one of your groups
                                        </p>
                                    </div>
                                    <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                        ${investType === 'group' ? 'border-blue-500' : 'border-slate-300'}`}>
                                        {investType === 'group' && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                        )}
                                    </div>
                                </button>

                                {/* Group selector */}
                                <AnimatePresence>
                                    {investType === 'group' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-2 space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                                                    Select Group
                                                </label>
                                                {groups.length > 0 ? (
                                                    <select
                                                        value={selectedGroup}
                                                        onChange={e => setSelectedGroup(e.target.value)}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition-all"
                                                    >
                                                        <option value="">Choose a group...</option>
                                                        {groups.map(g => (
                                                            <option key={g.id} value={g.id}>{g.name}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                                        <Users size={24} className="mx-auto text-slate-300 mb-2" />
                                                        <p className="text-sm text-slate-400">No groups found</p>
                                                        <p className="text-xs text-slate-300 mt-1">Create a group first to invest together</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="px-8 pb-8 flex gap-3">
                                <button onClick={closeModal}
                                    className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSendingReq}
                                    disabled={sending || (investType === 'group' && !selectedGroup)}
                                    className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {sending ? (
                                        <motion.span animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                                        />
                                    ) : (
                                        <>Send Request <ArrowRight size={13} /></>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}