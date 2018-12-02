var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var config = fs.readFileSync('./config/config.json');
var configData = JSON.parse(config.toString());

var storage = multer.diskStorage({
    destination: configData.storageProductPath,
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)
            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});

var storageSlider = multer.diskStorage({
    destination: configData.storageSliderPath,
    filename: function (req, file, cb) {
        console.log(file);
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)
            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});

var storageBlog = multer.diskStorage({
    destination: configData.storageBlogPath,
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)
            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});

var uploadProductImg = multer({ storage: storage });
var uploadSliderImg = multer({ storage: storageSlider });
var uploadBlogImg = multer({ storage: storageBlog });

router.post('/product/upload', uploadProductImg.any(), function(req, res){
    res.end(JSON.stringify(req.files[0]));
});

router.post('/slider/upload', uploadSliderImg.any(), function (req, res) {
    res.end(JSON.stringify(req.files[0]));
});

router.post('/blog/upload', uploadBlogImg.any(), function(req, res) {
    var blogImg = {
        "uploaded": 1,
        "fileName": req.files[0].originalname,
        "url": "/" + req.files[0].path
    }
    res.json(blogImg);
});

router.get('/blog/upload', function(req, res) {
    var images = fs.readdirSync(configData.storageBlogPath);
    var sorted = [];
    for (let item of images) {
        if(item.split('.').pop() === "png"
        || item.split('.').pop() === "jpg"
        || item.split('.').pop() === "jpeg"
        || item.split('.').pop() === "svg") {
            var img = {
                "image": "/upload/" + item,
                "folder": '/'
            }
            sorted.push(img);
        }
    }
    res.send(sorted);
});

module.exports = router;