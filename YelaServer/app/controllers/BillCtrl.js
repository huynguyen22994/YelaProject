var models = require('../models');
var async = require('async');
var _ = require('underscore');
var path = require('path');
//var app = require(path.resolve( "../../YelaProject/YelaServer/server.js" ));
//var socketClient = app.socketClient;


function getTotalPrice(foodList) {
    let totalPrice = 0;
    if(Array.isArray(foodList)) {
        for(let i = 0; i < foodList.length; i++) {
            totalPrice = totalPrice + (foodList[i].price * foodList[i].quantity);
        }
        return totalPrice;
    } else {
        return foodList;
    }
};

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};

function getDateFormatted(dateString) {
    var date = new Date(dateString);
    return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' | ' + formatAMPM(date);
};

function updateBillNotice(data) {
    //socketClient.emit('onNewBill', data);
}

function getItemObjFormatted(itemsString) {
    if(itemsString) {
        var itemObject = JSON.parse(itemsString);
        itemObject.totalPrice = getTotalPrice(itemObject.foods);
        itemObject.totalBill = itemObject.totalPrice + itemObject.shipCost;
        return itemObject;
    } else {
        return itemsString;
    }
}

module.exports.getBills = (req, res, next) => {
    models.Bill.findAndCountAll()
        .then((result) => {
            let responses = {
                count: result.count,
                bills: []
            }
            result.rows.forEach((bill) => {
                var billData = bill.dataValues;
                billData.itemsObject = getItemObjFormatted(billData.items);
                billData.orderDate = getDateFormatted(billData.createdAt);
                responses.bills.push(billData);
            });
            res.json(responses);
        },
        (err) => {
            console.log(err);
        })
};

module.exports.createBill = (req, res, next) => {
    var bill = req.body;
    var status = 'new';
    if (bill) {
        models.Bill.create({
            status: status,
            customerId: bill.customerId,
            deliveryStatus: bill.deliveryStatus,
            items: bill.items,
            customerName: bill.customerName,
            phoneOne: bill.phoneOne,
            phoneTwo: bill.phoneTwo,
            email: bill.email,
            city: bill.city,
            district: bill.district,
            address: bill.address,
            description: bill.description
        }).then((result) => {
            let data = result.dataValues;
            if(data) {
                data.itemsObject = getItemObjFormatted(data.items);
                data.orderDate = getDateFormatted(data.createdAt);
                updateBillNotice(data);
                res.json(data);
            } else {
                res.statusCode = 400;
                res.end();
            }
        }, (err) => {
            res.statusCode = 400;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.updateBill = (req, res, next) => {
    var bill = req.body;
    if (bill) {
        models.Bill.update(
            {
                status: bill.status,
                customerId: bill.customerId,
                deliveryStatus: bill.deliveryStatus,
                items: bill.items,
                customerName: bill.customerName,
                phoneOne: bill.phoneOne,
                phoneTwo: bill.phoneTwo,
                email: bill.email,
                city: bill.city,
                district: bill.district,
                address: bill.address,
                description: bill.description
            },
            {
                where: {
                    billId: bill.billId
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

module.exports.getBillByStatus = (req, res, next) => {
    var status = req.query.status;
    models.Bill.findAndCountAll({
    where: {
        status: status
    }
    })
    .then((result) => {
        let responses = {
            count: result.count,
            bills: []
        }
        result.rows.forEach((bill) => {
            var billData = bill.dataValues;
            billData.itemsObject = getItemObjFormatted(billData.items);
            billData.orderDate = getDateFormatted(billData.createdAt);
            responses.bills.push(billData);
        });
        res.json(responses);
    }, (err) => {
        res.statusCode = 400;
        res.end();
    });
};