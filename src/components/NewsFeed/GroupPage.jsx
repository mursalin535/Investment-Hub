import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Users } from 'lucide-react'
import {
    selectAllGroups,
    selectSelectedGroup,
    selectGroup,
    clearSelectedGroup
} from '../../redux/slices/groupSlice'
import PostCard from './PostCard'

function GroupDetail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { groupId } = useParams()
    const allGroups = useSelector(selectAllGroups)
    const group = useSelector(selectSelectedGroup)

    // When component mounts or groupId changes, select the group
    useEffect(() => {
        if (groupId) {
            dispatch(selectGroup(parseInt(groupId)))
        }
    }, [groupId, dispatch])

    if (!group) return (
        <div className="text-center py-20">
            <p className="text-slate-400">Group not found</p>
        </div>
    )

    const handleBack = () => {
        dispatch(clearSelectedGroup())
        navigate(-1) // Go back to previous page
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
        >
            <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 text-xs font-black uppercase tracking-widest transition-colors w-fit"
            >
                ← Back
            </motion.button>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100"
            >
                <div className="h-48 relative">
                    <img src={group.cover} alt={group.name} className="w-full h-full object-cover"
                        onError={e => { e.target.style.background = '#d1fae5' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="absolute bottom-5 left-5 flex items-center gap-4"
                    >
                        <img src={group.avatar} alt={group.name}
                            className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-xl"
                            onError={e => e.target.src = `https://ui-avatars.com/api/?name=${group.name}&background=10b981&color=fff`}
                        />
                        <div>
                            <h2 className="text-white font-black text-2xl heading">{group.name}</h2>
                            <span className="text-white/70 text-xs">{group.category} · {group.members} members</span>
                        </div>
                    </motion.div>
                </div>

                <div className="p-6 grid grid-cols-3 gap-4 border-b border-slate-50">
                    {[
                        { label: 'Total Invested', value: group.totalInvested },
                        { label: 'Returns',         value: group.returns },
                        { label: 'Members',         value: group.members },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                            className="text-center"
                        >
                            <p className="text-xl font-black text-emerald-600 heading">{s.value}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="p-6">
                    <p className="text-slate-500 text-sm leading-relaxed">{group.description}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
            >
                <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
                <span className="text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase">Group Posts</span>
            </motion.div>

            <div className="flex flex-col gap-4">
                {group.posts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                        <PostCard post={post} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default function GroupPage() {
    const dispatch      = useDispatch()
    const groups        = useSelector(selectAllGroups)
    const selectedGroup = useSelector(selectSelectedGroup)

    return (
        <AnimatePresence mode="wait">
            {selectedGroup ? (
                <GroupDetail key="detail" />
            ) : (
                <motion.div
                    key="list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
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
                        <span className="text-emerald-600 text-[10px] font-black tracking-[0.4em] uppercase">Investment Groups</span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {groups.map((g, i) => (
                            <motion.div
                                key={g.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(16,185,129,0.12)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => dispatch(selectGroup(g.id))}
                                className="bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-200 transition-all duration-300 group"
                            >
                                <div className="h-32 relative overflow-hidden">
                                    <img src={g.cover} alt={g.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={e => { e.target.style.background = '#d1fae5' }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                    <span className="absolute bottom-3 left-3 text-white text-[10px] font-black uppercase tracking-widest bg-emerald-500/80 px-2 py-0.5 rounded-full">
                                        {g.category}
                                    </span>
                                </div>
                                <div className="p-5 flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <img src={g.avatar} alt={g.name}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm -mt-8 relative z-10"
                                            onError={e => e.target.src = `https://ui-avatars.com/api/?name=${g.name}&background=10b981&color=fff`} />
                                        <h3 className="font-black text-slate-800 heading">{g.name}</h3>
                                    </div>
                                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{g.description}</p>
                                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <Users size={12} />
                                            <span className="text-xs font-bold">{g.members} members</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-600">
                                            <TrendingUp size={12} />
                                            <span className="text-xs font-black">{g.returns}</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">{g.totalInvested}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}