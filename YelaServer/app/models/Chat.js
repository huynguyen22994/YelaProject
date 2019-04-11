module.exports = function (sequelize, Sequelize) {

    var Chat = sequelize.define('Chat', {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        notice: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Chat;
};