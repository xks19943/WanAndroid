/**
 * Created by xiaoming on 2017/6/7.
 */
import React,{Component} from 'react';

import { TabNavigator, StackNavigator} from 'react-navigation';
import TabIcon from '../../components/TabIcon';
import {
  Platform
} from 'react-native';
import Home from '../home/Home';
import Learning from '../learning/Learning';

const isShowLine = Platform.OS === 'android' && Platform.Version < 21;
const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      tabBarIcon: ({focused}) => (
        <TabIcon
          focused={focused}
          icon={'home'}
          label={'首页'}/>
      ),
    }
  },
  Learning: {
    screen: Learning,
    navigationOptions:{
      tabBarIcon: ({focused}) => (
        <TabIcon
          focused={focused}
          icon={'menu'}
          label={'知识体系'}/>
      ),
    }
  },
},{
  tabBarPosition:'bottom',
  swipeEnabled:false,
  animationEnabled:false,
  scrollEnabled:false,
  initialRouteName: 'Home',
  tabBarOptions: {
    style: {
      padding: 0,
      margin: 0,
      backgroundColor:COLOR.whiteColor,
      borderTopWidth:isShowLine?1:0,
      borderTopColor:isShowLine?COLOR.diverColor:null
    },
    indicatorStyle:{
      height:0,
    },
    iconStyle:{
      margin:0,
      padding:0,
      height:44,
      width:ScreenWidth/5
    },
    showLabel:false,
    showIcon:true,
  },
});





export default Tabs;