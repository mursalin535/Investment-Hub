import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { selectAllCompanies } from '../../redux/slices/companySlice'
import { slugify } from '../../lib/slugify'
import PostCard from './PostCard'

// ─── Individual company detail page ──────────────────────────────────────────
function CompanyDetail() {
    const navigate      = useNavigate()
    const { companyName } = useParams()
    const allCompanies  = useSelector(selectAllCompanies)

    // Derive company directly from URL — no Redux selection needed
    const company = allCompanies.find(c => slugify(c.name) === companyName)

    if (!company) return (
        <div className="text-center py-20">
            <p className="text-slate-400">Company not found</p>
            <button
                onClick={() => navigate('/newsfeed/companies')}
                className="mt-4 text-blue-600 text-xs font-black uppercase tracking-widest hover:underline"
            >
                ← Back to Companies
            </button>
        </div>
    )

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
                onClick={() => navigate('/newsfeed/companies')}
                className="flex items-center gap-2 text-slate-400 hover:text-blue-600 text-xs font-black uppercase tracking-widest transition-colors w-fit"
            >
                ← Back to Companies
            </motion.button>

            {/* Header card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100"
            >
                <div className="h-48 relative">
                    <img
                        src={company.cover}
                        alt={company.name}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.style.background = '#dbeafe' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="absolute bottom-5 left-5 flex items-center gap-4"
                    >
                        <img
                            src={company.avatar}
                            alt={company.name}
                            className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-xl"
                            onError={e => e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=3b82f6&color=fff`}
                        />
                        <div>
                            <h2 className="text-white font-black text-2xl">{company.name}</h2>
                            <span className="text-white/70 text-xs">{company.category} · Founded {company.founded}</span>
                        </div>
                    </motion.div>
                </div>

                <div className="p-6 grid grid-cols-3 gap-4 border-b border-slate-50">
                    {[
                        { label: 'Revenue',   value: company.revenue },
                        { label: 'Investors', value: company.investors },
                        { label: 'Founded',   value: company.founded },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                            className="text-center"
                        >
                            <p className="text-xl font-black text-blue-600">{s.value}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="p-6">
                    <p className="text-slate-500 text-sm leading-relaxed">{company.description}</p>
                </div>
            </motion.div>

            <div className="flex items-center gap-3">
                <div className="w-6 h-[1.5px] bg-blue-500 rounded-full" />
                <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase">Company Posts</span>
            </div>

            <div className="flex flex-col gap-4">
                {company.posts.map((post, i) => (
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

// ─── Company list page ────────────────────────────────────────────────────────
function CompanyList() {
    const navigate   = useNavigate()
    const companies  = useSelector(selectAllCompanies)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-6"
        >
            <div className="flex items-center gap-3">
                <div className="w-6 h-[1.5px] bg-blue-500 rounded-full" />
                <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase">Listed Companies</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {companies.map((c, i) => (
                    <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(59,130,246,0.12)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/newsfeed/companies/${slugify(c.name)}`)}
                        className="bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-200 transition-all duration-300 group"
                    >
                        <div className="h-32 relative overflow-hidden">
                            <img
                                src={c.cover}
                                alt={c.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={e => { e.target.style.background = '#dbeafe' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            {/* Uses c.category (correct field in companySlice) */}
                            <span className="absolute bottom-3 left-3 text-white text-[10px] font-black uppercase tracking-widest bg-blue-500/80 px-2 py-0.5 rounded-full">
                                {c.category}
                            </span>
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={c.avatar}
                                    alt={c.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm -mt-8 relative z-10"
                                    onError={e => e.target.src = `https://ui-avatars.com/api/?name=${c.name}&background=3b82f6&color=fff`}
                                />
                                <h3 className="font-black text-slate-800">{c.name}</h3>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{c.description}</p>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                <div className="flex items-center gap-1 text-slate-500">
                                    <Building2 size={12} />
                                    <span className="text-xs font-bold">Est. {c.founded}</span>
                                </div>
                                <span className="text-xs font-bold text-blue-600">{c.revenue}</span>
                                <span className="text-xs font-bold text-slate-400">{c.investors} investors</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

// ─── Exported component — renders either list or detail based on URL param ────
export default function CompanyPage() {
    const { companyName } = useParams()
    return companyName ? <CompanyDetail /> : <CompanyList />
}