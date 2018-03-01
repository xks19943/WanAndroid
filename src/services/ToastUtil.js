/**
 * Created by xiaoming on 2018/2/9.
 */
import React from 'react';

import {
  Alert,
  ToastAndroid,
  Platform
} from 'react-native';


let ToastUtil = {
  show(text){
    if(Platform.OS === 'ios'){
      Alert.alert(
        '提示',
        text,
        [
          {text: '确认'},
        ]
      )
    }else {
      ToastAndroid.show(text,ToastAndroid.SHORT);
    }
  }
};

export default ToastUtil;