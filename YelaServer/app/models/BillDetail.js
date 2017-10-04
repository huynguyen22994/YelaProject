module.exports = function(sequelize, Sequelize) {

    var BillDetail = sequelize.define('BillDetail', {
        billId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        productId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unitPrice: {
            type: Sequelize.FLOAT(20),
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    BillDetail.removeAttribute('id');

    return BillDetail;
};