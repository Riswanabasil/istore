const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', { failureRedirect: '/login' });

exports.googleCallbackSuccess = (req, res) => {
    res.redirect('/');
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
