import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';

export default function ProtectedRoute({ element, allowedRoles = [] }) {
    const { loggedIn, user } = useSelector((state) => state.cookie);

    // Not logged in → redirect to login
    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but wrong role → show 404
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return <NotFound />;
    }

    // ✅ Authorized
    return element;
}