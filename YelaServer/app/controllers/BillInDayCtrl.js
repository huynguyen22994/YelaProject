var async = require('async');
var _ = require('underscore');
var fs = require('fs');
var path = './bill_data/';

function addBill(newBill, BillDataInDayObj) {
    BillDataInDayObj[newBill.id] = newBill;
    return BillDataInDayObj;
}

function readBillFile(filePath, res, newBillObj) {
    fs.readFile(filePath, function(err, data) {
        var dataObj = JSON.parse(data.toString());
        var updatedBillInDay = addBill(newBillObj, dataObj);
        fs.writeFile(filePath, JSON.stringify(updatedBillInDay), function (err) {
            if (err) throw err;
            res.json({
                status: 'success',
                data: updatedBillInDay
            });
          });
    });
}

function wiriteBillFile(filePath, res, newBillObj) {
    var dataObj = addBill(newBillObj, {});
    fs.appendFile(filePath, JSON.stringify(dataObj), function (err) {
        if (err) throw err;
        res.json({
            status: 'success',
            data: dataObj
        });
      });
}

function readFileList(list) {
    var resultObj = {
        billList: []
    };
    var promise = new Promise(function (resolve, reject) {
        _.forEach(list, function(file, index) {
            var filePath = path + file;
            var name = file.replace('.txt', '');
            (function(filePath, name, index) {
                fs.readFile(filePath, function(err, data) {
                    var billObj = {};
                    if(err) {
                        billObj[name] = {
                            msg: 'Can not read file.'
                        }
                        resultObj.billList.push(billObj)
                    } else {
                        var dataObj = JSON.parse(data.toString());
                        billObj[name] = dataObj;
                        resultObj.billList.push(billObj)
                    }
                    if(index === (list.length - 1)) {
                        resolve(resultObj);
                    }
                });
            })(filePath, name, index);
        })
    })
    return promise;
}


function readFiles(dirname) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function(err, filenames) {
            if (err) return reject(err);
            return resolve(filenames)
        });
  });
}

module.exports.addBillByDay = (req, res, next) => {
    var billInfo = req.body; 
    var filePath = path + billInfo.date + '.txt';
    var newBillObj = JSON.parse(billInfo.productString);
    newBillObj.status = 'Waiting';
    fs.exists(filePath, function(exists) {
        if (exists) {
            readBillFile(filePath, res, newBillObj);
        } else {
            wiriteBillFile(filePath, res, newBillObj);
        }
    });
};

module.exports.getBillByDay = (req, res, next) => {
    var date = req.query.date;
    var filePath = path + date + '.txt';
    fs.readFile(filePath, function(err, data) {
        if(err) {
            res.json({
                status: 'fail',
                msg: 'can not read file'
            });
        } else {
            var dataObj = JSON.parse(data.toString());
            res.json({
                status: 'success',
                data: dataObj
            });
        }
    });
};

module.exports.updateStatusBillDay = (req, res, next) => {
    var bill = req.body;
    var date = bill.date;
    var billData = JSON.parse(bill.productString.toString());
    var filePath = path + date + '.txt';
    fs.readFile(filePath, function(err, data) {
        if(err) {
            res.json({
                status: 'fail',
                msg: 'can not read file'
            });
        } else {
            var dataObj = JSON.parse(data.toString());
            _.forEach(dataObj, function(value, key) {
                if(value.id === billData.id) {
                    value.status = billData.status;
                }
            })
            fs.writeFile(filePath, JSON.stringify(dataObj), function (err) {
                if (err) {
                    res.json({
                        status: 'fail',
                        msg: 'fail to update'
                    });
                } else {
                    res.json({
                        status: 'success',
                        data: dataObj
                    });
                }
              });
        }
    });
};

module.exports.getAllBillDay = (req, res, next) => {
    readFiles(path).then(function(files) {
        readFileList(files).then(function(resultObj) {
            res.json(resultObj);
        })
    }).catch(function(error) {
        res.json(error);
    })
};