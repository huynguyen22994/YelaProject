module.exports = function (sequelize, Sequelize) {

    var Brand = sequelize.define('Brand', {
        brandId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        info: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Brand;
};