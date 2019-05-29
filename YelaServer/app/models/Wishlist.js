module.exports = function(sequelize, Sequelize) {

    var Wishlist = sequelize.define('Wishlist', {
        customerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        productList: {
            type: Sequelize.TEXT,
            allowNull: true,
            get: function() {
                return JSON.parse(this.getDataValue('productList'));
            }, 
            set: function(val) {
                return this.setDataValue('productList', JSON.stringify(val));
            }
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Wishlist;
};