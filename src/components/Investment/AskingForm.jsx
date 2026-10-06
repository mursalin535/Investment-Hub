import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/CookieSlice'
import {
  TrendingUp, DollarSign, FileText, Briefcase,
  ChevronRight, ShieldCheck, Zap, ArrowRight,
  Globe, BarChart, Activity, ArrowUpRight,
  Image as ImageIcon, MessageSquare
} from 'lucide-react'
import {Investment_add} from '../../server/Investment_server'

export default function AskingForm() {
  const user = useSelector(getUser)

  const [formData, setFormData] = useState({
    amount_needed:    '',
    pitch:            '',
    last_month_sale:  '',
    last_year_sale:   '',
    total_sale:       '',
    thumbnail:        null,
    profit_percentage: '',
    profit_deadline:  '',
  })

  const [preview,   setPreview]   = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    if (e.target.name === 'thumbnail') {
      const file = e.target.files[0]
      if (file) {
        setFormData(p => ({ ...p, thumbnail: file }))
        setPreview(URL.createObjectURL(file))
      }
    } else {
      setFormData(p => ({ ...p, [e.target.name]: e.target.value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user?.id) return alert('Please log in first.')
    setLoading(true)

    const fd = new FormData()
      fd.append('company_id',     user.company_id ?? '')
    fd.append('businessman_id', user.id)
  
    fd.append('amount_needed',  formData.amount_needed)
    fd.append('pitch',          formData.pitch)
    fd.append('last_month_sale',formData.last_month_sale)
    fd.append('last_year_sale', formData.last_year_sale)
    fd.append('total_sale',     formData.total_sale)
    fd.append('profit_percentage', formData.profit_percentage)
    fd.append('profit_deadline',  formData.profit_deadline)
    if (formData.thumbnail) fd.append('thumbnail', formData.thumbnail)

      Investment_add(fd).then((result)=>{
        if(result.success){
          setSubmitted(true);

        }
      }).catch((err)=>{
        console.log("error in frontend:",err);
      })

  
  }

  /* ── Success state ── */
  if (submitted) return (
    <section className="w-full min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[3rem] p-16 text-center shadow-2xl max-w-md"
      >
        <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
          <ShieldCheck size={36} className="text-white" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}>
          Ad Posted!
        </h2>
        <p className="text-slate-400 text-lg font-light">
          Your investment advertisement is now live and visible to investors.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white
                     font-black rounded-2xl text-sm uppercase tracking-widest transition-all"
        >
          Post Another
        </button>
      </motion.div>
    </section>
  )

  return (
    <section className="w-full min-h-screen bg-slate-100 py-12 px-4 md:px-10 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl w-full bg-white rounded-[3.5rem] shadow-[0_60px_120px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col lg:flex-row relative">

        {/* ── LEFT PANEL ── */}
        <div className="lg:w-[40%] bg-slate-950 p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
              <motion.path d="M0,500 Q150,450 300,300 T600,100" fill="none" stroke="#10b981" strokeWidth="4"
                strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }} />
              <motion.path d="M0,550 Q200,500 400,350 T800,150" fill="none" stroke="#3b82f6" strokeWidth="2"
                strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
            </svg>
            {[...Array(4)].map((_, i) => (
              <motion.div key={i} className="absolute bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center"
                style={{ width: i===0?'120px':'80px', height: i===0?'120px':'80px',
                         top: i===0?'20%':i===1?'60%':i===2?'40%':'80%',
                         left: i===0?'70%':i===1?'10%':i===2?'30%':'60%' }}
                animate={{ scale:[1,1.1,1], opacity:[0.1,0.3,0.1] }}
                transition={{ duration:4, repeat:Infinity, delay:i }}>
                <motion.div className="w-2 h-2 bg-emerald-400 rounded-full"
                  animate={{ scale:[1,2,1] }} transition={{ duration:2, repeat:Infinity }} />
              </motion.div>
            ))}
            {[DollarSign, TrendingUp, Activity, ArrowUpRight].map((Icon, i) => (
              <motion.div key={i} className="absolute text-emerald-500/10"
                style={{ top:`${20+i*20}%`, left:`${10+(i%2)*60}%` }}
                animate={{ y:[0,-30,0], rotate:[0,15,0], opacity:[0.05,0.15,0.05] }}
                transition={{ duration:6, repeat:Infinity, delay:i*1.5 }}>
                <Icon size={120} strokeWidth={1} />
              </motion.div>
            ))}
            <motion.div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent z-10"
              animate={{ top:['0%','100%','0%'] }} transition={{ duration:15, repeat:Infinity, ease:"linear" }} />
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage:'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize:'60px 60px' }} />
          </div>

          <div className="relative z-10">
            <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
              className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 bg-emerald-500/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-emerald-500/20">
                <Globe size={24} className="text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/80">Economic Portal</span>
                <span className="text-xl font-bold text-white tracking-tight">Investment Hub</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05] mb-8"
                  style={{ fontFamily:"'Playfair Display', serif" }}>
                Capital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                  Injection
                </span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-sm">
                Post your investment ad and connect with verified investors looking for opportunities like yours.
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                { icon: <DollarSign size={16}/>,    label: 'Amount Needed',     desc: 'How much capital you are seeking' },
                { icon: <TrendingUp size={16}/>,   label: 'Profit Terms',      desc: 'Profit percentage & deadline' },
                { icon: <MessageSquare size={16}/>, label: 'Your Pitch',        desc: 'Convince investors in your own words' },
                { icon: <BarChart size={16}/>,      label: 'Sales Metrics',     desc: 'Last month, last year & total sales' },
                { icon: <ImageIcon size={16}/>,     label: 'Thumbnail',         desc: 'A cover image for your ad' },
              ].map((item, i) => (
                <motion.div key={i}
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group"
                  initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4+i*0.1 }}>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm">{item.label}</span>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="mt-12 p-8 bg-emerald-950/40 backdrop-blur-2xl rounded-[2.5rem] border border-emerald-500/20 flex items-center justify-between"
            initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Total Market Value</p>
              <h4 className="text-3xl font-black text-white">$3.8B+</h4>
            </div>
            <div className="h-10 w-[1px] bg-emerald-500/20" />
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-emerald-400 mb-1">
                <ArrowUpRight size={14} />
                <span className="text-sm font-black">12.4%</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500">MoM Growth Rate</span>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: FORM ── */}
        <div className="lg:w-[60%] p-10 md:p-16 bg-white overflow-y-auto max-h-[90vh] lg:max-h-none no-scrollbar">
          <div className="mb-12">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6"
              initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Investment Ad Portal</span>
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight"
                style={{ fontFamily:"'Playfair Display', serif" }}>
              Post Your Ad
            </h3>
            <p className="text-slate-500 mt-3 text-lg font-light">
              Fill in your financial metrics and pitch to attract the right investors.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* ── SALES METRICS ── */}
            <div>
              <SectionHeader icon={<TrendingUp size={20}/>} title="Sales Metrics" sub="Verified historical data" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <InputField icon={<BarChart size={18}/>} label="Last Month Sale (৳)"
                  name="last_month_sale" type="number" placeholder="e.g. 150000"
                  value={formData.last_month_sale} onChange={handleChange} />
                <InputField icon={<DollarSign size={18}/>} label="Last Year Sale (৳)"
                  name="last_year_sale" type="number" placeholder="e.g. 2000000"
                  value={formData.last_year_sale} onChange={handleChange} />
                <InputField icon={<Briefcase size={18}/>} label="Total Sale (৳)"
                  name="total_sale" type="number" placeholder="e.g. 5000000"
                  value={formData.total_sale} onChange={handleChange} />
              </div>
            </div>

            {/* ── FUNDING ── */}
            <div className="pt-10 border-t border-slate-100">
              <SectionHeader icon={<Zap size={20}/>} title="Funding Goal" sub="How much are you seeking?" />
              <div className="mt-8">
                <InputField icon={<ArrowRight size={18}/>} label="Amount Needed (৳)"
                  name="amount_needed" type="number" placeholder="e.g. 5000000"
                  value={formData.amount_needed} onChange={handleChange} />
              </div>
            </div>

            {/* ── PROFIT TERMS ── */}
            <div className="pt-10 border-t border-slate-100">
              <SectionHeader icon={<TrendingUp size={20}/>} title="Profit Terms" sub="Define your profit sharing & timeline" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex flex-col gap-3 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 transition-colors group-focus-within:text-emerald-600">
                    <span className="opacity-50 group-focus-within:opacity-100 transition-opacity"><TrendingUp size={18} /></span>
                    Profit Percentage
                  </label>
                  <select name="profit_percentage"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem]
                               focus:bg-white focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/5
                               outline-none transition-all duration-500 text-slate-800 font-medium text-base appearance-none cursor-pointer"
                    value={formData.profit_percentage} onChange={handleChange} required>
                    <option value="">Select profit %</option>
                    <option value="7">7% Profit</option>
                    <option value="10">10% Profit</option>
                    <option value="12">12% Profit</option>
                    <option value="15">15% Profit</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 transition-colors group-focus-within:text-emerald-600">
                    <span className="opacity-50 group-focus-within:opacity-100 transition-opacity"><Activity size={18} /></span>
                    Max Deadline for Profit
                  </label>
                  <select name="profit_deadline"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem]
                               focus:bg-white focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/5
                               outline-none transition-all duration-500 text-slate-800 font-medium text-base appearance-none cursor-pointer"
                    value={formData.profit_deadline} onChange={handleChange} required>
                    <option value="">Select deadline</option>
                    <option value="1 month">1 Month</option>
                    <option value="3 months">3 Months</option>
                    <option value="6 months">6 Months</option>
                    <option value="1 year">1 Year</option>
                    <option value="2 years">2 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ── THUMBNAIL ── */}
            <div className="pt-10 border-t border-slate-100">
              <SectionHeader icon={<ImageIcon size={20}/>} title="Campaign Thumbnail" sub="A cover image for your ad listing" />
              <div className="mt-8 relative group/thumb">
                <input type="file" name="thumbnail" accept="image/*" onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" required />
                <div className={`w-full h-28 rounded-[2rem] border-2 border-dashed flex items-center px-8 gap-6 transition-all duration-300 overflow-hidden ${
                  preview ? 'border-emerald-500/40 bg-emerald-50' : 'border-emerald-300 bg-emerald-50/50 group-hover/thumb:border-emerald-500'
                }`}>
                  {preview ? (
                    <>
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-md border border-slate-100">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-emerald-600">Image Selected</span>
                        <p className="text-[10px] text-emerald-400 mt-0.5">Click to change</p>
                      </div>
                      <Zap size={18} className="ml-auto text-emerald-500" />
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm group-hover/thumb:bg-emerald-500 group-hover/thumb:text-white transition-colors">
                        <ImageIcon size={24} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Upload Thumbnail</span>
                        <p className="text-[10px] text-emerald-400 mt-0.5">Required · PNG, JPG, WEBP</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ── PITCH ── */}
            <div className="pt-10 border-t border-slate-100">
              <SectionHeader icon={<MessageSquare size={20}/>} title="Your Pitch" sub="Convince investors in your own words" />
              <div className="mt-8">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                  <FileText size={14} className="text-emerald-500" /> Pitch / Description
                </label>
                <textarea name="pitch" rows={7}
                  className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem]
                             focus:bg-white focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/5
                             outline-none transition-all duration-500 text-slate-700 resize-none text-base leading-relaxed"
                  placeholder="Describe your business model, why you need the capital, how it will be used, and your growth plan..."
                  value={formData.pitch} onChange={handleChange} required />
              </div>
            </div>

            {/* ── SUBMIT ── */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.01, y: -4 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full py-6 bg-slate-950 hover:bg-emerald-600 text-white rounded-[2rem]
                           font-black text-xl shadow-[0_25px_50px_rgba(0,0,0,0.15)]
                           hover:shadow-[0_25px_50px_rgba(16,185,129,0.3)] transition-all duration-500
                           flex items-center justify-center gap-4 group disabled:opacity-60"
                type="submit"
              >
                {loading ? (
                  <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Broadcast Advertisement
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </>
                )}
              </motion.button>

              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Economic Security Protocol
                  </span>
                </div>
                <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-tighter max-w-xs leading-normal">
                  By submitting, you agree to our{' '}
                  <span className="text-emerald-600 cursor-pointer hover:underline underline-offset-4">Investor Agreement</span>
                  {' '}& {' '}
                  <span className="text-emerald-600 cursor-pointer hover:underline underline-offset-4">Privacy Terms</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ icon, title, sub }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-black text-slate-900"
            style={{ fontFamily:"'Playfair Display', serif" }}>{title}</h4>
        <p className="text-sm text-slate-400">{sub}</p>
      </div>
    </div>
  )
}

function InputField({ icon, label, name, type='text', placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-3 group">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 transition-colors group-focus-within:text-emerald-600">
        <span className="opacity-50 group-focus-within:opacity-100 transition-opacity">{icon}</span>
        {label}
      </label>
      <input type={type} name={name}
        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem]
                   focus:bg-white focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/5
                   outline-none transition-all duration-500 text-slate-800 font-medium text-base"
        placeholder={placeholder} value={value} onChange={onChange} required />
    </div>
  )
}   