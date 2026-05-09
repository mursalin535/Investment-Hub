import { useSelector, useDispatch } from 'react-redux'
import { TrendingUp, Users, Search, Filter, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    selectFilteredPosts,
    setActiveFilter,
    selectActiveFilter,
    selectSearchQuery,
} from '../../redux/slices/postSlice'
import { selectTrendingNews } from '../../redux/slices/newsSlice'
import { selectAllGroups } from '../../redux/slices/groupSlice'
import PostCard from './PostCard'

const filters = ['all', 'profit', 'funding', 'contract', 'recruitment', 'question', 'complaint']

export default function FeedTab() {
    const dispatch      = useDispatch()
    const navigate      = useNavigate()
    const filteredPosts = useSelector(selectFilteredPosts)
    const activeFilter  = useSelector(selectActiveFilter)
    const searchQuery   = useSelector(selectSearchQuery)
    const trendingNews  = useSelector(selectTrendingNews).slice(0, 3)
    const groups        = useSelector(selectAllGroups)

    return (
        <div className="flex flex-col lg:flex-row gap-6">

            {/* ── Posts column ───────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col gap-4"
            >
                {/* Filter pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <Filter size={14} className="text-slate-300 shrink-0" />
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => dispatch(setActiveFilter(f))}
                            className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                                activeFilter === f
                                    ? 'bg-slate-800 text-white border-slate-800'
                                    : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter + searchQuery}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-4"
                    >
                        {filteredPosts.length > 0
                            ? filteredPosts.map(post => <PostCard key={post.id} post={post} />)
                            : (
                                <div className="text-center py-20 text-slate-300">
                                    <Search size={40} className="mx-auto mb-3" />
                                    <p className="font-bold">No posts found</p>
                                </div>
                            )
                        }
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* ── Sidebar ────────────────────────────────────────────────── */}
            <div className="w-full lg:w-80 flex flex-col gap-5 shrink-0">

                {/* Trending news */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white border border-slate-100 rounded-2xl p-5"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Flame size={16} className="text-orange-500" />
                        <span className="font-black text-slate-700 text-sm">Trending News</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {trendingNews.map(news => (
                            <div
                                key={news.id}
                                onClick={() => navigate('/newsfeed/news')}
                                className="flex gap-3 cursor-pointer group"
                            >
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-16 h-12 object-cover rounded-xl shrink-0"
                                    onError={e => { e.target.style.display = 'none' }}
                                />
                                <div>
                                    <p className="text-xs font-bold text-slate-700 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">{news.title}</p>
                                    <p className="text-[10px] text-slate-400 mt-1">{news.source} · {news.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate('/newsfeed/news')}
                        className="w-full mt-4 text-center text-emerald-600 text-xs font-black uppercase tracking-widest hover:underline"
                    >
                        View All News →
                    </button>
                </motion.div>

                {/* Active groups */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white border border-slate-100 rounded-2xl p-5"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Users size={16} className="text-emerald-500" />
                        <span className="font-black text-slate-700 text-sm">Active Groups</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        {groups.map(g => (
                            <div
                                key={g.id}
                                onClick={() => navigate('/newsfeed/groups')}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <img
                                    src={g.avatar}
                                    alt={g.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                    onError={e => e.target.src = `https://ui-avatars.com/api/?name=${g.name}&background=10b981&color=fff`}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-slate-700 truncate group-hover:text-emerald-600 transition-colors">{g.name}</p>
                                    <p className="text-[10px] text-slate-400">{g.members} members</p>
                                </div>
                                <span className="text-emerald-500 text-xs font-black shrink-0">{g.returns}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate('/newsfeed/groups')}
                        className="w-full mt-4 text-center text-emerald-600 text-xs font-black uppercase tracking-widest hover:underline"
                    >
                        View All Groups →
                    </button>
                </motion.div>

            </div>
        </div>
    )
}