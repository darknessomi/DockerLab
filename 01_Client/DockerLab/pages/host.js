/*
* @Author: omi
* @Date:   2016-06-11 21:44:28
* @Last Modified by:   omi
* @Last Modified time: 2016-06-11 23:52:29
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
    Alert,
    NavigatorIOS,
    ListView,
    ScrollView
} from 'react-native';

export default class Host extends Component{
  constructor(props) {
    super(props);
    this.list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state = {
      dataSource: this.list.cloneWithRows(['host']),
    };
  }

  componentDidMount() {
  	let that = this;
    AV.User.currentAsync().then((currentUser)=>{
    	let HostQuery = new AV.Query("Host");
	    HostQuery.equalTo("active", 1);
	    HostQuery.equalTo("creater", currentUser);
	    HostQuery.addDescending("createdAt");
	    HostQuery.find().then(function(Hosts) {
	    	if (Hosts.length > 0) {
	    		let hostname = [];
	            for (let i = Hosts.length - 1; i >= 0; i--) {
	                hostname.push(Hosts[i].get("name") + "   " +Hosts[i].get("address"))
	            }
		        that.setState({
		        	host : Hosts,
			      	dataSource: that.list.cloneWithRows(hostname)
			    });
	        }
	    }, function(error){
            console.log(error);
      		alert("Error: ", error.message);
        });
    }).catch((error)=> {
      console.log(error);
      alert("Error: ", error.message);
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => <TouchableHighlight onPress={() => this.gotoHostDetail(rowID, this.state.host)}>
  			<View style={styles.list}><Text style={styles.text}>{rowData}</Text><Image resizeMode='contain' style={styles.img} source={require('../img/right.png')}></Image></View>
  		</TouchableHighlight>}
        />
      </ScrollView>
    );
  }

  gotoHostDetail(id, host) {
  	let i = parseInt(id);
  	alert(host[i].id)
    // this.props.navigator.push({
    //   ref: 'host',
    //   title: 'Host',
    //   component: Route.getPageHost(),
    // })
  }


};
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

