module.exports = function(sequelize, Sequelize) {

    var District = sequelize.define('District', {
        districtId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        district: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        cityId: {
            type: Sequelize.UUID,
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return District;
};