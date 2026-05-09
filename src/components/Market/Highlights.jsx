import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectApprovedInvestmentAds } from '../../redux/slices/investmentSlice'
import { selectAllUsers } from '../../redux/slices/userSlice'
import { TrendingUp, ArrowUpRight, ShieldCheck, Zap, Globe, Users, Award } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { slugify } from '../../lib/slugify'

export default function Highlights() {
  const navigate = useNavigate()
  const ads = useSelector(selectApprovedInvestmentAds).slice(0, 3)
  const allUsers = useSelector(selectAllUsers)

  if (ads.length < 3) return null;

  const handleUserClick = (name) => {
    const user = allUsers.find(u => u.name === name)
    if (user) navigate(`/profile/${user.id}`)
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 md:px-10 py-16 bg-white">
      <div className="max-w-7xl w-full">
        
        {/* Unique Header Section */}
        <div className="relative mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl -z-10" 
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
               <span className="w-12 h-[1px] bg-slate-200" />
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">Curated Opportunities</p>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 heading tracking-tighter">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Prime</span> Selection
            </h1>
          </div>
        </div>

        {/* Bento-Style Highlights Grid */}
        <div className="grid grid-cols-12 gap-6 h-auto lg:h-[700px]">
          
          {/* Main Feature - Left (Large) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="col-span-12 lg:col-span-8 relative rounded-[3rem] overflow-hidden group border border-slate-100 shadow-2xl shadow-slate-200/50"
          >
            <img src={ads[0].thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
            
            <div className="absolute inset-0 p-12 flex flex-col justify-end max-w-2xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="px-5 py-2 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30">
                  Featured Project
                </div>
                {/* Clickable Owner Details with Avatar */}
                {allUsers.find(u => u.name === ads[0].name) && (
                    <div 
                        onClick={() => handleUserClick(ads[0].name)}
                        className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 hover:bg-emerald-500 transition-all cursor-pointer group/owner"
                    >
                        <img 
                            src={allUsers.find(u => u.name === ads[0].name).avatar} 
                            className="w-8 h-8 rounded-lg object-cover border border-white/40" 
                            alt="" 
                        />
                        <div className="text-left">
                            <p className="text-[9px] font-black text-white/70 uppercase tracking-widest group-hover/owner:text-white transition-colors">Founder</p>
                            <p className="text-xs font-black text-white tracking-tight">{ads[0].name}</p>
                        </div>
                    </div>
                )}
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white heading mb-6 leading-[1.1]">
                {ads[0].businessName}
              </h2>
              <p className="text-slate-300 text-lg jost-light leading-relaxed mb-10 line-clamp-3">
                {ads[0].description}
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Requirement</p>
                  <p className="text-3xl font-black text-white heading">{ads[0].askingAmount}</p>
                </div>
                <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
                <Link 
                  to={`/newsfeed/companies/${slugify(ads[0].businessName)}`}
                  className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
                >
                  Explore Venture
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Side Features - Right (Stacked) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            
            {ads.slice(1, 3).map((ad, i) => {
              const owner = allUsers.find(u => u.name === ad.name)
              return (
                <motion.div
                    key={ad.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex-1 relative rounded-[2.5rem] overflow-hidden group border border-slate-100 shadow-xl shadow-slate-200/30"
                >
                    <img src={ad.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-500" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-white">
                        <Zap size={20} />
                        </div>
                        <div 
                            onClick={() => handleUserClick(ad.name)}
                            className="flex items-center gap-3 cursor-pointer group/owner"
                        >
                            <div className="text-right">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest group-hover/owner:text-white transition-colors">{ad.name}</p>
                                <p className="text-white font-black heading text-[10px]">Founder</p>
                            </div>
                            {owner && <img src={owner.avatar} className="w-10 h-10 rounded-xl object-cover border border-white/20" alt="" />}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-black text-white heading mb-4 group-hover:text-emerald-400 transition-colors">
                        {ad.businessName}
                        </h3>
                        <div className="flex items-center justify-between">
                        <p className="text-white/80 font-black text-lg heading">{ad.askingAmount}</p>
                        <Link 
                            to={`/newsfeed/companies/${slugify(ad.businessName)}`}
                            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-950 hover:bg-emerald-500 hover:text-white transition-all"
                        >
                            <ArrowUpRight size={20} />
                        </Link>
                        </div>
                    </div>
                    </div>
                </motion.div>
              )
            })}

            {/* Unique Stat Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="h-32 bg-slate-900 rounded-[2rem] p-6 flex items-center justify-between overflow-hidden relative"
            >
               <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Investors</p>
                    <p className="text-2xl font-black text-white heading">1,240+</p>
                  </div>
               </div>
               <TrendingUp className="text-emerald-500 opacity-20" size={48} />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}
