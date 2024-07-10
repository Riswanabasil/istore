const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

exports.register = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/\W/).withMessage('Password must contain at least one special character'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('signup', {
                errorMessage: errors.array().map(err => err.msg).join('. ')
            });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.render('signup', {
                    errorMessage: 'User already exists'
                });
            }

            user = new User({ name, email, password });
            await user.save();
            res.redirect('/login');
        } catch (error) {
            res.render('signup', {
                errorMessage: error.message
            });
        }
    }
];

exports.login = [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password').not().isEmpty().withMessage('Password is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', {
                errorMessage: errors.array().map(err => err.msg).join('. ')
            });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.render('login', {
                    errorMessage: 'Invalid email or password'
                });
            }

            if (user.isBlocked) {
                return res.render('login', {
                    errorMessage: 'Your account has been blocked. Please contact support.'
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.render('login', {
                    errorMessage: 'Invalid email or password'
                });
            }

            // Authentication successful
            req.login(user, function(err) {
                if (err) {
                    return res.render('login', { errorMessage: 'Error logging in' });
                }
                return res.redirect('/home');
            });
        } catch (error) {
            res.render('login', {
                errorMessage: error.message
            });
        }
    }
];
