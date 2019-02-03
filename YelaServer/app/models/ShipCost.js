module.exports = function (sequelize, Sequelize) {

    var ShipCost = sequelize.define('ShipCost', {
        shipCostId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        cost: {
            type: Sequelize.FLOAT(11),
            allowNull: true
        },
        cityId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        districtId: {
            type: Sequelize.UUID,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return ShipCost;
};