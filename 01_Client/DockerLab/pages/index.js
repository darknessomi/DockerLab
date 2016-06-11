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
} from 'react-native';

export default class Index extends Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let that = this;
    AV.User.currentAsync().then((currentUser)=>{
      that.user = currentUser;
      AV.Cloud.run("home", {}, {
          success: function(result) {
            that.setState({
              avatar: that.user.get("avatar")?that.user.get("avatar").get("url"):"",
              nickName: that.user.get("nickName")?that.user.get("nickName"):"",
              hostNumber: result.Hosts?result.Hosts.length:0,
              AlertNumber: result.Alert?result.Alert:0,
              UseNumber: result.Use?result.Use:0,
              DLNumber: result.DL?result.DL:0,
              ContainerNumber: result.Container?result.Container.length:0,
              ImageNumber: result.Image?result.Image.length:0,
            })
          },
          error: function(error) {
              alert(error.message);
          }
      });
    }).catch((error)=> {
      console.log(error);
      alert("Login Error: ", error.message);
    });
  }

  gotoHost() {
    this.props.navigator.push({
      ref: 'host',
      title: 'Host',
      component: Route.getPageHost(),
    })
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.topuser}>
          <View style={styles.avatarbox}>
            <Image style={[styles.avatar]} source={{uri:this.state?this.state.avatar:""}}></Image>
          </View>
          <Text style={[styles.nickname]}>hi, {this.state?this.state.nickName:""}</Text>
          <Text style={[styles.setting]} onPress={() => this.props.navigator.push({
              ref: 'setting',
              title: 'Setting',
              component: Route.getPageSetting(),
            })}>
            <Image style={[styles.setting]} source={require('.././img/gear.png')}></Image>
          </Text>
        </View>
        <ScrollView>
        <View style={styles.container}>
          <View style={[styles.sbu_red, styles.sbu_view]}>
            <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}}>
              <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
                <View style={[styles.sub_con_flex, styles.sub_text]}>
                  <Text style={[styles.font16]} onPress={() => this.gotoHost()}>主机</Text>
                </View>
                <View style={[styles.sub_con_flex]}>
                  <Image style={[styles.sbu_icon_img]} source={require('.././img/computer.png')}></Image>
                </View>
              </View>
            </TouchableHighlight>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]} onPress={() => this.gotoHost()}>数量</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]} onPress={() => this.gotoHost()}>报警</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]} onPress={() => this.gotoHost()}>{this.state?this.state.hostNumber:0}</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]} onPress={() => this.gotoHost()}>{this.state?this.state.AlertNumber:0}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.sbu_view, styles.sbu_blue]}>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>镜像</Text>
              </View>
              <View style={[styles.sub_con_flex]}>
                <Image style={[styles.sbu_icon_img]} source={require('.././img/image.png')}></Image>
              </View>
            </View>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>数量</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>使用量</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>{this.state?this.state.ImageNumber:0}</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>{this.state?this.state.DLNumber:0}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.sbu_view, styles.sbu_green]}>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>容器</Text>
              </View>
              <View style={[styles.sub_con_flex]}>
                <Image style={[styles.sbu_icon_img]} source={require('.././img/cc.png')}></Image>
              </View>
            </View>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>数量</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>运行</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>{this.state?this.state.ContainerNumber:0}</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>{this.state?this.state.UseNumber:0}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.sbu_view, styles.sbu_yellow]}>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>系统</Text>
              </View>
              <View style={[styles.sub_con_flex]}>
                <Image style={[styles.sbu_icon_img]} source={require('.././img/xitong.png')}></Image>
              </View>
            </View>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>日志</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>负载</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>流量</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>更多</Text>
              </View>
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  // body
    body:{
      backgroundColor:'#F2F2F2',
    },
  // topuser
    topuser:{
      flex:1,
      height:80,
      marginTop:64,
      backgroundColor:'#58A6FE',
      flexDirection: 'row'
    },
    avatarbox:{
      flex:1,
    },
    avatar:{
      marginLeft: 20,
      width:62,
      height:62,
      borderRadius: 31,
    },
    setting:{
      marginRight: 20,
      width:40,
      height:40
    },
    nickname:{
      flex:2,
      fontSize:16,
      color:'#FFF',
      fontWeight:'500',
      paddingTop:10,
      // backgroundColor:'#000',
    },
	//container
  	container:{
    	backgroundColor:'#F2F2F2',
      paddingBottom:1000,
    	flex:1,
  	},
  	//sbu
  	sbu_view:{
  		height:84,
  		marginLeft: 5,
  		marginRight:5,
  		borderWidth:1,
  		borderRadius:5,
  		marginBottom:10,
  		flexDirection:'row',
  	},
  	sbu_red:{
  		backgroundColor: '#FA6778',
  		borderColor:'#FA6778',
  		marginTop:20,
  	},

  	sbu_blue:{
  		backgroundColor: '#3D98FF',
  		borderColor:'#3D98FF',
  	},

  	sbu_green:{
  		backgroundColor: '#5EBE00',
  		borderColor:'#5EBE00',
  	},

  	sbu_yellow:{
  		backgroundColor: '#FC9720',
  		borderColor:'#FC9720',
  	},
  	sbu_flex:{
  		flex:1,
  	},
  	sbu_borderRight:{
  		borderColor:'#fff',
  		borderRightWidth: 0.5,
  	},
  	sbu_icon_img:{
  		height:30,
  		width:30,
  		resizeMode:Image.resizeMode.contain,
  	},
  	sub_con_flex:{
  		flex:1,
  		justifyContent: 'center',
  		alignItems: 'center',
  	},
  	sub_text:{
  		justifyContent:'center',
  	},
  	font16:{
  		fontSize:17,
  		color:'#FFF',
  		fontWeight:'900',
  	},
  	sbu_borderBottom:{
  		borderBottomWidth:0.5,
  		borderBottomColor:'#fff',
  	},
  	img_view:{
  		height:62,
  		marginLeft:5,
  		marginRight:5,
  		flexDirection: 'row',
      marginBottom:20,
      backgroundColor:'#fff',
  	},
  	img_flex:{
  		flex:1,
  		borderWidth:1,
  		borderColor:'#ccc',
  	},
  	img_wh: {
  		height:59,
      borderRightWidth:0,
  		resizeMode:Image.resizeMode.contain,
  	},
});
