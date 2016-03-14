var UTIL = {
    VALIDDATE: function (d) {
        if (Object.prototype.toString.call(d) !== "[object Date]") {
            return false;
        }
        return !isNaN(d.getTime());
    },
    PERCENT: function (num) {
        return 100 * num + "%";
    },
    TIMESTRING: function (date) {
        if (UTIL.VALIDDATE(date)) {
            var result = date.getHours().toString();
            if (date.getHours() < 10) {
                result = "0" + result;
            }
            if (date.getMinutes() < 10) {
                result = result + ":0" + date.getMinutes().toString();
            } else {
                result = result + ":" + date.getMinutes().toString();
            }
            if (date.getSeconds() < 10) {
                result = result + ":0" + date.getSeconds().toString();
            } else {
                result = result + ":" + date.getSeconds().toString();
            }
            return result;
        } else {
            return "";
        }
    },
    SHORTTIMESTRING: function (date) {
        if (UTIL.VALIDDATE(date)) {
            var result = date.getHours().toString();
            if (date.getMinutes() < 10) {
                result = result + ":0" + date.getMinutes().toString();
            } else {
                result = result + ":" + date.getMinutes().toString();
            }
            return result;
        } else {
            return "";
        }
    },
    DATESTRING: function (date) {
        if (UTIL.VALIDDATE(date)) {
            var result = date.getFullYear().toString();
            if (date.getMonth() + 1 < 10) {
                result = result + "-0" + (date.getMonth() + 1).toString();
            } else {
                result = result + "-" + (date.getMonth() + 1).toString();
            }
            if (date.getDate() < 10) {
                result = result + "-0" + date.getDate().toString();
            } else {
                result = result + "-" + date.getDate().toString();
            }
            return result;
        } else {
            return "";
        }
    },
    SHORTDATESTRING: function (date) {
        if (UTIL.VALIDDATE(date)) {
            var result = (date.getMonth() + 1).toString();
            if (date.getDate() < 10) {
                result = result + "-0" + date.getDate().toString();
            } else {
                result = result + "-" + date.getDate().toString();
            }
            return result;
        } else {
            return "";
        }
    },
    CHATDATETIMESTRING: function (date) {
        if (UTIL.VALIDDATE(date)) {
            var now = new Date();
            if (date.toDateString() == now.toDateString()) {
                return this.SHORTTIMESTRING(date);
            } else if (now.getTime() - date.getTime() < now.getDay() * 24 * 60 * 60 * 1000) {
                return CONST.DAYOFWEEK[date.getDay()];
            } else {
                return this.SHORTDATESTRING(date);
            }
        } else {
            return "";
        }
    },
    DATEANDTIME: function (date) {
    	if (UTIL.VALIDDATE(date)) {
    		var result = UTIL.DATESTRING(date) + "\n" + UTIL.TIMESTRING(date);
    		return result;
    	} else {
    		return "";
    	}
    },
    DATETTIME: function (date) {
        if (UTIL.VALIDDATE(date)) {
            var result = UTIL.DATESTRING(date) + "T" + UTIL.TIMESTRING(date);
            return result;
        } else {
            return "";
        }
    },
    DATEANDTIMECST: function (date) {
        datestr = date.split("T");
        var result = datestr[0] + "\n" + datestr[1] + " GMT+0800 (CST)";
        return result;
    },
    etLength: function (str) {
        var len = str.length;
        var reLen = 0;
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
                reLen += 2;
            } else {
                reLen++;
            }
        }
        return reLen;
    },
};
