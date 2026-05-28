const SignupModel = require('../model/signup_model');
const BusinessModel = require('../model/business_model');
const bcrypt = require('bcrypt');

const login_controller = async (req, res) => {
    try {
        const { email, password, role } = req.body

        // Select model based on role
        const Model = (role === 'businessman' || role === 'entrepreneur') ? BusinessModel : SignupModel;

        // 1. check if user exists
        const user = await Model.findUserByEmail(email)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        // 2. compare password with hashed password in db
        const isMatch = await bcrypt.compare(password, user.pass)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' })
        }

        // 3. send back user data (never send password back)
        const { pass, ...safeUser } = user
        safeUser.role = role; // Ensure role is included in response

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: safeUser
        })

    } catch (error) {
        console.error('Login controller error:', error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = { login_controller }