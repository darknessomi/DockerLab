var AV = require('avoscloud-sdk');
var CONST = require('./CONST');

AV.init({
  appId: CONST.APPID,
  appKey: CONST.APPKEY
});
AV.Promise.setPromisesAPlusCompliant(true);

module.exports = AV;