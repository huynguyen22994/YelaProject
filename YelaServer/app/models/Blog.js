module.exports = function(sequelize, Sequelize) {

    var Blog = sequelize.define('Blog', {
        blogId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        imageLink: {
            type: Sequelize.STRING,
            allowNull: true
        },
        summary: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        type: {
            type: Sequelize.ENUM('food', 'nutrition', 'lowcarb', 'discover'),
            allowNull: true
        },
        urlKey: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

    return Blog;
};