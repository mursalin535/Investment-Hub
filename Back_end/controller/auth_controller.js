const SessionModel = require('../model/session_model');

const COOKIE_NAME = 'sid';

exports.logout_controller = async (req, res) => {
    try {
        const sessionId = req.cookies?.[COOKIE_NAME];
        if (sessionId) {
            await SessionModel.destroy(sessionId);
        }
        res.clearCookie(COOKIE_NAME, { path: '/' });
        return res.status(200).json({ success: true, message: 'Logged out' });
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ success: false, message: 'Logout failed' });
    }
};

exports.me_controller = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }
        return res.status(200).json({ success: true, user: req.user });
    } catch (err) {
        console.error('Me controller error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
