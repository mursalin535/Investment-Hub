// src/pages/Login.jsx
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCookie } from '../../store/CookieSlice'
import Login_server  from '../../server/Login_server'
import {
    TrendingUp, Eye, EyeOff, Mail, Lock,
    ArrowRight, ShieldCheck, CheckCircle2
} from 'lucide-react'
import { dateInput } from '@heroui/react'

export default function Login() {
    const [showPass, setShowPass] = useState(false)
    const [role, setRole] = useState('investor')  // ✅ add role state
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const handleSignIn = (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const userData = JSON.stringify({ email, password, role })  // ✅ include role
        Login_server(userData).then((data)=>{
           if(data.success){
    console.log(data.user)
    dispatch(setCookie({ role: role, userInfo: data.user }))  // ✅ use selected role
    navigate('/')
    alert('Login successful! Welcome back, ' + data.user.name)      // ✅ alert
}
            else{
                alert('Login failed: ' + data.message)
            }
        }).catch((err)=>{
            alert('An error occurred during login. Please try again later.')
            console.error('Login error:', err)
        })
    }

    return (
        <div className="w-full min-h-screen bg-[#F9FAFB] flex flex-col lg:flex-row">

            {/* ── Left Panel ── */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 flex-col justify-between p-12 overflow-hidden">

                {/* Background shapes */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        className="absolute -top-24 -left-24 w-96 h-96 border border-white/[0.04]"
                        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                        className="absolute -bottom-24 -right-24 w-[500px] h-[500px] border border-white/[0.03]"
                        style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_rgba(16,185,129,0.12)_0%,_transparent_65%)]" />
                </div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-500 rounded-xl flex justify-center items-center">
                        <TrendingUp size={18} className="text-white" />
                    </div>
                    <span className="text-white font-black text-xl heading">Investment Hub</span>
                </div>

                {/* Center content */}
                <div className="relative z-10 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-[1.5px] bg-emerald-400 rounded-full" />
                            <span className="text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase">
                                Trusted Platform
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white heading tracking-tight leading-tight">
                            Where Capital
                            <br />
                            <span className="text-emerald-400">Meets Opportunity.</span>
                        </h2>
                        <p className="text-white/50 text-base font-light leading-relaxed max-w-sm">
                            Join hundreds of verified investors and businesses growing together under one legally secured, fully monitored platform.
                        </p>
                    </div>

                    {/* Trust pills */}
                    <div className="flex flex-col gap-3">
                        {[
                            { icon: ShieldCheck, text: "Every deal is legally documented" },
                            { icon: CheckCircle2, text: "100% verified profiles" },
                            { icon: TrendingUp, text: "98% successful investment rate" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-8 h-8 bg-emerald-500/15 rounded-xl flex justify-center items-center shrink-0">
                                    <item.icon size={14} className="text-emerald-400" />
                                </div>
                                <span className="text-white/60 text-sm">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-8 pt-4 border-t border-white/[0.06]">
                        {[
                            { value: '500+', label: 'Investors' },
                            { value: '৳2Cr+', label: 'Invested' },
                            { value: '98%', label: 'Success' },
                        ].map((s, i) => (
                            <div key={i} className="flex flex-col gap-0.5">
                                <span className="text-2xl font-black text-emerald-400 heading">{s.value}</span>
                                <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom quote */}
                <div className="relative z-10">
                    <p className="text-white/30 text-xs italic">
                        "The best investment you can make is in a platform you can trust."
                    </p>
                </div>
            </div>

            {/* ── Right Panel ── */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 py-12 min-h-screen">

                {/* Mobile logo */}
                <div className="lg:hidden flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-emerald-500 rounded-xl flex justify-center items-center">
                        <TrendingUp size={16} className="text-white" />
                    </div>
                    <span className="text-slate-800 font-black text-lg heading">Investment Hub</span>
                </div>

                <div className="w-full max-w-md">

                    <AnimatePresence mode="wait">

                        {/* ── LOGIN FORM ── */}
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                            className="flex flex-col gap-6"
                        >
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-3xl font-black text-slate-800 heading tracking-tight">Welcome back</h1>
                                    <p className="text-slate-400 text-sm font-light">Sign in to your Investment Hub account</p>
                                </div>

                                <div className="flex flex-col gap-4">

                                    {/* Email */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Email Address</label>
                                        <div className="relative">
                                            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                            <input
                                                type="email"
                                                ref={emailRef}
                                                placeholder="you@example.com"
                                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Password</label>
                                            <button className="text-xs text-emerald-600 font-bold hover:underline">Forgot password?</button>
                                        </div>
                                        <div className="relative">
                                            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                            <input
                                                type={showPass ? 'text' : 'password'}
                                                ref={passwordRef}
                                                placeholder="Enter your password"
                                                className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPass(!showPass)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                                            >
                                                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Account Type Selection */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-black text-slate-600 uppercase tracking-widest">Account Type</label>
                                        <div className="flex gap-3">
                                            <button 
                                                type="button"
                                                onClick={() => setRole('investor')}
                                                className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${role === 'investor' ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                                            >
                                                Investor
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setRole('businessman')}
                                                className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${role === 'businessman' ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                                            >
                                                Businessman
                                            </button>
                                        </div>
                                    </div>

                                </div>

                                {/* Sign in button */}
                                <motion.button
                                    onClick={handleSignIn}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
                                >
                                    Sign In <ArrowRight size={16} />
                                </motion.button>

                                {/* Divider */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-px bg-slate-100" />
                                    <span className="text-slate-300 text-xs font-bold">or continue with</span>
                                    <div className="flex-1 h-px bg-slate-100" />
                                </div>

                                {/* Google */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all text-sm"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    Continue with Google
                                </motion.button>

                                <p className="text-center text-slate-400 text-xs">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="text-emerald-600 font-black hover:underline"
                                    >
                                        Sign up free
                                    </button>
                                </p>
                            </motion.div>
                        </AnimatePresence>
                </div>
            </div>
        </div>
    )
}