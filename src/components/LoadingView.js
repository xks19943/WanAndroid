/**
 * Created by xiaoming on 2018/2/2.
 */
import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet
} from 'react-native';

const LoadingView = ()=>{
  return(
    <View style={styles.bg}>
      <ActivityIndicator
        color={COLOR.primaryColor}
        animating={true}
        size={'large'}/>
      <Text style={styles.title}>
        {'正在加载数据'}
      </Text>
    </View>
  )
};

export default LoadingView;

const styles = {
  bg:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:COLOR.bgColor
  },
  title:{
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryColor
  }
};
