/**
 * Created by xiaoming on 2018/2/7.
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const LearningListItem = ({item,index,onPress})=>{
  let flexView = (
    <View style={styles.grid}>
      {
        item.children.map((Learning,id)=>{
          return(
            <Text
              key={index+""+id}
              style={styles.normalText}>
              {Learning.name}
            </Text>
          )
        })
      }
    </View>
  );

  return(
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={{marginBottom:16}}>
          <Text style={styles.primaryText}>{item.name}</Text>
        </View>
        {flexView}
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  primaryText:{
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryTextColor
  },
  normalText:{
    fontSize:FONTSIZE.normal,
    color:COLOR.normalTextColor,
    marginRight:8
  },
  item:{
    elevation:1,
    paddingHorizontal:16,
    paddingVertical:10,
    backgroundColor:COLOR.whiteColor
  },
  grid:{
    flexDirection:'row',
    flexWrap:'wrap',
  }
});


export default LearningListItem;