module.exports = function (sequelize, Sequelize) {

    var ShipCost = sequelize.define('ShipCost', {
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