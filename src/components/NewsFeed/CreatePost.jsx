import React from 'react';
import { PlusCircle, Image as ImageIcon, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const CreatePost = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-10 shadow-sm relative overflow-hidden group max-w-4xl mx-auto w-full"
    >
      <div className="flex gap-6 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.15, duration: 0.4 }}
          whileHover={{ rotate: 6 }}
          className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200 transition-transform"
        >
          <span className="text-white font-black text-2xl tracking-tighter italic">U</span>
        </motion.div>
        <div className="flex-1">
          <textarea
            placeholder="What's happening in your investment circle?"
            className="w-full bg-transparent text-slate-800 border-none focus:ring-0 placeholder-slate-300 resize-none min-h-[100px] text-xl font-light leading-relaxed"
          ></textarea>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center justify-between pt-8 border-t border-slate-50 mt-4"
          >
            <div className="flex gap-6">
              <motion.button
                whileHover={{ scale: 1.05, color: '#059669' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 text-slate-400 transition-colors font-bold text-xs uppercase tracking-widest"
              >
                <div className="p-2 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <ImageIcon size={20} />
                </div>
                Media
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, color: '#2563eb' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 text-slate-400 transition-colors font-bold text-xs uppercase tracking-widest"
              >
                <div className="p-2 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors">
                  <PlusCircle size={20} />
                </div>
                Poll
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#059669' }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:shadow-xl hover:shadow-emerald-200 transition-all"
            >
              Broadcast
              <Send size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 blur-[80px] -z-0 opacity-50 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};

export default CreatePost;