var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/', function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'helloworldcoffeeshop@gmail.com',
            pass: 'kimyen2209'
        }
    });
    var mainOptions = {
        from: 'HelloWorldCoffeeShop',
        to: 'huy.nguyen22994@gmail.com',
        subject: 'Mail of Customer',
        text: 'You recieved message from ' + req.body.email,
        html: '<p>You have got a new message</b><ul><li>Username:' + req.body.name + '</li><li>Email:' + req.body.email + '</li><li>Username:' + req.body.message + '</li></ul>'
    }
    transporter.sendMail(mainOptions, function(err, info){
        if(err){
            console.log(err);
            res.end(err);
        } else {
            console.log('message info: ' + info.response);
            res.end(info.response);
        }
    });
});

module.exports = router;