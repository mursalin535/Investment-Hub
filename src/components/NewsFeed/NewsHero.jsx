import React from 'react';
import { motion } from 'framer-motion';

const NewsHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full px-4 md:px-16 mb-8"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '3rem' }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[2px] bg-slate-900"
          />
          <span className="text-slate-900 font-black uppercase tracking-[0.4em] text-[10px]">Market Pulse</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter"
          >
            Investor <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 italic font-serif">Insights</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-slate-500 text-xl font-light max-w-2xl leading-relaxed"
        >
          The professional heart of the Investment Hub. Real-time updates from groups, institutional partners, and fellow capital allocators.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default NewsHero;