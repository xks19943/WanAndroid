/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import './src/global/GlobalRegister';
import * as WeChat from 'react-native-wechat';
import Drawer from './src/pages/main/Drawer';
import NavButton from './src/components/NavButton';

import LearningTabView from './src/pages/learning/LearningTabView';
import DetailWebView from './src/pages/common/DetailWebView';
import Login from './src/pages/login/Login';
import CollectedArticle from './src/pages/setting/CollectedArticle';
import AboutUs from './src/pages/setting/AboutUs';
import Search from './src/pages/search/Search';
import HotWord from './src/pages/search/HotWord';


export default class App extends Component<{}> {

  componentDidMount() {
    WeChat.registerApp('wxd698bd44b65585c6');
  }

  render() {
    return (
      <View style={STYLE.BACKGROUND}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={COLOR.primaryDarkColor}/>
        <AppNavigator/>
      </View>
    );
  }
}


const AppNavigator = StackNavigator({
  Drawer:{
    screen:Drawer,
  },
  LearningTabView:{
    screen:LearningTabView
  },
  DetailWebView:{
    screen:DetailWebView
  },
  Login:{
    screen:Login
  },
  CollectedArticle:{
    screen:CollectedArticle
  },
  AboutUs:{
    screen:AboutUs
  },
  Search:{
    screen:Search
  },
  HotWord:{
    screen:HotWord
  }
},{
  initialRouteName:'Drawer',
  initialRouteParams:{name:'玩安卓'},
  headerMode:'screen',
  navigationOptions:({navigation}) => {
    let {state,goBack} = navigation;
    // 用来判断是否隐藏或显示header
    // console.log(navigation)
    let title = '';
    let onLeftPress;
    if(state.params){
      if(state.params.name){
        title = state.params.name   //是否显示标题
      }
      if(state.params.onLeftPress){
        onLeftPress= state.params.onLeftPress;  //是否自定义左边按钮的响应事件
      }
    }
    return {
      headerTitle: title,
      headerStyle :{
        backgroundColor: COLOR.primaryColor,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerLeft:(
        <NavButton
          data={{
            type:'icon',
            onPress: onLeftPress
              ? onLeftPress
              :()=>{
                goBack();
              }
          }}/>
      ),
      headerBackTitle: null,
      headerRight:(
        <View style={{width: 48,height: 48}}/>
      ),
      headerTitleStyle:{
        fontSize:FONTSIZE.large,
        color:COLOR.whiteColor,
        //alignSelf:'center'
      },
    }
  }
});

