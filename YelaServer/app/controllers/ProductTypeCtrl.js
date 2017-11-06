var models = require('../models');
var _ = require('underscore');

module.exports.getProductType = (req, res, next) => {
    models.sequelize.query("SELECT proty.*, (SELECT COUNT(*) FROM products pro WHERE pro.productTypeId=proty.productTypeId) AS productsCount FROM producttypes AS proty ORDER BY proty.productTypeId DESC")
        .spread((result, metadata) => {
            var responses = _.map(result, (productType) => {
                var canDelete = false;
                if (productType.productsCount == 0) {
                    canDelete = true;
                } else {
                    canDelete = false;
                }
                return {
                    productTypeId: productType.productTypeId,
                    name: productType.name,
                    categoryId: productType.categoryId,
                    createdAt: productType.createdAt,
                    updatedAt: productType.updatedAt,
                    productsCount: productType.productsCount,
                    canDelete: canDelete
                }
            });
            res.end(JSON.stringify(responses));
        });
};

module.exports.createProductType = (req, res, next) => {
    var productType = req.body;
    if (productType) {
        models.ProductType.create({
            name: productType.name,
            categoryId: productType.categoryId
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

module.exports.updateProductType = (req, res, next) => {
    var productType = req.body;
    if (productType) {
        models.ProductType.update(
            {
                name: productType.name,
                categoryId: productType.categoryId
            },
            {
                where: {
                    productTypeId: productType.productTypeId
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

module.exports.deleteProductType = (req, res, next) => {
    var productTypeId = req.query.productTypeId;
    if (productTypeId) {
        models.ProductType.destroy({
            where: {
                productTypeId: productTypeId
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

module.exports.getOneProductType = (req, res, next) => {
    var productTypeId = req.query.productTypeId;
    if (productTypeId) {
        models.ProductType.findById(productTypeId)
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

module.exports.getProductTypebyCategoryId = (req, res, next) => {
    var categoryId = req.query.categoryId;
    models.ProductType.findAll(
        {
            where: {
                categoryId: categoryId
            }
        }
    ).then((producttypes) => {
        var responses = _.map(producttypes, (result) => {
            var producttype = result.dataValues;
            return {
                productTypeId: producttype.productTypeId,
                name: producttype.name
            }            
        });
        res.end(JSON.stringify(responses));
    }, (err) => {
        console.log(err);
    });
};

module.exports.searchProductType = (req, res, next) => {
    var key = req.query.key;
    models.ProductType.findAndCountAll({
        where: {
            name: {
                $like: `%${key}%`
            }
        }
    }).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        res.statusCode = 400;
        res.end();
    });
};