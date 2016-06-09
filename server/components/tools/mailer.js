/**
 * Created by oladapo on 09/06/2016.
 */
'use strict';

var request = require('request');

exports.sendWelcomeSMS = function(artisan, next) {
  var __message = 'Hello ' + [artisan.firstName, artisan.surname].join(' ') + ', your Craft Direct profile has just' +
    ' been created.';
  
  var destination = (artisan.phone.indexOf("0") == 0 ? artisan.phone : "0"+artisan.phone).substr(0, 11);
  
  var url = 'http://www.smslive247.com/http/index.aspx?cmd=sendquickmsg&owneremail='+process.env.SMS_OWNER_EMAIL+'&subacct='+process.env.SMS_SUB_ACCOUNT+'&subacctpwd='+process.env.SMS_SUB_ACCOUNT_PASSWORD+'&message='+__message+'&sender='+process.env.SMS_SENDER+'&sendto='+destination+'&msgtype='+process.env.SMS_MSG_TYPE;
  
  request(url, function(error, resp, body) {
    return next(error);
  });
};
