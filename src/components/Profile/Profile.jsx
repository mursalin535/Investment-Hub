import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
    User, Settings, Bell, CreditCard, 
    TrendingUp, Users, Bookmark, LogOut,
    Edit3, Camera, MapPin, Calendar, 
    ChevronRight, ExternalLink, ShieldCheck,
    Flame, DollarSign, Lock, HelpCircle,
    Mail, Phone, Globe, Briefcase,
    Plus, MessageSquare
} from 'lucide-react'
import PostCard from '../NewsFeed/PostCard'

export default function Profile() {
    const navigate = useNavigate()
    const user = {
        name: "Mahidul Hasan",
        role: "Senior Investor",
        email: "mahidul.hasan@investmenthub.com",
        phone: "+880 1712 345678",
        avatar: "/user_rafiul.webp",
        location: "Dhaka, Bangladesh",
        joined: "March 2024",
        bio: "Passionate about seed-stage startups and sustainable agriculture. I believe in community-driven growth and transparent financial systems. Currently looking for high-yield green energy projects.",
        balance: "৳24,500",
        invested: "৳1,25,000",
        returns: "+18.5%",
    }

    const joinedGroups = [
        { id: 1, name: "Dhaka Tech Investors", members: "24", returns: "18.2%", image: "/grp_tech.webp" },
        { id: 2, name: "Agro Growth Fund", members: "18", returns: "12.5%", image: "/grp_agro.webp" },
        { id: 3, name: "Real Estate Circle", members: "32", returns: "9.8%", image: "/grp_realestate.webp" },
    ]

    const investments = [
        { id: 1, company: "GreenHarvest Ltd", amount: "৳45,000", date: "Jan 12, 2026", status: "Active", image: "/co_greenhouse.webp", yield: "+12.4%" },
        { id: 2, company: "SoftTech Solutions", amount: "৳30,000", date: "Dec 05, 2025", status: "Completed", image: "/co_softtech.webp", yield: "+15.2%" },
        { id: 3, company: "BuildRight Construction", amount: "৳50,000", date: "Oct 20, 2025", status: "Active", image: "/co_buildright.webp", yield: "+9.8%" },
    ]

    const handleGroupClick = (groupId) => {
        navigate(`/group/${groupId}`)
    }

    const handleCompanyClick = (companyId) => {
        navigate(`/company/${companyId}`)
    }

    const myPosts = [
        {
            id: 1,
            author: "Mahidul Hasan",
            avatar: "/user_rafiul.webp",
            time: "2h ago",
            content: "Just received my first quarterly payout from GreenHouse Agro! The transparency on this platform is unmatched. Highly recommend checking out their latest funding round.",
            image: "/post_pl_report.webp",
            likes: 24,
            comments: 5,
            type: "profit",
            origin: "individual"
        }
    ]

    return (
        <div className="min-h-screen bg-white pb-20 overflow-hidden">
            
            {/* Minimal Hero Section with Dynamic Shapes */}
            <div className="relative w-full bg-[#F9FAFB] pt-24 pb-16 px-6 md:px-12 border-b border-slate-100 overflow-hidden">
                
                {/* Background Floating Economy Icons */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                    <motion.div 
                        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-10 left-[15%]"
                    >
                        <TrendingUp size={120} />
                    </motion.div>
                    <motion.div 
                        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                        transition={{ duration: 7, repeat: Infinity }}
                        className="absolute bottom-10 right-[20%]"
                    >
                        <DollarSign size={100} />
                    </motion.div>
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <Globe size={300} />
                    </motion.div>
                </div>

                {/* Peeking Triangle Shapes Left */}
                <motion.div 
                    initial={{ x: -100, y: -100, rotate: -45 }}
                    whileInView={{ x: -40, y: -40, rotate: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, type: "spring" }}
                    className="absolute left-0 top-0 opacity-[0.07] pointer-events-none hidden lg:block"
                >
                    <div 
                        className="w-80 h-80 bg-emerald-500" 
                        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
                    />
                </motion.div>

                {/* Peeking Polygon Shape Bottom Right */}
                <motion.div 
                    initial={{ x: 100, y: 100, rotate: 45 }}
                    whileInView={{ x: 30, y: 30, rotate: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, type: "spring" }}
                    className="absolute right-0 bottom-0 opacity-[0.05] pointer-events-none hidden lg:block"
                >
                    <div 
                        className="w-64 h-64 bg-slate-900" 
                        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
                    />
                </motion.div>

                {/* Animated Circle Top Right */}
                <div className="absolute top-12 right-12 hidden md:block">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        animate={{ 
                            rotate: 360,
                        }}
                        transition={{ 
                            opacity: { duration: 0.5 },
                            scale: { duration: 0.5 },
                            rotate: { duration: 15, repeat: Infinity, ease: "linear" }
                        }}
                        className="w-20 h-20 border-4 border-dashed border-emerald-100 rounded-full flex items-center justify-center"
                    >
                        <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ type: "spring", damping: 15 }}
                        className="relative mb-6"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-white shadow-2xl overflow-hidden relative z-10">
                            <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                                onError={e => e.target.src = "https://ui-avatars.com/api/?name=Mahidul+Hasan&background=10b981&color=fff"}
                            />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute bottom-1 right-1 z-20 p-2.5 bg-slate-900 text-white rounded-full border-4 border-[#F9FAFB] hover:bg-emerald-500 transition-colors"
                        >
                            <Camera size={16} />
                        </motion.button>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-slate-800 heading mb-2 tracking-tight">{user.name}</h1>
                        <p className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8 bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
                            {user.role}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Portfolio</p>
                                <p className="text-xl md:text-2xl font-black text-slate-800 heading">{user.invested}</p>
                            </div>
                            <div className="w-[1px] h-10 bg-slate-200 hidden sm:block" />
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Returns</p>
                                <p className="text-xl md:text-2xl font-black text-emerald-500 heading">{user.returns}</p>
                            </div>
                            <div className="w-[1px] h-10 bg-slate-200 hidden sm:block" />
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Balance</p>
                                <p className="text-xl md:text-2xl font-black text-slate-800 heading">{user.balance}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
                
                {/* Section: Bio & Details */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-[2px] bg-emerald-500" />
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Personal Profile</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-black text-slate-800 heading mb-4">About Me</h3>
                            <p className="text-slate-500 leading-relaxed text-lg">
                                {user.bio}
                            </p>
                        </div>
                        <div className="space-y-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                                    <p className="text-sm font-bold text-slate-700">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                                    <p className="text-sm font-bold text-slate-700">{user.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                                    <p className="text-sm font-bold text-slate-700">{user.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: My Groups */}
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
                                onClick={() => handleGroupClick(group.id)}
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

                {/* Section: Investment History (Panel Style) */}
                <section>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-8 h-[2px] bg-emerald-500" />
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Investment Portfolio</h2>
                    </div>

                    <div className="space-y-4">
                        {investments.map(inv => (
                            <motion.div 
                                key={inv.id}
                                whileHover={{ x: 10 }}
                                onClick={() => handleCompanyClick(inv.id)}
                                className="bg-slate-50 border border-slate-100 rounded-[2rem] p-4 flex flex-col md:flex-row md:items-center gap-6 group hover:bg-white hover:border-emerald-200 hover:shadow-xl transition-all cursor-pointer"
                            >
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl overflow-hidden shadow-sm shrink-0 border border-slate-100">
                                    <img src={inv.image} alt={inv.company} className="w-full h-full object-cover" />
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-xl font-black text-slate-800 heading group-hover:text-emerald-600 transition-colors">{inv.company}</h4>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            inv.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                                        }`}>
                                            {inv.status}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-xs font-bold">Investment date: {inv.date}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 md:gap-16 pr-8">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                                        <p className="text-lg font-black text-slate-800 heading">{inv.amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Yield</p>
                                        <p className="text-lg font-black text-emerald-500 heading">{inv.yield}</p>
                                    </div>
                                </div>

                                <button className="p-4 text-slate-300 group-hover:text-emerald-500 transition-colors">
                                    <ExternalLink size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section: My Posts */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-[2px] bg-emerald-500" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">My Insights</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {myPosts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                    
                    <button className="w-full mt-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white hover:border-emerald-200 hover:text-emerald-600 transition-all">
                        Load More Insights
                    </button>
                </section>

            </div>
        </div>
    )
}

