/**
 * Created by xiaoming on 2018/2/9.
 */
import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  DeviceEventEmitter
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import ToastUtil from '../../services/ToastUtil';
import BaseModel from '../../models/BaseModel';
import cookie from '../../services/cookie';

const paddingTopHeight = Platform.OS === 'ios' ? 20 : 0;
export default class Login extends Component{
  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
    }
  }

  /*注册*/
  async onRegister(){
    let username = this.state.username.trim();
    let password = this.state.password.trim();

    if(!username){
      ToastUtil.show('请输入用户名！');
      return;
    }

    if(!password || password.length < 6){
      ToastUtil.show('请输入六位长度以上密码！');
      return;
    }

    let params = {
      username:username,
      password:password,
      repassword:password
    };
    try {
      let res = await BaseModel.register(params);
    }catch (e){
      ToastUtil.show(e.message);
    }

  }

  /*登录*/
  async onLogin(){
    let username = this.state.username.trim();
    let password = this.state.password.trim();

    if(!username){
      ToastUtil.show('请输入用户名！');
      return;
    }

    if(!password || password.length < 6){
      ToastUtil.show('请输入六位长度以上密码！');
      return;
    }

    let params = {
      username:username,
      password:password
    };
    try {
      let res = await BaseModel.login(params);
      if(res.data){
        console.log(res);
        cookie.setUser(res.data,true);
        ToastUtil.show('登录成功');
        //发送登录成功通知
        DeviceEventEmitter.emit('onSignIn');
        this.props.navigation && this.props.navigation.goBack();
      }
    }catch (e){
      ToastUtil.show(e.message);
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=>{
            this.props.navigation && this.props.navigation.goBack();
          }}
          style={styles.close}>
          <Icon
            name={'close'}
            style={styles.icon}/>
        </TouchableOpacity>
        <Image
          style={styles.header}
          source={require('../../resources/icon/ic_launcher.png')}/>
        <Hoshi
          value={this.state.username}
          style={styles.item}
          inputStyle={styles.input}
          labelStyle={styles.label}
          label={'用户名'}
          borderColor={COLOR.primaryColor}
          onChangeText={(text)=>
            this.setState({
              username:text
            })
          }/>
        <Hoshi
          value={this.state.password}
          style={styles.item}
          label={'密码'}
          inputStyle={styles.input}
          labelStyle={styles.label}
          borderColor={COLOR.primaryColor}
          secureTextEntry={true}
          onChangeText={(text)=>
            this.setState({
              password:text
            })
          }/>
        <View
          style={styles.btnItem}>
          <Button
            btnStyle={styles.registerBtn}
            title={'注册'}
            onPress={()=>{
              this.onRegister();
            }}/>
          <Button
            btnStyle={styles.loginBtn}
            title={'登录'}
            onPress={()=>{
              this.onLogin();
            }}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:paddingTopHeight,
    backgroundColor:COLOR.whiteColor
  },
  label:{
    fontSize:FONTSIZE.large,
    color:COLOR.primaryTextColor,
  },
  input:{
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryTextColor,
    fontWeight:'normal'
  },
  item:{
    marginHorizontal: 32,
    width: ScreenWidth - 64,
    marginBottom:16
  },
  icon:{
    fontSize:24,
    color:COLOR.primaryTextColor
  },
  close:{
    alignSelf:'flex-end',
    marginRight:32,
    marginTop:32,
  },
  header:{
    borderRadius:32,
    width:64,
    height:64,
    marginVertical:32,
    alignSelf:'center',
    borderWidth:1,
    borderColor:COLOR.diverColor
  },
  btnItem:{
    flexDirection:'row',
    marginTop:16,
    marginHorizontal: 32,
    width: ScreenWidth - 64,
    justifyContent:'space-around'
  },
  registerBtn:{
    flex:1,
    marginRight:8
  },
  loginBtn:{
    flex:1,
    marginLeft:8
  }
});