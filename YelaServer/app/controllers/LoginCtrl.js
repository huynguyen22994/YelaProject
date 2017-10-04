var nodemailer = require('nodemailer');
var fs = require('fs');
var data = fs.readFileSync('./config/config.json');
var models = require('../models');
var jwt = require('jsonwebtoken');
var CustomerCtrl = require('./CustomerCtrl');
var async = require('async');
var dataConfig = JSON.parse(data.toString());
var config = dataConfig.yelaEmail;

module.exports.emailAuthentication = (req, res, next) => {
    var customerEmail = req.query.email;
    var code = Math.random().toString(36).substring(7);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.email,
            pass: config.password
        }
    });
    var mainOptions = {
        from: 'HelloWorldCoffeeShop',
        to: customerEmail,
        subject: '[Yela Shop] Xác nhận đăng ký',
        text: 'Mã xác nhận của bạn : ',
        html: '<h2>' + code + '</h2>'
    }
    transporter.sendMail(mainOptions, function(err, info){
        if(err){
            res.statusCode = 400;
            res.end(JSON.stringify(err));
        } else {
            var responses = {
                code: code
            }
            res.end(JSON.stringify(responses));
        }
    });
};

module.exports.loginCustomer = (req, res, next) => {
    var login = req.body;
    models.Customer.findOne({
        where: {
            email: login.email,
            password: login.password
        }
    }).then((customer) => {
        if (customer) {
            var token = jwt.sign(customer.dataValues, dataConfig.tokenSecrectKey);
            req.session.userLogined = true;
            req.session.token = token;
            res.end(JSON.stringify({ token: token } ));
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({err: "account is not exist"}));
        }
    }, (err) => {
        res.statusCode = 400;
        res.end(JSON.stringify({err: err}));
    });
};

module.exports.logoutCustomer = (req, res, next) => { 
    req.session.destroy();
    res.end(JSON.stringify({ token: 0 }));
};

module.exports.loginGoogleFacebook = (req, res, next) => {
    var customer = req.body;
    if (customer) {
        async.parallel({
            checkEmailExist: (callback) => {
                models.Customer.findOne({
                    where: {
                        email: customer.email
                    }
                }).then((value) => {
                    if (value) {
                        callback(value.dataValues, null);
                    } else {
                        callback(null, { check: true });
                    }
                }, (err) => {
                    callback('Error when check Email', null);
                });
            }
        }, (existCustomer, result) => {
            if (existCustomer) {
                if (existCustomer.email == customer.email && existCustomer.password == customer.password) {
                        var token = jwt.sign(existCustomer, dataConfig.tokenSecrectKey);
                        req.session.userLogined = true;
                        req.session.token = token;
                        res.end(JSON.stringify({ token: token } ));
                } else {
                        res.statusCode = 400;
                        res.end(JSON.stringify({err: "email or password wrong"}));
                }



                // models.Customer.findOne({
                //     where: {
                //         email: customer.email,
                //         password: customer.password
                //     }
                // }).then((cus) => {
                //     if (cus) {
                //         var token = jwt.sign(cus.dataValues, dataConfig.tokenSecrectKey);
                //         req.session.userLogined = true;
                //         req.session.token = token;
                //         res.end(JSON.stringify({ token: token } ));
                //     } else {
                //         res.statusCode = 400;
                //         res.end(JSON.stringify({err: "account is not exist"}));
                //     }
                // }, (err) => {
                //     res.statusCode = 400;
                //     res.end(JSON.stringify({err: err}));
                // });
            } else {
                if (result.checkEmailExist.check) {
                    models.Customer.create({
                        lastName: customer.lastName,
                        firstName: customer.firstName,
                        email: customer.email,
                        password: customer.password,
                        loginType: customer.loginType,
                        avatarLink: customer.avatarLink,
                        gender: customer.gender
                    }).then((result) => {
                        var token = jwt.sign(customer, dataConfig.tokenSecrectKey);
                        req.session.userLogined = true;
                        req.session.token = token;
                        res.end(JSON.stringify({ token: token } ));
                    }, (err) => {
                        res.statusCode = 400;
                        res.end();
                    });  
                } else {
                    res.statusCode = 400;
                    res.end();
                }
            }
        });
    } else {
        res.statusCode = 400;
        res.end();
    }
};