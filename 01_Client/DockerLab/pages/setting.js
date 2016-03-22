/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var AV = require('./../common/init');
var Route = require('./route');
var {
  	StyleSheet,
  	Text,
    TextInput,
  	View,
  	Image,
  	TouchableHighlight,
    Alert,
    NavigatorIOS,
    ListView,
    ScrollView
} = React;
var Setting = React.createClass({
  getInitialState: function() {
    var User = AV.Object.extend("User");
    var list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: list.cloneWithRows(['Request', 'About']),
    }
  },
  render: function() {
    return (
      <ScrollView style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={styles.list}><Text style={styles.text}>{rowData}</Text><Image resizeMode='contain' style={styles.img} source={require('../img/right.png')}></Image></View>}
        />
        <Text style={styles.button} onPress={() => Alert.alert(
            'LogOut?',
            '',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => {
                AV.User.logOut();
                this.props.navigator.push({
                  ref: 'login',
                  title: 'Login',
                  component: Route.getPageLogin(),
                  leftButtonTitle: ' ',
                });
              }},
            ]
          )}>
          Sign Out
        </Text>
      </ScrollView>
    );
  }
});
var styles = StyleSheet.create({
	//container
  	container:{
    	flex:1,
      backgroundColor:'#F2F2F2',
      paddingTop:25,
    },
  //list
    list:{
      flexDirection: 'row',
      backgroundColor:'#fff',
      borderColor:'#F2F2F2',
      borderBottomWidth: 1,
    },
  //img
    img:{
      flex:1,
      height: 15,
      alignSelf: 'center'
    },
  //text
    text:{
      flex:10,
      height: 40,
      paddingLeft:15,
      paddingTop:10,
      color: '#333',
      backgroundColor:'#fff',
      borderColor:'#F2F2F2',
      borderBottomWidth: 0.5,
    },
  //button
    button:{
      height: 40,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:10,
      marginTop:15,
      textAlign: 'center',
      color: '#333',
      fontSize: 16,
      backgroundColor:'#fff',
    },
});



module.exports = Setting;
