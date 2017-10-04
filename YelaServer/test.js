//var models = require('./app/models');

    //    models.Product.find({ where: { productId: "03fcd940-45bc-11e7-8605-e17799770357"}, include: [models.Brand]})    
    //         .then((result) => {
    //             console.log(result);
    //         }, (err) => {
    //             console.log(err);
    //         });

// models.Category.create({
//     name: "category 1",
//     // categoryId: "40875dc0-41c7-11e7-a676-31a1d60a4bcb"
// })

// models.Product.create({
//     name: "hjfhdf",
//     price: 32423,
//     productTypeId: "c06f6b00-4496-11e7-b098-d9bd6ce8b9b6",
//     productStatus: 'bestseller',
//     quantity: 23,
//     brandId: "48236650-4488-11e7-849a-e70a7a69ebb2"
//     // categoryId: "40875dc0-41c7-11e7-a676-31a1d60a4bcb"
// })

// models.sequelize.Slider.sync();
//models.sequelize.sync();

// models.Category.findAll({
//     attributes: [['id','categoryId'],['name','name'],],
//     include: [{ model: models.ProductType, attributes: { exclude: ['productTypeId','name']} }]
// }).then(function (result) {
//     console.log(result);
//     }, function (err) {
//         console.log(err);
//     });

// models.Category.findAll({
// attributes: [['id','user_id'],['firstname','firstName'],['lastname','lastName']],
// include: [ {model: userRole, attributes: { exclude: ['id','role_id','role_description','user_id']}} ]
// })

// models.Category.findAll(
//     {
//     include: models.ProductType,
//     as: 'ca'
//     },
//     {
//     include: models.ProductType,
//     as: 'pro'
//     }    
// ).then(function (routes) {
//   routes.forEach(function(route) {
//       console.log(route);
//   })
//     })

// models.Category.findAll({
//         include: [{
//             model: models.ProductType,
//             as: 'FK_ProductTypeCategory'
//         }]
//     })
//     .then(function(result) {
//         res.send(result);
//     });

// models.sequelize.query('SELECT categories.categoryId, categories.name, producttypes.name as test FROM categories, producttypes WHERE categories.categoryId = producttypes.categoryId')
//     .spread((r) => {
//         console.log(r);
//     }, (e) => {
//         console.log(e);
//     })

// models.ProductType.findAll(
//     {
//         where: {
//             categoryId: '0caad1f0-4175-11e7-a326-c1a34f205889'
//         }
//     }
// ).then((result) => {
//     result.forEach((a) => {
//         console.log(a.dataValues);
//     })
//     }, (err) => {
//         console.log(err);
// })

//#FE980F
//#4682B4

// var client = require('twilio')(
//   "ACb4cd3c07982a1117644a2fcd2f643a2f",
//   "c41c9e2eb3852cc24ebe48beb6900fcf"
// );
 
// client.messages.create({
//   from: "+13082103839",
//   to: "(+84)0933990004",
//   body: "You just sent an SMS from Node.js using Twilio!"
// }, function(err, message) {
//   if(err) {
//     console.error(err.message);
//   }
// });

    // "database": {
    //     "dbname": "YelaShopDB",
    //     "username": "huynguyen",
    //     "password": null,
    //     "host": "localhost",
    //     "dialect": "mysql",
    //     "min": 0,
    //     "max": 1000,
    //     "idle": 10000
    // },

    //     "database": {
    //     "dbname": "sql12177693",
    //     "username": "sql12177693",
    //     "password": "KEgZuyPNAS",
    //     "host": "sql12.freemysqlhosting.net",
    //     "dialect": "mysql",
    //     "min": 0,
    //     "max": 1000,
    //     "idle": 10000
    // },

// var a = "sr";
// console.log(a.slice(5));