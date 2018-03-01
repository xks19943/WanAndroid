/**
 * Created by xiaoming on 2018/1/17.
 */
import React, {Component} from 'react';
import {
  DrawerNavigator,
  DrawerItems,
  SafeAreaView
} from 'react-navigation';
import {
  View
} from 'react-native';
import Tabs from './Tabs';
import NavButton from '../../components/NavButton';

import NavigationView from './NavigationView';

const Drawer = DrawerNavigator({
  Tabs: {
    screen: Tabs,
  },
},{
  drawerPosition:'left',
  contentComponent:({navigation})=>{
    return <NavigationView navigation={navigation}/>
  }
});

Drawer.navigationOptions = ({navigation})=>{
  return {
    headerLeft:(
      <NavButton
        data={{
          type:'icon',
          name:'menu',
          onPress:()=>{
            navigation.navigate('DrawerToggle');
          }
        }}/>
    ),
    headerRight:(
      <View style={{flexDirection:'row'}}>
        <NavButton
          data={{
            type:'icon',
            name:'hot-tub',
            onPress:()=>{
              navigation.navigate('DrawerClose');
              navigation.navigate('HotWord',{name:'热度'});
            }
          }}/>
        <NavButton
          data={{
            type:'icon',
            name:'search',
            onPress:()=>{
              navigation.navigate('DrawerClose');
              navigation.navigate('Search');
            }
          }}/>
      </View>
    ),
  }
};


export default Drawer;