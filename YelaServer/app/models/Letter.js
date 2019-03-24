module.exports = function (sequelize, Sequelize) {

    var Letter = sequelize.define('Letter', {
        letterId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('readed', 'unreaded'),
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Letter;
};