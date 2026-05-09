import React from 'react'
import { motion } from 'framer-motion'
import { Users, ChevronRight } from 'lucide-react'

const JoinedGroups = ({ joinedGroups, handleGroupClick }) => {
    return (
        <section>
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-emerald-500" />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">My Groups</h2>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:underline">View All Groups</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {joinedGroups.map(group => (
                    <motion.div 
                        key={group.id}
                        whileHover={{ y: -10 }}
                        onClick={() => handleGroupClick(group.name)}
                        className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all group cursor-pointer"
                    >
                        <div className="h-40 w-full overflow-hidden relative">
                            <img 
                                src={group.image} 
                                alt={group.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                {group.returns}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-black text-slate-800 heading mb-1 group-hover:text-emerald-600 transition-colors">{group.name}</h3>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                    <Users size={14} /> {group.members} members
                                </div>
                                <span className="text-emerald-500"><ChevronRight size={18} /></span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default JoinedGroups
