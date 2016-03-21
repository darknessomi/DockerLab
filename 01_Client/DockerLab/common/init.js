var AV = require('avoscloud-sdk');
var CONST = require('./CONST');

AV.initialize(CONST.APPID, CONST.APPKEY);
AV.Promise.setPromisesAPlusCompliant(true);

module.exports = AV;