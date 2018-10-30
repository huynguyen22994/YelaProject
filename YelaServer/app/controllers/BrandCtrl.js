var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.getBrands = (req, res, next) => {
    models.sequelize.query("SELECT br.*, (SELECT COUNT(*) FROM products pro WHERE pro.brandId=br.brandId) AS ProductCount FROM brands AS br ORDER BY br.brandId DESC")
        .spread((result, metadata) => {
            var responses = _.map(result, (brand) => {
                var canDelete = false;
                if (brand.ProductCount == 0) {
                    canDelete = true;
                } else {
                    canDelete = false;
                }
                return {
                    brandId: brand.brandId,
                    name: brand.name,
                    info: brand.info,
                    createdAt: brand.createdAt,
                    updatedAt: brand.updatedAt,
                    ProductCount: brand.ProductCount
                }
            });
            res.json(responses);
        }, (err) => {
            res.json(err);
        });
};

module.exports.createBrand = (req, res, next) => {
    var brand = req.body;
    if (brand) {
        models.Brand.create({
            name: brand.name,
            info: brand.info
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

module.exports.updateBrand = (req, res, next) => {
    var brand = req.body;
    if (brand) {
        models.Brand.update(
            {
                name: brand.name,
                info: brand.info
            },
            {
                where: {
                    brandId: brand.brandId
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

module.exports.getOneBrand = (req, res, next) => {
    var brandId = req.query.brandId;
    if (brandId) {
        models.Brand.findById(brandId)
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

module.exports.deleteBrand = (req, res, next) => {
    var brandId = req.query.brandId;
    if (brandId) {
        models.Brand.destroy({
            where: {
                brandId: brandId
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

module.exports.getBrandProduct = (req, res, next) => {
models.sequelize.query('SELECT categories.categoryId, categories.name, producttypes.name as test FROM categories, producttypes WHERE categories.categoryId = producttypes.categoryId')
    .spread((result) => {
        var id = '';
        _.map(result, (category) => {

            return {

            }            
        });
    }, (err) => {
        res.statusCode = 400;
        res.end()
    })
};