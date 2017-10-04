module.exports.sessionAuthentication = (req, res, next) => {
    if (req.session && req.session.userLogined) {
        return next();
    } else {
        return res.redirect('/');
    }
};