import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectApprovedInvestmentAds } from '../../redux/slices/investmentSlice'
import { selectAllUsers } from '../../redux/slices/userSlice'
import { 
  DollarSign, 
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Award,
  ShieldCheck,
  User,
  Briefcase,
  Zap,
  ChevronRight,
  BarChart3
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { slugify } from '../../lib/slugify'
import { useState } from 'react'

export default function MainAdds() {
  const navigate = useNavigate()
  const allAds = useSelector(selectApprovedInvestmentAds)
  const allUsers = useSelector(selectAllUsers)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAds = allAds.filter(ad => 
    ad.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUserClick = (name) => {
    const user = allUsers.find(u => u.name === name)
    if (user) navigate(`/profile/${user.id}`)
  }

  return (
    <section className="w-full py-32 px-4 md:px-10 bg-[#f8fafc] relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        
        {/* Sleek Minimal Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 heading tracking-tight">
              Active <span className="text-emerald-500">Ventures</span>
            </h2>
            <p className="text-slate-500 text-lg jost-light max-w-xl">Verified business listings seeking growth capital through our secure platform.</p>
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-4 bg-white p-3 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Search catalog..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="h-14 px-8 bg-slate-900 text-white rounded-full flex items-center gap-2 hover:bg-emerald-500 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg">
              <Filter size={16} />
              Refine
            </button>
          </div>
        </div>

        {/* Premium List System */}
        <div className="flex flex-col gap-8">
          {filteredAds.map((ad, index) => {
            const owner = allUsers.find(u => u.name === ad.name)
            
            return (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Minimalist Professional Card */}
                <div className="bg-white rounded-[2.5rem] p-4 lg:p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-emerald-500/30 transition-all duration-500 flex flex-col lg:flex-row gap-8 lg:items-center relative z-10">
                  
                  {/* Leading Image & Status */}
                  <div className="relative w-full lg:w-72 h-56 lg:h-56 rounded-[2rem] overflow-hidden flex-shrink-0">
                    <img 
                      src={ad.thumbnail} 
                      alt={ad.businessName} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 left-4">
                       <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[9px] font-black text-slate-900 uppercase">Live</span>
                       </div>
                    </div>
                  </div>

                  {/* Core Content */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                       <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter">REF-{ad.id.toString().padStart(4, '0')}</span>
                       <span className="w-1 h-1 rounded-full bg-slate-200" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ad.lastYearRevenue} Rev</span>
                    </div>

                    <h3 className="text-3xl font-black text-slate-900 heading tracking-tight mb-4 group-hover:text-emerald-500 transition-colors">
                      {ad.businessName}
                    </h3>
                    
                    <p className="text-slate-500 jost-light text-sm leading-relaxed mb-6 line-clamp-2 max-w-2xl">
                      {ad.description}
                    </p>

                    {/* Compact Founder Detail */}
                    {owner && (
                      <div className="flex items-center gap-4 py-4 border-t border-slate-50">
                        <div 
                          onClick={() => handleUserClick(owner.name)}
                          className="w-10 h-10 rounded-xl overflow-hidden cursor-pointer border-2 border-slate-50 hover:border-emerald-500 transition-colors shrink-0"
                        >
                          <img src={owner.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                           <p 
                            onClick={() => handleUserClick(owner.name)}
                            className="text-xs font-black text-slate-800 hover:text-emerald-500 cursor-pointer transition-colors"
                           >
                            {owner.name}
                           </p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{owner.location} · Founder</p>
                        </div>
                        <div className="ml-auto hidden sm:flex items-center gap-6">
                            <div className="text-right">
                               <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Yield</p>
                               <p className="text-xs font-black text-emerald-500">+24.5%</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Investors</p>
                               <p className="text-xs font-black text-slate-800">12 Active</p>
                            </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Financial Metrics & Actions */}
                  <div className="lg:w-72 flex flex-col gap-4 lg:pl-10 lg:border-l border-slate-100 shrink-0">
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col justify-center items-center text-center">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Capital</p>
                       <p className="text-2xl font-black text-slate-900 heading tracking-tighter mb-4">{ad.askingAmount}</p>
                       <div className="flex w-full gap-2">
                          <div className="flex-1 py-2 bg-emerald-50 rounded-xl text-emerald-600 flex flex-col items-center">
                             <span className="text-[8px] font-black uppercase">Growth</span>
                             <span className="text-[10px] font-black">High</span>
                          </div>
                          <div className="flex-1 py-2 bg-blue-50 rounded-xl text-blue-600 flex flex-col items-center">
                             <span className="text-[8px] font-black uppercase">Risk</span>
                             <span className="text-[10px] font-black">Medium</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link 
                        to={`/details/${ad.id}`}
                        className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest text-center hover:bg-emerald-600 transition-all shadow-lg"
                      >
                        More Details
                      </Link>
                      <Link 
                        to={`/newsfeed/companies/${slugify(ad.businessName)}`}
                        className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all"
                      >
                        <Briefcase size={20} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Modern subtle accent */}
                <div className="absolute top-1/2 -right-4 w-8 h-32 bg-emerald-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
        </div>

        {/* Minimalist Footer */}
        <div className="mt-24 flex flex-col items-center">
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.5em] mb-8">End of marketplace listings</p>
           <button className="px-12 py-5 border-2 border-slate-900 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200/50">
              Load More Results
           </button>
        </div>
      </div>
    </section>
  )
}
