import { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

function getTimeRemaining(deadline) {
    const total = new Date(deadline).getTime() - Date.now();
    if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
}

export default function CountdownTimer({ deadline, compact = false }) {
    const [time, setTime] = useState(() => getTimeRemaining(deadline));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTimeRemaining(deadline));
        }, 1000);
        return () => clearInterval(timer);
    }, [deadline]);

    if (!deadline) return null;

    if (time.total <= 0) {
        return (
            <div className={`flex items-center gap-1.5 ${compact ? 'text-xs' : 'text-sm'} text-red-500 font-bold`}>
                <AlertTriangle size={compact ? 12 : 14} />
                <span>Deadline Passed</span>
            </div>
        );
    }

    if (compact) {
        return (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                <Clock size={12} />
                <span>
                    {time.days > 0 && `${time.days}d `}
                    {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
                </span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            {[
                { val: time.days, label: 'D' },
                { val: time.hours, label: 'H' },
                { val: time.minutes, label: 'M' },
                { val: time.seconds, label: 'S' },
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center">
                        <span className="text-lg font-black text-emerald-700">
                            {String(item.val).padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">
                        {item.label}
                    </span>
                </div>
            ))}
            <div className="ml-2">
                <Clock size={16} className="text-emerald-400" />
            </div>
        </div>
    );
}
