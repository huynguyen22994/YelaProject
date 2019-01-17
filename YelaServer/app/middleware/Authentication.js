module.exports.sessionAuthentication = (req, res, next) => {
    if (req.session && req.session.token) {
        return next();
    } else {
        return res.redirect('/');
    }
};

module.exports.sessionAuthenticationCB = (req, res, next, cb) => {
    if (req.session && req.session.token) {
        cb(req, res, next);
    } else {
        return res.redirect('/');
    }
};