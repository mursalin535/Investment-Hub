import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectApprovedInvestmentAds } from '../../redux/slices/investmentSlice'
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  Building2, 
  Calendar,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react'

export default function InvestmentAdsList() {
  const ads = useSelector(selectApprovedInvestmentAds)

  return (
    <section className="w-full py-20 bg-slate-50 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-[2px] w-12 bg-emerald-500 rounded-full" />
              <p className='text-xs md:text-sm uppercase tracking-[0.4em] text-emerald-600 font-bold jost-light'>
                Active Opportunities
              </p>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 heading">
              Live Investment <br /> <span className="text-emerald-500">Advertisements</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-md jost-light text-lg">
            Explore verified business listings seeking growth capital. Each campaign is vetted for financial transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad, index) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col h-full"
            >
              {/* Thumbnail Area */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={ad.thumbnail} 
                  alt={ad.businessName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Verified</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Building2 size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{ad.businessName}</span>
                  </div>
                  <h3 className="text-xl font-black text-white heading truncate">{ad.name}</h3>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Asking Amount</p>
                    <p className="text-xl font-black text-emerald-600 heading">{ad.askingAmount}</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
                    <DollarSign size={20} />
                  </div>
                </div>

                <p className="text-slate-600 jost-light text-sm leading-relaxed mb-8 line-clamp-3">
                  {ad.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Last Year Rev</p>
                    <p className="text-sm font-black text-slate-900 heading">{ad.lastYearRevenue}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Total Sales</p>
                    <p className="text-sm font-black text-slate-900 heading">{ad.totalSales}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-emerald-500" />
                    <span className="text-xs font-bold text-slate-400 jost-light">Growth Ready</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest group/btn"
                  >
                    Details
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
