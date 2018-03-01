/**
 * Created by xiaoming on 2018/2/9.
 */
import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';


const Button = (props)=>{
  let {btnStyle,labelStyle,title,onPress,disabled} = props;
  return(
      <TouchableOpacity style={[styles.btn,btnStyle]}
                        disabled={disabled}
                        onPress={onPress}>
        <Text style={[styles.label,labelStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
  )
};

Button.propTypes = {
  title:PropTypes.string.isRequired,
  onPress:PropTypes.func,
  disabled:PropTypes.bool,
};

const styles = {
  btn:{
    backgroundColor:COLOR.primaryColor,
    height:44,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
  },
  label:{
    fontSize:FONTSIZE.primary,
    color:COLOR.whiteColor,
    marginHorizontal:24
  },
};
export default Button;

