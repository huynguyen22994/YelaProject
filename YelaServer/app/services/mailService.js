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