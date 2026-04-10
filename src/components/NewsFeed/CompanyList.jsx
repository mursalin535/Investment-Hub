import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, Building2, TrendingUp, ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CompanyList = () => {
  const companies = useSelector(state => state.companies.companies);
  const [search, setSearch] = useState('');

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(search.toLowerCase()) || 
    company.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] pt-20 pb-32 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-blue-600"></div>
                <span className="text-blue-700 font-black uppercase tracking-[0.4em] text-[10px]">Institutional Giants</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Institutional <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 italic font-serif">Partners</span>
            </h1>
            <p className="mt-8 text-slate-500 text-xl font-light leading-relaxed max-w-xl">Backed by excellence. Invest in industry leaders with proven track records and global footprints.</p>
          </div>
          
          <div className="relative w-full md:w-[450px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
            <input 
              type="text" 
              placeholder="Search companies & sectors..." 
              className="w-full bg-white border border-slate-200 rounded-[2rem] py-6 pl-16 pr-8 text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-500 shadow-xl shadow-slate-200/50 transition-all text-lg font-light"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCompanies.map((company, idx) => (
            <motion.div 
              key={company.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-[3rem] p-12 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="relative">
                    <img src={company.logo} alt={company.name} className="w-24 h-24 rounded-[2rem] object-cover border-4 border-slate-50 shadow-lg grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 p-2 rounded-xl text-white shadow-lg group-hover:bg-green-500 transition-colors">
                        <BarChart3 size={20} />
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1">Annual Rev.</p>
                    <p className="text-emerald-500 font-black text-2xl tracking-tighter">{company.revenue}</p>
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">{company.name}</h3>
                <div className="flex items-center gap-2 text-slate-400">
                  <Building2 size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">{company.industry}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                <div className="flex flex-col">
                  <p className="text-[10px] text-slate-300 uppercase font-black tracking-widest mb-1">Status</p>
                  <p className="text-blue-500 font-bold flex items-center gap-1.5 text-sm">
                    <TrendingUp size={16} />
                    Active Portfolio
                  </p>
                </div>
                <Link to={`/news/companies/${company.id}`} className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:rotate-45 transition-all duration-500 shadow-lg">
                  <ArrowRight size={24} />
                </Link>
              </div>

              {/* Decorative Background */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl -z-10 group-hover:bg-blue-100 transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
