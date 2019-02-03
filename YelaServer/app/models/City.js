module.exports = function(sequelize, Sequelize) {

    var City = sequelize.define('City', {
        cityId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return City;
};