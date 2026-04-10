import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Users, Building2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { name: 'Feed',       path: '/news',            icon: Layout,    end: true },
  { name: 'Groups',     path: '/news/groups',     icon: Users },
  { name: 'Companies',  path: '/news/companies',  icon: Building2 },
  { name: 'Highlights', path: '/news/highlights', icon: Zap },
]

const NewsNav = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white border-b border-slate-100 sticky top-[15vh] z-40 shadow-sm backdrop-blur-md bg-white/80"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center md:justify-start gap-1 md:gap-8 h-16">
          {links.map((link, i) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <NavLink
                to={link.path}
                end={link.end}
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 h-16 border-b-2 transition-all text-[10px] font-black uppercase tracking-[0.2em]
                  ${isActive
                    ? 'border-emerald-500 text-emerald-600 bg-emerald-50/30'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'}
                `}
              >
                <link.icon size={16} />
                <span className="hidden sm:inline">{link.name}</span>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsNav;