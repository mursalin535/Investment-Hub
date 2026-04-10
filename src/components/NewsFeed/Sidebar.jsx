import React from 'react';
import { useSelector } from 'react-redux';
import { TrendingUp, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const news = useSelector(state => state.news.newsItems);
  const groups = useSelector(state => state.groups.groups);

  return (
    <div className="flex flex-col gap-8 sticky top-28">

      {/* Top News */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm"
      >
        <h3 className="text-slate-900 font-black text-2xl mb-8 flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <TrendingUp className="text-emerald-600" size={24} />
          </div>
          Top News
        </h3>
        <div className="flex flex-col gap-6">
          {news?.slice(0, 4).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              whileHover={{ x: 4 }}
              className="group cursor-pointer border-b border-slate-50 last:border-0 pb-4 last:pb-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{item.category}</p>
              </div>
              <h4 className="text-slate-800 font-bold text-lg group-hover:text-emerald-700 transition-colors leading-tight">
                {item.title}
              </h4>
              <p className="text-slate-400 text-[10px] mt-2 font-medium">{item.time}</p>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#f0fdf4', color: '#047857' }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 text-xs font-black uppercase tracking-widest transition-all"
        >
          View All Highlights
        </motion.button>
      </motion.div>

      {/* Suggested Groups */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm"
      >
        <h3 className="text-slate-900 font-black text-2xl mb-8 flex items-center gap-3">
          <div className="p-2 bg-amber-50 rounded-xl">
            <Award className="text-amber-600" size={24} />
          </div>
          Suggested Groups
        </h3>
        <div className="flex flex-col gap-6">
          {groups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <img src={group.avatar || group.logo} alt={group.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-100" />
              <div className="flex-1 min-w-0">
                <h4 className="text-slate-800 font-bold text-sm truncate group-hover:text-emerald-600 transition-colors">{group.name}</h4>
                <p className="text-slate-400 text-[10px] font-medium">{group.members?.toLocaleString()} Members</p>
              </div>
              <motion.div
                whileHover={{ backgroundColor: '#10b981', color: '#fff', scale: 1.1 }}
                className="p-2 bg-slate-50 rounded-xl transition-all text-slate-400"
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;