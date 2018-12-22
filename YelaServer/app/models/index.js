var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var data = fs.readFileSync('./config/config.json');

var db = {};

// parse Json to Object
var databaseConfig = JSON.parse(data.toString());
var database = databaseConfig.database;

//sequelize
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
//   dialectOptions: {
//     socketPath: "/var/run/mysqld/mysqld.sock"
//   },
//   define: {
//       paranoid: true
//   }

//   // SQLite only
//   //storage: 'http://localhost/phpmyadmin/to/database.sqlite'
// });
var connectStr = database.connectString;
var match = connectStr.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
sequelize = new Sequelize('d6d9dbgkkjo8d1', 'jmefjsgvxqihcc', '710b5eef2e57516e06ce43cc901966392d0887d4dba293a13329d1dc7a7bcf7c', {
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