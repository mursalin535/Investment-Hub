import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

const ProfileInfo = ({ user }) => {
    return (
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
    )
}

export default ProfileInfo
