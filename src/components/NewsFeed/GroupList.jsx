import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsNav from './NewsNav';
import { motion } from 'framer-motion';
import { slugify } from '../../lib/slugify';

const GroupList = ({ viewMode = 'full' }) => {
  const groups = useSelector(state => state.groups.groups);
  const [search, setSearch] = useState('');

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(search.toLowerCase()) || 
    group.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    {viewMode === 'full' && <NewsNav />}
    <div className="w-full min-h-screen bg-[#F9FAFB] pt-20 pb-32 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        {viewMode === 'full' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-emerald-600"></div>
                <span className="text-emerald-700 font-black uppercase tracking-[0.4em] text-[10px]">Collective Growth</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Investment <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-500 italic font-serif">Groups</span>
            </h1>
            <p className="mt-8 text-slate-500 text-xl font-light leading-relaxed max-w-xl">Join elite circles, collaborate on high-stakes ventures, and leverage the power of shared capital.</p>
          </div>
          
          <div className="relative w-full md:w-[450px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
            <input 
              type="text" 
              placeholder="Search professional circles..." 
              className="w-full bg-white border border-slate-200 rounded-[2rem] py-6 pl-16 pr-8 text-slate-800 placeholder-slate-300 focus:outline-none focus:border-emerald-500 shadow-xl shadow-slate-200/50 transition-all text-lg font-light"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredGroups.map((group, idx) => (
            <motion.div 
              key={group.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-[3rem] p-10 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="relative">
                    <img src={group.logo} alt={group.name} className="w-24 h-24 rounded-[2rem] object-cover border-4 border-slate-50 shadow-lg group-hover:rotate-3 transition-transform duration-500" />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-xl text-white shadow-lg">
                        <Users size={20} />
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1">Members</p>
                    <p className="text-slate-900 font-black text-2xl tracking-tighter">{group.members.toLocaleString()}</p>
                </div>
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors tracking-tight">{group.name}</h3>
              <p className="text-slate-500 text-lg line-clamp-2 mb-10 leading-relaxed font-light">
                {group.description}
              </p>
              
              <Link to={`/groups/${slugify(group.name)}`} className="flex items-center justify-center gap-3 w-full py-5 bg-slate-50 hover:bg-slate-900 text-slate-400 hover:text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all duration-300 shadow-sm border border-slate-100">
                Enter Group Room
                <ArrowUpRight size={18} />
              </Link>

              {/* Decorative Circle */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-50/50 rounded-full -z-0 blur-3xl group-hover:bg-emerald-100 transition-colors duration-700"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default GroupList;
