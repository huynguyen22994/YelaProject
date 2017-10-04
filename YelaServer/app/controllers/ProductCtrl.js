var models = require('../models');
var fs = require('fs');

module.exports.getProducts = (req, res, next) => {
    models.Product.findAndCountAll()
        .then((result) => {
            let responses = {
                count: result.count,
                products: []
            }
            result.rows.forEach((product) => {
                responses.products.push(product.dataValues);
            });
            res.end(JSON.stringify(responses));
        },
        (err) => {
            console.log(err);
        })
};

module.exports.createProduct = (req, res, next) => {
    var product = req.body;
    if (product) {
        models.Product.create({
            name: product.name,
            price: product.price,
            originalImg: product.originalImg,
            linkImg: product.linkImg,
            discribe: product.discribe,
            productTypeId: product.productTypeId,
            productStatus: product.productStatus,
            quantity: product.quantity,
            brandId: product.brandId
        }).then((result) => {
            res.end("insert success");
        }, (err) => {
            console.log(err);    
            res.statusCode = 400;
            res.end();
        });
    } else {
        console.log('fgfd');
        res.statusCode = 400;
        res.end();
    }
};

module.exports.updateProduct = (req, res, next) => {
    var product = req.body;
    if (product) {
        models.Product.findById(product.productId)
            .then((p) => {
                if (p.linkImg == product.linkImg) {
                    models.Product.update(
                        {
                            name: product.name,
                            price: product.price,
                            originalImg: product.originalImg,
                            linkImg: product.linkImg,
                            discribe: product.discribe,
                            productTypeId: product.productTypeId
                        },
                        {
                            where: {
                                productId: product.productId
                            }
                        }
                    ).then((result) => {
                        res.end(JSON.stringify(result));
                    }, (err) => {
                        res.statusCode = 400;
                        res.end();
                    }) 
                } else {
                    fs.unlinkSync(p.linkImg);
                    models.Product.update(
                        {
                            name: product.name,
                            price: product.price,
                            originalImg: product.originalImg,
                            linkImg: product.linkImg,
                            discribe: product.discribe,
                            productTypeId: product.productTypeId
                        },
                        {
                            where: {
                                productId: product.productId
                            }
                        }
                    ).then((result) => {
                        res.end(JSON.stringify(result));
                    }, (err) => {
                        res.statusCode = 400;
                        res.end();
                    });
                }
            }, (err) => {
                res.statusCode = 400;
                res.end();
            });
    } else {
        res.statusCode = 400;
        res.end()
    }
};

module.exports.deleteProduct = (req, res, next) => {
    var productId = req.query.productId;
    var linkImg = req.query.linkImg;
    if (productId) {
        models.Product.destroy({
            where: {
                productId: productId
            }
        }, {
            force: true    
        }).then((result) => {
            if (result == 0) {
                res.statusCode = 400;
                res.end();
            } else {
                fs.unlinkSync(linkImg);
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

module.exports.getOneProduct = (req, res, next) => {
    var productId = req.query.productId;
    if (productId) {
        models.Product.findById(productId)
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

module.exports.getProductFreature = (req, res, next) => {
    models.Product.findAndCountAll({
    where: {
        productStatus: 'prominentest'
    },
    //offset: 10,
    limit: 9
    })
    .then((result) => {
        res.end(JSON.stringify(result));
    }, (err) => {
        res.statusCode = 400;
        res.end();
    });
};

module.exports.getProductNew = (req, res, next) => {
    var offset = parseInt(req.query.offset);
    models.Product.findAndCountAll({
    where: {
        productStatus: 'new'
    },
    offset: offset,
    limit: 3
    })
    .then((result) => {
        res.end(JSON.stringify(result));
    }, (err) => {
        res.statusCode = 400;
        res.end();
    });
};

module.exports.getProductBestseller = (req, res, next) => {
    var offset = parseInt(req.query.offset);
    models.Product.findAndCountAll({
        where: {
            productStatus: 'bestseller'
        },
        offset: offset,
        limit: 3
    })
        .then((result) => {
            res.end(JSON.stringify(result));
        }, (err) => {
            res.statusCode = 400;
            res.end();
        });
};

module.exports.getProductBrandProTypeByProductId = (req, res, next) => {
    var productId = req.query.productId;
    models.sequelize.query("SELECT products.*, brands.name as brandname, brands.info as brandinfo, producttypes.name as producttypename FROM products, brands, producttypes WHERE products.brandId = brands.brandId and producttypes.productTypeId = products.productTypeId and products.productId = ?",
        { replacements: [productId], type: models.sequelize.QueryTypes.SELECT })
        .spread((result, metadata) => {
            res.end(JSON.stringify(result));
        }, (err) => {
            res.statusCode = 400;
            res.end();
        });
};