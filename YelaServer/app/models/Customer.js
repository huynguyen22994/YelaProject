module.exports = function(sequelize, Sequelize) {

    var Customer = sequelize.define('Customer', {
        customerId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        avatarLink: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        birthDay: {
            type: Sequelize.DATE,
            allowNull: true
        },
        gender: {
            type: Sequelize.ENUM('male', 'female'),
            allowNull: true
        },
        loginType: {
            type: Sequelize.ENUM('manual', 'google', 'facebook'),
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            allowNull: true
        },
        displayName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive', 'pending'),
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Customer;
};