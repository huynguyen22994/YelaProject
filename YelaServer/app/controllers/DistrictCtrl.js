var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.getAllDistrict = (req, res, next) => {
    models.District.findAndCountAll()
        .then((result) => {
            res.json(result);
        },
        (err) => {
            console.log(err);
        })
};

module.exports.createDistrict = (req, res, next) => {
    var district = req.body;
    var response = {};
    if (district) {
        models.District.create({
            district: district.district,
            code: district.code,
            cityId: district.cityId
        }).then((result) => {
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
        }, (err) => {
            response.message = "Thêm quận thất bại.";
            response.success = false;
            res.statusCode = 400;
            res.json(response);
        })
    } else {
        response.message = "Thêm quận thất bại.";
        response.success = false;
        res.statusCode = 400;
        res.json(response);
    }
};

module.exports.deleteDistrict = (req, res, next) => {
    var districtId = req.query.districtId;
    if (districtId) {
        models.District.destroy({
            where: {
                districtId: districtId
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

module.exports.updateDistrict = (req, res, next) => {
    var district = req.body;
    var response = {};
    if (district) {
        models.District.update(
            {
                district: district.district,
                code: district.code,
                cityId: district.cityId
            },
            {
                where: {
                    districtId: district.districtId
                }
            }
        ).then((result) => {
            var length = result.length;
            if(length > 0) {
                response.message = "Thêm quận thành công.";
                response.success = true;
                res.json(response);
            } else {
                response.message = "Thêm quận thất bại.";
                response.success = false;
                res.statusCode = 400;
                res.json(response);
            }
        }, (err) => {
            response.message = "Thêm quận thất bại.";
            response.success = false;
            res.statusCode = 400;
            res.json(response);
        })
    } else {
        response.message = "Thêm quận thất bại.";
        response.success = false;
        res.statusCode = 400;
        res.json(response);
    }
};

module.exports.getOneDistrict = (req, res, next) => {
    var districtId = req.query.districtId;
    if (districtId) {
        models.District.findById(districtId)
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