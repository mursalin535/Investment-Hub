import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CheckCircle, XCircle, Loader2, DollarSign, BarChart3, ShoppingCart, Calendar } from 'lucide-react';
import { OptInOut, GetParticipants } from '../../server/group_investment_server';
import { getUser } from '../../store/CookieSlice';

const BASE = 'http://localhost:5009';

const GroupInvestmentPost = ({ post }) => {
    const user = useSelector(getUser);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [myStatus, setMyStatus] = useState(null);

    let investmentData;
    try {
        investmentData = JSON.parse(post.caption);
    } catch {
        return null;
    }

    if (investmentData?.type !== 'group_investment') return null;

    const image = post.photo_url
        ? (String(post.photo_url).startsWith('http') ? post.photo_url : `${BASE}/uploads/${post.photo_url}`)
        : null;

    useEffect(() => {
        loadParticipants();
    }, [post.id]);

    const loadParticipants = async () => {
        try {
            setLoading(true);
            const data = await GetParticipants(investmentData.request_id);
            setParticipants(data);
            const mine = data.find(p => p.investor_id === user?.id);
            setMyStatus(mine?.status || null);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleOpt = async (status) => {
        try {
            setLoading(true);
            const data = await OptInOut(investmentData.request_id, status, user?.id);
            setParticipants(data);
            setMyStatus(status);
        } catch (e) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    const inCount = participants.filter(p => p.status === 'in').length;
    const outCount = participants.filter(p => p.status === 'out').length;

    return (
        <div className="bg-white rounded-[2rem] border-2 border-emerald-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <TrendingUp size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-black text-sm uppercase tracking-widest">Group Investment Opportunity</h3>
                        <p className="text-emerald-100 text-xs mt-0.5">{investmentData.company_name}</p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
                {image && (
                    <div className="rounded-2xl overflow-hidden border border-slate-100">
                        <img src={image} alt={investmentData.company_name} className="w-full h-48 object-cover" />
                    </div>
                )}

                <p className="text-slate-600 leading-relaxed">{investmentData.pitch}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-emerald-50 rounded-xl p-3 text-center">
                        <DollarSign size={14} className="mx-auto text-emerald-500 mb-1" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Amount</p>
                        <p className="font-black text-emerald-700 text-sm">৳{Number(investmentData.amount_needed).toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                        <TrendingUp size={14} className="mx-auto text-blue-500 mb-1" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Profit</p>
                        <p className="font-black text-blue-700 text-sm">{investmentData.profit_percentage || '?'}%</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3 text-center">
                        <Calendar size={14} className="mx-auto text-purple-500 mb-1" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Deadline</p>
                        <p className="font-black text-purple-700 text-sm">{investmentData.profit_deadline || '?'}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                        <BarChart3 size={14} className="mx-auto text-slate-400 mb-1" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Last Month</p>
                        <p className="font-black text-slate-700 text-sm">৳{Number(investmentData.last_month_sale).toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                        <Calendar size={14} className="mx-auto text-slate-400 mb-1" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Last Year</p>
                        <p className="font-black text-slate-700 text-sm">৳{Number(investmentData.last_year_sale).toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                        <ShoppingCart size={14} className="mx-auto text-slate-400 mb-1" />
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Total Sale</p>
                        <p className="font-black text-slate-700 text-sm">৳{Number(investmentData.total_sale).toLocaleString()}</p>
                    </div>
                </div>

                {/* Participants Summary */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span className="text-sm font-bold text-emerald-700">{inCount} In</span>
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <div className="flex items-center gap-2">
                        <XCircle size={14} className="text-red-400" />
                        <span className="text-sm font-bold text-red-500">{outCount} Out</span>
                    </div>
                    <div className="ml-auto">
                        <Users size={14} className="text-slate-400" />
                    </div>
                </div>

                {/* In/Out Buttons */}
                {user?.role === 'investor' && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleOpt('in')}
                            disabled={loading}
                            className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
                                myStatus === 'in'
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                        >
                            {loading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                            {myStatus === 'in' ? "You're In" : 'Join In'}
                        </button>
                        <button
                            onClick={() => handleOpt('out')}
                            disabled={loading}
                            className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
                                myStatus === 'out'
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                    : 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-200'
                            }`}
                        >
                            {loading ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                            {myStatus === 'out' ? "You're Out" : 'Opt Out'}
                        </button>
                    </div>
                )}

                {/* Members Who Joined */}
                {participants.filter(p => p.status === 'in').length > 0 && (
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Members In</p>
                        <div className="flex flex-wrap gap-2">
                            {participants.filter(p => p.status === 'in').map(p => (
                                <div key={p.investor_id}
                                    className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                                        {p.photo_url
                                            ? <img src={`${BASE}${p.photo_url}`} alt="" className="w-full h-full object-cover" />
                                            : <span className="text-[10px] font-black text-emerald-600">{p.name?.charAt(0)}</span>
                                        }
                                    </div>
                                    <span className="text-xs font-bold text-emerald-700">{p.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Members Who Opted Out */}
                {participants.filter(p => p.status === 'out').length > 0 && (
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Members Out</p>
                        <div className="flex flex-wrap gap-2">
                            {participants.filter(p => p.status === 'out').map(p => (
                                <div key={p.investor_id}
                                    className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-3 py-1.5 opacity-60">
                                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
                                        {p.photo_url
                                            ? <img src={`${BASE}${p.photo_url}`} alt="" className="w-full h-full object-cover" />
                                            : <span className="text-[10px] font-black text-red-600">{p.name?.charAt(0)}</span>
                                        }
                                    </div>
                                    <span className="text-xs font-bold text-red-600 line-through">{p.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupInvestmentPost;
