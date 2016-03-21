'use strict';

var React = require('react-native');
var Index = require('./pages/index');
var Login = require('./pages/login');
var AV = require('./common/init');
var CONST = require('./common/CONST');
require('./pages/page');

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
            component: Index,
            rightButtonTitle: 'LogOut',
            onRightButtonPress: () => {Alert.alert(
              'LogOut?',
              '',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                {text: 'OK', onPress: () => {AV.User.logOut();}},
              ]
            )},
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
