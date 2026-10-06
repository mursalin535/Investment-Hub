import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RequestInfo, AcceptRequest } from '../../server/Deal_server';
import { generateContract } from './generateContract';
import { GetParticipants } from '../../server/group_investment_server';
import { submitFeedback, getFeedbackByAd } from '../../server/deal_feedback_server';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/CookieSlice';
import CountdownTimer from './CountdownTimer';
import {
    User, Mail, Phone, Briefcase, TrendingUp,
    DollarSign, CheckCircle, XCircle, Clock, Zap, Download,
    Users, UserCheck, Send, FileText
} from 'lucide-react';

const BASE = 'http://localhost:5009/uploads/';

const statusStyles = {
    pending:  { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <Clock      size={11} /> },
    accepted: { bg: 'bg-green-100',  text: 'text-green-700',  icon: <CheckCircle size={11} /> },
    rejected: { bg: 'bg-red-100',    text: 'text-red-700',    icon: <XCircle    size={11} /> },
};

export default function RequestList() {
    const { ad_id }   = useParams();
    const user        = useSelector(getUser);
    const [adInfo, setAdInfo]         = useState(null);
    const [requests, setRequests]     = useState([]);
    const [loading, setLoading]       = useState(true);
    const [accepting, setAccepting]   = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [existingFeedback, setExistingFeedback] = useState(null);

    const hasAccepted = requests.some(r => r.status === 'accepted');

    useEffect(() => {
        RequestInfo(ad_id)
            .then(data => {
                if (data?.success) {
                    setRequests(data.data);
                    setAdInfo(data.adInfo ?? null);
                }
            })
            .catch(console.log)
            .finally(() => setLoading(false));

        getFeedbackByAd(ad_id)
            .then(data => {
                if (data) {
                    setExistingFeedback(data);
                    setFeedbackSent(true);
                }
            })
            .catch(() => {});
    }, [ad_id]);

    async function handleFeedback() {
        if (!feedbackText.trim()) return;
        setFeedbackLoading(true);
        try {
            const data = await submitFeedback(ad_id, feedbackText);
            if (data) {
                setExistingFeedback(data);
                setFeedbackSent(true);
            }
        } catch (e) { console.error(e); }
        setFeedbackLoading(false);
    }

    async function handleAccept(request_id) {
        setAccepting(request_id);
        try {
            const res = await AcceptRequest(request_id, ad_id);
            if (res?.success) {
                setRequests(prev => prev.map(r => ({
                    ...r,
                    status: r.request_id === request_id ? 'accepted' : 'rejected'
                })));
            }
        } catch (err) {
            console.log(err);
        } finally {
            setAccepting(null);
        }
    }

    async function handleDownloadContract(investor) {
        let participants = null;
        let investmentType = investor.investment_type || 'individual';
        if (investmentType === 'group' && investor.request_id) {
            try {
                participants = await GetParticipants(investor.request_id);
            } catch (e) { console.error(e); }
        }
        const ok = generateContract({
            ad: { ad_id, ...adInfo },
            businessman: {
                name:  user.name,
                email: user.email,
                phone: user.phone,
            },
            investor: {
                name:             investor.name,
                email:            investor.email,
                phone:            investor.phone,
                total_investment: investor.total_investment,
                total_profit:     investor.total_profit,
            },
            participants,
            investmentType,
        });
        if (!ok) alert('Failed to generate contract. Check console for details.');
    }

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
                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }} viewport={{ once: false }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <Zap size={15} className="text-white" />
                        </div>
                        <div className="w-12 h-px bg-emerald-400/50" />
                        <span className="text-emerald-700 font-bold uppercase tracking-[0.4em] text-[10px]">Investment Hub</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: false }}
                        className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Requests<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400 italic pr-4">
                            Ad #{ad_id}
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: false }}
                        className="text-slate-500 text-lg font-light"
                    >
                        {requests.filter(req => !hasAccepted || req.status === 'accepted').length} request{requests.filter(req => !hasAccepted || req.status === 'accepted').length !== 1 ? 's' : ''} received
                        {hasAccepted && <span className="ml-3 text-green-600 font-semibold">· Deal closed</span>}
                    </motion.p>
                </div>
            </section>

            {/* ── LIST ── */}
            <section className="px-6 md:px-16 max-w-5xl mx-auto">
                <AnimatePresence>
                    <div className="flex flex-col gap-5">
                        {requests.filter(req => !hasAccepted || req.status === 'accepted').map((req, i) => {
                            const badge        = statusStyles[req.status] ?? statusStyles.pending;
                            const isProcessing = accepting === req.request_id;
                            const isAccepted   = req.status === 'accepted';
                            const isRejected   = req.status === 'rejected';

                            return (
                                <motion.div key={req.request_id}
                                    layout
                                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                                    transition={{ duration: 0.5, delay: i * 0.07 }}
                                    className="bg-white border border-slate-100 hover:border-emerald-200
                                               rounded-[2rem] p-7 flex flex-col md:flex-row items-start
                                               md:items-center gap-6 transition-all duration-300
                                               hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.1)]"
                                >
                                    {/* Avatar */}
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center">
                                        {req.photo_url
                                            ? <img src={`${BASE}${req.photo_url}`} alt={req.name} className="w-full h-full object-cover" />
                                            : <User size={28} className="text-slate-400" />
                                        }
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="font-black text-slate-800 text-lg">{req.name}</h3>
                                            <span className={`flex items-center gap-1 px-2.5 py-1 text-[9px] font-black
                                                            uppercase tracking-widest rounded-full ${badge.bg} ${badge.text}`}>
                                                {badge.icon} {req.status ?? 'pending'}
                                            </span>
                                            <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest
                                                           rounded-full bg-slate-100 text-slate-500">
                                                {req.role}
                                            </span>
                                            {req.role === 'investor' && req.investment_type && (
                                                <span className={`flex items-center gap-1 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full
                                                    ${req.investment_type === 'group'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-purple-100 text-purple-700'}`}>
                                                    {req.investment_type === 'group' ? <Users size={10} /> : <UserCheck size={10} />}
                                                    {req.investment_type}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                                            <span className="flex items-center gap-1.5"><Mail size={12} /> {req.email}</span>
                                            <span className="flex items-center gap-1.5"><Phone size={12} /> {req.phone}</span>
                                        </div>

                                        {req.role === 'investor' && (
                                            <div className="flex gap-4 pt-1">
                                                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <DollarSign size={11} className="text-emerald-500" />
                                                    Total Invested: <strong className="text-slate-700 ml-1">৳{Number(req.total_investment).toLocaleString()}</strong>
                                                </span>
                                                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <TrendingUp size={11} className="text-blue-400" />
                                                    Total Profit: <strong className="text-slate-700 ml-1">৳{Number(req.total_profit).toLocaleString()}</strong>
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* CTA */}
                                    <div className="flex flex-col gap-2 flex-shrink-0">
                                        {isAccepted ? (
                                            <>
                                                <div className="flex items-center gap-2 px-6 py-3.5 bg-green-50
                                                                border border-green-200 rounded-2xl text-green-700
                                                                font-black text-xs uppercase tracking-widest">
                                                    <CheckCircle size={13} /> Accepted
                                                </div>
                                                {adInfo?.profit_deadline && (
                                                    <div className="px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                                                        <CountdownTimer deadline={adInfo.profit_deadline} />
                                                    </div>
                                                )}
                                                <motion.button whileHover={{ x: 3 }}
                                                    onClick={() => handleDownloadContract(req)}
                                                    className="flex items-center gap-2 px-6 py-3.5 bg-slate-900
                                                               hover:bg-slate-700 text-white font-black text-xs
                                                               uppercase tracking-widest rounded-2xl transition-all
                                                               shadow-lg shadow-slate-900/20"
                                                >
                                                    <Download size={13} /> Download Contract
                                                </motion.button>
                                            </>
                                        ) : isRejected ? (
                                            <div className="flex items-center gap-2 px-6 py-3.5 bg-red-50
                                                            border border-red-200 rounded-2xl text-red-400
                                                            font-black text-xs uppercase tracking-widest">
                                                <XCircle size={13} /> Rejected
                                            </div>
                                        ) : !hasAccepted ? (
                                            <motion.button whileHover={{ x: 3 }}
                                                disabled={isProcessing}
                                                onClick={() => handleAccept(req.request_id)}
                                                className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500
                                                           hover:bg-emerald-600 text-white font-black text-xs
                                                           uppercase tracking-widest rounded-2xl transition-all
                                                           shadow-lg shadow-emerald-500/20 disabled:opacity-60
                                                           disabled:cursor-not-allowed"
                                            >
                                                {isProcessing
                                                    ? <motion.span animate={{ rotate: 360 }}
                                                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                                        className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full inline-block"
                                                      />
                                                    : <CheckCircle size={13} />
                                                }
                                                Accept
                                            </motion.button>
                                        ) : null}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </AnimatePresence>

                {requests.filter(req => !hasAccepted || req.status === 'accepted').length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="py-40 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-28 h-28 bg-emerald-50 border border-emerald-100 rounded-[2.5rem]
                                        flex items-center justify-center shadow-inner">
                            <Briefcase size={44} className="text-emerald-200" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-800"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                No requests yet
                            </h3>
                            <p className="text-slate-400 mt-2 text-lg font-light">
                                Requests from investors will appear here.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* ── FEEDBACK FORM (Businessman only, when deal is accepted) ── */}
                {hasAccepted && user?.role === 'businessman' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-10 bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-slate-900"
                                    style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Outcome Report
                                </h4>
                                <p className="text-sm text-slate-400">Share what happened with the invested capital</p>
                            </div>
                        </div>

                        {feedbackSent && existingFeedback ? (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle size={16} className="text-emerald-500" />
                                    <span className="text-sm font-bold text-emerald-700">Feedback Submitted</span>
                                </div>
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{existingFeedback.feedback_text}</p>
                                <p className="text-[10px] text-slate-400 mt-3">
                                    Submitted: {new Date(existingFeedback.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <textarea
                                    rows={6}
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl
                                               focus:bg-white focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/5
                                               outline-none transition-all duration-500 text-slate-700 resize-none"
                                    placeholder="Describe the outcome: What was the money used for? What results did the business achieve? How did the investment perform?"
                                    value={feedbackText}
                                    onChange={e => setFeedbackText(e.target.value)}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={feedbackLoading || !feedbackText.trim()}
                                    onClick={handleFeedback}
                                    className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs
                                               uppercase tracking-widest rounded-2xl transition-all shadow-md shadow-blue-600/20
                                               disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {feedbackLoading ? (
                                        <motion.span animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                                        />
                                    ) : <Send size={14} />}
                                    Submit Feedback
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                )}
            </section>
        </div>
    );
}