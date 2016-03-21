/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var AV = require('./../common/init');
var Login = require('./login');

var {
  	StyleSheet,
  	Text,
    TextInput,
  	View,
  	Image,
  	TouchableHighlight,
    ScrollView,
} = React;

var BUIcon = [
	'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/%E6%9C%AA%E6%A0%87%E9%A2%98-1.png',
	'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/feiji.png',
	'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/lvyou.png',
	'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/gonglue.png'

];

var Images = [
	'http://webresource.c-ctrip.com/ResCRMOnline/R5/html5/images/zzz_pic_salead01.png',
	'http://images3.c-ctrip.com/rk/apph5/B1/201505/app_home_ad06_310_120.jpg'
];

var sliderImgs = [
  'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
  'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
  'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
];

var Index = React.createClass({
  getInitialState: function() {
    return null;
  },
  componentDidMount: function () {
    var that = this;
    AV.User.currentAsync().then((currentUser)=>{
      that.user = currentUser;
      if (!that.user) {
        that.props.navigator.push({
          ref: 'login',
          title: 'Login',
          component: Login,
          leftButtonTitle: ' '
        });
      } else {
        that.setState({
          avatar: that.user.get("avatar")?that.user.get("avatar")._url:"",
          nickName: that.user.get("nickName")?that.user.get("nickName"):""
        })
      }
    }).catch(function(error) {
      alert("Login Error: ", error.message);
    });
  },
  render: function() {
    return (
      <View style={styles.body}>
        <View style={styles.topuser}>
          <View style={styles.avatarbox}>
            <Image style={[styles.avatar]} source={{uri:this.state?this.state.avatar:""}}></Image>
          </View>
          <Text style={[styles.nickname]}>hi, {this.state?this.state.nickName:""}</Text>
        </View>
        <ScrollView>
        <View style={styles.container}>
          <View style={[styles.sbu_red, styles.sbu_view]}>
          	<TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}}>
  	        	<View style={[styles.sbu_flex, styles.sbu_borderRight]}>
  	        		<View style={[styles.sub_con_flex, styles.sub_text]}>
  	        			<Text style={[styles.font16]}>酒店</Text>
  	        		</View>
  	        		<View style={[styles.sub_con_flex]}>
  	        			<Image style={[styles.sbu_icon_img]} source={{uri:BUIcon[0]}}></Image>
  	        		</View>
  	        	</View>
  	        </TouchableHighlight>
          	<View style={[styles.sbu_flex, styles.sbu_borderRight]}>
          		<View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
          			<Text style={[styles.font16]}>海外</Text>
          		</View>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>周边</Text>
          		</View>
          	</View>
          	<View style={[styles.sbu_flex]}>
          		<View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
          			<Text style={[styles.font16]}>团购.特惠</Text>
          		</View>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>客栈.公寓</Text>
          		</View>
          	</View>
          </View>

          <View style={[styles.sbu_view, styles.sbu_blue]}>
          	<View style={[styles.sbu_flex, styles.sbu_borderRight]}>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>机票</Text>
          		</View>
          		<View style={[styles.sub_con_flex]}>
          			<Image style={[styles.sbu_icon_img]} source={{uri:BUIcon[1]}}></Image>
          		</View>
          	</View>
          	<View style={[styles.sbu_flex, styles.sbu_borderRight]}>
          		<View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
          			<Text style={[styles.font16]}>火车票</Text>
          		</View>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>接收机</Text>
          		</View>
          	</View>
          	<View style={[styles.sbu_flex]}>
          		<View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
          			<Text style={[styles.font16]}>汽车票</Text>
          		</View>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>自驾.专车</Text>
          		</View>
          	</View>
          </View>

          <View style={[styles.sbu_view, styles.sbu_green]}>
          	<View style={[styles.sbu_flex, styles.sbu_borderRight]}>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>旅游</Text>
          		</View>
          		<View style={[styles.sub_con_flex]}>
          			<Image style={[styles.sbu_icon_img]} source={{uri:BUIcon[2]}}></Image>
          		</View>
          	</View>
          	<View style={[styles.sbu_flex, styles.sbu_borderRight]}>
          		<View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
          			<Text style={[styles.font16]}>门票.玩乐</Text>
          		</View>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>出境WiFi</Text>
          		</View>
          	</View>
          	<View style={[styles.sbu_flex]}>
          		<View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
          			<Text style={[styles.font16]}>邮轮</Text>
          		</View>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>签证</Text>
          		</View>
          	</View>
          </View>
          <View style={[styles.sbu_view, styles.sbu_yellow]}>
          	<View style={[styles.sbu_flex, styles.sbu_borderRight]}>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>攻略</Text>
          		</View>
          		<View style={[styles.sub_con_flex]}>
          			<Image style={[styles.sbu_icon_img]} source={{uri:BUIcon[3]}}></Image>
          		</View>
          	</View>
          	<View style={[styles.sbu_flex, styles.sbu_borderRight]}>
          		<View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
          			<Text style={[styles.font16]}>周末游</Text>
          		</View>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>礼品卡</Text>
          		</View>
          	</View>
          	<View style={[styles.sbu_flex]}>
          		<View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
          			<Text style={[styles.font16]}>美食.购物</Text>
          		</View>
          		<View style={[styles.sub_con_flex, styles.sub_text]}>
          			<Text style={[styles.font16]}>更多</Text>
          		</View>
          	</View>
          </View>
          <View style={[styles.img_view]}>
          	<View style={[styles.img_flex, {borderRightWidth:0.5}]}>
          		<Image style={[styles.img_wh]} source={{uri:Images[0]}}></Image>
          	</View>
          	<View style={[styles.img_flex, {borderLeftWidth:0,}]}>
              <Image style={[styles.img_wh]} source={{uri:Images[1]}}></Image>
          	</View>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
});
var styles = StyleSheet.create({
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
      marginTop:-64,
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
  		height:40,
  		width:40,
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



module.exports = Index;
