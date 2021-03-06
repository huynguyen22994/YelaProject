var models = require('../models');
var Mail = require('../services/mailService');
var async = require('async');
var _ = require('underscore');
var readStatus = { 
    readed: 'readed', 
    unreaded: 'unreaded'
};

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
    var response = {};
    if (letter) {
        models.Letter.create({
            name: letter.name,
            phone: letter.phone,
            email: letter.email,
            message: letter.message,
            status: readStatus.unreaded
        }).then((result) => {
            var data = result.dataValues;
            if(data) {
                Mail.sendLetterMail(data.email);
                response.message = "Gửi lời nhắn thành công. Cám ơn bạn vì đã gửi lời nhắn cho chúng tôi.";
                response.success = true;
                res.json(response);
            } else {
                response.message = "Gửi lời nhắn thất bại. Đã xảy ra lỗi trong quá trình gửi lời nhắn.";
                response.success = false;
                res.statusCode = 400;
                res.json(response);
            }
        }, (err) => {
            response.message = "Gửi lời nhắn thất bại. Đã xảy ra lỗi trong quá trình gửi lời nhắn.";
            response.success = false;
            res.statusCode = 400;
            res.json(response);
        })
    } else {
        response.message = "Gửi lời nhắn thất bại. Đã xảy ra lỗi trong quá trình gửi lời nhắn.";
        response.success = false;
        res.statusCode = 400;
        res.json(response);
    }
};

module.exports.deleteLetter = (req, res, next) => {
    var letterId = req.query.letterId;
    if (letterId) {
        models.Letter.destroy({
            where: {
                letterId: letterId
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

module.exports.getUnreadedLetter = (req, res, next) => {
    models.Letter.findAndCountAll({
        where: {
            status: readStatus.unreaded
        }
    }).then(function(result) {
        res.json(result);
    }, function(error) {
        res.statusCode = 400;
        res.json();
    })
};

module.exports.readLetter = (req, res, next) => {
    var letter = req.body;
    var data = {
        isSuccess: false,
        data: null
    };
    if(letter && letter.status === readStatus.unreaded) {
        models.Letter.update(
            {
                status: readStatus.readed
            },
            {
                where: {
                    letterId: letter.letterId
                }
            }
        ).then(function(result) {
            data.isSuccess = true;
            data.data = result;
            res.json(data);
        })
    } else {
        res.json(data);
    }
};