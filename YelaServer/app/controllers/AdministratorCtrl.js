var models = require('../models');
var async = require('async');
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var data = fs.readFileSync('./config/config.json');
var dataConfig = JSON.parse(data.toString());

module.exports.loginAdmin = (req, res, next) => {
    var admin = req.body;
    if (admin) {
        models.Administrator.findAndCountAll({
            where: {
                username: admin.username,
                password: admin.password
            }
        }).then((result) => {
            if (result.count > 0) {
                var administrator = result.rows[0].dataValues;
                var token = jwt.sign(administrator.adminId, dataConfig.tokenSecrectKey);
                models.Administrator.update({
                    token: token
                }, {
                    where: {
                        username: admin.username
                    }
                }).then((admin) => {
                    req.session.userLogined = true;
                    req.session.token = token;
                    res.end(JSON.stringify({ token: token } ));
                }, (err) => {
                    res.statusCode = 400;
                    res.end(JSON.stringify({err: "update token fail"}));
                })
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({err: "account is not exist"}));
            }
        }, (err) => {
            res.statusCode = 400;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.getAdminInfo = (req, res, next) => {
    var token = req.query.token;
    models.Administrator.findAndCountAll({
        where: {
            token: token
        }
    }).then((result) => {
        if(result.count > 0) {
            res.json(result);
        } else {
            res.statusCode = 400;
            res.end();
        }
    }, (err) => {
        res.statusCode = 400;
        res.end();
    })
};

module.exports.createAdministrator = (req, res, next) => {
    var admin = req.body;
    models.Administrator.create({
        lastName: admin.lastName,
        firstName: admin.firstName,
        username: admin.username,
        password: admin.password
    }).then((result) => {
        res.end("insert success");
    }, (err) => {
        res.statusCode = 400;
        res.end();
    })
};