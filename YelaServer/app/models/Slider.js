module.exports = function (sequelize, Sequelize) {

    var Slider = sequelize.define('Slider', {
        sliderId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        imgSlider1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        imgSlider2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        imgSlider3: {
            type: Sequelize.STRING,
            allowNull: true
        },   
        imgPrice1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        imgPrice2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        imgPrice3: {
            type: Sequelize.STRING,
            allowNull: true
        }, 
        title1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        title2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        title3: {
            type: Sequelize.STRING,
            allowNull: true
        },
        info1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        info2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        info3: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('enable', 'disable'),
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Slider;
};