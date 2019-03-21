var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.getChatContentByMail = (email) => {
    return models.Chat.findOne({
            where: {
                email: email
            }
        })
        .then((result) => {
            return result;
        },
        (err) => {
            console.log(err);
        })
};

module.exports.triggerNewChat = (Chat) => {
    var email = Chat.getEmail();
    var content = Chat.getContent();
    models.Chat.create({
        email: email,
        content: content
    }).then((result) => {
        var data = result.dataValues;
        console.log(data);
    }, (err) => {

    })
};

module.exports.updateChat = (Chat) => {
    var email = Chat.getEmail();
    var content = Chat.getContent();
    models.Chat.update(
        {
            content: content
        },
        {
            where: {
                email: email
            }
        }
    ).then((result) => {
        var data = result.dataValues;
        console.log(data);
    }, (err) => {

    })
};

module.exports.getAllChat = () => {
    return models.Chat.findAndCountAll()
        .then((result) => {
            return result;
        },
        (err) => {
            return err;
        })
};