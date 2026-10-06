const SessionModel = require('../model/session_model');
const SignupModel = require('../model/signup_model');
const BusinessModel = require('../model/business_model');

const COOKIE_NAME = 'sid';

const authenticate = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.[COOKIE_NAME];
        if (!sessionId) {
            req.user = null;
            return next();
        }

        const session = await SessionModel.findById(sessionId);
        if (!session) {
            res.clearCookie(COOKIE_NAME);
            req.user = null;
            return next();
        }

        const Model = session.user_role === 'businessman' ? BusinessModel : SignupModel;
        const user = await Model.findUserById(session.user_id);
        if (!user) {
            await SessionModel.destroy(sessionId);
            res.clearCookie(COOKIE_NAME);
            req.user = null;
            return next();
        }

        const { pass, ...safeUser } = user;
        safeUser.role = session.user_role;
        req.user = safeUser;
        req.sessionId = sessionId;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        req.user = null;
        next();
    }
};

const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    next();
};

module.exports = { authenticate, requireAuth };
