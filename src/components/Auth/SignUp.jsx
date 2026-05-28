import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Mail, Lock, User, Phone, ArrowRight, ArrowLeft,
    Building2, DollarSign, Camera, Eye, EyeOff,
    CheckCircle2, XCircle, Loader2, Check, X
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import signUp from '../../server/server'
 
// ── Password Rule Engine ──────────────────────────────────────
const RULES = [
    { id: 'lower',   label: 'One lowercase letter',  test: (p) => /[a-z]/.test(p) },
    { id: 'upper',   label: 'One uppercase letter',  test: (p) => /[A-Z]/.test(p) },
    { id: 'digit',   label: 'One digit',             test: (p) => /[0-9]/.test(p) },
    { id: 'special', label: 'Two special characters',test: (p) => (p.match(/[^a-zA-Z0-9]/g) || []).length >= 2 },
    { id: 'length',  label: '8+ characters',         test: (p) => p.length >= 8 },
]
 
function PasswordStrength({ password }) {
    const passed = RULES.filter(r => r.test(password)).length
    const pct    = (passed / RULES.length) * 100
 
    const color =
        pct <= 20  ? '#ef4444' :
        pct <= 40  ? '#f97316' :
        pct <= 60  ? '#eab308' :
        pct <= 80  ? '#84cc16' :
                     '#10b981'
 
    const label =
        pct <= 20  ? 'Very weak' :
        pct <= 40  ? 'Weak'      :
        pct <= 60  ? 'Fair'      :
        pct <= 80  ? 'Good'      :
                     'Strong'
 
    return (
        <div className="mt-2 space-y-2">
            {/* Bar */}
            <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>{label}</span>
            </div>
 
            {/* Rules checklist */}
            <AnimatePresence>
                {password.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 gap-1 pt-1"
                    >
                        {RULES.map(rule => {
                            const ok = rule.test(password)
                            return (
                                <motion.div
                                    key={rule.id}
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${ok ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                        {ok
                                            ? <Check size={10} className="text-white" strokeWidth={3} />
                                            : <X size={10} className="text-slate-400" strokeWidth={3} />
                                        }
                                    </div>
                                    <span className={`text-[11px] font-medium transition-colors duration-300 ${ok ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {rule.label}
                                    </span>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
 
// ── Field wrapper ─────────────────────────────────────────────
function Field({ label, error, children, className = '' }) {
    return (
        <div className={`space-y-1 ${className}`}>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-0.5">
                {label}
            </label>
            <div className="relative">{children}</div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-[11px] text-red-500 ml-0.5 flex items-center gap-1 font-semibold"
                    >
                        <XCircle size={11} /> {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}
 
// ── Shared input styles ───────────────────────────────────────
const base = [
    "w-full bg-white border border-slate-200 rounded-xl",
    "py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-300",
    "focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10",
    "transition-all duration-200"
].join(' ')
 
const ico = "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
 
// ── Role pill ─────────────────────────────────────────────────
function RolePill({ active, onClick, children, icon }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl",
                "text-xs font-black uppercase tracking-widest border transition-all duration-200",
                active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
            ].join(' ')}
        >
            {icon}
            {children}
        </button>
    )
}
 
// ── Step indicator dot ────────────────────────────────────────
function StepDot({ active, done }) {
    return (
        <div className={[
            "w-2 h-2 rounded-full transition-all duration-300",
            done  ? 'bg-emerald-400 scale-110' :
            active ? 'bg-emerald-400' :
                     'bg-white/20'
        ].join(' ')} />
    )
}
 
// ═══════════════════════════════════════════════════════════════
export default function SignUpPage() {
    const navigate = useNavigate()
 
    // Refs
    const nameRef        = useRef(null)
    const emailRef       = useRef(null)
    const phoneRef       = useRef(null)
    const photoRef       = useRef(null)
    const companyNameRef = useRef(null)
    const valuationRef   = useRef(null)
    const companyLogoRef = useRef(null)
 
    // State
    const [step,     setStep]     = useState(1)
    const [role,     setRole]     = useState('investor')
    const [password, setPassword] = useState('')
    const [confirm,  setConfirm]  = useState('')
    const [showPass, setShowPass] = useState(false)
    const [loading,  setLoading]  = useState(false)
    const [errors,   setErrors]   = useState({})
    const [step1Data, setStep1Data] = useState(null)
 
    // Photo preview
    const [photoPreview, setPhotoPreview]   = useState(null)
    const [logoPreview,  setLogoPreview]    = useState(null)
 
    const allRulesPassed = RULES.every(r => r.test(password))
 
    // ── Validation ──────────────────────────────────────────────
    const validateStep1 = useCallback(() => {
        const e = {}
        if (!nameRef.current?.value.trim())       e.name     = 'Full name is required'
        if (!emailRef.current?.value.includes('@')) e.email   = 'Valid email is required'
        if (!phoneRef.current?.value.trim())       e.phone    = 'Phone number is required'
        if (!allRulesPassed)                        e.password = 'Password does not meet all requirements'
        if (password !== confirm)                   e.confirm  = 'Passwords do not match'
        if (!photoRef.current?.files[0])            e.photo    = 'Profile photo is required'
        setErrors(e)
        return Object.keys(e).length === 0
    }, [password, confirm, allRulesPassed])
 
    const validateStep2 = useCallback(() => {
        const e = {}
        if (!companyNameRef.current?.value.trim()) e.company     = 'Company name is required'
        if (!valuationRef.current?.value)          e.valuation   = 'Valuation is required'
        if (!companyLogoRef.current?.files[0])     e.companyLogo = 'Company logo is required'
        setErrors(e)
        return Object.keys(e).length === 0
    }, [])
 
    // ── Handlers ────────────────────────────────────────────────
    const handleNext = (e) => {
        e.preventDefault()
        if (!validateStep1()) return
 
        setStep1Data({
            name:     nameRef.current.value.trim(),
            email:    emailRef.current.value.trim(),
            phone:    phoneRef.current.value.trim(),
            photo:    photoRef.current.files[0],
            password,
        })
 
        if (role === 'businessman') setStep(2)
        else handleSubmitInvestor()
    }
 
    const handleSubmitInvestor = async () => {
        setLoading(true)
        const fd = new FormData()
        fd.append('role',          'investor')
        fd.append('name',          nameRef.current.value.trim())
        fd.append('email',         emailRef.current.value.trim())
        fd.append('phone',         phoneRef.current.value.trim())
        fd.append('password',      password)
        fd.append('personalPhoto', photoRef.current.files[0])
        try {
            const res = await signUp(fd)
            if (res.success) navigate('/login')
            else setErrors({ server: res.message })
        } catch {
            setErrors({ server: 'Server error. Try again.' })
        } finally {
            setLoading(false)
        }
    }
 
    const handleSubmit = async (e) => {
        e?.preventDefault()
        if (!validateStep2()) return
 
        setLoading(true)
        const fd = new FormData()
        fd.append('role',          role)
        fd.append('name',          step1Data.name)
        fd.append('email',         step1Data.email)
        fd.append('phone',         step1Data.phone)
        fd.append('password',      step1Data.password)
        fd.append('personalPhoto', step1Data.photo)
        fd.append('companyName',   companyNameRef.current.value.trim())
        fd.append('valuation',     valuationRef.current.value)
        fd.append('companyLogo',   companyLogoRef.current.files[0])
        try {
            const res = await signUp(fd)
            if (res.success) navigate('/login')
            else setErrors({ server: res.message })
        } catch {
            setErrors({ server: 'Server error. Try again.' })
        } finally {
            setLoading(false)
        }
    }
 
    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file) setPhotoPreview(URL.createObjectURL(file))
    }
 
    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (file) setLogoPreview(URL.createObjectURL(file))
    }
 
    // ── Render ──────────────────────────────────────────────────
    const totalSteps = role === 'businessman' ? 2 : 1
 
    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                layout
                className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
                style={{ minHeight: 620 }}
            >
                {/* ── Left panel ── */}
                <div className="w-full md:w-5/12 bg-slate-900 p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-12 -left-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
 
                    {/* Brand */}
                    <div className="relative z-10">
                        <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
                            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform">
                                IH
                            </div>
                            <span className="text-lg font-black tracking-tight">Investment Hub</span>
                        </Link>
 
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                        Step {step} of {totalSteps}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-black leading-tight mb-4">
                                    {step === 1 ? 'Begin your\njourney with us.' : 'Tell us about\nyour business.'}
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {step === 1
                                        ? 'Create your account and choose how you want to participate on the platform.'
                                        : 'Your company details will be listed in our investment database.'}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
 
                    {/* Step dots + login link */}
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-2">
                            <StepDot active={step === 1} done={step > 1} />
                            {role === 'businessman' && <StepDot active={step === 2} done={false} />}
                        </div>
                        <p className="text-slate-500 text-xs">
                            Already have an account?{' '}
                            <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
 
                {/* ── Right form panel ── */}
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                    <AnimatePresence mode="wait">
 
                        {/* ── STEP 1 ── */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -24 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-5"
                            >
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">Personal Details</h3>
                                    <p className="text-slate-400 text-sm mt-1">Select your role and fill in your credentials.</p>
                                </div>
 
                                {/* Role selector */}
                                <Field label="I am joining as">
                                    <div className="flex gap-3">
                                        <RolePill
                                            active={role === 'investor'}
                                            onClick={() => setRole('investor')}
                                            icon={<DollarSign size={14} />}
                                        >
                                            Investor
                                        </RolePill>
                                        <RolePill
                                            active={role === 'businessman'}
                                            onClick={() => setRole('businessman')}
                                            icon={<Building2 size={14} />}
                                        >
                                            Businessman
                                        </RolePill>
                                    </div>
                                </Field>
 
                                {/* Name + Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Full Name" error={errors.name}>
                                        <User className={ico} size={16} />
                                        <input ref={nameRef} className={base} placeholder="John Doe" />
                                    </Field>
                                    <Field label="Phone Number" error={errors.phone}>
                                        <Phone className={ico} size={16} />
                                        <input ref={phoneRef} className={base} placeholder="+880 1XX-XXXXXXX" />
                                    </Field>
                                </div>
 
                                {/* Email */}
                                <Field label="Email Address" error={errors.email}>
                                    <Mail className={ico} size={16} />
                                    <input ref={emailRef} type="email" className={base} placeholder="name@email.com" />
                                </Field>
 
                                {/* Password + Confirm */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Field label="Password" error={errors.password}>
                                            <Lock className={ico} size={16} />
                                            <input
                                                type={showPass ? 'text' : 'password'}
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                className={base}
                                                placeholder="Create password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPass(v => !v)}
                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                                            >
                                                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </Field>
                                        {/* Password strength meter */}
                                        <PasswordStrength password={password} />
                                    </div>
 
                                    <Field label="Confirm Password" error={errors.confirm}>
                                        <Lock className={ico} size={16} />
                                        <input
                                            type="password"
                                            value={confirm}
                                            onChange={e => setConfirm(e.target.value)}
                                            className={`${base} ${confirm && (confirm === password ? 'border-emerald-400 ring-2 ring-emerald-400/10' : 'border-red-400 ring-2 ring-red-400/10')}`}
                                            placeholder="Repeat password"
                                        />
                                        {confirm && (
                                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                                                {confirm === password
                                                    ? <Check size={15} className="text-emerald-500" />
                                                    : <X size={15} className="text-red-400" />
                                                }
                                            </div>
                                        )}
                                    </Field>
                                </div>
 
                                {/* Profile photo */}
                                <Field label="Profile Photo" error={errors.photo}>
                                    <div className="flex items-center gap-3">
                                        {/* Preview avatar */}
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                                            {photoPreview
                                                ? <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                                                : <div className="w-full h-full flex items-center justify-center"><Camera size={18} className="text-slate-300" /></div>
                                            }
                                        </div>
                                        <label className="flex-1 flex items-center gap-2 cursor-pointer bg-white border border-dashed border-slate-300 rounded-xl py-3 px-4 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all">
                                            <Camera size={16} className="text-slate-400" />
                                            <span className="text-sm text-slate-400 truncate">
                                                {photoRef.current?.files[0]?.name || 'Choose photo…'}
                                            </span>
                                            <input
                                                ref={photoRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handlePhotoChange}
                                            />
                                        </label>
                                    </div>
                                </Field>
 
                                {/* Submit */}
                                <button
                                    onClick={handleNext}
                                    disabled={loading}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-sm disabled:opacity-60"
                                >
                                    {loading
                                        ? <Loader2 className="animate-spin" size={18} />
                                        : <>
                                            {role === 'businessman' ? 'Next: Company Info' : 'Create Account'}
                                            <ArrowRight size={16} />
                                          </>
                                    }
                                </button>
                            </motion.div>
                        )}
 
                        {/* ── STEP 2 ── */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -24 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-5"
                            >
                                {/* Back */}
                                <button
                                    onClick={() => setStep(1)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors"
                                >
                                    <ArrowLeft size={13} /> Back to personal info
                                </button>
 
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">Company Details</h3>
                                    <p className="text-slate-400 text-sm mt-1">Your company will be listed in our investment database.</p>
                                </div>
 
                                {/* Company name */}
                                <Field label="Company Name" error={errors.company}>
                                    <Building2 className={ico} size={16} />
                                    <input ref={companyNameRef} className={base} placeholder="e.g. Nexus Technology Ltd." />
                                </Field>
 
                                {/* Valuation */}
                                <Field label="Current Valuation (৳)" error={errors.valuation}>
                                    <DollarSign className={ico} size={16} />
                                    <input ref={valuationRef} type="number" className={base} placeholder="5,000,000" />
                                </Field>
 
                                {/* Company logo */}
                                <Field label="Company Logo" error={errors.companyLogo}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                                            {logoPreview
                                                ? <img src={logoPreview} alt="logo" className="w-full h-full object-cover" />
                                                : <div className="w-full h-full flex items-center justify-center"><Building2 size={18} className="text-slate-300" /></div>
                                            }
                                        </div>
                                        <label className="flex-1 flex items-center gap-2 cursor-pointer bg-white border border-dashed border-slate-300 rounded-xl py-3 px-4 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all">
                                            <Camera size={16} className="text-slate-400" />
                                            <span className="text-sm text-slate-400 truncate">
                                                {companyLogoRef.current?.files[0]?.name || 'Choose logo…'}
                                            </span>
                                            <input
                                                ref={companyLogoRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleLogoChange}
                                            />
                                        </label>
                                    </div>
                                </Field>
 
                                {/* Server error */}
                                {errors.server && (
                                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                                        <XCircle size={15} className="text-red-500 flex-shrink-0" />
                                        <p className="text-red-600 text-xs font-semibold">{errors.server}</p>
                                    </div>
                                )}
 
                                {/* Submit */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-emerald-500/20 disabled:opacity-60"
                                >
                                    {loading
                                        ? <Loader2 className="animate-spin" size={18} />
                                        : <><CheckCircle2 size={16} /> Complete Signup</>
                                    }
                                </button>
                            </motion.div>
                        )}
 
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}
 