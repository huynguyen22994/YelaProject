module.exports = function(sequelize, Sequelize) {

    var Bill = sequelize.define('Bill', {
        billId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        customerId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('new', 'confirmed', 'canceled', 'inProgress', 'done'),
            allowNull: false
        },
        deliveryStatus: {
            type: Sequelize.STRING,
            allowNull: true
        },
        items: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phoneOne: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        phoneTwo: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        district: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Bill;
};