import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCookie } from '../../store/CookieSlice';
import { fetchMe } from '../../server/auth_server';

export default function SessionRestore({ children }) {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        fetchMe().then((data) => {
            if (data.success && data.user) {
                dispatch(setCookie({
                    role: data.user.role,
                    userInfo: data.user
                }));
            }
        }).finally(() => setChecking(false));
    }, []);

    if (checking) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#F9FAFB]">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return children;
}
