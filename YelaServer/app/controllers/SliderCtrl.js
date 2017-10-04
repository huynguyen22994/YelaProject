var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.getSliders = (req, res, next) => {
    models.Slider.findAndCountAll()
        .then((result) => {
            res.end(JSON.stringify(result));
        },
        (err) => {
            console.log(err);
        });
};

module.exports.createSilder = (req, res, next) => {
    var slider = req.body;
    if (slider) {
        models.Slider.create({
            imgSlider1: slider.imgSlider1,
            imgSlider2: slider.imgSlider2,
            imgSlider3: slider.imgSlider3,
            imgPrice1: slider.imgPrice1,
            imgPrice2: slider.imgPrice2,
            imgPrice3: slider.imgPrice3,
            title1: slider.title1,
            title2: slider.title2,
            title3: slider.title3,
            info1: slider.info1,
            info2: slider.info2,
            info3: slider.info3,
            status: slider.status
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

module.exports.updateSilder = (req, res, next) => {
    var slider = req.body;
};

module.exports.getOneSilder = (req, res, next) => {
    var sliderId = req.query.sliderId;
    if (sliderId) {
        models.Slider.findById(sliderId)
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

module.exports.deleteSlider = (req, res, next) => {
    var sliderId = req.query.sliderId;
    if (sliderId) {
        models.Slider.destroy({
            where: {
                sliderId: sliderId
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

module.exports.getSilderEnable = (req, res, next) => {
    models.Slider.find(
        {
            where: {
                status: "enable"
            }
        }
    ).then((result) => {
        res.end(JSON.stringify(result.dataValues));
    }, (err) => {
        res.statusCode = 400;
        res.end()
    });
};