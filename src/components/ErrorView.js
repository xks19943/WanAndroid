/**
 * Created by xiaoming on 2018/2/6.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

export default class ErrorView extends Component {

  static propTypes = {
    onClick:PropTypes.func
  };



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touch}
          onPress={()=>this.props.onClick}>
          <Image
            source={{uri:'http://img.sj33.cn/uploads/allimg/201604/7-160410220155.jpg'}}
            style={styles.img}/>
          <Text style={styles.title}>
            {'暂时没有数据哦o(╥﹏╥)o'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.bgColor,
    alignItems:'center',
    justifyContent:'center'
  },
  img:{
    width:120,
    height:90
  },
  title:{
    marginTop:16,
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryTextColor,
  },
  touch:{
    alignItems:'center',
    justifyContent:'center'
  }
});