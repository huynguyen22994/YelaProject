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
            allowNull: false
        },
        pay: {
            type: Sequelize.ENUM('done', 'not yet'),
            allowNull: false
        },
        deliveryStatus: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Bill;
};