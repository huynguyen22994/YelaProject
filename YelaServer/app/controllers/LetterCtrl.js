var models = require('../models');
var Mail = require('../services/mailService');
var async = require('async');
var _ = require('underscore');

module.exports.getAllLetter = (req, res, next) => {
    models.Letter.findAndCountAll()
        .then((result) => {
            res.json(result);
        },
        (err) => {
            console.log(err);
        })
};

module.exports.createLetter = (req, res, next) => {
    var letter = req.body;
    if (letter) {
        models.Letter.create({
            name: letter.name,
            phone: letter.phone,
            email: letter.email,
            message: letter.message
        }).then((result) => {
            res.end("insert success");
        }, (err) => {
            res.statusCode = 400;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.getOneCategory = (req, res, next) => {
    var categoryId = req.query.categoryId;
    if (categoryId) {
        models.Category.findById(categoryId)
            .then((result) => {
                res.end(JSON.stringify(result));
            }, (err) => {
                res.statusCode = 400;
                res.end()
            });
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.deleteCategory = (req, res, next) => {
    var categoryId = req.query.categoryId;
    if (categoryId) {
        models.Category.destroy({
            where: {
                categoryId: categoryId
            }
        }, {
            force: true    
        }).then((result) => {
            if (result == 0) {
                res.statusCode = 400;
                res.end();
            } else {
                res.end("delete success");
            }
        }, (err) => {
            res.statusCode = 400;
            res.end(); 
        })
    } else {
        res.statusCode = 400;
        res.end()
    }
};

module.exports.testSendMail = (req, res, next) => {
    var mail = req.query.mail;
    Mail.sendLetterMail(mail).then(function(data) {
        res.json(data);
    });
};