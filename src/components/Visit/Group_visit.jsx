import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
    Users, DollarSign, TrendingUp, Crown, ArrowLeft,
    Mail, Phone, UserPlus, CheckCircle, XCircle, Clock,
    Lock, Globe, Zap, Shield, Loader2, Send
} from 'lucide-react';
import { getUser } from '../../store/CookieSlice';
import { getGroupDetails, sendJoinRequest, acceptJoinRequest, rejectJoinRequest } from '../../server/Group_visit_server';
import CreatePost from '../Newsfeed/CreatePost';
import PostCard from '../Newsfeed/PostCard';
import GroupInvestmentPost from './GroupInvestmentPost';

const BASE = 'http://localhost:5009/uploads/';

export default function GroupVisit() {
    const { groupId } = useParams();
    const user = useSelector(getUser);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [processingId, setProcessingId] = useState(null);

    const fetchGroup = async () => {
        setLoading(true);
        const res = await getGroupDetails(groupId, user?.id);
        if (res?.success) setData(res.data);
        setLoading(false);
    };

    useEffect(() => { fetchGroup(); }, [groupId, user?.id]);

    async function handleJoin() {
        if (!user?.id) return navigate('/login');
        setJoining(true);
        await sendJoinRequest(groupId, user.id);
        await fetchGroup();
        setJoining(false);
    }

    async function handleAccept(requestId) {
        setProcessingId(requestId);
        await acceptJoinRequest(requestId);
        await fetchGroup();
        setProcessingId(null);
    }

    async function handleReject(requestId) {
        setProcessingId(requestId);
        await rejectJoinRequest(requestId);
        await fetchGroup();
        setProcessingId(null);
    }

    if (loading) return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#F9FAFB]">
            <motion.div animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full" />
        </div>
    );

    if (!data) return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#F9FAFB]">
            <p className="text-slate-400 font-bold">Group not found</p>
        </div>
    );

    const { group, members, admin, posts, viewerStatus, isAdmin, pendingRequests } = data;
    const efficiency = group.total_investment > 0
        ? ((group.total_profit / group.total_investment) * 100).toFixed(1) : '0.0';

    return (
        <div className="w-full min-h-screen bg-[#F9FAFB] pb-28">

            {/* ── HERO ── */}
            <section className="relative w-full pt-28 pb-16 px-6 md:px-16 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[20%] -right-[8%] w-[600px] h-[600px] bg-emerald-50/60 rounded-full blur-[120px]" />
                    <div className="absolute top-[40%] -left-[5%] w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px]" />
                </div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <button onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-8">
                        <ArrowLeft size={16} /> Back
                    </button>

                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Group visual */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black text-4xl shadow-2xl overflow-hidden flex-shrink-0">
                            {group.photo_url
                                ? <img src={`${BASE}${group.photo_url}`} alt={group.name} className="w-full h-full object-cover" />
                                : group.name?.charAt(0).toUpperCase()
                            }
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3 flex-wrap">
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter"
                                    style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {group.name}
                                </h1>
                                {isAdmin && (
                                    <span className="px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                                        <Crown size={10} /> Admin
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <Lock size={12} className="text-blue-500" />
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Private Investment Group</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { icon: <DollarSign size={14} />, label: 'Capital', value: `৳${(group.total_investment / 1000).toFixed(1)}k` },
                                    { icon: <TrendingUp size={14} />, label: 'Returns', value: `+৳${(group.total_profit / 1000).toFixed(1)}k` },
                                    { icon: <Users size={14} />, label: 'Members', value: members.length },
                                    { icon: <Zap size={14} />, label: 'ROI', value: `${efficiency}%` },
                                ].map((s, i) => (
                                    <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-100 shadow-sm">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            {s.icon}
                                            <span className="text-[9px] font-black uppercase tracking-widest">{s.label}</span>
                                        </div>
                                        <p className="text-lg font-black text-slate-800">{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── LEFT COLUMN: Members + Admin ── */}
                    <div className="space-y-6">

                        {/* Admin info */}
                        {admin && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Crown size={14} className="text-emerald-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Group Admin</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center overflow-hidden">
                                        {admin.photo_url
                                            ? <img src={`${BASE}${admin.photo_url}`} alt="" className="w-full h-full object-cover" />
                                            : <span className="text-emerald-600 font-black">{admin.name?.charAt(0)}</span>
                                        }
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{admin.name}</p>
                                        <p className="text-xs text-slate-400">{admin.email}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Members list */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-blue-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Members ({members.length})
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                                {members.map(m => (
                                    <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {m.photo_url
                                                ? <img src={`${BASE}${m.photo_url}`} alt="" className="w-full h-full object-cover" />
                                                : <span className="text-slate-400 font-black text-sm">{m.name?.charAt(0)}</span>
                                            }
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-800 truncate">{m.name}</p>
                                            <p className="text-[10px] text-slate-400">{m.email}</p>
                                        </div>
                                    </div>
                                ))}
                                {members.length === 0 && (
                                    <p className="text-sm text-slate-400 text-center py-6">No members yet</p>
                                )}
                            </div>
                        </motion.div>

                        {/* Join Request Button */}
                        {user?.role === 'investor' && !isAdmin && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                {viewerStatus === 'member' ? (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                                        <CheckCircle size={18} className="text-emerald-500" />
                                        <span className="text-sm font-bold text-emerald-700">You are a member</span>
                                    </div>
                                ) : viewerStatus === 'pending' ? (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center gap-3">
                                        <Clock size={18} className="text-yellow-500" />
                                        <span className="text-sm font-bold text-yellow-700">Request pending</span>
                                    </div>
                                ) : viewerStatus === 'other_group' ? (
                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                                        <p className="text-sm text-slate-500">You're in another group. Leave it first to join this one.</p>
                                    </div>
                                ) : (
                                    <button onClick={handleJoin} disabled={joining}
                                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-60">
                                        {joining
                                            ? <Loader2 size={16} className="animate-spin" />
                                            : <><UserPlus size={16} /> Request to Join</>
                                        }
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* ── RIGHT COLUMN: Posts + Admin Requests ── */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Admin: Pending Join Requests */}
                        {isAdmin && pendingRequests.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <UserPlus size={14} className="text-orange-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Pending Join Requests ({pendingRequests.length})
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {pendingRequests.map(req => (
                                        <div key={req.request_id}
                                            className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {req.photo_url
                                                    ? <img src={`${BASE}${req.photo_url}`} alt="" className="w-full h-full object-cover" />
                                                    : <span className="text-slate-400 font-black">{req.name?.charAt(0)}</span>
                                                }
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-800">{req.name}</p>
                                                <p className="text-xs text-slate-400">{req.email}</p>
                                                <div className="flex gap-3 mt-1">
                                                    <span className="text-[10px] text-slate-400">
                                                        Invested: ৳{Number(req.total_investment || 0).toLocaleString()}
                                                    </span>
                                                    <span className="text-[10px] text-emerald-500">
                                                        Returns: ৳{Number(req.total_profit || 0).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                <button onClick={() => handleAccept(req.request_id)}
                                                    disabled={processingId === req.request_id}
                                                    className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all disabled:opacity-50">
                                                    <CheckCircle size={16} />
                                                </button>
                                                <button onClick={() => handleReject(req.request_id)}
                                                    disabled={processingId === req.request_id}
                                                    className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all disabled:opacity-50">
                                                    <XCircle size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Create Post (only for members) */}
                        {(viewerStatus === 'member' || isAdmin) && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                                <CreatePost groupId={groupId} onPostCreated={fetchGroup} />
                            </motion.div>
                        )}

                        {/* Group Posts */}
                        <div className="space-y-8">
                            {posts.length > 0 ? posts.map((post, i) => {
                                const isInvestment = (() => {
                                    try {
                                        const d = JSON.parse(post.caption);
                                        return d?.type === 'group_investment';
                                    } catch { return false; }
                                })();
                                return (
                                    <motion.div key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.05 }}>
                                        {isInvestment
                                            ? <GroupInvestmentPost post={post} />
                                            : <PostCard post={post} />
                                        }
                                    </motion.div>
                                );
                            }) : (
                                <div className="text-center py-16 bg-white rounded-[2rem] border border-slate-100">
                                    <Lock size={32} className="mx-auto text-slate-200 mb-3" />
                                    <p className="text-slate-400 font-bold">No group posts yet</p>
                                    {(viewerStatus === 'member' || isAdmin) && (
                                        <p className="text-sm text-slate-300 mt-1">Be the first to post!</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
