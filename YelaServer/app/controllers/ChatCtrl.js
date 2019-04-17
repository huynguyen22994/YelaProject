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
    var clientNoRead = Chat.getClientReaded();
    var adminNoRead = Chat.getAdminReaded();
    models.Chat.update(
        {
            content: content,
            clientNoRead: clientNoRead,
            adminNoRead: adminNoRead
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

module.exports.updateReadForCus = (email, clientNoRead, adminNoRead) => {
    var updateContent = {};
    if(clientNoRead) {
        updateContent.clientNoRead = false;
    } else if(adminNoRead) {
        updateContent.adminNoRead = false;
    }
    models.Chat.update(
        updateContent,
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