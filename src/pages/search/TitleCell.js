/**
 * Created by xiaoming on 2018/2/23.
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const TitleCell = ({title})=>{
  return(
    <View style={styles.titleCell}>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  )
};

TitleCell.propTypes = {
  title:PropTypes.string.isRequired
};

export default TitleCell;

const styles = StyleSheet.create({
  titleCell:{
    paddingHorizontal:16,
    paddingVertical:10,
    backgroundColor:COLOR.whiteColor
  },
  title:{
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryTextColor
  }
});