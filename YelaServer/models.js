// var Sequelize = require('sequelize');
// var fs = require('fs');
// var data = fs.readFileSync('./config/config.json');
var models = require('./app/models');
models.sequelize.sync();
// var db = {};

// // parse Json to Object
// var databaseConfig = JSON.parse(data.toString());
// var database = databaseConfig.database;

// //sequelize
// var sequelize = new Sequelize(database.dbname, database.username, database.password, {
//   host: database.host,
//   dialect: database.dialect,

//   pool: {
//     max: database.max,
//     min: database.min,
//     idle: database.idles
//   },

//   // SQLite only
//   //storage: 'http://localhost/phpmyadmin/to/database.sqlite'
// });

// var Category = sequelize.define('Category', {
//     categoryId: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV1,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//     charset: 'utf8',
//     collate: 'utf8_unicode_ci'
//     });


//     var ProductType = sequelize.define('ProductType', {
//         productTypeId: {
//             type: Sequelize.UUID,
//             defaultValue: Sequelize.UUIDV1,
//             allowNull: false,
//             primaryKey: true
//         },
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         categoryId: {
//             type: Sequelize.UUID,
//             allowNull: false
//         }
//     }, {
//         charset: 'utf8',
//         collate: 'utf8_unicode_ci'
//     });

// Category.hasMany(ProductType, {
//   foreignKey: 'categoryId'
// });

// ProductType.belongsTo(Category, {
//   foreignKey: 'categoryId'
// });

// Category.sync();
// ProductType.sync();