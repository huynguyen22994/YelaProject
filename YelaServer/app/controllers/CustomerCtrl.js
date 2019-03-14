var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.createCustomer = (req, res, next) => {
    var customer = req.body;
    if (customer) {
        models.Customer.create({
            lastName: customer.lastName,
            firstName: customer.firstName,
            email: customer.email,
            password: customer.password,
            loginType: customer.loginType
        }).then((result) => {
            res.end("insert success");
        }, (err) => {
            res.statusCode = 400;
            res.end();
        });
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.updateCategory = (req, res, next) => {
    var category = req.body;
    if (category) {
        models.Category.update(
            {
                name: category.name
            },
            {
                where: {
                    categoryId: category.categoryId
                }
            }
        ).then((result) => {
            res.end(JSON.stringify(result));
        }, (err) => {
            res.statusCode = 400;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end()
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