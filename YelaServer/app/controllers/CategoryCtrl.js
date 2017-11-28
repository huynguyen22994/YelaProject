var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.getCategory = (req, res, next) => {
    models.sequelize.query("SELECT ca.*, (SELECT COUNT(*) FROM producttypes pro WHERE pro.categoryId=ca.categoryId) AS ProductTypeCount FROM categories AS ca ORDER BY ca.categoryId DESC")
        .spread((result, metadate) => {
            var responses = _.map(result, (category) => {
                var canDelete = false;
                if (category.ProductTypeCount == 0) {
                    canDelete = true;
                } else {
                    canDelete = false;
                }
                return {
                    categoryId: category.categoryId,
                    name: category.name,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                    canDelete: canDelete,
                    productTypeCount: category.ProductTypeCount
                }
            });
            res.json(responses);
        });
};

module.exports.createCategory = (req, res, next) => {
    var category = req.body;
    if (category) {
        models.Category.create({
            name: category.name
        }).then((result) => {
            res.end("insert success");
        }, (err) => {
            res.statusCode = 400;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.updateCategory = (req, res, next) => {
    var category = req.body;
    if (category) {
        models.Category.update(
            {
                name: category.name
            },
            {
                where: {
                    categoryId: category.categoryId
                }
            }
        ).then((result) => {
            res.end(JSON.stringify(result));
        }, (err) => {
            res.statusCode = 400;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end()
    }
};

module.exports.getOneCategory = (req, res, next) => {
    var categoryId = req.query.categoryId;
    if (categoryId) {
        models.Category.findById(categoryId)
            .then((result) => {
                res.end(JSON.stringify(result));
            }, (err) => {
                res.statusCode = 400;
                res.end()
            });
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.deleteCategory = (req, res, next) => {
    var categoryId = req.query.categoryId;
    if (categoryId) {
        models.Category.destroy({
            where: {
                categoryId: categoryId
            }
        }, {
            force: true    
        }).then((result) => {
            if (result == 0) {
                res.statusCode = 400;
                res.end();
            } else {
                res.end("delete success");
            }
        }, (err) => {
            res.statusCode = 400;
            res.end(); 
        })
    } else {
        res.statusCode = 400;
        res.end()
    }
};

module.exports.getCategoryProductTye = (req, res, next) => {
    var quey = "SELECT * FROM categories";
    var quey1 = "select category.*, producttype.* from categories as category inner join producttypes as producttype on producttype.categoryId = category.categoryId";
    var query2 = "SELECT * FROM producttypes";

    var promise1 = new Promise((resolve, reject) => {
        models.sequelize.query(quey)
            .spread((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
    });  

    promise1.then(function (categories) {
        models.sequelize.query(query2)
            .spread((producttypes) => {
                var responses = _.map(categories, function (category) {
                    let categoryRes = {
                        categoryId: category.categoryId,
                        name: category.name,
                        createdAt: category.createdAt,
                        updatedAt: category.updatedAt,
                        producttypes: []
                    }
                    categoryRes.producttypes = _.filter(producttypes, function (producttype) {
                        return producttype.categoryId === category.categoryId;
                    });
                    return categoryRes
                });
                res.json(responses);
            }, (err) => {
                console.log(err);
                res.statusCode = 400;
                res.end()
            });
    }).catch(function (err) {
        console.log(err);
        res.statusCode = 400;
        res.end()
    })    
};