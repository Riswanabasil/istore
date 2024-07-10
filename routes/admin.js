const express=require("express")
const router= express.Router()
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config/adminCred')
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('adminLogin', { errorMessage: '' });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        return res.render('dashboard');
    } else {
        return res.render('adminLogin', {
            errorMessage: 'Invalid email or password'
        });
    }
});
// admin dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect('/admin/login');
    }
    res.render('dashboard');
});

// Admin logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/admin/dashboard');
        }
        res.clearCookie('connect.sid');
        res.redirect('/admin');
    });
});

// List users
router.get('/users', async (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect('/admin/login');
    }
    const users = await User.find();
    res.render('listUsers', { users });
});

// Block/Unblock user
router.post('/users/:id/toggle-block', async (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect('/admin/login');
    }
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.redirect('/admin/users');
});


module.exports = router;