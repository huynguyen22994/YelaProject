var models = require('../models');
var fs = require('fs');

function isDriveUrl(url) {
    var regex = /^http/;
    return regex.test(url);
}

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
            res.json(responses);
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
            brandId: product.brandId,
            type: product.type,
            form: product.form
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
                if (p.dataValues.linkImg === product.linkImg) {
                    models.Product.update(
                        {
                            name: product.name,
                            price: product.price,
                            originalImg: product.originalImg,
                            linkImg: product.linkImg,
                            discribe: product.discribe,
                            productTypeId: product.productTypeId,
                            productStatus: product.productStatus,
                            quantity: product.quantity,
                            brandId: product.brandId,
                            type: product.type,
                            form: product.form
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
                    if(!isDriveUrl(p.linkImg)) {
                        fs.unlinkSync(p.linkImg);
                    }
                    models.Product.update(
                        {
                            name: product.name,
                            price: product.price,
                            originalImg: product.originalImg,
                            linkImg: product.linkImg,
                            discribe: product.discribe,
                            productTypeId: product.productTypeId,
                            type: product.type,
                            form: product.form
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
            if (result === 0) {
                res.statusCode = 400;
                res.end();
            } else {
                if (linkImg && !isDriveUrl(linkImg)) {
                    fs.unlinkSync(linkImg);
                }
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
    var offset = parseInt(req.query.offset);
    var limit =  parseInt(req.query.limit);
    models.Product.findAndCountAll({
    where: {
        productStatus: 'prominentest'
    },
    offset: offset,
    limit: limit
    })
    .then((result) => {
        res.json(result);
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
    var limit =  parseInt(req.query.limit);
    models.Product.findAndCountAll({
        where: {
            productStatus: 'bestseller'
        },
        offset: offset,
        limit: limit
    })
        .then((result) => {
            res.json(result);
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

module.exports.searchProduct = (req, res, next) => {
    var key = req.query.key;
    models.Product.findAndCountAll({
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

module.exports.getProductWithOffset = (req, res, next) => {
    var offset = parseInt(req.query.offset);
    var limit =  parseInt(req.query.limit);
    models.Product.findAndCountAll({
        offset: offset,
        limit: limit
    }).then((result) => {
            let responses = {
                count: result.count,
                products: []
            }
            result.rows.forEach((product) => {
                responses.products.push(product.dataValues);
            });
            res.json(responses);
        },
        (err) => {
            console.log(err);
        })
};

module.exports.getProductByProductType = (req, res, next) => {
    var offset = parseInt(req.query.offset);
    var limit =  parseInt(req.query.limit);
    var productTypeId = req.query.productTypeId;
    models.Product.findAndCountAll({
    where: {
        productTypeId: productTypeId
    },
    offset: offset,
    limit: limit
    })
    .then((result) => {
        res.json(result);
    }, (err) => {
        res.statusCode = 400;
        res.end();
    });
};

module.exports.getProductByType = (req, res, next) => {
    var offset = parseInt(req.query.offset);
    var limit =  parseInt(req.query.limit);
    var type = req.query.type;
    models.Product.findAndCountAll({
    where: {
        type: type
    },
    offset: offset,
    limit: limit
    })
    .then((result) => {
        res.json(result);
    }, (err) => {
        res.statusCode = 400;
        res.end();
    });
};

module.exports.getProductByForm = (req, res, next) => {
    var offset = parseInt(req.query.offset);
    var limit =  parseInt(req.query.limit);
    var form = req.query.form;
    models.Product.findAndCountAll({
    where: {
        form: form
    },
    offset: offset,
    limit: limit
    })
    .then((result) => {
        res.json(result);
    }, (err) => {
        res.statusCode = 400;
        res.end();
    });
};