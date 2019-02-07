var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.getAllCity = (req, res, next) => {
    models.City.findAndCountAll()
        .then((result) => {
            res.json(result);
        },
        (err) => {
            console.log(err);
        })
};

module.exports.createCity = (req, res, next) => {
    var city = req.body;
    var response = {};
    if (city) {
        models.City.create({
            city: city.city,
            code: city.code
        }).then((result) => {
            var data = result.dataValues;
            if(data) {
                response.message = "Thêm thành phố thành công.";
                response.success = true;
                res.json(response);
            } else {
                response.message = "Thêm thành phố thất bại.";
                response.success = false;
                res.statusCode = 400;
                res.json(response);
            }
        }, (err) => {
            response.message = "Thêm thành phố thất bại.";
            response.success = false;
            res.statusCode = 400;
            res.json(response);
        })
    } else {
        response.message = "Thêm thành phố thất bại.";
        response.success = false;
        res.statusCode = 400;
        res.json(response);
    }
};

module.exports.deleteCity = (req, res, next) => {
    var cityId = req.query.cityId;
    if (cityId) {
        models.City.destroy({
            where: {
                cityId: cityId
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

module.exports.updateCity = (req, res, next) => {
    var city = req.body;
    if (city) {
        models.City.update(
            {
                city: city.city,
                code: city.code
            },
            {
                where: {
                    cityId: city.cityId
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

module.exports.getOneCity = (req, res, next) => {
    var cityId = req.query.cityId;
    if (cityId) {
        models.City.findById(cityId)
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