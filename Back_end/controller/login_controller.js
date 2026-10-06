const SignupModel = require('../model/signup_model');
const BusinessModel = require('../model/business_model');
const SessionModel = require('../model/session_model');
const bcrypt = require('bcrypt');

const COOKIE_NAME = 'sid';
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

const login_controller = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const Model = (role === 'businessman' || role === 'entrepreneur') ? BusinessModel : SignupModel;

        const user = await Model.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.pass);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Destroy any existing sessions for this user
        await SessionModel.destroyByUser(user.id, role);

        // Create new session
        const { sessionId } = await SessionModel.create(user.id, role);

        // Set httpOnly cookie
        res.cookie(COOKIE_NAME, sessionId, COOKIE_OPTIONS);

        const { pass, ...safeUser } = user;
        safeUser.role = role;

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: safeUser
        });

    } catch (error) {
        console.error('Login controller error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { login_controller };
