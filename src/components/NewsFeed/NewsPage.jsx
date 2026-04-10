import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame } from 'lucide-react'
import {
    selectFilteredNews,
    selectActiveCategory,
    setActiveCategory
} from '../../redux/slices/newsSlice'

const categories = ['All', 'Economy', 'Investment Trends', 'Agriculture', 'Technology', 'Policy', 'Real Estate']

export default function NewsPage() {
    const dispatch       = useDispatch()
    const filtered       = useSelector(selectFilteredNews)
    const activeCategory = useSelector(selectActiveCategory)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
        >
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
            >
                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                <span className="text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase">Investment News</span>
            </motion.div>

            {/* Category pills */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 overflow-x-auto pb-1"
            >
                {categories.map((c, i) => (
                    <motion.button
                        key={c}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => dispatch(setActiveCategory(c))}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                            activeCategory === c
                                ? 'bg-slate-800 text-white border-slate-800'
                                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                        }`}
                    >
                        {c}
                    </motion.button>
                ))}
            </motion.div>

            {/* Featured */}
            <AnimatePresence mode="wait">
                {filtered[0] && (
                    <motion.div
                        key={filtered[0].id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.45 }}
                        whileHover={{ scale: 1.01 }}
                        className="relative rounded-2xl overflow-hidden h-64 cursor-pointer group"
                    >
                        <img src={filtered[0].image} alt={filtered[0].title}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-slate-50"
                            onError={e => { e.target.style.background = '#d1fae5' }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.15, duration: 0.4 }}
                            className="absolute bottom-0 left-0 right-0 p-6"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                {filtered[0].trending && (
                                    <span className="flex items-center gap-1 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                                        <Flame size={8} /> Trending
                                    </span>
                                )}
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{filtered[0].category}</span>
                            </div>
                            <h3 className="text-white font-black text-xl heading leading-tight">{filtered[0].title}</h3>
                            <p className="text-white/60 text-xs mt-1">{filtered[0].source} · {filtered[0].time} · {filtered[0].readTime}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.slice(1).map((news, i) => (
                    <motion.div
                        key={news.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                        className="bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-200 transition-all duration-300 group"
                    >
                        <div className="h-40 relative overflow-hidden bg-slate-50">
                            <img src={news.image} alt={news.title}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                onError={e => { e.target.style.background = '#d1fae5' }} />
                            {news.trending && (
                                <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                                    <Flame size={8} /> Trending
                                </span>
                            )}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                            className="p-5 flex flex-col gap-2"
                        >
                            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">{news.category}</span>
                            <h4 className="font-black text-slate-800 text-sm heading leading-snug line-clamp-2">{news.title}</h4>
                            <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{news.summary}</p>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-1">
                                <span className="text-[10px] text-slate-400 font-bold">{news.source}</span>
                                <span className="text-[10px] text-slate-300">{news.readTime}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}