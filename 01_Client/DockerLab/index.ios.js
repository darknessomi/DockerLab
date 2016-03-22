'use strict';

var React = require('react-native');
var Index = require('./pages/index');
var Login = require('./pages/login');
var AV = require('./common/init');
var CONST = require('./common/CONST');
var Page = require('./pages/page');

var {
    NavigatorIOS,
    AppRegistry,
    StyleSheet,
    Alert
} = React;

var NV = React.createClass({
    render: function(){
      return(
        <NavigatorIOS
          ref="index"
          style={styles.container}
          barTintColor='#3D98FF'
          titleTextColor='#fff'
          tintColor='#fff'
          shadowHidden ture
          initialRoute={{
            title: '',
            component: Page,
          }}
          />
      );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('DockerLab', () => NV);
