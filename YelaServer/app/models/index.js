var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var data = fs.readFileSync('./config/config.json');
var URL = require('url');
console.log(URL);

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
var text = 'postgres://jmefjsgvxqihcc:710b5eef2e57516e06ce43cc901966392d0887d4dba293a13329d1dc7a7bcf7c@ec2-184-73-181-132.compute-1.amazonaws.com:5432/d6d9dbgkkjo8d1';
var match = text.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
// console.log(match);
sequelize = new Sequelize('d6d9dbgkkjo8d1', 'jmefjsgvxqihcc', '710b5eef2e57516e06ce43cc901966392d0887d4dba293a13329d1dc7a7bcf7c', {
  dialect:  'postgres',
  protocol: 'postgres',
  port:     match[4],
  host:     match[3],
  logging:  false,
  dialectOptions: {
    ssl: true
  }
});

//var sequelize = new Sequelize('postgres://acdouqkvqkpvqn:82c7af4c6c29ad7de2561635fbdc811f344656a80aec428fdafe10245ee29a53@ec2-184-72-239-186.compute-1.amazonaws.com:5432/d651i46315f1l4');

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