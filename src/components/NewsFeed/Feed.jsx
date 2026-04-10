import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, setActiveFilter, selectActiveFilter } from '../../redux/slices/postSlice';
import PostCard from './PostCard';
import { Search, Filter, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Feed = () => {
  const dispatch = useDispatch()
  const allPosts = useSelector(selectAllPosts);
  const activeFilter = useSelector(selectActiveFilter)
  const [search, setSearch] = useState('');

  const filteredPosts = allPosts.filter(post => {
    const matchesFilter = activeFilter === 'all' || post.origin === activeFilter || post.type === activeFilter;
    const matchesSearch = post.content.toLowerCase().includes(search.toLowerCase()) ||
                          post.author.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters = ['all', 'group', 'company', 'individual', 'profit', 'question', 'complaint']

  return (
    <div className="flex flex-col gap-8">

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 sticky top-28 z-30 shadow-sm backdrop-blur-sm bg-white/95"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative flex-1 w-full"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input
              type="text"
              placeholder="Search investment insights..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#059669' }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 p-4 bg-slate-900 text-white rounded-2xl transition-colors shadow-lg"
          >
            <LayoutGrid size={22} />
          </motion.button>
        </div>

        <div className="flex items-center gap-2 w-full overflow-x-auto no-scrollbar py-1">
          {filters.map((f, i) => (
            <motion.button
              key={f}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setActiveFilter(f))}
              className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeFilter === f
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-md scale-105'
                  : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-200 hover:text-emerald-600'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Posts */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter + search}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-32 bg-white rounded-[3rem] border-2 border-slate-50 border-dashed"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-200" />
              </div>
              <h3 className="text-slate-400 font-bold text-xl">No insights found</h3>
              <p className="text-slate-300 text-sm mt-2 font-medium">Try adjusting your filters or search keywords.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Feed;