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
  Alert,
  NavigatorIOS
} from 'react-native';

export default class Login extends Component{
  login() {
    let User = AV.Object.extend("User");
    let that = this;
    User.logIn(this.state.username, this.state.password).then((currentUser)=>{
      Alert.alert('Success',
        'Welcome back',
        [
          {text: 'OK'},
        ]
      )
      that.props.navigator.resetTo({
        title: '',
        component: Route.getPageIndex(),
      });
    }).catch(function(error) {
      Alert.alert('Error',
        error.message,
        [
          {text: 'OK'},
        ]
      )
    });
  }
  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../img/logo.jpg')}></Image>
        <TextInput
          clearButtonMode='while-editing'
          placeholder='Username'
          style={styles.input}
          onChangeText={(text) => this.setState({username:text})}
        />
        <TextInput
          clearButtonMode='while-editing'
          clearTextOnFocus true
          enablesReturnKeyAutomatically true
          secureTextEntry true
          returnKeyType='done'
          placeholder='Password'
          style={styles.input}
          onChangeText={(text) => this.setState({password:text})}
          onSubmitEditing={() => this.login()}
        />
        <Text style={styles.button} onPress={() => this.login()}>
          Sign In
        </Text>
      </View>
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
	//container
  	container:{
    	flex:1,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:15,
      marginTop:64,
  	},
  //input
    input:{
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingLeft:15,
      paddingRight:15,
      marginTop:20,
    },
  //logo
    logo:{
      width: 120,
      height: 120,
      alignSelf: 'center'
    },
  //button
    button:{
      height: 40,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:10,
      marginTop:20,
      textAlign: 'center',
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor:'#3D98FF',
    },
});

