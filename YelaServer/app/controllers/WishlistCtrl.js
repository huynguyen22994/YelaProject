var models = require('../models');
var async = require('async');
var _ = require('underscore');

function triggerNewWisthList(customerId, productItem) {
    return models.Wishlist.create({
        customerId: customerId,
        productList: [productItem]
    }).then((result) => {
        return result;
    }, (err) => {
        return err;
    })
};

function addProductToWishList(customerId, productList) {
    return models.Wishlist.update(
        {
            productList: productList
        },
        {
            where: {
                customerId: customerId
            }
        }
    ).then((result) => {
        return result;
    }, (err) => {
        return err;
    })
}

module.exports.getWishListByCustomerId = (req, res, next) => {
    var customerId = req.query.customerId;
    if(customerId) {
        models.Wishlist.findAndCountAll({
            where: {
                customerId: customerId
            }
        })
        .then((result) => {
            res.json(result);
        },
        (err) => {
            res.statusCode = 400;
            res.end()
        })
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.saveProductToWishlist = (req, res, next) => {
    var wishBody = req.body;
    var response = {};
    if(wishBody.customerId && wishBody.productItem) {
        models.Wishlist.findAndCountAll({
            where: {
                customerId: wishBody.customerId
            }
        }).then((result) => {
            if(result.count < 1) {
                triggerNewWisthList(wishBody.customerId, wishBody.productItem)
                    .then(function(result) {
                        var data = result.dataValues;
                        if(data) {
                            response.message = "Thêm quận thành công.";
                            response.success = true;
                            res.json(response);
                        } else {
                            response.message = "Thêm quận thất bại.";
                            response.success = false;
                            res.statusCode = 400;
                            res.json(response);
                        }
                    }, function(error) {
                        response.message = "Thêm quận thất bại.";
                        response.success = false;
                        res.statusCode = 400;
                        res.json(response);
                    })
            } else {
                var existWisthList = result.rows[0].dataValues;
                var productList = JSON.parse(existWisthList.productList);
                if(_.isArray(productList)) {
                    productList.push(wishBody.productItem);
                }
                addProductToWishList(existWisthList.customerId, productList)
                    .then(function(result) {
                        var length = result.length;
                        if(length > 0) {
                            response.message = "thành công.";
                            response.success = true;
                            res.json(response);
                        } else {
                            response.message = "thất bại.";
                            response.success = false;
                            res.statusCode = 400;
                            res.json(response);
                        }
                    }, function(error) {
                        response.message = "Thêm quận thất bại.";
                        response.success = false;
                        res.statusCode = 400;
                        res.json(response);
                    })
            }
        }, (err) => {
            res.statusCode = 400;
            res.end();
        });
    } else {
        response.message = "Request error.";
        response.success = false;
        res.statusCode = 400;
        res.json(response);
    }







};