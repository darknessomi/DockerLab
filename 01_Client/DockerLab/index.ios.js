'use strict';

import Index from './pages/index';
import Login from './pages/login';
import CONST from './common/CONST';
import Page from './pages/page';
import AV from './common/init';

import React, { 
    Component,
    PropTypes,
} from 'react';

import {
  NavigatorIOS,
  AppRegistry,
  StyleSheet,
  Alert
} from 'react-native';

export default class NV extends Component{
  render(){
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
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('DockerLab', () => NV);
