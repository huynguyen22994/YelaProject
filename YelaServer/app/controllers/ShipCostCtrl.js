var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.getAllShipCost = (req, res, next) => {
    models.ShipCost.findAndCountAll()
        .then((result) => {
            res.json(result);
        },
        (err) => {
            console.log(err);
        })
};

module.exports.createShipCost = (req, res, next) => {
    var shipCost = req.body;
    var response = {};
    if (shipCost) {
        models.ShipCost.create({
            cost: shipCost.cost,
            cityId: shipCost.cityId,
            districtId: shipCost.districtId
        }).then((result) => {
            var data = result.dataValues;
            if(data) {
                response.message = "Thêm phí vận chuyển thành công.";
                response.success = true;
                res.json(response);
            } else {
                response.message = "Thêm phí vận chuyển thất bại.";
                response.success = false;
                res.statusCode = 400;
                res.json(response);
            }
        }, (err) => {
            response.message = "Thêm phí vận chuyển thất bại.";
            response.success = false;
            res.statusCode = 400;
            res.json(response);
        })
    } else {
        response.message = "Thêm phí vận chuyển thất bại.";
        response.success = false;
        res.statusCode = 400;
        res.json(response);
    }
};

module.exports.deleteShipCost = (req, res, next) => {
    var shipCostId = req.query.shipCostId;
    if (shipCostId) {
        models.ShipCost.destroy({
            where: {
                shipCostId: shipCostId
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

module.exports.updateShipCost = (req, res, next) => {
    var shipCost = req.body;
    if (shipCost) {
        models.ShipCost.update(
            {
                cost: shipCost.cost,
                cityId: shipCost.cityId,
                districtId: shipCost.districtId
            },
            {
                where: {
                    shipCostId: shipCost.shipCostId
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