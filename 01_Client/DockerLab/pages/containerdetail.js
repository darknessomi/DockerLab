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
    Alert,
    NavigatorIOS,
    ListView,
    ScrollView
} from 'react-native';

export default class ContainerDetail extends Component{
  constructor(props) {
    super(props);
    this.list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.list.cloneWithRows(['host']),
    };
  }

  componentDidMount() {
    let that = this;
    let HostQuery = new AV.Query("Container");
    HostQuery.equalTo("active", 1);
    HostQuery.equalTo("objectId", that.props.id);
    HostQuery.include("host");
    HostQuery.include("image");
    HostQuery.addDescending("createdAt");
    HostQuery.find().then(function(Hosts) {
      if (Hosts.length > 0) {
          let hostname = [];
          hostname.push("Name: " + Hosts[0].get("name"));
          hostname.push("Host: " + Hosts[0].get("host").get("name"));
          hostname.push("Port: " + Hosts[0].get("port"));
          hostname.push("Address: " + Hosts[0].get("host").get("address"));
          hostname.push("Image: " + Hosts[0].get("image").get("name"));
          hostname.push("Status: " + (Hosts[0].get("use")?"start":"stop"));
          that.setState({
              status : Hosts[0].get("use")?"stop":"start",
              host : Hosts[0],
              dataSource: that.list.cloneWithRows(hostname)
          });
        }
    }, function(error){
      console.log(error);
      alert("Error: ", error.message);
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={styles.list}><Text style={styles.text}>{rowData}</Text></View>}
        />
        <Text style={styles.button} onPress={() => Alert.alert(
            this.state?this.state.status:"null",
            '',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => {
                this.state.host.set("use", (this.state.host.get("use")?0:1));
                let that = this;
                this.state.host.save().then(function() {
                    alert("success");  
                    that.componentDidMount();
                }, function(error) {
                    console.log(error);
                    alert("Error: ", error.message);
                });
              }},
            ]
          )}>
          {this.state?this.state.status:"null"}
        </Text>
      </ScrollView>
    );
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

