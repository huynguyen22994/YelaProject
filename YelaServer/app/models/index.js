var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var data = fs.readFileSync('./config/config.json');

var db = {};

// parse Json to Object
var databaseConfig = JSON.parse(data.toString());

/* sequelize on development */
// var database = databaseConfig.devDatabase;
// var sequelize = new Sequelize(database.dbname, database.username, database.password, {
//   host: database.host,
//   dialect: database.dialect,
//   native: false,
//   ssl: true,
//   pool: {
//     max: database.max,
//     min: database.min,
//     idle: database.idles
//   },

  // remove
  // dialectOptions: {
  //   socketPath: "/var/run/mysqld/mysqld.sock"
  // },
  // define: {
  //     paranoid: true
  // }
  // SQLite only
  //storage: 'http://localhost/phpmyadmin/to/database.sqlite'
//});

/* on production */
var database = databaseConfig.database;
var connectStr = database.connectString;
var match = connectStr.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
sequelize = new Sequelize('d9juujmdtfnhjg', 'mwqlcrdpbrsvtl', 'd1f86b425d40305f46dd37e6f4e60661eff0db6cf2c1f65e1d943935b592b136', {
  dialect:  database.dialect,
  protocol: database.dialect,
  port:     match[4],
  host:     match[3],
  logging:  false,
  dialectOptions: {
    ssl: true
  }
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file != 'index.js') && (file != 'relationship.js')
  })
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  })

  Object.keys(db).forEach((modelName) => {
    if(db[modelName].options.hasOwnProperty('associate')) {
      db[modelName].options.associate(db)
    }
  })

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
  }, db)

///////////////////// Relationship ///////////////////////////////// 
// db.ShipCost.hasMany(db.City, {foreignKey : 'cityId', as : 'theCity'});
// db.City.belongsTo(db.ShipCost, {foreignKey : 'cityId'})

// db.ShipCost.hasMany(db.District, {foreignKey : 'districtId', as : 'theDistrict'});
// db.District.belongsTo(db.ShipCost, {foreignKey : 'districtId'})