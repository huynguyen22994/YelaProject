var models = require('../models');
var async = require('async');
var _ = require('underscore');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var data = fs.readFileSync('./config/config.json');
var dataConfig = JSON.parse(data.toString());
var Mail = require('../services/mailService');

module.exports.createCustomer = (req, res, next) => {
    var customer = req.body;
    var data = {
        success: false,
        token: null,
        error: null
    };
    if (customer) {
        var token = jwt.sign(customer.email, dataConfig.tokenSecrectKey);
        if(!customer.displayName) {
            customer.displayName = customer.firstName + ' ' + customer.lastName;
        }
        models.Customer.findOne({
            where: {
                email: customer.email
            }
        }).then((value) => {
            if (value) {
               if(!value.dataValues) {
                createCustomer();
               } else {
                data.success = false;
                data.isExistEmail = true;
                res.json(data);
               }
            } else {
                createCustomer();
            }
        }, (err) => {
            data.success = false;
            data.error = err;
            res.json(data);
        });

        function createCustomer() {
            models.Customer.create({
                lastName: customer.lastName,
                firstName: customer.firstName,
                email: customer.email,
                password: customer.password,
                loginType: customer.loginType,
                avatarLink: customer.avatarLink,
                gender: customer.gender,
                displayName: customer.displayName,
                token: token,
                status: (customer.loginType === 'manual') ? 'pending' : 'inactive'
            }).then((result) => {
                data.success = true;
                data.token = token;
                data.customer = result.dataValues;
                if(data.customer.status === 'pending') {
                    Mail.sendActiveAccountMail(data.customer)
                        .then(function(result) {
                            data.sendMail = result;
                            res.json(data);
                        })
                } else {
                    res.json(data);
                }
            }, (err) => {
                data.success = false;
                data.error = err;
                res.json(data);
            });
        }

    } else {
        res.statusCode = 400;
        res.json(data);
    }
};

module.exports.checkEmail = (email, callback) => {
    models.Customer.findOne({
        where: {
            email: email
        }
    }).then((customer) => {
        if (customer) {
            callback('Email already exists', null);
        } else {
            callback(null, true);
        }
    }, (err) => {
        callback('Error when check Email', null);
    });
};

module.exports.getCustomerByToken = (req, res, next) => {
    var data = {
        success: false,
        customer: {}
    }
    var token = req.query.token;
    models.Customer.findOne({
        where: {
            token: token
        }
    }).then((result) => {
        if(result) {
            data.success = true;
            data.customer = result.dataValues;
            res.json(data);
        } else {
            data.success = false;
            res.json(data);
        }
    }, (err) => {
        data.error = err;
        res.json(data);
    });
};

module.exports.activeCustomer = (req, res, next) => {
    var customer = req.body || {};
    var token = customer.token;
    var id = customer.customerId;
    var email = customer.email;
    var data = {
        success: false,
        token: null,
        error: null
    };
    if(token && id && email) {
        models.Customer.findOne({
            where: {
                token: token,
                customerId: id,
                email: email
            }
        }).then(function(result) {
            if(result.dataValues) {
                if(result.dataValues.status !== 'active') {
                    var customerValue = result.dataValues;
                    models.Customer.update(
                        {
                            status: 'active'
                        },
                        {
                            where: {
                                token: customerValue.token,
                                customerId: customerValue.customerId,
                                email: customerValue.email
                            }
                        }
                    ).then((result) => {
                        data.success = true;
                        data.token = customerValue.token;
                        res.json(data);
                    }, (err) => {
                        res.statusCode = 400;
                        data.msg = "Update status fail";
                        res.json(data);
                    })
                } else {
                    data.success = false;
                    data.isActived = true;
                    res.json(data);  
                }
            } else {
                res.statusCode = 400;
                data.msg = "Can't active account";
                res.json(data);
            }
        }, (err) => {
            res.statusCode = 400;
            data.msg = err;
            res.json(data);
        });
    } else {
        res.statusCode = 400;
        data.msg = "Can't active account";
        res.json(data);
    }
};