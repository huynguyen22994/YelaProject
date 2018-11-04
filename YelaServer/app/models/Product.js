module.exports = function(sequelize, Sequelize) {

    var Product = sequelize.define('Product', {
        productId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT(11),
            allowNull: false
        },
        originalImg: {
            type: Sequelize.STRING,
            allowNull: true
        },
        linkImg: {
            type: Sequelize.STRING,
            allowNull: true
        },
        discribe: {
            type: Sequelize.STRING,
            allowNull: true
        },
        productTypeId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        productStatus: {
            type: Sequelize.ENUM('new', 'old', 'normal', 'bestseller', 'prominentest'),
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        brandId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM('food', 'resource', 'drink', 'cake'),
            allowNull: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Product;
};