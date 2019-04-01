var models = require('../models');
var async = require('async');
var _ = require('underscore');
var Bill = require('./BillCtrl');
var LetterCtrl = require('./LetterCtrl');
var ChatCtrl = require('./ChatCtrl');

function getChatCount(callback) {
    ChatCtrl.getAllChat()
        .then(function(result) {
            callback(null, result.count || 0);
        })
};

function getMailCount(callback) {
    models.Letter.findAndCountAll()
    .then((result) => {
        callback(null, result.count || 0);
    },
    (err) => {
        callback(null, null);
    });
};

function getBillCount(callback) {
    models.Bill.findAndCountAll()
        .then(function(result) {
            callback(null, result.count || 0);         
        })
};

module.exports.getBannerCount = (req, res, next) => {
    async.parallel({
        chatCount: (callback) => {
            getChatCount(callback);
        },
        mailCount: (callback) => {
            getMailCount(callback);
        },
        billCount: (callback) => {
            getBillCount(callback);
        }
    }, (err, result) => {
        if (err) {
            res.json({
                fail: true,
                message: err
            })
        } else {
            res.json(result);
        }
    });
};