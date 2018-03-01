/**
 * Created by xiaoming on 2018/2/11.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import {SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import cookie from '../../services/cookie';
import ToastUtil from '../../services/ToastUtil';
import BaseModel from '../../models/BaseModel';

export default class NavigationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
    };
  }

  componentWillMount() {
    this.getUser();

  }

  componentDidMount() {
    /*注册接收登录成功通知*/
    DeviceEventEmitter.addListener('onSignIn',this.onSignIn);
  }

  componentWillUnmount() {
    /*移除接收登录成功通知*/
    DeviceEventEmitter.removeListener('onSignIn',this.onSignIn);
  }

  onSignIn =()=>{
    this.getUser();
    DeviceEventEmitter.emit('onRefreshHome');
  };

  /*调用注销登录的接口 不管成功还是失败都得刷新一下主页面*/
  async onSignOut(){
   try {
     await BaseModel.logout();
     DeviceEventEmitter.emit('onRefreshHome');
   } catch (e){
     DeviceEventEmitter.emit('onRefreshHome');
   }
  }

  async getUser(){
    try {
      let user = await cookie.getUser();
      if(user){
        this.setState({
          username:user.username
        });
      }
    } catch (e){

    }
  }

  onBtnClick(){
    if(this.state.username){
      this.onSignOut();
      cookie.clear();
      this.setState({
        username: ''
      });
    }else{
      this.props.navigation && this.props.navigation.navigate('Login');
    }
  }

  goToCollectedArticle(){
    if(this.state.username){
      this.props.navigation && this.props.navigation.navigate('DrawerClose');
      this.props.navigation && this.props.navigation.navigate('CollectedArticle',{name:'我的收藏'});
    }else {
      ToastUtil.show('请先登录');
    }
  }

  onAbout(){
    if(this.state.username){
      this.props.navigation && this.props.navigation.navigate('DrawerClose');
      this.props.navigation && this.props.navigation.navigate('AboutUs',{name:'关于我们'});
    }else{
      ToastUtil.show('请先登录');
    }
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.header}>
            <Icon
              style={styles.logo}
              name={'phone-android'}/>
            <Text style={styles.name}>
              {this.state.username}
            </Text>

            <TouchableOpacity
              onPress={()=>this.onBtnClick()}
              style={styles.btn}>
              <Text style={styles.btnText}>
                {
                  this.state.username
                    ? '退出登录'
                    : '点击登录'
                }
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={()=>this.goToCollectedArticle()}>
              <View style={styles.item}>
                <Icon
                  style={styles.icon}
                  name={'star'}/>
                <Text style={styles.title}>
                  {'我喜欢的'}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>this.onAbout()}>
              <View style={styles.item}>
                <Icon
                  style={styles.icon}
                  name={'info'}/>
                <Text style={styles.title}>
                  {'关于我们'}
                </Text>
              </View>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  header:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:COLOR.primaryColor,
  },
  logo:{
    fontSize:32,
    color:COLOR.whiteColor,
    marginVertical:32
  },
  name:{
    color:COLOR.whiteColor,
    fontSize:FONTSIZE.primary
  },
  btn:{
    marginRight:16,
    alignSelf:'flex-end',
    marginBottom:16
  },
  btnText:{
    color:COLOR.whiteColor,
    fontSize:FONTSIZE.normal
  },
  item:{
    paddingHorizontal:16,
    paddingVertical:16,
    flexDirection:'row',
    alignItems:'center'
  },
  icon:{
    fontSize:24,
    color:COLOR.normalTextColor
  },
  title:{
    marginLeft:32,
    color:COLOR.normalTextColor,
    fontSize:FONTSIZE.normal
  }
});