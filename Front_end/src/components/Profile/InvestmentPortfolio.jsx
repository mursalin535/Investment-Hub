import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const InvestmentPortfolio = ({ investments, handleCompanyClick }) => {
    return (
        <section>
            <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-[2px] bg-emerald-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Investment Portfolio</h2>
            </div>

            <div className="space-y-4">
                {investments.map(inv => (
                    <motion.div 
                        key={inv.id}
                        whileHover={{ x: 10 }}
                        onClick={() => handleCompanyClick(inv.company)}
                        className="bg-slate-50 border border-slate-100 rounded-[2rem] p-4 flex flex-col md:flex-row md:items-center gap-6 group hover:bg-white hover:border-emerald-200 hover:shadow-xl transition-all cursor-pointer"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl overflow-hidden shadow-sm shrink-0 border border-slate-100">
                            <img src={inv.image} alt={inv.company} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h4 className="text-xl font-black text-slate-800 heading group-hover:text-emerald-600 transition-colors">{inv.company}</h4>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    inv.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                    {inv.status}
                                </span>
                            </div>
                            <p className="text-slate-400 text-xs font-bold">Investment date: {inv.date}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 md:gap-16 pr-8">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                                <p className="text-lg font-black text-slate-800 heading">{inv.amount}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Yield</p>
                                <p className="text-lg font-black text-emerald-500 heading">{inv.yield}</p>
                            </div>
                        </div>

                        <button className="p-4 text-slate-300 group-hover:text-emerald-500 transition-colors">
                            <ExternalLink size={20} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default InvestmentPortfolio
