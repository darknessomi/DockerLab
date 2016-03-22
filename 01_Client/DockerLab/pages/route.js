/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var AV = require('./../common/init');
var UTIL = require('./../common/UTIL');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    Alert
} = React;

var Route = {
  getPageSetting: function() {
    return require('./setting');
  },
  getPageLogin: function() {
    return require('./login');
  },
  getPageIndex: function() {
    return require('./index');
  },
};

module.exports = Route;
