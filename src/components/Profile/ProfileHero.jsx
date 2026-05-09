import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Globe, Camera, Award, ShieldCheck } from 'lucide-react'
import { useParams } from 'react-router-dom'

const ProfileHero = ({ user }) => {
    const { userId } = useParams()
    const isOwnProfile = !userId || userId === 'u1'
    const isOwner = user.role === 'entrepreneur'

    return (
        <div className="relative w-full bg-[#F9FAFB] pt-24 pb-16 px-6 md:px-12 border-b border-slate-100 overflow-hidden">
            {/* Background Floating Economy Icons */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                <motion.div 
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-10 left-[15%]"
                >
                    <TrendingUp size={120} />
                </motion.div>
                <motion.div 
                    animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity }}
                    className="absolute bottom-10 right-[20%]"
                >
                    <DollarSign size={100} />
                </motion.div>
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <Globe size={300} />
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ type: "spring", damping: 15 }}
                    className="relative mb-6"
                >
                    <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-white shadow-2xl overflow-hidden relative z-10 ${isOwner ? 'ring-4 ring-emerald-500/20' : ''}`}>
                        <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full object-cover"
                            onError={e => e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff`}
                        />
                    </div>
                    {isOwnProfile && (
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute bottom-1 right-1 z-20 p-2.5 bg-slate-900 text-white rounded-full border-4 border-[#F9FAFB] hover:bg-emerald-500 transition-colors"
                        >
                            <Camera size={16} />
                        </motion.button>
                    )}
                    {isOwner && (
                         <div className="absolute -top-2 -right-2 z-20 p-2 bg-emerald-500 text-white rounded-xl shadow-lg border-2 border-white">
                            <Award size={20} />
                         </div>
                    )}
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <h1 className="text-3xl md:text-5xl font-black text-slate-800 heading tracking-tight">{user.name}</h1>
                        {isOwner && <ShieldCheck className="text-emerald-500" size={28} />}
                    </div>
                    
                    <p className={`font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8 px-4 py-1.5 rounded-full inline-block ${isOwner ? 'bg-slate-900 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                        {isOwner ? 'Verified Entrepreneur' : 'Senior Investor'}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isOwner ? 'Ventures' : 'Portfolio'}</p>
                            <p className="text-xl md:text-2xl font-black text-slate-800 heading">{user.stats.investments || '0'}</p>
                        </div>
                        <div className="w-[1px] h-10 bg-slate-200 hidden sm:block" />
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isOwner ? 'Trust Score' : 'Returns'}</p>
                            <p className="text-xl md:text-2xl font-black text-emerald-500 heading">{isOwner ? '98%' : '+18.5%'}</p>
                        </div>
                        <div className="w-[1px] h-10 bg-slate-200 hidden sm:block" />
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Followers</p>
                            <p className="text-xl md:text-2xl font-black text-slate-800 heading">{user.stats.following || '0'}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ProfileHero
