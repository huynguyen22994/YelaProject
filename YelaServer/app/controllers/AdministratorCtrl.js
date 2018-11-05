var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.loginAdmin = (req, res, next) => {
    var admin = req.body;
    if (admin) {
        models.Administrator.findAndCountAll({
            where: {
                username: admin.username,
                password: admin.password
            }
        }).then((result) => {
            res.json(result);
        }, (err) => {
            res.statusCode = 400;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end();
    }
};