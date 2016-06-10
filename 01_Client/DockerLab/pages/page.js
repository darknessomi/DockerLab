/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import AV from './../common/init';
import Route from './route';

import React, { 
    Component,
    PropTypes,
} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Alert
} from 'react-native';

export default class Page extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let that = this;
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
      console.log(error)
      alert("Login Error: ", error.message);
    });
  }
  render() {
    return null;
  }
}

