/**
 * Created by xiaoming on 2018/2/23.
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import filter from '../../services/filter';

const ContentView = ({list,onItemClick,disabled})=>{
  let content = list.map((item,index)=>{
    return(
      <TouchableOpacity
        disabled={disabled}
        onPress={()=>onItemClick(item)}
        key={item.name + index}
        style={styles.item}>
        <Text style={[styles.title,{color:filter.randomColor()}]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  });
  if(content){
    return(
      <View style={styles.contain}>
        {content}
      </View>
    )
  } else {
    return null
  }
};

ContentView.propTypes = {
  list:PropTypes.array.isRequired,
  onItemClick:PropTypes.func,
  disabled:PropTypes.bool
};

export default ContentView;

const styles = StyleSheet.create({
    contain:{
      flexDirection:'row',
      alignItems:'center',
      flexWrap:'wrap',
      paddingHorizontal:16,
      paddingVertical:8,
    },
    item:{
      paddingHorizontal:16,
      paddingVertical:8,
      borderRadius:10,
      backgroundColor:COLOR.whiteColor,
      marginBottom:8,
      marginRight:8
    },
    title:{
      fontSize:FONTSIZE.primary
    }
});