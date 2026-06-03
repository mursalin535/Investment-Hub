import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, AlertCircle, CheckCircle, Loader, Users, Camera, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { group_server_create } from '../../server/Group_server';
import { getUser } from '../../store/CookieSlice';

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

const ico = "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none";

export default function Create_group() {
    const navigate = useNavigate();
    const user = useSelector(getUser);
    const nameRef = useRef(null);
    const photoRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, photo: 'Please upload an image file' }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, photo: 'Image must be less than 5MB' }));
                return;
            }
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file));
            setErrors(prev => {
                const { photo, ...rest } = prev;
                return rest;
            });
        }
    };

    const removePhoto = () => {
        setPhotoPreview(null);
        setPhotoFile(null);
        if (photoRef.current) photoRef.current.value = '';
    };

    const validateForm = () => {
        const e = {};
        if (!nameRef.current?.value.trim()) e.name = 'Group name is required';
        if (!user) e.user = 'Please log in to create a group';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const adminId = user.id || user.userId;
            const result = await group_server_create(
                nameRef.current.value.trim(),
                photoFile || null,
                adminId
            );

            if (result.success) {
                setMessage({ type: 'success', text: 'Group created successfully!' });
                nameRef.current.value = '';
                setPhotoPreview(null);
                setPhotoFile(null);
                if (photoRef.current) photoRef.current.value = '';

                setTimeout(() => {
                    navigate('/groups');
                }, 1500);
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to create group' });
            }
        } catch (err) {
            console.log("Error creating group:", err);
            setMessage({ type: 'error', text: 'An error occurred while creating the group' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                layout
                className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
                style={{ minHeight: 600 }}
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

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 mb-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                    Create New Group
                                </span>
                            </div>
                            <h2 className="text-3xl font-black leading-tight mb-4">
                                Unite and Invest Collectively
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Build a powerful investment community. Create a group, invite members, and achieve your financial goals together.
                            </p>
                        </motion.div>
                    </div>

                    {/* Footer info */}
                    <div className="relative z-10">
                        <p className="text-slate-500 text-xs">
                            Already have a group?{' '}
                            <Link to="/groups" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                                View all groups
                            </Link>
                        </p>
                    </div>
                </div>

                {/* ── Right form panel ── */}
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                    >
                        {/* Header */}
                        <div>
                            <h3 className="text-2xl font-black text-slate-900">Group Details</h3>
                            <p className="text-slate-400 text-sm mt-1">Create your investment group and invite members to join.</p>
                        </div>

                        {/* Group Name */}
                        <Field label="Group Name" error={errors.name}>
                            <Users className={ico} size={16} />
                            <input
                                ref={nameRef}
                                type="text"
                                className={base}
                                placeholder="Tech Innovators Fund"
                                disabled={loading}
                            />
                        </Field>

                        {/* Photo Upload */}
                        <Field label="Group Photo (Optional)" error={errors.photo}>
                            {photoPreview ? (
                                <div className="relative group">
                                    <img
                                        src={photoPreview}
                                        alt="Preview"
                                        className="w-full h-40 object-cover rounded-xl border-2 border-emerald-200"
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={removePhoto}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                                        disabled={loading}
                                    >
                                        ✕
                                    </motion.button>
                                </div>
                            ) : (
                                <label className="relative block cursor-pointer">
                                    <input
                                        ref={photoRef}
                                        type="file"
                                        onChange={handlePhotoChange}
                                        accept="image/*"
                                        className="hidden"
                                        disabled={loading}
                                    />
                                    <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-6 text-center transition-colors bg-gradient-to-br from-slate-50 to-white hover:from-emerald-50 hover:to-slate-50">
                                        <Camera size={24} className="mx-auto mb-2 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                                        <p className="text-sm font-bold text-slate-700">Click to upload photo</p>
                                        <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                                    </div>
                                </label>
                            )}
                        </Field>

                        {/* Message */}
                        {message.text && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-start gap-3 px-4 py-3 rounded-xl ${
                                    message.type === 'error'
                                        ? 'bg-red-50 border border-red-200'
                                        : 'bg-emerald-50 border border-emerald-200'
                                }`}
                            >
                                {message.type === 'error' ? (
                                    <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                )}
                                <p className={`text-xs font-semibold ${
                                    message.type === 'error' ? 'text-red-700' : 'text-emerald-700'
                                }`}>
                                    {message.text}
                                </p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader size={16} className="animate-spin" />
                                    Creating Group...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} />
                                    Create Group
                                </>
                            )}
                        </motion.button>

                        {/* Helper text */}
                        <p className="text-xs text-slate-500 text-center">
                            <span className="font-semibold">Tip:</span> After creating your group, you can invite members and start making collective investment decisions together.
                        </p>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
}