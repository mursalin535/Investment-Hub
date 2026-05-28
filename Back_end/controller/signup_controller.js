const SignupModel = require('../model/signup_model.js');
const BusinessModel = require('../model/business_model.js');
const CompanyModel = require('../model/company_model.js');
const bcrypt = require('bcrypt');
const { validationResult, body } = require('express-validator');

const validateSignup = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('role').isIn(['investor', 'businessman']).withMessage('Invalid role'),
    body('companyName').if((value, { req }) => req.body.role === 'businessman')
        .notEmpty().withMessage('Company name is required for businessmen'),
    body('valuation').if((value, { req }) => req.body.role === 'businessman')
        .notEmpty().withMessage('Valuation is required for businessmen')
];

const signup_controller = async (req, res) => {
    try {
        console.log('\n========== SIGNUP PROCESS START ==========');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });
        }

        const { name, email, phone, password, role, companyName, valuation } = req.body;
        const files = req.files;

        // ✅ FIX 2: Check BOTH tables for duplicate email
        const existingInvestor  = await SignupModel.findUserByEmail(email);
        const existingBusiness  = await BusinessModel.findUserByEmail(email);
        if (existingInvestor || existingBusiness) {
            return res.status(409).json({ success: false, message: 'This email is already registered.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const personalPhoto = files['personalPhoto']?.[0]?.filename || null;
        const companyLogo   = files['companyLogo']?.[0]?.filename  || null;

        let result;

        if (role === 'businessman') {
            console.log('🏢 Processing Businessman registration...');

            // Create company first
            const companyResult = await CompanyModel.createCompany({
                name: companyName,
                valuation,
                photo_url: companyLogo
            });
            const newCompanyId = companyResult.insertId;
            console.log(`✅ Company created with ID: ${newCompanyId}`);

            // ✅ FIX 3: Pass company_photo to createBusinessman
            result = await BusinessModel.createBusinessman({
                name:          name.trim(),
                email:         email.toLowerCase().trim(),
                phone:         phone.trim(),
                password:      hashedPassword,
                photo_url:     personalPhoto,
                company_id:    newCompanyId,
                company_photo: companyLogo       // new column
            });
            console.log(`✅ Businessman created with ID: ${result.insertId}`);

        } else {
            console.log('💰 Processing Investor registration...');
            result = await SignupModel.createInvestor({
                name:      name.trim(),
                email:     email.toLowerCase().trim(),
                phone:     phone.trim(),
                password:  hashedPassword,
                photo_url: personalPhoto
            });
            console.log(`✅ Investor created with ID: ${result.insertId}`);
        }

        console.log('========== SIGNUP PROCESS COMPLETE ==========');
        return res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            user: { id: result.insertId, name, email, role }
        });

    } catch (error) {
        console.error('❌ CRITICAL SIGNUP ERROR:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'Email already exists.' });
        }
        return res.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
    }
};

module.exports = { signup_controller, validateSignup };