var nodemailer = require('nodemailer');
var fs = require('fs');
var data = fs.readFileSync('./config/config.json');
var models = require('../models');
var jwt = require('jsonwebtoken');
var CustomerCtrl = require('./CustomerCtrl');
var async = require('async');
var dataConfig = JSON.parse(data.toString());
var config = dataConfig.yelaEmail;

function createNewCustomer(customer) {
    var data = {
        success: false,
        token: null,
        error: null
    }
    var promise = new Promise(function(resolve, reject) {
        var token = jwt.sign(customer.email, dataConfig.tokenSecrectKey);
        models.Customer.create({
            lastName: customer.lastName,
            firstName: customer.firstName,
            email: customer.email,
            password: customer.password,
            loginType: customer.loginType,
            avatarLink: customer.avatarLink,
            gender: customer.gender,
            token: token,
            status: 'active'
        }).then((result) => {
            data.success = true;
            data.token = token;
            data.customer = result.dataValues;
            resolve(data);
        }, (err) => {
            data.success = false;
            data.error = err;
            reject(data);
        });
    });
    return promise;
};

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
            if(customer.status === 'active') {
                var customerData = customer.dataValues;
                res.json({
                    token: customerData.token,
                    customer: customerData
                })
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({notActive: true, err: "account is not active"}));
            }
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
                if (existCustomer.email == customer.email && customer.loginType === 'manual' && existCustomer.password == customer.password ) {
                    // var token = jwt.sign(existCustomer, dataConfig.tokenSecrectKey);
                    // req.session.userLogined = true;
                    // req.session.token = token;
                    res.json({
                        token: existCustomer.token,
                        customer: existCustomer
                    })
                } else if(existCustomer.email == customer.email && ( customer.loginType === 'google' || customer.loginType === 'facebook')) {
                    res.json({
                        token: existCustomer.token,
                        customer: existCustomer
                    })
                } else {
                        res.statusCode = 400;
                        res.end(JSON.stringify({err: "email or password wrong"}));
                }
            } else {
                if (result.checkEmailExist.check) {
                    createNewCustomer(customer)
                        .then(function(data) {
                            if(data.success){
                                res.json(data);
                            } else {
                                res.statusCode = 400;
                                res.end();
                            }
                        }).catch(function() {
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