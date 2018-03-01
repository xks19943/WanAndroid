/**
 * Created by xiaoming on 2017/6/7.
 */
import React,{Component} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';


export default class TabIcon extends Component{
  static propTypes = {
    isImage:PropTypes.bool,
    focused:PropTypes.bool,
    label:PropTypes.string.isRequired,
    icon:PropTypes.string,
    normalSource:Image.propTypes.source,
    focusedSource:Image.propTypes.source,
  };

  render(){
    if(this.props.isImage) {
      return(
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
          <Image
            style={styles.image}
            source={this.props.focused ? this.props.focusedSource : this.props.normalSource}/>
          <Text
            style={[styles.label,this.props.focused && {color:COLOR.primaryColor}]}>
            {this.props.label}
          </Text>
        </View>
      );
    }else {
      return(
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
          <Icon
            style={[styles.icon,this.props.focused && {color:COLOR.primaryColor}]}
            name={this.props.icon}/>
          <Text
            style={[styles.label,this.props.focused && {color:COLOR.primaryColor}]}>
            {this.props.label}
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  label:{
    fontSize: FONTSIZE.small,
    color: COLOR.diverColor,
    marginTop: 8
  },
  icon:{
    fontSize:25,
    color: COLOR.diverColor,
  },
  image:{
    width:25,
    height:25,
    resizeMode:'contain'
  }
});