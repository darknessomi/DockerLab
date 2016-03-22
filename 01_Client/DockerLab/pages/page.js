/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var AV = require('./../common/init');
var UTIL = require('./../common/UTIL');
var Route = require('./route');

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

var Page = React.createClass({
  getInitialState: function() {
    return null;
  },
  componentDidMount: function () {
    var that = this;
    AV.User.currentAsync().then((currentUser)=>{
      that.user = currentUser;
      if (that.user) {
        that.props.navigator.replace({
          title: '',
          component: Route.getPageIndex(),
        });
      } else {
        that.props.navigator.push({
          ref: 'login',
          title: 'Login',
          component: Route.getPageLogin(),
          leftButtonTitle: ' ',
        });
      }
    }).catch(function(error) {
      alert("Login Error: ", error.message);
    });
  },
  render: function() {
    return null;
  }
});

module.exports = Page;
