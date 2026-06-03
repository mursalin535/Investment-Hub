import { useEffect, useState } from "react";
import { group_server } from "../../server/Group_server";
import { motion, AnimatePresence } from "framer-motion";
import { Users, TrendingUp, DollarSign, ArrowRight, Search, Plus, LayoutGrid, List, Shield, CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { getUser } from "../../store/CookieSlice";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../lib/slugify";

// ── CONFIGURATIONS & ANIMATION VARIANTS ──
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const groupImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
];

export default function Groups() {
  // ── STATE & HOOKS INITIALIZATION ──
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const user = useSelector(getUser);
  const navigate = useNavigate();

  // ── API DATA UTILITIES ──
  useEffect(() => {
    group_server()
      .then((data) => {
        setGroups(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching groups:", err);
        setLoading(false);
      });
  }, []);

  const userGroupId = user?.grp_id;
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── ACTION HANDLERS ──
  const handleJoinPool = (groupId, e) => {
    e.stopPropagation();
    console.log(`Join network action fired for group ID: ${groupId}`);
    // Your join API orchestration goes here
  };

  // ── GLOBAL ASYNC LOADING STATE ──
  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"
        />
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pb-32">
      
      {/* ── HERO SECTION ── */}
      <section className="relative w-full pt-40 pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-green-50/40 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="space-y-8 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-[1px] bg-green-700/30"></div>
                <span className="text-green-700 font-bold uppercase tracking-[0.4em] text-[10px]">
                  Institutional Ecosystem
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-[110px] font-black text-slate-900 leading-[0.9] tracking-tighter"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Synergy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 italic font-serif pr-4">
                  Groups
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl"
              >
                Join elite circles of investors. Coordinate capital, share insights, and access exclusive high-growth markets through our professional groups.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOLBAR SECTION ── */}
      <section className="px-6 md:px-16 mb-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-4 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/40 flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            {/* Search Input Area */}
            <div className="relative w-full lg:max-w-md flex items-center pl-6 bg-slate-50/80 rounded-[2rem] border border-slate-100 focus-within:border-green-600/30 focus-within:bg-white focus-within:shadow-md transition-all">
              <Search size={20} className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search premium groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-5 pl-3 pr-6 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* View Selectors & Shortcuts */}
            <div className="flex flex-wrap items-center justify-end gap-4 w-full lg:w-auto">
              <div className="flex bg-slate-50/50 p-2 rounded-2xl border border-slate-100">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "grid" ? "bg-white shadow-md text-green-700" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <LayoutGrid size={22} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "list" ? "bg-white shadow-md text-green-700" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <List size={22} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/your-groups")}
                className="flex items-center gap-3 px-8 py-5 bg-green-700 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-green-800 transition-all shadow-xl shadow-green-900/10"
              >
                <Shield size={20} />
                <span>Your Groups</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-slate-900/10"
                onClick={() => navigate("/create-group")}
              >
                <Plus size={20} />
                <span>Create Group</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GROUPS DISPLAY DATA CONTAINER (GRID / LIST) ── */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode + searchQuery}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
            className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" : "flex flex-col gap-6"}
          >
            {filteredGroups.map((group, index) => {
              const efficiency = group.total_investment > 0 ? ((group.total_profit / group.total_investment) * 100).toFixed(1) : 0;
              const isUserMember = group.id === userGroupId;

              return (
                <motion.div
                  key={group.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ y: -12 }}
                  className={`group bg-white border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] ${
                    viewMode === "grid" ? "rounded-[3rem] overflow-hidden flex flex-col" : "rounded-[2rem] p-8 flex flex-row items-center gap-8"
                  }`}
                >
                  {/* Card Media Wrapper */}
                  <div className={`relative overflow-hidden bg-slate-900 ${viewMode === "grid" ? "h-64 w-full" : "h-32 w-32 rounded-3xl flex-shrink-0"}`}>
                    <img
                      src={group.photo_url || groupImages[index % groupImages.length]}
                      alt={group.name}
                      className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    {isUserMember && (
                      <div className="absolute top-6 left-6 px-4 py-1.5 bg-green-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl z-10 border border-green-500/50">
                        Your Group
                      </div>
                    )}
                    {viewMode === "grid" && (
                      <div className="absolute bottom-6 left-8">
                        <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {group.name}
                        </h3>
                      </div>
                    )}
                  </div>

                  {/* Card Content & Action System */}
                  <div className={`flex-grow ${viewMode === "grid" ? "p-10 space-y-8" : "flex flex-row items-center justify-between"}`}>
                    
                    {/* LIST VIEW LEFT: Group Identity */}
                    {viewMode === "list" && (
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {group.name}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-md">
                            Active Pool
                          </span>
                        </div>
                      </div>
                    )}

                    {/* RENDERING GRID LAYOUT CONTROLS */}
                    {viewMode === "grid" ? (
                      <>
                        <div className="grid grid-cols-2 gap-10">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400">
                              <DollarSign size={14} className="text-green-600" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Investment</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">৳{(group.total_investment / 1000).toFixed(1)}k</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400">
                              <TrendingUp size={14} className="text-emerald-500" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em]">ROI Profit</span>
                            </div>
                            <p className="text-2xl font-bold text-emerald-600">+৳{(group.total_profit / 1000).toFixed(1)}k</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Efficiency</span>
                            <span className="text-xs font-black text-green-700">{efficiency}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.min(efficiency, 100)}%` }}
                              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full bg-gradient-to-r from-green-600 to-emerald-400 rounded-full"
                            />
                          </div>
                        </div>

                        {/* GRID ACTION BUTTONS FOOTER */}
                        <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                          {/* Avatars */}
                          <div className="flex -space-x-3 self-start sm:self-auto">
                            {[1, 2, 3].map((_, i) => (
                              <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                                <img src={`https://i.pravatar.cc/100?img=${i + 20 + index}`} alt="Investor" />
                              </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                              +8
                            </div>
                          </div>

                          {/* Button Suite (Join & Visit) */}
                          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                            <button
                              onClick={(e) => handleJoinPool(group.id, e)}
                              disabled={isUserMember}
                              className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                                isUserMember
                                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/5"
                              }`}
                            >
                              {isUserMember ? <CheckCircle size={14} /> : null}
                              <span>{isUserMember ? "Joined" : "Join Pool"}</span>
                            </button>

                            <motion.button
                              whileHover={{ x: 3 }}
                              onClick={() => navigate(`/groups/${slugify(group.name)}`)}
                              className="flex items-center gap-2 px-4 py-3 text-green-700 font-black text-xs uppercase tracking-wider bg-green-50 rounded-xl hover:bg-green-700 hover:text-white transition-all"
                            >
                              <span>Visit</span>
                              <ArrowRight size={14} />
                            </motion.button>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* RENDERING LIST LAYOUT CONTROLS */
                      <div className="flex items-center gap-12">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Pooled Capital</p>
                          <p className="text-xl font-bold text-slate-800">৳{(group.total_investment / 1000).toFixed(1)}k</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Net Returns</p>
                          <p className="text-xl font-bold text-emerald-600">+৳{(group.total_profit / 1000).toFixed(1)}k</p>
                        </div>

                        {/* LIST ACTION BUTTONS SUITE */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => handleJoinPool(group.id, e)}
                            disabled={isUserMember}
                            className={`px-6 py-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${
                              isUserMember
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10"
                            }`}
                          >
                            {isUserMember ? "Joined" : "Join Pool"}
                          </button>

                          <button
                            onClick={() => navigate(`/groups/${slugify(group.name)}`)}
                            className="px-6 py-4 bg-green-50 text-green-700 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-green-700 hover:text-white transition-all flex items-center gap-2"
                          >
                            <span>Enter Workspace</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── EMPTY DATA FALLBACK LAYER ── */}
        {filteredGroups.length === 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-40 flex flex-col items-center justify-center text-center space-y-8">
            <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 shadow-inner">
              <Search size={56} />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                No matching groups
              </h3>
              <p className="text-slate-400 max-w-sm font-light text-lg">
                We couldn't find any premium groups matching your search criteria. Try refining your keywords.
              </p>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}