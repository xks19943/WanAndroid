/**
 * Created by xiaoming on 2018/2/7.
 */
import React from 'react';
import {
  View
} from 'react-native';
import PropTypes from 'prop-types';

const SeparatorItem = ({height})=>{
  return(
    <View style={{height:height}}/>
  )
};

SeparatorItem.propTypes = {
  height:PropTypes.number.isRequired
};

export default SeparatorItem;