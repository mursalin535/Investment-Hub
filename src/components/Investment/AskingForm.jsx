import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addInvestmentAd } from '../../redux/slices/investmentSlice'
import { 
  Building2, 
  Mail, 
  Phone, 
  User, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Zap,
  Target,
  ArrowRight,
  Globe,
  Lock,
  BarChart,
  Activity,
  ArrowUpRight,
  Image as ImageIcon
} from 'lucide-react'

export default function AskingForm() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nid: '',
    businessName: '',
    category: 'Agriculture',
    lastYearRevenue: '',
    lastMonthRevenue: '',
    totalSales: '',
    askingAmount: '',
    description: '',
    thumbnail: null
  })

  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    if (e.target.name === 'thumbnail') {
      const file = e.target.files[0]
      if (file) {
        setFormData({ ...formData, thumbnail: file })
        setPreview(URL.createObjectURL(file))
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // In a real app, you'd handle file upload to a server
    // For now, we'll use the preview URL or a placeholder if it's just local state
    const submissionData = {
      ...formData,
      thumbnail: preview || "/co_greenhouse_cover.webp" 
    }
    
    dispatch(addInvestmentAd(submissionData))
    console.log('Application Submitted:', submissionData)
    
    // Optional: Reset form or show success message
    alert('Investment Advertisement Posted Successfully!')
  }

  return (
    <section className="w-full min-h-screen bg-slate-100 py-12 px-4 md:px-10 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl w-full bg-white rounded-[3.5rem] shadow-[0_60px_120px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col lg:flex-row relative">
        
        {/* Left Side: Premium Dark Economics Showcase */}
        <div className="lg:w-[40%] bg-slate-950 p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
          
          {/* Animated Background: Financial Dynamics */}
          <div className="absolute inset-0 z-0">
            {/* 1. Animated Market Line (Growth Curve) */}
            <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
              <motion.path
                d="M0,500 Q150,450 300,300 T600,100"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              />
              <motion.path
                d="M0,550 Q200,500 400,350 T800,150"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </svg>

            {/* 2. Pulsing Investment Nodes */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center"
                style={{ 
                  width: i === 0 ? '120px' : '80px',
                  height: i === 0 ? '120px' : '80px',
                  top: i === 0 ? '20%' : i === 1 ? '60%' : i === 2 ? '40%' : '80%',
                  left: i === 0 ? '70%' : i === 1 ? '10%' : i === 2 ? '30%' : '60%',
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: i }}
              >
                 <motion.div 
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                 />
              </motion.div>
            ))}

            {/* 3. Floating Financial Symbols */}
            {[DollarSign, TrendingUp, Activity, ArrowUpRight].map((Icon, i) => (
               <motion.div
                 key={i}
                 className="absolute text-emerald-500/10"
                 style={{ 
                   top: `${20 + i * 20}%`, 
                   left: `${10 + (i % 2) * 60}%` 
                 }}
                 animate={{ 
                    y: [0, -30, 0],
                    rotate: [0, 15, 0],
                    opacity: [0.05, 0.15, 0.05]
                 }}
                 transition={{ duration: 6, repeat: Infinity, delay: i * 1.5 }}
               >
                 <Icon size={120} strokeWidth={1} />
               </motion.div>
            ))}

            {/* 4. Scanning Data Bar */}
            <motion.div 
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent z-10"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.05]" 
                 style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
            />
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-16"
            >
              <div className="w-12 h-12 bg-emerald-500/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-2xl">
                <Globe size={24} className="text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/80 jost-light">Economic Portal</span>
                <span className="text-xl font-bold text-white heading tracking-tight">Investment Hub</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white heading leading-[1.05] mb-8">
                Capital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Injection</span>
              </h2>
              <p className="text-slate-400 text-lg jost-light leading-relaxed mb-12 max-w-sm">
                Position your enterprise for rapid expansion through our data-verified investment network.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                { icon: <ShieldCheck size={18} />, text: "Asset Protection", desc: "Rigorous vetting for mutual security." },
                { icon: <Activity size={18} />, text: "Market Liquidity", desc: "Access high-velocity capital pools." },
                { icon: <BarChart size={18} />, text: "Yield Analytics", desc: "Precise valuation of your growth potential." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex gap-5 p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white jost-light tracking-wide">{item.text}</span>
                    <span className="text-xs text-slate-500">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Business Metrics Summary */}
          <motion.div 
            className="mt-16 p-8 bg-emerald-950/40 backdrop-blur-2xl rounded-[2.5rem] border border-emerald-500/20 flex items-center justify-between"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Total Market Value</p>
              <h4 className="text-3xl font-black text-white heading">$3.8B+</h4>
            </div>
            <div className="h-10 w-[1px] bg-emerald-500/20" />
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-emerald-400 mb-1">
                    <ArrowUpRight size={14} />
                    <span className="text-sm font-black">12.4%</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500 font-jost">MoM Growth Rate</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form Content */}
        <div className="lg:w-[60%] p-10 md:p-20 relative bg-white overflow-y-auto max-h-[90vh] lg:max-h-none no-scrollbar">
          <div className="mb-14">
            <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Listing Portal V2.1</span>
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-950 heading tracking-tight">Post Advertisement</h3>
            <p className="text-slate-500 font-medium jost-light mt-4 text-lg">Detailed financial metrics help investors make faster decisions.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Identity Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <InputField 
                icon={<User size={18} />} 
                label="Businessman Name" 
                name="name" 
                placeholder="Full Name" 
                value={formData.name} 
                onChange={handleChange} 
              />
              <InputField 
                icon={<Mail size={18} />} 
                label="Email Address" 
                name="email" 
                type="email"
                placeholder="contact@business.com" 
                value={formData.email} 
                onChange={handleChange} 
              />
              <InputField 
                icon={<Phone size={18} />} 
                label="Phone Number" 
                name="phone" 
                placeholder="+880 1XXX-XXXXXX" 
                value={formData.phone} 
                onChange={handleChange} 
              />

              {/* Category Selection */}
              <div className="flex flex-col gap-4 group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] jost-light flex items-center gap-2 transition-colors group-focus-within:text-emerald-600">
                  <Target size={16} className="text-emerald-500" />
                  Business Category
                </label>
                <div className="relative">
                  <select 
                    name="category"
                    className="w-full px-7 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.8rem] focus:bg-white focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/5 outline-none transition-all duration-500 jost-light text-slate-800 shadow-inner font-medium text-lg appearance-none cursor-pointer"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Technology">Technology</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Fintech">Fintech</option>
                    <option value="IoT">IoT</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                  </select>
                  <ChevronRight size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                </div>
              </div>

              <InputField 
                icon={<CreditCard size={18} />} 
                label="NID Number" 
                name="nid" 
                placeholder="Identity Reference" 
                value={formData.nid} 
                onChange={handleChange} 
              />
            </div>

            {/* Performance Section */}
            <div className="pt-12 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
                    <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900 heading">Financial Records</h4>
                  <p className="text-sm text-slate-400 font-medium jost-light">Verified historical data required</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                <InputField 
                  icon={<Building2 size={18} />} 
                  label="Business Name" 
                  name="businessName" 
                  placeholder="Official Entity Name" 
                  value={formData.businessName} 
                  onChange={handleChange} 
                />
                <InputField 
                  icon={<DollarSign size={18} />} 
                  label="Last Year Revenue" 
                  name="lastYearRevenue" 
                  placeholder="Full Year Summary" 
                  value={formData.lastYearRevenue} 
                  onChange={handleChange} 
                />
                <InputField 
                  icon={<BarChart size={18} />} 
                  label="Last Month Revenue" 
                  name="lastMonthRevenue" 
                  placeholder="Recent Month Performance" 
                  value={formData.lastMonthRevenue} 
                  onChange={handleChange} 
                />
                <InputField 
                  icon={<Briefcase size={18} />} 
                  label="Total Sales Volume" 
                  name="totalSales" 
                  placeholder="Total Products/Services Sold" 
                  value={formData.totalSales} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            {/* Asking Section */}
            <div className="pt-12 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
                    <Zap size={20} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900 heading">Funding Thesis</h4>
                  <p className="text-sm text-slate-400 font-medium jost-light">Investment Goals</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                <InputField 
                  icon={<ArrowRight size={18} />} 
                  label="Target Capital Amount" 
                  name="askingAmount" 
                  placeholder="Enter Asking Amount" 
                  value={formData.askingAmount} 
                  onChange={handleChange} 
                />
                
                {/* Thumbnail Upload */}
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] jost-light flex items-center gap-2">
                    <ImageIcon size={16} className="text-emerald-500" />
                    Campaign Thumbnail
                  </label>
                  <div className="relative group/thumb h-[68px]">
                    <input 
                      type="file" 
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      required
                    />
                    <div className={`w-full h-full rounded-[1.8rem] border-2 border-dashed flex items-center px-6 gap-4 transition-all duration-300 overflow-hidden ${
                      preview 
                        ? 'border-emerald-500/40 bg-emerald-50' 
                        : 'border-emerald-300 bg-emerald-50/50 group-hover/thumb:border-emerald-500 group-hover/thumb:bg-white'
                    }`}>
                      {preview ? (
                        <>
                          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-100">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm font-bold text-emerald-600 truncate flex-1">Image Selected</span>
                          <Zap size={16} className="text-emerald-500" />
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm group-hover/thumb:bg-emerald-500 group-hover/thumb:text-white transition-colors">
                            <ImageIcon size={20} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest jost-light">Upload Thumbnail</span>
                            <span className="text-[10px] text-emerald-400 jost-light">Required · PNG, JPG, WEBP</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                <label className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] jost-light flex items-center gap-2">
                  <FileText size={16} className="text-emerald-500" />
                  Business Description
                </label>
                <textarea 
                  name="description"
                  rows={6}
                  className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:bg-white focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/5 outline-none transition-all duration-500 jost-light text-slate-700 resize-none shadow-inner text-lg leading-relaxed"
                  placeholder="Detail your business model, target market, and fund allocation..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.01, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-7 bg-slate-950 hover:bg-emerald-600 text-white rounded-[2rem] font-black heading text-2xl shadow-[0_25px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.3)] transition-all duration-500 flex items-center justify-center gap-4 group"
                type="submit"
              >
                Broadcast Application
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
              
              <div className="mt-10 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Economic Security Protocol</span>
                </div>
                <p className="text-center text-slate-400 text-[10px] font-bold jost-light uppercase tracking-tighter max-w-xs leading-normal">
                  By submitting, you agree to our <span className="text-emerald-600 cursor-pointer hover:underline underline-offset-4">Investor Agreement</span> & <span className="text-emerald-600 cursor-pointer hover:underline underline-offset-4">Privacy Terms</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function InputField({ icon, label, name, type = "text", placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-4 group">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] jost-light flex items-center gap-2 transition-colors group-focus-within:text-emerald-600">
        <span className="opacity-50 group-focus-within:opacity-100 transition-opacity">{icon}</span>
        {label}
      </label>
      <input 
        type={type}
        name={name}
        className="w-full px-7 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.8rem] focus:bg-white focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/5 outline-none transition-all duration-500 jost-light text-slate-800 shadow-inner font-medium text-lg"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}