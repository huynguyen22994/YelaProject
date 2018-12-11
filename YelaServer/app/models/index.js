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
var sequelize = new Sequelize(database.dbname, database.username, database.password, {
  host: database.host,
  dialect: database.dialect,

  pool: {
    max: database.max,
    min: database.min,
    idle: database.idles
  },

  // SQLite only
  //storage: 'http://localhost/phpmyadmin/to/database.sqlite'
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