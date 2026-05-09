import { useDispatch, useSelector } from 'react-redux'
import { toggleLikePost, toggleSavePost,
         selectLikedPosts, selectSavedPosts } from '../../redux/slices/postSlice'
import { selectAllUsers } from '../../redux/slices/userSlice'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    Heart, MessageCircle, Share2, Bookmark,
    MoreHorizontal, ChevronRight, TrendingUp,
    FileText, Users, DollarSign, Rocket,
    AlertTriangle, HelpCircle
} from 'lucide-react'

export const typeConfig = {
    profit:      { label: "Profit Update",   color: "bg-emerald-50 text-emerald-700 border-emerald-100",  icon: TrendingUp,    dot: "bg-emerald-500" },
    contract:    { label: "New Contract",     color: "bg-blue-50 text-blue-700 border-blue-100",           icon: FileText,      dot: "bg-blue-500" },
    recruitment: { label: "Join Group",       color: "bg-violet-50 text-violet-700 border-violet-100",     icon: Users,         dot: "bg-violet-500" },
    funding:     { label: "Seeking Funding",  color: "bg-amber-50 text-amber-700 border-amber-100",        icon: DollarSign,    dot: "bg-amber-500" },
    revenue:     { label: "Revenue Report",   color: "bg-teal-50 text-teal-700 border-teal-100",           icon: TrendingUp,    dot: "bg-teal-500" },
    launch:      { label: "Product Launch",   color: "bg-rose-50 text-rose-700 border-rose-100",           icon: Rocket,        dot: "bg-rose-500" },
    complaint:   { label: "Warning",          color: "bg-red-50 text-red-700 border-red-100",              icon: AlertTriangle, dot: "bg-red-500" },
    question:    { label: "Question",         color: "bg-slate-50 text-slate-700 border-slate-100",        icon: HelpCircle,    dot: "bg-slate-400" },
}

export default function PostCard({ post }) {
    const dispatch   = useDispatch()
    const navigate   = useNavigate()
    const likedPosts = useSelector(selectLikedPosts)
    const savedPosts = useSelector(selectSavedPosts)
    const allUsers   = useSelector(selectAllUsers)

    // Find the user ID by name (temporary logic as requested)
    const authorUser = allUsers.find(u => u.name === post.author)
    const userId = authorUser ? authorUser.id : 'u1'

    const isLiked = likedPosts.includes(post.id)
    const isSaved = savedPosts.includes(post.id)

    const handleUserClick = () => {
        navigate(`/profile/${userId}`)
    }

    const cfg  = typeConfig[post.type] || typeConfig.question
    const Icon = cfg.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
            className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-slate-200 transition-all duration-300"
        >
            {/* Header */}
            <div className="flex items-start justify-between p-5 pb-3">
                <div className="flex items-center gap-3">
                    <div className="relative cursor-pointer" onClick={handleUserClick}>
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.3 }}
                            src={post.avatar}
                            alt={post.author}
                            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                            onError={e => e.target.src = `https://ui-avatars.com/api/?name=${post.author}&background=10b981&color=fff`}
                        />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${cfg.dot} border-2 border-white`} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span 
                                className="font-black text-slate-800 text-sm heading cursor-pointer hover:text-emerald-500 transition-colors"
                                onClick={handleUserClick}
                            >
                                {post.author}
                            </span>
                            {post.groupName && (
                                <>
                                    <ChevronRight size={12} className="text-slate-300" />
                                    <span className="text-emerald-600 text-xs font-bold">{post.groupName}</span>
                                </>
                            )}
                            {post.companyName && (
                                <>
                                    <ChevronRight size={12} className="text-slate-300" />
                                    <span className="text-blue-600 text-xs font-bold">{post.companyName}</span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-slate-400 text-[11px]">{post.role}</span>
                            <span className="text-slate-200">·</span>
                            <span className="text-slate-400 text-[11px]">{post.time}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.3 }}
                        className={`hidden sm:flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${cfg.color}`}
                    >
                        <Icon size={10} />
                        {cfg.label}
                    </motion.span>
                    <button className="p-1 hover:bg-slate-50 rounded-lg transition-colors">
                        <MoreHorizontal size={16} className="text-slate-300" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="px-5 pb-3"
            >
                <p className="text-slate-600 text-sm leading-relaxed">{post.content}</p>
                {post.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-emerald-600 text-xs font-bold">#{tag}</span>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Image */}
            {post.image && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4 }}
                    className="mx-5 mb-4 rounded-xl overflow-hidden border border-slate-100 bg-slate-50"
                >
                    <img
                        src={post.image}
                        alt="post"
                        className="w-full h-auto max-h-96 object-contain"
                        onError={e => { e.target.style.display = 'none' }}
                    />
                </motion.div>
            )}

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="flex items-center justify-between px-5 py-3 border-t border-slate-50"
            >
                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => dispatch(toggleLikePost(post.id))}
                        className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                    >
                        <Heart size={16} className={isLiked ? 'fill-red-500' : ''} />
                        <span className="text-xs font-bold">
                            {isLiked ? post.likes + 1 : post.likes}
                        </span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-blue-500 transition-colors"
                    >
                        <MessageCircle size={16} />
                        <span className="text-xs font-bold">{post.comments}</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-500 transition-colors"
                    >
                        <Share2 size={16} />
                    </motion.button>
                </div>
                <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatch(toggleSavePost(post.id))}
                    className={`transition-colors ${isSaved ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'}`}
                >
                    <Bookmark size={16} className={isSaved ? 'fill-amber-400' : ''} />
                </motion.button>
            </motion.div>
        </motion.div>
    )
}