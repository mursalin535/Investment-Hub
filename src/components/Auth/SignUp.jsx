import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Github, Chrome, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SignUp() {
    return (
        <div className="min-h-[85vh] w-full bg-[#F9FAFB] flex items-center justify-center p-4 md:p-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row"
            >
                {/* Left side: Visual/Info */}
                <div className="w-full md:w-1/2 bg-slate-900 p-10 md:p-16 flex flex-col justify-between relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                    
                    <div className="relative z-10">
                        <Link to="/" className="flex items-center gap-2 mb-12">
                            <img src="/Logo.png" alt="Logo" className="w-10 h-10 rounded-full border border-emerald-400" />
                            <span className="text-xl font-black heading">Investment <span className="text-emerald-400">Hub</span></span>
                        </Link>
                        
                        <h2 className="text-3xl md:text-4xl font-black heading leading-tight mb-6">
                            Start Your Investment Journey Today.
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Join a community of forward-thinking investors and get access to exclusive opportunities.
                        </p>
                    </div>

                    <div className="relative z-10 mt-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                                <ShieldCheck className="text-emerald-400" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Enterprise Security</h4>
                                <p className="text-slate-500 text-sm">Your data and financial records are protected by military-grade encryption.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Form */}
                <div className="w-full md:w-1/2 p-10 md:p-16 bg-white flex flex-col justify-center">
                    <div className="mb-8">
                        <h3 className="text-2xl font-black text-slate-800 heading mb-2">
                            Create Account
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Already have an account?
                            <Link 
                                to="/login"
                                className="ml-2 text-emerald-600 font-bold hover:underline transition-all"
                            >
                                Log in here
                            </Link>
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="John Doe"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 focus:outline-none focus:border-emerald-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    type="email" 
                                    placeholder="name@company.com"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 focus:outline-none focus:border-emerald-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 focus:outline-none focus:border-emerald-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-3 px-4 py-2">
                            <input type="checkbox" className="mt-1 accent-emerald-500" id="terms" />
                            <label htmlFor="terms" className="text-[11px] text-slate-400 leading-snug">
                                I agree to the <span className="text-slate-600 font-bold">Terms of Service</span> and <span className="text-slate-600 font-bold">Privacy Policy</span>.
                            </label>
                        </div>

                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group">
                            Create Account
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-slate-300">
                            <span className="bg-white px-4 italic">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-sm font-bold text-slate-600">
                            <Chrome size={18} /> Google
                        </button>
                        <button className="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-sm font-bold text-slate-600">
                            <Github size={18} /> GitHub
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
