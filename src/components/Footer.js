/**
 * Created by xiaoming on 2018/2/8.
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text
} from 'react-native';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.item}>
        <ActivityIndicator
          animating={true}
          color={COLOR.primaryColor}/>
        <Text style={styles.title}>
          {'加载更多中...'}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:COLOR.whiteColor,
    paddingVertical:16,
    marginTop:8
  },
  title:{
    fontSize:FONTSIZE.primary,
    color: COLOR.normalTextColor,
    marginLeft:8
  }
});