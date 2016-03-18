var AV = require('avoscloud-sdk');
var CONST = require('./CONST');

AV.initialize(CONST.APPID, CONST.APPKEY);

module.exports = AV;