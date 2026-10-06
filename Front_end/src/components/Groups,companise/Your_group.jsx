import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../store/CookieSlice';
import { group_server_your_group } from '../../server/Group_server';
import { motion } from 'framer-motion';
import { Plus, Search, Users, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Your_group_admin from './Your_group_admin';
import Your_group_member from './Your_group_member';

export default function Your_group() {
    const user = useSelector(getUser);
    const [groups, setGroups]   = useState([]);
    const [type, setType]       = useState(null);
    const [loading, setLoading] = useState(true);

    const refetch = async () => {
        if (!user?.id) return;
        try {
            const data = await group_server_your_group(user.id);
            if (data?.success && data?.data?.length > 0) {
                const arr = Array.isArray(data.data) ? data.data : [data.data];
                setGroups(arr);
                setType(data.type || 'member');
            } else {
                setGroups([]);
                setType('none');
            }
        } catch {
            setGroups([]);
            setType('none');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { refetch(); }, [user?.id]);

    if (loading) return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] relative overflow-hidden">
            {/* Background ornamentation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-green-50/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-16 h-16 border-t-4 border-r-4 border-green-700 rounded-full mb-8 shadow-lg shadow-green-900/10"
                />
                
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                >
                    <p className="text-green-700 font-bold uppercase tracking-[0.4em] text-[10px] mb-2">
                        Authenticating
                    </p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Accessing Workspace...
                    </h3>
                </motion.div>
            </div>
        </div>
    );

    if (type === 'none' || groups.length === 0) return <NoGroupFallback />;

    if (type === 'admin')  return <Your_group_admin  groups={groups} onRefetch={refetch} />;
    if (type === 'member') return <Your_group_member groups={groups} />;

    return null;
}

function NoGroupFallback() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 overflow-hidden pb-20">

            {/* ── BACKGROUND ORNAMENTATION ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-green-50/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[100px]" />
            </div>

            {/* ── CONTENT ── */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-center max-w-2xl"
            >
                {/* Institutional Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-3 justify-center mb-10"
                >
                    <div className="w-12 h-[1px] bg-green-700/30"></div>
                    <span className="text-green-700 font-bold uppercase tracking-[0.4em] text-[10px]">
                        Investment Network
                    </span>
                    <div className="w-12 h-[1px] bg-green-700/30"></div>
                </motion.div>

                {/* Main Icon Box */}
                <div className="mx-auto w-32 h-32 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-50 flex items-center justify-center mb-10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Users size={48} className="text-green-700 relative z-10 transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Heading */}
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    No <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 italic pr-2">Active</span> <br />
                    Groups Found
                </h2>

                {/* Subtext */}
                <p className="mt-4 text-slate-500 text-lg md:text-xl leading-relaxed font-light max-w-lg mx-auto">
                    You are not part of any investment group right now.
                    Create your own group or join an existing one to start tracking
                    investments and profits in real time.
                </p>

                {/* Stats hint / Perks */}
                <div className="mt-12 grid grid-cols-2 gap-6 text-left">
                    <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[2rem] p-6 shadow-xl shadow-slate-200/30 group hover:border-green-200 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-700 group-hover:text-white transition-all">
                            <TrendingUp size={20} />
                        </div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Track</p>
                        <p className="font-bold text-slate-800 text-lg mt-1 tracking-tight">Investments</p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[2rem] p-6 shadow-xl shadow-slate-200/30 group hover:border-emerald-200 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <Zap size={20} />
                        </div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Monitor</p>
                        <p className="font-bold text-slate-800 text-lg mt-1 tracking-tight">Profit Growth</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/create-group')}
                        className="flex items-center gap-3 px-10 py-5 bg-green-700 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-green-800 transition-all shadow-xl shadow-green-900/10"
                    >
                        <Plus size={20} />
                        <span>Create Group</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/groups')}
                        className="flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-slate-900/10"
                    >
                        <Search size={20} />
                        <span>Browse Groups</span>
                    </motion.button>
                </div>

            </motion.div>
        </div>
    );
}