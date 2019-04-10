var nodemailer = require('nodemailer');
var fs = require('fs');
var data = fs.readFileSync('./config/config.json');
var async = require('async');
var dataConfig = JSON.parse(data.toString());
var config = dataConfig.yelaEmail;

/////////////////////////////////////////////////////////
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.email,
        pass: config.password
    }
});

var sub_transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: config.sub_email,
      pass: config.password
  }
});

function getNowDateFormatted () {
  var date = new Date();
  var dateString = date.toLocaleDateString();
  var time = date.getHours() + ':' + date.getMinutes();
  return dateString + ' [' + time + '] ';
};

function getProductOrder(orderObject) {
  if(orderObject) {
    if(orderObject.foods && Array.isArray(orderObject.foods)) {
      var productOrderStr = '';
      for(var i = 0; i < orderObject.foods.length; i++) {
        productOrderStr = productOrderStr + orderObject.foods[i].name + ', ';
      }
      return productOrderStr;
    } else {
      return orderObject;
    }
  } else {
    return orderObject;
  }
};

module.exports.sendLetterMail = (customerEmail) => {
    var mainOptions = {
        from: 'FoodTech Shop',
        to: customerEmail,
        subject: 'Cám ơn bạn vì đã góp ý để giúp chúng tôi cải thiện tốt hơn.',
        text: 'FoodTech',
        html: `
        <table width="100%" cellpadding="10" cellspacing="0" border="0" bgcolor="#f3f6f8" style="margin:30px 0;padding:0;background: antiquewhite">
        <tbody>
          <tr>
            <td>
              <table width="570" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="background:#ffffff;border:1px solid #e3eaef;margin:0 auto;min-width:570px">
                <tbody>
                  <tr>
                    <td>
                      <table width="100%" cellpadding="0" cellspacing="0" style="padding:15px 30px;border-bottom-width:1px;border-bottom-color:#e9eff3;border-bottom-style:solid;text-align:center">
                        <tbody>
                          <tr>
                            <td valign="top" align="center">
                              <img src="http://www.foodtechshop.vn/images/home/logo.png" alt="foodtechshop.vn">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      
                      <table cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td style="font:18px/26px 'Helvetica Neue',sans-serif;padding:30px 60px 50px">
                              <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                                FoodTech chân thành cám ơn bạn vì đã đóng góp ý kiến giúp chúng tôi có thể phát triển hơn.
                              
                              </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table width="570" align="center" cellpadding="0" cellspacing="0" style="margin:0 auto">
              <tbody>
                <tr>
                  <td align="center" style="font:14px/20px sans-serif;color:#668eaa;padding:20px 0 10px">
                    Trân Trọng, FoodTech Shop	</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
        `
    };
    var promise = new Promise(function(resolve, reject) {
        var result= {
            msg: '',
            success: false
        };
        transporter.sendMail(mainOptions, function(err, info){
            if(err){
                result.msg = 'Send mail fail';
                result.success = false;
                reject(result);
            } else {
                result.msg = 'Send mail success';
                result.success = true;
                resolve(result);
            }
        });
    });
    return promise;
};

module.exports.sendOrderMail = (orderData) => {
  // var nowTimeString = orderData.orderDate || getNowDateFormatted();
  var nowTimeString = getNowDateFormatted();
  var productOrder = getProductOrder(orderData.itemsObject);
  var orderOptions = {
      from: 'FoodTechOrderService',
      to: config.email,
      subject: nowTimeString + ' - Đơn Hàng Mới (' + orderData.customerName + ')',
      text: 'FoodTech',
      html: `
      <table width="100%" cellpadding="10" cellspacing="0" border="0" bgcolor="#f3f6f8" style="margin:30px 0;padding:0;background: antiquewhite">
      <tbody>
        <tr>
          <td>
            <table width="570" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="background:#ffffff;border:1px solid #e3eaef;margin:0 auto;min-width:570px">
              <tbody>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" style="padding:15px 30px;border-bottom-width:1px;border-bottom-color:#e9eff3;border-bottom-style:solid;text-align:center">
                      <tbody>
                        <tr>
                          <td valign="top" align="center">
                            <img src="http://www.foodtechshop.vn/images/home/logo.png" alt="foodtechshop.vn">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    
                    <table cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td style="font:18px/26px 'Helvetica Neue',sans-serif;padding:30px 60px 50px">
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                              `
                                + 'Mã Đơn Hàng: ' + orderData.billId +
                              `
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                              `
                                + 'Tên Khách Hàng: ' + orderData.customerName +
                              `
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                            `
                              + 'Số Điện Thoại 1: ' + orderData.phoneOne +
                            `
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                            `
                              + 'Số Điện Thoại 2: ' + orderData.phoneTwo +
                            `
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                            `
                              + 'Email: ' + orderData.email +
                            `
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                            `
                              + 'Địa Chỉ: ' + orderData.address +
                            `
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                            `
                              + 'Thành Phố: ' + orderData.city + ' Quận: ' + orderData.district +
                            `
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:18px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                            `
                              + 'Sản Phẩm: ' + productOrder +
                            `
                            </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table width="570" align="center" cellpadding="0" cellspacing="0" style="margin:0 auto">
            <tbody>
              <tr>
                <td align="center" style="font:14px/20px sans-serif;color:#668eaa;padding:20px 0 10px">
                  Trân Trọng, FoodTech Shop	</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
      `
  };
  var promise = new Promise(function(resolve, reject) {
      var result= {
          msg: '',
          success: false
      };
      sub_transporter.sendMail(orderOptions, function(err, info){
          if(err){
              result.msg = 'Send mail fail';
              result.success = false;
              reject(result);
          } else {
              result.msg = 'Send mail success';
              result.success = true;
              resolve(result);
          }
      });
  });
  return promise;
};

module.exports.sendActiveAccountMail = (pendingCustomer) => {
  var activeOptions = {
    from: 'FoodTech Service',
    to: pendingCustomer.email,
    subject: 'Kích hoạt tài khoản FoodTech Shop',
    text: 'FoodTech',
    html: `
      <table width="100%" cellpadding="10" cellspacing="0" border="0" bgcolor="#f3f6f8" style="margin:30px 0;padding:0;background: antiquewhite">
      <tbody>
        <tr>
          <td>
            <table width="570" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="background:#ffffff;border:1px solid #e3eaef;margin:0 auto;min-width:570px">
              <tbody>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" style="padding:15px 30px;border-bottom-width:1px;border-bottom-color:#e9eff3;border-bottom-style:solid;text-align:center">
                      <tbody>
                        <tr>
                          <td valign="top" align="center">
                            <img src="http://www.foodtechshop.vn/images/home/logo.png" alt="foodtechshop.vn">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    
                    <table cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td style="font:18px/26px 'Helvetica Neue',sans-serif;padding:30px 60px 50px">
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                              `
                                + 'Cám ơn bạn ' + pendingCustomer.displayName + ' đã đăng ký. Để hoành thành việc đăng ký, bạn vui lòng giúp chúng tôi bấm vào nút kích hoạt nhé.' +
                              `
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;margin-bottom:25px;direction:ltr;font:18px/26px sans-serif;margin-top:0;color:#4f748e;padding:0">
                              <a href="`
                               + 'http://localhost:3000/#/active-account/' + pendingCustomer.token + '/' + pendingCustomer.customerId + '/' + pendingCustomer.email +
                              `"
                              target="_blank"
                              style="background: #ff8080;border-radius: 0;color: #FFFFFF;padding: 6px 25px;font-family: 'Roboto', sans-serif">
                              Kích hoạt
                              </a>
                            </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table width="570" align="center" cellpadding="0" cellspacing="0" style="margin:0 auto">
            <tbody>
              <tr>
                <td align="center" style="font:14px/20px sans-serif;color:#668eaa;padding:20px 0 10px">
                  Trân Trọng, FoodTech Team	</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
      `
  };

  var promise = new Promise(function(resolve, reject) {
      var result= {
          msg: '',
          success: false
      };
      transporter.sendMail(activeOptions, function(err, info){
          if(err){
              result.msg = 'Send mail fail';
              result.success = false;
              reject(result);
          } else {
              result.msg = 'Send mail success';
              result.success = true;
              resolve(result);
          }
      });
  });
  return promise;
};